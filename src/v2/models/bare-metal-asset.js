/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * (c) Copyright Red Hat, Inc. All Rights Reserved.
 ****************************************************************************** */
import KubeModel from './kube';

function transform(bareMetalAsset, secret = {}) {
  const { spec } = bareMetalAsset;
  const username = secret.data ? secret.data.username : undefined;
  const password = secret.data ? secret.data.password : undefined;

  const bma = {
    metadata: bareMetalAsset.metadata,
    ...spec,
  };

  bma.bmc = bma.bmc || {};
  bma.bmc.username = username ? Buffer.from(username, 'base64').toString('ascii') : undefined;
  bma.bmc.password = password ? Buffer.from(password, 'base64').toString('ascii') : undefined;
  return bma;
}

function transformNamespaces(namespace) {
  return namespace.metadata.name;
}

export default class BareMetalAssetModel extends KubeModel {
  async getSingleBareMetalAsset(args = {}) {
    const { name, namespace } = args;
    if (name && namespace) {
      const bareMetalAsset = await this.kubeConnector.get(`/apis/midas.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`);
      let secret;
      if (bareMetalAsset.metadata !== undefined) {
        if (bareMetalAsset.spec.bmc && bareMetalAsset.spec.bmc.credentialsName) {
          secret = await this.kubeConnector.get(`/api/v1/namespaces/${namespace}/secrets/${bareMetalAsset.spec.bmc.credentialsName}`);
        }
        return [transform(bareMetalAsset, secret)];
      }
    }
    return [];
  }

  async getBareMetalAssets(args = {}) {
    const { name } = args;
    const allBareMetalAssets = await this.getAllBareMetalAssets(args);
    if (name) {
      return allBareMetalAssets.find(bma => bma.metadata.name === name);
    }
    return allBareMetalAssets;
  }

  async getAllBareMetalAssets() {
    const [bareMetalAssets] = await Promise.all([
      this.kubeConnector.get('/apis/midas.io/v1alpha1/baremetalassets'),
      // TODO: do we need secrets?
    ]);
    if (bareMetalAssets.items !== undefined) {
      return bareMetalAssets.items.map(bma => transform(bma));
    }
    return [];
  }

  async getBareMetalAssetSubresources(args = {}) {
    const [namespaces, bareMetalAsset] = await Promise.all([
      this.kubeConnector.get('/api/v1/namespaces'),
      this.getSingleBareMetalAsset(args),
    ]);
    return {
      namespaces: namespaces.items ?
        namespaces.items.map(transformNamespaces)
        : { error: namespaces },
      bareMetalAsset,
    };
  }

  async createSecret(namespace, secretName, username, password) {
    const secret = {
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        name: secretName,
      },
      type: 'Opaque',
      data: {
        username: Buffer.from(username).toString('base64'),
        password: Buffer.from(password).toString('base64'),
      },
    };
    return this.kubeConnector.post(`/api/v1/namespaces/${namespace}/secrets`, secret);
  }

  async createBMA(namespace, name, address, credentialsName, bootMACAddress) {
    const bma = {
      apiVersion: 'midas.io/v1alpha1',
      kind: 'BareMetalAsset',
      metadata: {
        name,
      },
      spec: {
        bmc: {
          address,
          credentialsName,
        },
        bootMACAddress,
      },
    };
    return this.kubeConnector.post(`/apis/midas.io/v1alpha1/namespaces/${namespace}/baremetalassets`, bma);
  }

  async patchSecret(namespace, secretName, username, password) {
    const secretBody = {
      body: [
        {
          op: 'replace',
          path: '/data',
          value: {
            username: Buffer.from(username).toString('base64'),
            password: Buffer.from(password).toString('base64'),
          },
        },
      ],
    };
    return this.kubeConnector.patch(`/api/v1/namespaces/${namespace}/secrets/${secretName}`, secretBody);
  }

  async patchBMA(oldSpec, namespace, name, address, credentialsName, bootMACAddress) {
    const newSpec = Object.assign({}, oldSpec, {
      bmc: {
        address,
        credentialsName,
      },
      bootMACAddress,
    });
    const bmaBody = {
      body: [
        {
          op: 'replace',
          path: '/spec',
          value: newSpec,
        },
      ],
    };
    return this.kubeConnector.patch(`/apis/midas.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`, bmaBody);
  }

  async createBareMetalAsset(args) {
    const {
      namespace, name, bmcAddress, username, password, bootMac,
    } = args;
    try {
      const secretName = `${name}-bmc-secret`;
      const secretResult = await this.createSecret(namespace, secretName, username, password);
      const bmaResult = await this.createBMA(namespace, name, bmcAddress, secretName, bootMac);

      let statusCode = 201;
      if (secretResult.metadata.name !== secretName) {
        statusCode = secretResult.code;
      } else if (bmaResult.metadata.name !== name) {
        statusCode = bmaResult.code;
      }

      return {
        statusCode,
        secretResult,
        bmaResult,
      };
    } catch (error) {
      return error;
    }
  }

  async updateBareMetalAsset(args) {
    const {
      namespace, name, bmcAddress, username, password, bootMac,
    } = args;

    const bareMetalAsset = await this.kubeConnector.get(`/apis/midas.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`);
    if (bareMetalAsset.metadata !== undefined) {
      let secretResult;
      if (bareMetalAsset.spec.bmc && bareMetalAsset.spec.bmc.credentialsName) {
        secretResult = await this.patchSecret(
          namespace,
          bareMetalAsset.spec.bmc.credentialsName,
          username,
          password,
        );
      } else {
        // Secret does not exist, create one
        secretResult = await this.createSecret(namespace, `${name}-bmc-secret`, username, password);
      }
      if (secretResult && (secretResult.code || secretResult.message)) {
        return {
          statusCode: secretResult.code || 500,
          secretResult,
          bmaResult: {},
        };
      }

      const bmaResult = await this.patchBMA(
        bareMetalAsset.spec,
        namespace,
        name,
        bmcAddress,
        secretResult.metadata.name,
        bootMac,
      );
      if (bmaResult && (bmaResult.code || bmaResult.message)) {
        return {
          statusCode: bmaResult.code || 500,
          secretResult,
          bmaResult,
        };
      }

      return {
        statusCode: 200,
        secretResult,
        bmaResult,
      };
    }

    // BMA not found
    return {
      statusCode: 400,
      secretResult: {},
      bmaResult: {},
    };
  }
}

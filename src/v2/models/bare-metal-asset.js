/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * (c) Copyright Red Hat, Inc. All Rights Reserved.
 ****************************************************************************** */
import KubeModel from './kube';

function transform(bareMetalAsset) {
  const { spec } = bareMetalAsset;

  return {
    metadata: bareMetalAsset.metadata,
    ...spec,
  };
}

function transformNamespaces(namespace) {
  return namespace.metadata.name;
}

export default class BareMetalAssetModel extends KubeModel {
  async getSingleBareMetalAsset(args = {}) {
    const { name, namespace } = args;
    const [bareMetalAsset] = await Promise.all([
      this.kubeConnector.get(`/apis/midas.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`),
      // TODO: do we need secrets?
    ]);
    if (bareMetalAsset.metadata !== undefined) {
      return [transform(bareMetalAsset)];
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
      return bareMetalAssets.items.map(transform);
    }
    return [];
  }

  async getBareMetalAssetSubresources() {
    const [namespaces] = await Promise.all([
      this.kubeConnector.get('/api/v1/namespaces'),
    ]);
    return {
      namespaces: namespaces.items ?
        namespaces.items.map(transformNamespaces)
        : { error: namespaces },
    };
  }

  async createBareMetalAsset(args) {
    const {
      namespace, name, bmcAddress, username, password, bootMac,
    } = args;
    try {
      const secretName = `${name}-bmc-secret`;
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
      const bma = {
        apiVersion: 'midas.io/v1alpha1',
        kind: 'BareMetalAsset',
        metadata: {
          name,
        },
        spec: {
          bmc: {
            address: bmcAddress,
            credentialsName: secretName,
          },
          bootMACAddress: bootMac,
        },
      };
      const secretResult = await this.kubeConnector.post(`/api/v1/namespaces/${namespace}/secrets`, secret);
      const bmaResult = await this.kubeConnector.post(`/apis/midas.io/v1alpha1/namespaces/${namespace}/baremetalassets`, bma);

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
}

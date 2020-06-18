/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
import _ from 'lodash';
import KubeModel from './kube';

const MAX_PARALLEL_REQUESTS = 5;

export function transform(bareMetalAsset, secrets = []) {
  const { metadata, spec, status } = bareMetalAsset;
  const secret = secrets.find((s) => s.metadata.name === spec.bmc.credentialsName && s.metadata.namespace === metadata.namespace);
  const username = secret && secret.data ? secret.data.username : undefined;
  const password = secret && secret.data ? secret.data.password : undefined;

  const bma = {
    metadata: bareMetalAsset.metadata,
    ...spec,
  };

  bma.bmc = bma.bmc || {};
  bma.bmc.username = username ? Buffer.from(username, 'base64').toString('ascii') : undefined;
  bma.bmc.password = password ? Buffer.from(password, 'base64').toString('ascii') : undefined;

  // https://github.com/open-cluster-management/multicloud-operators-foundation/blob/16e92f7/pkg/apis/inventory/v1alpha1/baremetalasset_types.go#L81-L98
  // https://github.com/open-cluster-management/multicluster-inventory/blob/master/pkg/controller/baremetalasset/baremetalasset_controller.go
  const allConditions = _.get(status, 'conditions', []);
  if (allConditions.length > 0) {
    const failingConditions = allConditions.filter((c) => c.status === 'False');
    if (failingConditions.length > 0) {
      // one or more conditions are not met, report the first one
      bma.status = failingConditions[0].type;
    } else {
      // operator finished reconcilation, all conditions are truish
      bma.status = 'Ready';
    }
  } else {
    // waiting for the operator to set status
    bma.status = ''; // Pending
  }

  return bma;
}

function transformNamespaces(namespace) {
  return namespace.metadata.name;
}

export default class BareMetalAssetModel extends KubeModel {
  async getSingleBareMetalAsset(args = {}) {
    const { name, namespace } = args;
    if (name && namespace) {
      const bareMetalAsset = await this.kubeConnector.get(`/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`);
      let secret;
      if (bareMetalAsset.metadata !== undefined) {
        if (bareMetalAsset.spec.bmc && bareMetalAsset.spec.bmc.credentialsName) {
          secret = await this.kubeConnector.get(`/api/v1/namespaces/${namespace}/secrets/${bareMetalAsset.spec.bmc.credentialsName}`);
        }
        return [transform(bareMetalAsset, [secret])];
      }
    }
    return [];
  }

  async getBareMetalAssets(args = {}) {
    const { name } = args;
    const allBareMetalAssets = await this.getAllBareMetalAssets(args);
    if (name) {
      return allBareMetalAssets.find((bma) => bma.metadata.name === name);
    }
    return allBareMetalAssets;
  }

  async getAllBareMetalAssets({ fetchSecrets }) {
    const [bareMetalAssets, secrets] = await Promise.all([
      this.kubeConnector.get('/apis/inventory.open-cluster-management.io/v1alpha1/baremetalassets')
        .then((allBMAs) => (allBMAs.items ? allBMAs.items : this.kubeConnector.getResources((ns) => `/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/${ns}/baremetalassets`))),
      fetchSecrets
        ? this.kubeConnector.get('/api/v1/secrets').then((allSecrets) => (allSecrets.items ? allSecrets.items : this.kubeConnector.getResources((ns) => `/api/v1/namespaces/${ns}/secrets`)))
        : Promise.resolve({ items: [] }),
    ]);

    const BMAs = bareMetalAssets.items || bareMetalAssets || [];
    const k8sSecrets = secrets.items || secrets || [];
    if (BMAs.length > 0) {
      return BMAs.map((bma) => transform(bma, k8sSecrets));
    }
    if (_.isArray(bareMetalAssets.paths)) {
      // missing BMA CRD
      // throw new Error('Missing BareMetalAsset CRD'); // will cause not-UX-friendly UI message
      // eslint-disable-next-line no-console
      console.log('Missing BareMetalAsset CRD (getAllBareMetalAssets)');
    }

    return [];
  }

  async syncBMAs(hosts) {
    // make sure all hosts have a bare metal asset
    const bareMetalAssets = await this.kubeConnector.get('/apis/inventory.open-cluster-management.io/v1alpha1/baremetalassets');
    const assetsMap = _.keyBy(bareMetalAssets.items, (item) => {
      const name = _.get(item, 'metadata.name');
      const namespace = _.get(item, 'metadata.namespace');
      return `${name}-${namespace}`;
    });
    const newAssets = [];
    hosts.forEach((host) => {
      const { name, namespace } = host;
      if (!assetsMap[`${name}-${namespace}`]) {
        newAssets.push(host);
      }
    });
    if (newAssets.length > 0) {
      await Promise.all(newAssets.map((asset) => {
        const {
          name, namespace, bmc: { address, username, password }, bootMACAddress,
        } = asset;
        return this.createBareMetalAsset({
          name,
          namespace,
          bmcAddress: address,
          username,
          password,
          bootMac: bootMACAddress,
        });
      }));
    }

    // make sure all hosts have a user/password
    const filteredHosts = hosts.filter((host) => !_.get(host, 'bmc.username'));
    if (filteredHosts.length > 0) {
      const secrets = await this.kubeConnector.get('/api/v1/secrets').then((allSecrets) => (allSecrets.items ? allSecrets.items : this.kubeConnector.getResources((ns) => `/api/v1/namespaces/${ns}/secrets`)));
      const secretMap = _.keyBy(secrets, (secret) => {
        const name = _.get(secret, 'metadata.ownerReferences[0].name');
        const namespace = _.get(secret, 'metadata.namespace');
        return `${name}-${namespace}`;
      });
      filteredHosts.forEach((host) => {
        const { name, namespace } = host;
        const secret = secretMap[`${name}-${namespace}`];
        if (secret) {
          const { data = {} } = secret;
          const { username, password } = data;
          _.set(host, 'bmc.username', username ? Buffer.from(username, 'base64').toString('ascii') : undefined);
          _.set(host, 'bmc.password', password ? Buffer.from(password, 'base64').toString('ascii') : undefined);
        }
      });
    }
  }

  async getBareMetalAssetSubresources(args = {}) {
    const [namespaces, bareMetalAsset] = await Promise.all([
      this.kubeConnector.get('/apis/project.openshift.io/v1/projects'),
      this.getSingleBareMetalAsset(args),
    ]);
    return {
      namespaces: namespaces.items
        ? namespaces.items.map(transformNamespaces)
        : { error: namespaces },
      bareMetalAsset,
    };
  }

  async createSecret(namespace, secretName, username, password) {
    const secret = {
      apiVersion: 'v1',
      kind: 'Secret',
      metadata: {
        generateName: secretName,
        ownerReferences: [],
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
      apiVersion: 'inventory.open-cluster-management.io/v1alpha1',
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
    return this.kubeConnector.post(`/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/${namespace}/baremetalassets`, bma);
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

  async patchSecretOwnerRef(namespace, secretName, ownerName, ownerUID) {
    const secretBody = {
      body: [
        {
          op: 'replace',
          path: '/metadata/ownerReferences',
          value: [{
            apiVersion: 'inventory.open-cluster-management.io/v1alpha1',
            kind: 'BareMetalAsset',
            name: ownerName,
            uid: ownerUID,
          }],
        },
      ],
    };
    return this.kubeConnector.patch(`/api/v1/namespaces/${namespace}/secrets/${secretName}`, secretBody);
  }

  async patchBMA(oldSpec, namespace, name, address, credentialsName, bootMACAddress) {
    const newSpec = {
      ...oldSpec,
      bmc: {
        address,
        credentialsName,
      },
      bootMACAddress,
    };
    const bmaBody = {
      body: [
        {
          op: 'replace',
          path: '/spec',
          value: newSpec,
        },
      ],
    };
    return this.kubeConnector.patch(`/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`, bmaBody);
  }

  async createBareMetalAsset(args) {
    const {
      namespace, name, bmcAddress, username, password, bootMac,
    } = args;
    try {
      const secretResult = await this.createSecret(namespace, `${name}-bmc-secret-`, username, password);
      const secretName = _.get(secretResult, 'metadata.name', '');
      const bmaResult = await this.createBMA(namespace, name, bmcAddress, secretName, bootMac);
      if (bmaResult.paths) {
        // missing BMA CRD
        return {
          statusCode: 500,
          bmaResult: {
            code: 500,
            message: 'Missing BareMetalAsset CRD',
          },
        };
      }
      const patchedSecretResult = await this.patchSecretOwnerRef(namespace, secretName, name, _.get(bmaResult, 'metadata.uid'));

      let statusCode = 201;
      if (!secretResult.metadata.name) {
        statusCode = secretResult.code;
      } else if (bmaResult.metadata.name !== name) {
        statusCode = bmaResult.code;
      } else if (!patchedSecretResult.metadata.name) {
        statusCode = patchedSecretResult.code;
      }

      return {
        statusCode,
        secretResult,
        patchedSecretResult,
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

    const bareMetalAsset = await this.kubeConnector.get(`/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`);
    if (bareMetalAsset.metadata !== undefined) {
      let secretResult;
      let patchedSecretResult;
      if (bareMetalAsset.spec.bmc && bareMetalAsset.spec.bmc.credentialsName) {
        secretResult = await this.patchSecret(
          namespace,
          bareMetalAsset.spec.bmc.credentialsName,
          username,
          password,
        );
      } else {
        // Secret does not exist, create one
        secretResult = await this.createSecret(namespace, `${name}-bmc-secret-`, username, password);
        patchedSecretResult = await this.patchSecretOwnerRef(namespace, _.get(secretResult, 'metadata.name'), name, _.get(bareMetalAsset, 'metadata.uid'));
      }
      if (secretResult && (secretResult.code || secretResult.message)) {
        return {
          statusCode: secretResult.code || 500,
          secretResult,
          patchedSecretResult,
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
          patchedSecretResult,
          bmaResult,
        };
      }

      return {
        statusCode: 200,
        secretResult,
        patchedSecretResult,
        bmaResult,
      };
    }

    // BMA not found
    return {
      statusCode: 400,
      secretResult: {},
      bmaResult: {},
      patchedSecretResult: {},
    };
  }

  async deleteBareMetalAssets(args) {
    const { bmas = [] } = args;
    try {
      if (!_.isArray(bmas)) {
        return {
          statusCode: 500,
          error: 'Array of bmas is expected',
        };
      }

      const requests = bmas.map((bma) => {
        const { namespace, name } = bma;
        return `/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`;
      });

      const errors = [];
      const chunks = _.chunk(requests, MAX_PARALLEL_REQUESTS);
      for (let i = 0; i < chunks.length; i += 1) {
        const chunk = chunks[i];
        // eslint-disable-next-line no-await-in-loop
        const results = await Promise.all(chunk.map((url) => this.kubeConnector.delete(url)));
        results.forEach((result) => {
          if (result.code) {
            errors.push({ statusCode: result.code, message: result.message });
          }
        });
      }
      if (errors.length > 0) {
        return {
          statusCode: 500,
          errors,
          message: `Failed to delete ${errors.length} bare metal asset(s)`,
        };
      }

      return {
        statusCode: 200,
      };
    } catch (error) {
      return {
        statusCode: 500,
        error,
      };
    }
  }

  async attachBMAs(hosts, clusterName, errors) {
    // get requests to fetch the bmas
    const requests = hosts.map((bma) => {
      const { namespace, name } = bma;
      return `/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`;
    });

    const chunks = _.chunk(requests, MAX_PARALLEL_REQUESTS);
    for (let i = 0; i < chunks.length; i += 1) {
      const chunk = chunks[i];

      // get the bmas
      // eslint-disable-next-line no-await-in-loop
      let bmas = await Promise.all(chunk.map((url) => this.kubeConnector.get(url)));
      bmas = bmas.filter((result) => {
        if (result.code) {
          errors.push({ statusCode: result.code, message: result.message });
          return false;
        }
        return true;
      });

      // assign bmas to hosts
      // eslint-disable-next-line no-await-in-loop
      const results = await Promise.all(bmas.map(({ spec, metadata: { namespace, name } }, inx) => {
        const newSpec = {
          ...spec,
          role: hosts[inx].role,
          clusterDeployment: {
            name: clusterName,
            namespace: clusterName,
          },
        };
        const bmaBody = {
          body: [
            {
              op: 'replace',
              path: '/spec',
              value: newSpec,
            },
          ],
        };
        return this.kubeConnector.patch(`/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`, bmaBody);
      }));
      results.forEach((result) => {
        if (result.code) {
          errors.push({ statusCode: result.code, message: result.message });
        }
      });
    }
  }
}

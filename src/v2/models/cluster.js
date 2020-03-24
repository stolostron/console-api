/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import KubeModel from './kube';

// The last char(s) in usage are units - need to be removed in order to get an int for calculation
function getPercentage(usage, capacity) {
  return (usage.substring(0, usage.length - 2) / capacity.substring(0, capacity.length - 2)) * 100;
}

function getCPUPercentage(usage, capacity) {
  return ((usage.substring(0, usage.length - 1) / 1000) / capacity) * 100;
}

function getStatus(cluster) {
  // Empty status indicates cluster has not been imported
  // status with conditions[0].type === '' indicates cluster is offline
  const status = _.get(cluster, 'status.conditions[0].type', 'pending');
  return status === '' ? 'offline' : status.toLowerCase();
}

function responseHasError(response) {
  const code = response.statusCode || response.code;
  return (code < 200 || code >= 300);
}


async function getClusterResources(kube) {
  // Try cluster scope query, falling back to per-namespace
  const allClusters = await kube.get('/apis/clusterregistry.k8s.io/v1alpha1/clusters');
  const clusters = allClusters.items ? allClusters.items : await kube.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`);

  // For clusterstatuses, query only namespaces that have clusters
  // For clusterversions, query only clusters that are online
  const names = Array.from(new Set(clusters.filter(cluster => getStatus(cluster) === 'ok').map(c => c.metadata.name)));
  const namespaces = Array.from(new Set(clusters.map(c => c.metadata.namespace)));
  const [clusterstatuses, ...clusterversions] = await Promise.all([
    kube.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`,
      { namespaces },
    ),
    ...names.map(n => kube.resourceViewQuery('clusterversions', n, 'version', null, 'config.openshift.io').catch(() => null)),
  ]);
  return [clusters, clusterstatuses, clusterversions];
}

function getUniqueClusterName(cluster) {
  const clusterName = _.get(cluster, 'metadata.name', 'noClusterName');
  const clusterNamespace = _.get(cluster, 'metadata.namespace', 'noClusterNamespace');
  return `${clusterName}_${clusterNamespace}`;
}

function mapClusters(clusters) {
  const resultMap = new Map();
  clusters.forEach((cluster) => {
    const uniqueClusterName = getUniqueClusterName(cluster);
    resultMap.set(uniqueClusterName, { metadata: cluster.metadata, raw: cluster });
  });
  return resultMap;
}

function mapClusterVersions(rawClusterversions) {
  let clusterversions = {};
  rawClusterversions.forEach((cv) => {
    if (_.has(cv, 'status.results')) {
      const clusterversion = _.get(cv, 'status.results', {});
      clusterversions = { ...clusterversions, ...clusterversion };
    }
  });
  return clusterversions;
}

function findMatchedStatus(clusters, clusterstatuses, rawClusterversions) {
  const resultMap = mapClusters(clusters);
  const clusterversions = mapClusterVersions(rawClusterversions);
  clusterstatuses.forEach((clusterstatus) => {
    const uniqueClusterName = getUniqueClusterName(clusterstatus);
    if (resultMap.has(uniqueClusterName)) {
      const cluster = resultMap.get(uniqueClusterName);
      const data = {
        metadata: _.get(cluster, 'metadata'),
        nodes: _.get(clusterstatus, 'spec.capacity.nodes'),
        clusterip: _.get(clusterstatus, 'spec.masterAddresses[0].ip'),
        consoleURL: _.get(clusterstatus, 'spec.consoleURL'),
        rawStatus: clusterstatus,
        klusterletVersion: _.get(clusterstatus, 'spec.klusterletVersion', '-'),
        k8sVersion: _.get(clusterstatus, 'spec.version', '-'),
        serverAddress: _.get(cluster, 'raw.spec.kubernetesApiEndpoints.serverEndpoints[0].serverAddress'),
      };
      const clusterName = _.get(clusterstatus, 'metadata.name', 'noClusterName');
      if (_.has(clusterversions, clusterName)) {
        const clusterversion = _.get(clusterversions, clusterName);
        const availableUpdates = _.get(clusterversion, 'status.availableUpdates', []);
        data.availableVersions = availableUpdates ? availableUpdates.map(u => u.version) : [];
        data.desiredVersion = _.get(clusterversion, 'status.desired.version');
        const versionHistory = _.get(clusterversion, 'status.history', []);
        const completedVersion = versionHistory ? versionHistory.filter(h => h.state === 'Completed')[0] : null;
        data.distributionVersion = completedVersion ? completedVersion.version : null;
        const conditions = _.get(clusterversion, 'status.conditions', []);
        data.upgradeFailed = conditions ? conditions.filter(c => c.type === 'Failing')[0].status === 'True' : false;
      }
      resultMap.set(uniqueClusterName, data);
    }
  });
  return [...resultMap.values()];
}

function getClusterDeploymentSecrets(clusterDeployment) {
  return {
    adminKubeconfigSecret: _.get(clusterDeployment, 'spec.clusterMetadata.adminKubeconfigSecretRef.name', ''),
    adminPasswordSecret: _.get(clusterDeployment, 'spec.clusterMetadata.adminPasswordSecretRef.name', ''),
    installConfigSecret: _.get(clusterDeployment, 'spec.provisioning.installConfigSecretRef.name', ''),
  };
}

function findMatchedStatusForOverview(clusters, clusterstatuses) {
  const resultMap = new Map();
  const clusterstatusResultMap = mapClusters(clusterstatuses);
  clusters.forEach((cluster) => {
    const uniqueClusterName = getUniqueClusterName(cluster);
    const clusterstatus = clusterstatusResultMap.get(uniqueClusterName);
    const data = {
      metadata: cluster.metadata,
      status: getStatus(cluster),
      clusterip: _.get(clusterstatus, 'raw.spec.masterAddresses[0].ip'),
      consoleURL: _.get(clusterstatus, 'raw.spec.consoleURL'),
      capacity: _.get(clusterstatus, 'raw.spec.capacity'),
      usage: _.get(clusterstatus, 'raw.spec.usage'),
      rawCluster: cluster,
      rawStatus: _.get(clusterstatus, 'raw'),
      serverAddress: _.get(cluster, 'raw.spec.kubernetesApiEndpoints.serverEndpoints[0].serverAddress'),
    };
    resultMap.set(uniqueClusterName, data);
  });
  return [...resultMap.values()];
}

export default class ClusterModel extends KubeModel {
  async createCluster(args) {
    let { cluster: resources } = args;

    // get namespace and filter out any namespace resource
    let namespace;
    resources = resources.filter(({ kind, metadata = {} }) => {
      switch (kind) {
        case 'Namespace':
          namespace = metadata.name;
          return false;

        case 'ClusterDeployment':
          ({ namespace } = metadata);
          break;

        default:
          break;
      }
      return true;
    });

    // if there's a namespace, try to create it
    if (namespace) {
      const namespaceResponse = await this.kubeConnector.post('/api/v1/namespaces', { metadata: { name: namespace } });
      if (responseHasError(namespaceResponse)) {
        // if namespace already exists, only fail if there's no cluster in it
        if (namespaceResponse.code === 409) {
          const existingNamespaceClusters = await this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${namespace}/clusterdeployments`);
          if (existingNamespaceClusters.items.length > 0) {
            return {
              errors: [{ message: `Create Cluster failed: Namespace "${namespace}" already contains a Cluster resource` }],
            };
          }
        } else {
          // failed to create the namespace at all
          return {
            errors: [{ message: namespaceResponse.message }],
          };
        }
      }

      // get resource end point for each resource
      const k8sPaths = await this.kubeConnector.get('/');
      const requestPaths = await Promise.all(resources.map(async resource =>
        this.getResourceEndPoint(resource, k8sPaths)));
      if (requestPaths.length === 0 || requestPaths.includes(undefined)) {
        if (requestPaths.length > 0) {
          const resourceIndex = requestPaths.indexOf(undefined);
          return {
            errors: [{ message: `Cannot find resource type "${resources[resourceIndex].apiVersion}"` }],
          };
        }
        return {
          errors: [{ message: 'Cannot find resource path' }],
        };
      } else if (requestPaths.includes(null)) {
        const missingPaths = [];
        requestPaths.forEach((path, inx) => {
          if (path === null) {
            const { apiVersion, kind } = resources[inx];
            missingPaths.push(`version: ${apiVersion} kind:${kind}`);
          }
        });
        return {
          errors: [{ message: `Endpoint not found for these resources ${missingPaths.join(', ')}` }],
        };
      }

      const result = await Promise.all(resources.map((resource, index) =>
        this.kubeConnector.post(requestPaths[index], resource)
          .catch(err => ({
            status: 'Failure',
            message: err.message,
          }))));

      const errors = [];
      result.forEach((item) => {
        if (item.code >= 400 || item.status === 'Failure' || item.message) {
          errors.push({ message: item.message });
        }
      });
      return {
        errors,
        result,
      };
    }
    return {
      errors: [{ message: 'Namespace not found in the template' }],
    };
  }

  async getResourceEndPoint(resource, k8sPaths) {
    // dynamically get resource endpoint from kebernetes API
    // ie.https://ec2-54-84-124-218.compute-1.amazonaws.com:8443/kubernetes/
    if (k8sPaths) {
      const { apiVersion, kind } = resource;
      const apiPath = k8sPaths.paths.find(path => path.match(`/[0-9a-zA-z]*/?${apiVersion}`));
      if (apiPath) {
        return (async () => {
          const k8sResourceList = await this.kubeConnector.get(`${apiPath}`);
          const resourceType = k8sResourceList.resources.find(item => item.kind === kind);
          const namespace = _.get(resource, 'metadata.namespace');
          const { name, namespaced } = resourceType;
          if (namespaced && !namespace) {
            return null;
          }
          const requestPath = `${apiPath}/${namespaced ? `namespaces/${namespace}/` : ''}${name}`;
          return requestPath;
        })();
      }
    }
    return undefined;
  }


  async getSingleCluster(args = {}) {
    const { name, namespace } = args;
    const [clusters, clusterstatuses, clusterdeployments, ...clusterversions] = await Promise.all([
      this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${namespace}/clusters/${name}`),
      this.kubeConnector.get(`/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/clusterstatuses/${name}`),
      this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${namespace}/clusterdeployments/${name}`),
      this.kubeConnector.resourceViewQuery('clusterversions', name, 'version', null, 'config.openshift.io').catch(() => null),
    ]);
    const [result] = findMatchedStatus([clusters], [clusterstatuses], clusterversions);
    const clusterDeploymentSecrets = getClusterDeploymentSecrets(clusterdeployments);

    return [{ ...result, ...clusterDeploymentSecrets }];
  }

  async getClusters(args = {}) {
    const [clusters, clusterstatuses, clusterversions] =
      await getClusterResources(this.kubeConnector);
    const results = findMatchedStatus(clusters, clusterstatuses, clusterversions);
    if (args.name) {
      return results.filter(c => c.metadata.name === args.name)[0];
    }
    return results;
  }

  async getAllClusters(args = {}) {
    const [clusters, clusterstatuses] = await getClusterResources(this.kubeConnector);
    const results = findMatchedStatusForOverview(clusters, clusterstatuses);
    if (args.name) {
      return results.filter(c => c.metadata.name === args.name)[0];
    }
    return results;
  }

  static resolveUsage(kind, clusterstatus) {
    const defaultUsage = kind === 'cpu' ? '0m' : '0Mi';
    const defaultCapacity = kind === 'cpu' ? '1' : '1Mi';
    const usage = _.get(clusterstatus, `spec.usage.${kind}`, defaultUsage);
    const capacity = _.get(clusterstatus, `spec.capacity.${kind}`, defaultCapacity);
    if (kind === 'cpu') {
      return parseInt(getCPUPercentage(usage, capacity), 10);
    }

    return parseInt(getPercentage(usage, capacity), 10);
  }

  async getStatus(cluster) {
    const clusters = await this.kubeConnector.getResources(
      ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`,
      { namespaces: [cluster.metadata.namespace] },
    );

    const resultMap = mapClusters(clusters);
    const uniqueClusterName = getUniqueClusterName(cluster);
    const { raw } = resultMap.get(uniqueClusterName);

    return getStatus(raw);
  }

  async getClusterStatus() {
    const clusterstatuses = await this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`);

    return clusterstatuses.reduce((accum, cluster) => {
      if (!cluster) {
        return accum;
      }

      accum.push({
        metadata: cluster.metadata,
        nodes: _.get(cluster, 'spec.capacity.nodes'),
        pods: _.get(cluster, 'spec.usage.pods'),
        ip: cluster.spec.masterAddresses[0].ip,
        memoryUtilization: this.constructor.resolveUsage('memory', cluster),
        storageUtilization: this.constructor.resolveUsage('storage', cluster),
        cpuUtilization: this.constructor.resolveUsage('cpu', cluster),
      });

      return accum;
    }, []);
  }
}

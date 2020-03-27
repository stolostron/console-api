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

export const HIVE_DOMAIN = 'hive.openshift.io';
export const UNINSTALL_LABEL = `${HIVE_DOMAIN}/uninstall`;
export const INSTALL_LABEL = `${HIVE_DOMAIN}/install`;
export const CLUSTER_LABEL = `${HIVE_DOMAIN}/cluster-deployment-name`;
export const UNINSTALL_LABEL_SELECTOR = cluster => `labelSelector=${UNINSTALL_LABEL}%3Dtrue%2C${CLUSTER_LABEL}%3D${cluster}`;
export const INSTALL_LABEL_SELECTOR = cluster => `labelSelector=${INSTALL_LABEL}%3Dtrue%2C${CLUSTER_LABEL}%3D${cluster}`;


// The last char(s) in usage are units - need to be removed in order to get an int for calculation
function getPercentage(usage, capacity) {
  return (usage.substring(0, usage.length - 2) / capacity.substring(0, capacity.length - 2)) * 100;
}

function getCPUPercentage(usage, capacity) {
  return ((usage.substring(0, usage.length - 1) / 1000) / capacity) * 100;
}

function getStatus(cluster, clusterdeployment, uninstall, install) {
  let clusterdeploymentStatus = '';
  if (clusterdeployment && _.get(clusterdeployment, 'kind') === 'ClusterDeployment') {
    if (uninstall && uninstall.items && uninstall.items.some(i => i.status.active === 1)) {
      clusterdeploymentStatus = 'destroying';
    } else if (install && install.items && install.items.some(i => i.status.active === 1)) {
      clusterdeploymentStatus = 'creating';
    } else {
      const conditions = _.get(clusterdeployment, 'status.clusterVersionStatus.conditions');
      const conditionIndex = _.findIndex(conditions, c => c.type === 'Available');
      clusterdeploymentStatus = conditionIndex >= 0 && conditions[conditionIndex].status === 'True' ?
        'detached' : 'unknown';
    }
  }

  if (cluster && _.get(cluster, 'kind') === 'Cluster') {
    if (_.get(cluster, 'metadata.deletionTimestamp')) {
      return 'detaching';
    }
    // Empty status indicates cluster has not been imported
    // status with conditions[0].type === '' indicates cluster is offline
    const clusterStatus = _.get(cluster, 'status.conditions[0].type', 'pending');
    const status = clusterStatus === '' ? 'offline' : clusterStatus.toLowerCase();

    // If cluster is pending import because Hive is installing or uninstalling,
    // show that status instead
    if (status === 'pending' &&
      clusterdeploymentStatus &&
      clusterdeploymentStatus !== 'detached') {
      return clusterdeploymentStatus;
    }
    return status;
  }
  return clusterdeploymentStatus;
}

function responseHasError(response) {
  const code = response.statusCode || response.code;
  return (code < 200 || code >= 300);
}


async function getClusterResources(kube) {
  const [clusters, clusterdeployments] = await Promise.all([
    // Try cluster scope queries, falling back to per-namespace
    kube.get('/apis/clusterregistry.k8s.io/v1alpha1/clusters')
      .then(allClusters => (allClusters.items ?
        allClusters.items
        : kube.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`))),
    kube.get('/apis/hive.openshift.io/v1/clusterdeployments')
      .then(allClusterDeployments => (allClusterDeployments.items ?
        allClusterDeployments.items
        : kube.getResources(ns => `/apis/hive.openshift.io/v1/namespaces/${ns}/clusterdeployments`))),
  ]);

  // For clusterversions, query only clusters that are online
  const names = clusters.filter(cluster => getStatus(cluster) === 'ok').map(c => c.metadata.name);
  // For clusterstatuses, query only namespaces that have clusters
  const namespaces = Array.from(new Set(clusters.map(c => c.metadata.namespace)));
  const [clusterstatuses, ...clusterversions] = await Promise.all([
    kube.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`,
      { namespaces },
    ),
    ...names.map(n => kube.resourceViewQuery('clusterversions', n, 'version', null, 'config.openshift.io').catch(() => null)),
  ]);
  return [clusters, clusterstatuses, clusterdeployments, clusterversions];
}

function getUniqueResourceName(resource) {
  const name = _.get(resource, 'metadata.name', 'noClusterName');
  const namespace = _.get(resource, 'metadata.namespace', 'noClusterNamespace');
  return `${name}_${namespace}`;
}

function mapResources(resource, kind = 'Cluster') {
  const resultMap = new Map();
  resource.forEach((r) => {
    if (r.metadata && (!r.kind || r.kind === kind)) {
      const key = getUniqueResourceName(r);
      resultMap.set(key, { metadata: r.metadata, raw: r });
    }
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

function findMatchedStatus(clusters, clusterstatuses, clusterdeployments, rawClusterversions) {
  const resultMap = new Map();
  const clusterMap = mapResources(clusters);
  const clusterStatusMap = mapResources(clusterstatuses, 'ClusterStatus');
  const clusterDeploymentMap = mapResources(clusterdeployments, 'ClusterDeployment');
  const clusterVersionMap = mapClusterVersions(rawClusterversions);

  const uniqueClusterNames = new Set([...clusterMap.keys(), ...clusterDeploymentMap.keys()]);
  uniqueClusterNames.forEach((c) => {
    const cluster = clusterMap.get(c);
    const clusterstatus = clusterStatusMap.get(c);
    const clusterdeployment = clusterDeploymentMap.get(c);
    const metadata = _.has(cluster, 'metadata') ?
      _.get(cluster, 'metadata') :
      _.pick(_.get(clusterdeployment, 'metadata'), ['name', 'namespace']);
    const clusterversion = _.get(clusterVersionMap, metadata.name);
    const apiURL = _.get(clusterdeployment, 'raw.status.apiURL');
    const rawServerAddress = _.get(cluster, 'raw.spec.kubernetesApiEndpoints.serverEndpoints[0].serverAddress');
    const serverAddress = apiURL || (rawServerAddress ? `https://${rawServerAddress}` : null);
    const data = {
      metadata,
      nodes: _.get(clusterstatus, 'raw.spec.capacity.nodes'),
      clusterip: _.get(clusterstatus, 'raw.spec.masterAddresses[0].ip'),
      consoleURL: _.get(clusterstatus, 'raw.spec.consoleURL', _.get(clusterdeployment, 'raw.status.webConsoleURL')),
      rawStatus: _.get(clusterstatus, 'raw'),
      klusterletVersion: _.get(clusterstatus, 'raw.spec.klusterletVersion', '-'),
      k8sVersion: _.get(clusterstatus, 'raw.spec.version', '-'),
      serverAddress,
      isHive: !!clusterdeployment,
      isManaged: !!cluster,
    };
    if (clusterversion) {
      const availableUpdates = _.get(clusterversion, 'status.availableUpdates', []);
      data.availableVersions = availableUpdates ? availableUpdates.map(u => u.version) : [];
      data.desiredVersion = _.get(clusterversion, 'status.desired.version');
      const versionHistory = _.get(clusterversion, 'status.history', []);
      const completedVersion = versionHistory ? versionHistory.filter(h => h.state === 'Completed')[0] : null;
      data.distributionVersion = completedVersion ? completedVersion.version : null;
      const conditions = _.get(clusterversion, 'status.conditions', []);
      data.upgradeFailed = conditions ? conditions.filter(cond => cond.type === 'Failing')[0].status === 'True' : false;
    }
    resultMap.set(c, data);
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
  const clusterstatusResultMap = mapResources(clusterstatuses, 'ClusterStatus');
  clusters.forEach((cluster) => {
    const uniqueClusterName = getUniqueResourceName(cluster);
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
    const created = [];
    const updated = [];
    const errors = [];

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
    if (!namespace) {
      errors.push({ message: 'ClusterDeployment must specify a namespace' });
      return { errors };
    }
    const namespaceResponse = await this.kubeConnector.post('/api/v1/namespaces', { metadata: { name: namespace } });
    if (responseHasError(namespaceResponse)) {
      // if namespace already exists, only fail if there's no cluster in it
      if (namespaceResponse.code === 409) {
        const existingNamespaceClusters = await this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${namespace}/clusterdeployments`);
        if (existingNamespaceClusters.items.length > 0) {
          errors.push({ message: `Create Cluster failed: Namespace "${namespace}" already contains a Cluster resource` });
          return { errors };
        }
      } else {
        // failed to create the namespace at all
        errors.push({ message: namespaceResponse.message });
        return { errors };
      }
    }

    // get resource end point for each resource
    const k8sPaths = await this.kubeConnector.get('/');
    const requestPaths = await Promise.all(resources.map(async resource =>
      this.getResourceEndPoint(resource, k8sPaths)));
    if (requestPaths.length > 0) {
      const missingTypes = [];
      const missingEndPoints = [];
      requestPaths.forEach((path, index) => {
        if (path === undefined) {
          missingTypes.push(`${resources[index].apiVersion}`);
        } else if (path === null) {
          missingEndPoints.push(`${resources[index].kind}`);
        }
      });
      if (missingTypes.length > 0) {
        errors.push({ message: `Cannot find resource types: ${missingTypes.join(', ')}` });
      }
      if (missingEndPoints.length > 0) {
        errors.push({ message: `Cannot find endpoints: ${missingEndPoints.join(', ')}` });
      }
      if (errors.length > 0) {
        return { errors };
      }
    } else {
      errors.push({ message: 'Could find any endpoints' });
      return { errors };
    }

    // try to create all resouces EXCEPT ClusterDeployment
    // we don't want to create ClusterDeployment until all the other resources successfully created
    // because we check if the ClusterDeployment exists in this namespace
    let clusterResource;
    let clusterRequestPath;
    resources = resources.filter((resource, index) => {
      if (resource.kind === 'ClusterDeployment') {
        clusterResource = resource;
        ([clusterRequestPath] = requestPaths.splice(index, 1));
        return false;
      }
      return true;
    });

    // try to create resources
    const result = await Promise.all(resources.map((resource, index) =>
      this.kubeConnector.post(requestPaths[index], resource)
        .catch(err => ({
          status: 'Failure',
          message: err.message,
        }))));
    const updates = [];
    result.filter((item, index) => {
      if (!responseHasError(item)) {
        const { kind, metadata = {} } = item;
        created.push({ name: metadata.name, kind });
        return false;
      } else if (item.code === 409) {
        // filter out "already existing" errors
        updates.push({
          requestPath: requestPaths[index],
          resource: resources[index],
        });
        return false;
      }
      return true;
    }).forEach((item) => {
      if (item.code >= 400 || item.status === 'Failure' || item.message) {
        errors.push({ message: item.message });
      }
    });

    // if the only errors were "already existing", patch those resources
    if (errors.length === 0 && updates.length > 0) {
      // get the selfLinks of the existing resources
      const existing = await Promise.all(updates.map(({ requestPath, resource }) => {
        const name = _.get(resource, 'metadata.name');
        return this.kubeConnector.get(`${requestPath}/${name}`);
      }));

      // then update the resources
      const replaced = await Promise.all(updates.map(({ resource }, index) => {
        const selfLink = _.get(existing, `[${index}].metadata.selfLink`);
        const resourceVersion = _.get(existing, `[${index}].metadata.resourceVersion`);
        _.set(resource, 'metadata.resourceVersion', resourceVersion);
        const requestBody = {
          body: resource,
        };
        return this.kubeConnector.put(`${selfLink}`, requestBody);
      }));

      // report any errors
      replaced.forEach((item) => {
        if (!responseHasError(item)) {
          const { kind, metadata = {} } = item;
          updated.push({ name: metadata.name, kind });
        } else if (item.code >= 400 || item.status === 'Failure' || item.message) {
          errors.push({ message: item.message });
        }
      });
    }

    // last but not least, if everything else deployed, deploy ClusterDeployment
    // if that fails--user can press create again and not get a "Already Exists" message
    if (errors.length === 0) {
      const deployment = await this.kubeConnector.post(clusterRequestPath, clusterResource)
        .catch(err => ({
          status: 'Failure',
          message: err.message,
        }));
      if (deployment.code >= 400 || deployment.status === 'Failure' || deployment.message) {
        errors.push({ message: deployment.message });
      }
    }

    return {
      errors,
      updated,
      created,
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
    const [result] =
      findMatchedStatus([clusters], [clusterstatuses], [clusterdeployments], clusterversions);
    const clusterDeploymentSecrets = getClusterDeploymentSecrets(clusterdeployments);

    return [{ ...result, ...clusterDeploymentSecrets }];
  }

  async getClusters(args = {}) {
    const [clusters, clusterstatuses, clusterdeployments, clusterversions] =
      await getClusterResources(this.kubeConnector);
    const results =
      findMatchedStatus(clusters, clusterstatuses, clusterdeployments, clusterversions);
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

  async getStatus(resource) {
    const { metadata: { name, namespace } } = resource;
    const [cluster, clusterdeployment] = await Promise.all([
      this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${namespace}/clusters/${name}`),
      this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${namespace}/clusterdeployments/${name}`),
    ]);

    let uninstall;
    let install;
    if (clusterdeployment && _.get(clusterdeployment, 'kind') === 'ClusterDeployment') {
      const [destroys, creates] = await Promise.all([
        this.kubeConnector.get(`/apis/batch/v1/namespaces/${namespace}/jobs?${UNINSTALL_LABEL_SELECTOR(name)}`),
        this.kubeConnector.get(`/apis/batch/v1/namespaces/${namespace}/jobs?${INSTALL_LABEL_SELECTOR(name)}`),
      ]);
      uninstall = destroys;
      install = creates;
    }

    return getStatus(cluster, clusterdeployment, uninstall, install);
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

  async detachCluster(args) {
    const { namespace, cluster, destroy = false } = args;
    const clusterRegistry = `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${namespace}/clusters/${cluster}`;
    const clusterDeployment = `/apis/hive.openshift.io/v1/namespaces/${namespace}/clusterdeployments/${cluster}`;

    if (clusterRegistry) {
      const detachResponse = await this.kubeConnector.delete(clusterRegistry);
      if (!destroy && detachResponse.kind === 'Status') {
        return detachResponse.code;
      }
    }

    if (destroy) {
      const destroyResponse = await this.kubeConnector.delete(clusterDeployment);
      if (destroyResponse.kind === 'Status') {
        return destroyResponse.code;
      }
    }

    return 204;
  }
}

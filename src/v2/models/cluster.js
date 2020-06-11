/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import _ from 'lodash';
import logger from '../lib/logger';
import { responseHasError } from '../lib/utils';
import KubeModel from './kube';

export const HIVE_DOMAIN = 'hive.openshift.io';
export const UNINSTALL_LABEL = `${HIVE_DOMAIN}/uninstall`;
export const INSTALL_LABEL = `${HIVE_DOMAIN}/install`;
export const CLUSTER_LABEL = `${HIVE_DOMAIN}/cluster-deployment-name`;
export const UNINSTALL_LABEL_SELECTOR = (cluster) => `labelSelector=${UNINSTALL_LABEL}%3Dtrue%2C${CLUSTER_LABEL}%3D${cluster}`;
export const INSTALL_LABEL_SELECTOR = (cluster) => `labelSelector=${INSTALL_LABEL}%3Dtrue%2C${CLUSTER_LABEL}%3D${cluster}`;

export const CLUSTER_DOMAIN = 'cluster.open-cluster-management.io';
export const CLUSTER_NAMESPACE_LABEL = `${CLUSTER_DOMAIN}/managedcluster`;

// The last char(s) in usage are units - need to be removed in order to get an int for calculation
function getPercentage(usage, capacity) {
  return (usage.substring(0, usage.length - 2) / capacity.substring(0, capacity.length - 2)) * 100;
}

function getCPUPercentage(usage, capacity) {
  return ((usage.substring(0, usage.length - 1) / 1000) / capacity) * 100;
}

function getStatus(cluster, clusterdeployment, uninstall, install) {
  let clusterdeploymentStatus = '';
  if (clusterdeployment) {
    const conditions = _.get(clusterdeployment, 'status.clusterVersionStatus.conditions');
    const conditionIndex = _.findIndex(conditions, (c) => c.type === 'Available');
    if (uninstall && uninstall.items && uninstall.items.some((i) => i.status.active === 1)) {
      clusterdeploymentStatus = 'destroying';
    } else if (install && install.items && install.items.some((i) => i.status.active === 1)) {
      clusterdeploymentStatus = 'creating';
    } else if (conditionIndex >= 0 && conditions[conditionIndex].status === 'True') {
      clusterdeploymentStatus = 'detached';
    } else if ((install && install.items) || (uninstall && uninstall.items)) {
      clusterdeploymentStatus = 'provisionfailed';
    } else {
      clusterdeploymentStatus = 'unknown';
    }
  }

  if (cluster) {
    if (_.get(cluster, 'metadata.deletionTimestamp')) {
      return 'detaching';
    }
    // Empty status indicates cluster has not been imported
    // status with conditions[0].type === '' indicates cluster is offline
    const clusterStatus = _.get(cluster, 'status.conditions[0].type', 'pending');
    const status = clusterStatus === '' ? 'offline' : clusterStatus.toLowerCase();

    // If cluster is pending import because Hive is installing or uninstalling,
    // show that status instead
    if (status === 'pending'
      && clusterdeploymentStatus
      && clusterdeploymentStatus !== 'detached') {
      return clusterdeploymentStatus;
    }
    return status;
  }
  return clusterdeploymentStatus;
}

function getUniqueResourceName(resource) {
  const name = _.get(resource, 'metadata.name', 'noClusterName');
  const namespace = _.get(resource, 'metadata.namespace', name);
  return `${name}_${namespace}`;
}

function mapResources(resource, kind = 'Cluster') {
  const resultMap = new Map();
  if (resource) {
    resource.forEach((r) => {
      if (r.metadata && (!r.kind || r.kind === kind)) {
        const key = getUniqueResourceName(r);
        resultMap.set(key, { metadata: r.metadata, raw: r });
      }
    });
  }
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

function findMatchedStatus({
  clusters, clusterstatuses, clusterversions,
  managedclusters, managedclusterinfos, clusterdeployments,
}) {
  const resultMap = new Map();
  const clusterMap = mapResources(clusters);
  const managedClusterMap = mapResources(managedclusters, 'ManagedCluster');
  const clusterStatusMap = mapResources(clusterstatuses, 'ClusterStatus');
  const clusterDeploymentMap = mapResources(clusterdeployments, 'ClusterDeployment');
  const managedClusterInfoMap = mapResources(managedclusterinfos, 'ManagedClusterInfo');
  const clusterVersionMap = mapClusterVersions(clusterversions);

  const uniqueClusterNames = new Set([
    ...clusterMap.keys(),
    ...managedClusterMap.keys(),
    ...clusterDeploymentMap.keys(),
  ]);
  uniqueClusterNames.forEach((c) => {
    const cluster = clusterMap.get(c);
    const managedcluster = managedClusterMap.get(c);
    const clusterstatus = clusterStatusMap.get(c);
    const clusterdeployment = clusterDeploymentMap.get(c);
    const managedclusterinfo = managedClusterInfoMap.get(c);
    const metadata = _.get(managedcluster || cluster, 'metadata')
      || _.pick(_.get(managedclusterinfo || clusterdeployment, 'metadata'), ['name', 'namespace']);
    if (!metadata.namespace) {
      metadata.namespace = _.get(managedclusterinfo || clusterdeployment, 'metadata.namespace');
    }
    const clusterversion = _.get(clusterVersionMap, metadata.name);
    const apiURL = _.get(clusterdeployment, 'raw.status.apiURL');
    const masterEndpoint = _.get(managedclusterinfo, 'raw.spec.masterEndpoint');
    const rawServerAddress = _.get(cluster, 'raw.spec.kubernetesApiEndpoints.serverEndpoints[0].serverAddress');
    const serverAddress = apiURL || (masterEndpoint || rawServerAddress ? `https://${masterEndpoint || rawServerAddress}` : null);
    const data = {
      metadata,
      nodes: _.get(clusterstatus, 'raw.spec.capacity.nodes'),
      clusterip: _.get(clusterstatus, 'raw.spec.masterAddresses[0].ip'),
      consoleURL: _.get(
        managedclusterinfo,
        'raw.status.consoleURL',
        _.get(
          clusterstatus,
          'raw.spec.consoleURL',
          _.get(
            clusterdeployment,
            'raw.status.webConsoleURL',
          ),
        ),
      ),
      rawStatus: _.get(clusterstatus, 'raw'),
      klusterletVersion: _.get(clusterstatus, 'raw.spec.klusterletVersion', '-'),
      k8sVersion: _.get(clusterstatus, 'raw.spec.version', '-'),
      serverAddress,
      isHive: !!clusterdeployment,
      isManaged: !!(managedcluster || cluster),
    };
    if (clusterversion) {
      const availableUpdates = _.get(clusterversion, 'status.availableUpdates', []);
      data.availableVersions = availableUpdates ? availableUpdates.map((u) => u.version) : [];
      data.desiredVersion = _.get(clusterversion, 'status.desired.version');
      const versionHistory = _.get(clusterversion, 'status.history', []);
      const completedVersion = versionHistory ? versionHistory.filter((h) => h.state === 'Completed')[0] : null;
      data.distributionVersion = completedVersion ? completedVersion.version : null;
      const conditions = _.get(clusterversion, 'status.conditions', []);
      data.upgradeFailed = conditions ? conditions.filter((cond) => cond.type === 'Failing')[0].status === 'True' : false;
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

function findMatchedStatusForOverview({
  clusters, managedclusters, clusterstatuses, managedclusterinfos,
}) {
  const resultMap = new Map();
  const clusterMap = mapResources(clusters);
  const managedClusterMap = mapResources(managedclusters, 'ManagedCluster');
  const clusterStatusMap = mapResources(clusterstatuses, 'ClusterStatus');
  const managedClusterInfoMap = mapResources(managedclusterinfos, 'ManagedClusterInfo');

  const uniqueClusterNames = new Set([
    ...clusterMap.keys(),
    ...managedClusterMap.keys(),
  ]);
  uniqueClusterNames.forEach((c) => {
    const cluster = clusterMap.get(c);
    const managedcluster = managedClusterMap.get(c);
    const clusterstatus = clusterStatusMap.get(c);
    const managedclusterinfo = managedClusterInfoMap.get(c);
    const data = {
      metadata: _.get(managedcluster, 'metadata', _.get(cluster, 'metadata')),
      status: getStatus(_.get(managedcluster || cluster, 'raw')),
      clusterip: _.get(clusterstatus, 'raw.spec.masterAddresses[0].ip'),
      consoleURL: _.get(managedclusterinfo, 'raw.status.consoleURL', _.get(clusterstatus, 'raw.spec.consoleURL')),
      capacity: _.get(clusterstatus, 'raw.spec.capacity'),
      usage: _.get(clusterstatus, 'raw.spec.usage'),
      rawCluster: _.get(managedcluster, 'raw', _.get(cluster, 'raw')),
      rawStatus: _.get(clusterstatus, 'raw'),
      serverAddress: _.get(cluster, 'raw.spec.kubernetesApiEndpoints.serverEndpoints[0].serverAddress'),
    };
    resultMap.set(c, data);
  });
  return [...resultMap.values()];
}

function getErrorMsg(response) {
  let errorMsg = '';
  const errorMsgKeys = ['code', 'message', 'description', 'statusCode', 'statusMessage'];
  errorMsgKeys.forEach((key, i) => {
    if (response[key]) {
      (errorMsg += `${response[key]} ${(i !== errorMsgKeys.length - 1) && '- '}`);
    }
  });
  return errorMsg;
}

function responseForError(errorTitle, response) {
  const code = response.statusCode || response.code;
  logger.error(`CLUSTER IMPORT ERROR: ${errorTitle} - ${getErrorMsg(response)}`);
  return {
    error: {
      rawResponse: response,
      statusCode: code,
      statusMsg: response.message || response.description || response.statusMessage,
    },
  };
}

export default class ClusterModel extends KubeModel {
  constructor(args) {
    super(args);
    const { clusterNamespaces } = args;
    this.clusterNamespaces = clusterNamespaces;
  }

  async createClusterNamespace(clusterNamespace, checkForDeployment = false) {
    let projectResponse = await this.kubeConnector.post('/apis/project.openshift.io/v1/projectrequests', { metadata: { name: clusterNamespace } });

    if (responseHasError(projectResponse)) {
      if (projectResponse.code === 409) {
        const existingNamespaceClusters = await this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${clusterNamespace}/clusters`);
        if (existingNamespaceClusters.items.length > 0) {
          throw new Error(`Create Cluster Namespace failed: Namespace "${clusterNamespace}" already contains a Cluster resource`);
        }
        if (checkForDeployment) {
          const existingNamespaceClusterDeployments = await this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${clusterNamespace}/clusterdeployments`);
          if (existingNamespaceClusterDeployments.items.length > 0) {
            throw new Error(`Create Cluster Namespace failed: Namespace "${clusterNamespace}" already contains a ClusterDeployment resource`);
          }
        }
      } else {
        return projectResponse;
      }
    }

    // Mark namespace as a cluster namespace
    // First try adding a label
    let labelNamespaceResponse = await this.kubeConnector.patch(
      `/api/v1/namespaces/${clusterNamespace}`,
      {
        body: [
          {
            op: 'add',
            path: `/metadata/labels/${CLUSTER_NAMESPACE_LABEL.replace('/', '~1')}`,
            value: '',
          },
        ],
      },
    );
    if (responseHasError(labelNamespaceResponse)) {
      // Otherwise, try labels object
      labelNamespaceResponse = await this.kubeConnector.patch(
        `/api/v1/namespaces/${clusterNamespace}`,
        {
          body: [
            {
              op: 'add',
              path: '/metadata/labels',
              value:
              {
                [CLUSTER_NAMESPACE_LABEL]: '',
              },
            },
          ],
        },
      );
    }

    // If we created this namespace but could not label it, we have a problem
    if (projectResponse.code !== 409 && responseHasError(labelNamespaceResponse)) {
      return labelNamespaceResponse;
    }

    // Get updated project and update namespace cache as long as we were able to label it
    if (!responseHasError(labelNamespaceResponse)) {
      projectResponse = this.kubeConnector.get(`/apis/project.openshift.io/v1/projects/${clusterNamespace}`);
      this.updateUserNamespaces(labelNamespaceResponse);
    }

    return projectResponse;
  }

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

    let namespaceResponse;
    try {
      namespaceResponse = this.createClusterNamespace(namespace, true);
    } catch (error) {
      errors.push({ message: error.message });
      return { errors };
    }
    if (responseHasError(namespaceResponse)) {
      // failed to create the namespace at all
      errors.push({ message: namespaceResponse.message });
      return { errors };
    }

    // get resource end point for each resource
    const k8sPaths = await this.kubeConnector.get('/');
    const requestPaths = await Promise.all(resources.map(async (resource) => this.getResourceEndPoint(resource, k8sPaths)));
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
      errors.push({ message: 'Cannot find any endpoints' });
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
    const result = await Promise.all(resources.map((resource, index) => this.kubeConnector.post(requestPaths[index], resource)
      .catch((err) => ({
        status: 'Failure',
        message: err.message,
      }))));
    const updates = [];
    result.filter((item, index) => {
      if (!responseHasError(item)) {
        const { kind, metadata = {} } = item;
        created.push({ name: metadata.name, kind });
        return false;
      } if (item.code === 409) {
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
        .catch((err) => ({
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
      const apiPath = k8sPaths.paths.find((path) => path.match(`/[0-9a-zA-z]*/?${apiVersion}`));
      if (apiPath) {
        return (async () => {
          const k8sResourceList = await this.kubeConnector.get(`${apiPath}`);
          const resourceType = k8sResourceList.resources.find((item) => item.kind === kind);
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

  async getClusterResources() {
    // Try cluster scope queries, falling back to per-cluster-namespace
    const rbacFallbackQuery = (clusterQuery, namespaceQueryFunction) => (
      this.kubeConnector.get(clusterQuery).then((allItems) => (allItems.items
        ? allItems.items
        : this.kubeConnector.getResources(
          namespaceQueryFunction,
          { namespaces: this.clusterNamespaces },
        )))
    );

    const [clusters, managedclusters, clusterdeployments, managedclusterinfos] = await Promise.all([
      rbacFallbackQuery(
        '/apis/clusterregistry.k8s.io/v1alpha1/clusters',
        (ns) => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`,
      ),
      rbacFallbackQuery(
        '/apis/cluster.open-cluster-management.io/v1/managedclusters',
        (ns) => `/apis/cluster.open-cluster-management.io/v1/managedclusters/${ns}`,
      ),
      rbacFallbackQuery(
        '/apis/hive.openshift.io/v1/clusterdeployments',
        (ns) => `/apis/hive.openshift.io/v1/namespaces/${ns}/clusterdeployments`,
      ),
      rbacFallbackQuery(
        '/apis/internal.open-cluster-management.io/v1beta1/managedclusterinfos',
        (ns) => `/apis/internal.open-cluster-management.io/v1beta1/namespaces/${ns}/managedclusterinfos`,
      ),
    ]);

    // For clusterversions, query only clusters that are online
    const allClusters = [...clusters, ...managedclusters];
    const names = allClusters.filter((cluster) => getStatus(cluster) === 'ok').map((c) => c.metadata.name);
    // For clusterstatuses, query only namespaces that have clusters
    const namespaces = Array.from(new Set(allClusters.map((c) => c.metadata.namespace)));
    const [clusterstatuses, ...clusterversions] = await Promise.all([
      this.kubeConnector.getResources(
        (ns) => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`,
        { namespaces },
      ),
      ...names.map((n) => this.kubeConnector.resourceViewQuery('clusterversions', n, 'version', null, 'config.openshift.io').catch(() => null)),
    ]);
    return {
      clusters,
      managedclusters,
      clusterstatuses,
      clusterdeployments,
      managedclusterinfos,
      clusterversions,
    };
  }

  async getSingleCluster(args = {}) {
    const { name, namespace } = args;
    const [
      cluster,
      managedcluster,
      clusterstatus,
      clusterdeployment,
      managedclusterinfo,
      ...clusterversions
    ] = await Promise.all([
      this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${namespace}/clusters/${name}`),
      this.kubeConnector.get(`/apis/cluster.open-cluster-management.io/v1/managedclusters/${name}`),
      this.kubeConnector.get(`/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/clusterstatuses/${name}`),
      this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${namespace}/clusterdeployments/${name}`),
      this.kubeConnector.get(`/apis/internal.open-cluster-management.io/v1beta1/namespaces/${namespace}/managedclusterinfos/${name}`),
      this.kubeConnector.resourceViewQuery('clusterversions', name, 'version', null, 'config.openshift.io').catch(() => null),
    ]);
    const [result] = findMatchedStatus({
      clusters: [cluster],
      managedclusters: [managedcluster],
      clusterstatuses: [clusterstatus],
      clusterdeployments: [clusterdeployment],
      managedclusterinfos: [managedclusterinfo],
      clusterversions,
    });
    const clusterDeploymentSecrets = getClusterDeploymentSecrets(clusterdeployment);

    return [{ ...result, ...clusterDeploymentSecrets }];
  }

  async getClusters(args = {}) {
    const resources = await this.getClusterResources();
    const results = findMatchedStatus(resources);
    if (args.name) {
      return results.filter((c) => c.metadata.name === args.name)[0];
    }
    return results;
  }

  async getAllClusters(args = {}) {
    const resources = await this.getClusterResources();
    const results = findMatchedStatusForOverview(resources);
    if (args.name) {
      return results.filter((c) => c.metadata.name === args.name)[0];
    }
    return results;
  }

  static resolveUsage(kind, clusterstatus) {
    const defaultUsage = kind === 'cpu' ? '0m' : '0Mi';
    const defaultCapacity = kind === 'cpu' ? '1' : '1Mi';
    const usage = _.get(clusterstatus, `spec.usage.${kind}`, defaultUsage);
    const capacity = _.get(clusterstatus, `spec.capacity.${kind}`, defaultCapacity);

    if (capacity === '0' || capacity === 0) {
      return '0';
    }

    if (kind === 'cpu') {
      return parseInt(getCPUPercentage(usage, capacity), 10);
    }

    return parseInt(getPercentage(usage, capacity), 10);
  }

  async getStatus(resource) {
    const { metadata: { name, namespace } } = resource;
    const nullIfNotFound = (query, kind) => (
      query.then((response) => (_.get(response, 'kind') === kind ? response : null))
    );
    const [managedcluster, cluster, clusterdeployment] = await Promise.all([
      nullIfNotFound(
        this.kubeConnector.get(`/apis/cluster.open-cluster-management.io/v1/managedclusters/${name}`),
        'ManagedCluster',
      ),
      nullIfNotFound(
        this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${namespace}/clusters/${name}`),
        'Cluster',
      ),
      nullIfNotFound(
        this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${namespace || name}/clusterdeployments/${name}`),
        'ClusterDeployment',
      ),
    ]);

    let uninstall;
    let install;
    if (clusterdeployment) {
      const [destroys, creates] = await Promise.all([
        this.kubeConnector.get(`/apis/batch/v1/namespaces/${namespace}/jobs?${UNINSTALL_LABEL_SELECTOR(name)}`),
        this.kubeConnector.get(`/apis/batch/v1/namespaces/${namespace}/jobs?${INSTALL_LABEL_SELECTOR(name)}`),
      ]);
      uninstall = destroys;
      install = creates;
    }

    return getStatus(managedcluster || cluster, clusterdeployment, uninstall, install);
  }

  async getClusterStatus() {
    const clusterstatuses = await this.kubeConnector.getResources((ns) => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`);

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
    const managedCluster = `/apis/cluster.open-cluster-management.io/v1/managedclusters/${cluster}`;
    const clusterDeployment = `/apis/hive.openshift.io/v1/namespaces/${namespace}/clusterdeployments/${cluster}`;
    const machinePools = `/apis/hive.openshift.io/v1/namespaces/${namespace}/machinepools`;

    const detachClusterResponse = await this.kubeConnector.delete(clusterRegistry);
    const detachManagedClusterResponse = await this.kubeConnector.delete(managedCluster);

    if (!destroy && detachClusterResponse.kind === 'Status' && detachManagedClusterResponse.status !== 'Success') {
      return detachClusterResponse.code;
    }

    if (destroy) {
      // Find MachinePools to delete
      const machinePoolsResponse = await this.kubeConnector.get(machinePools);
      if (machinePoolsResponse.kind === 'Status') {
        return machinePoolsResponse.code;
      }
      const machinePoolsToDelete = (machinePoolsResponse.items
        && machinePoolsResponse.items
          .filter((item) => _.get(item, 'spec.clusterDeploymentRef.name') === cluster)
          .map((item) => _.get(item, 'metadata.selfLink'))) || [];

      // Create full list of resources to delete
      const resourcesToDelete = [
        clusterDeployment,
        ...machinePoolsToDelete,
      ];
      const destroyResponses = await Promise.all(resourcesToDelete.map((link) => this.kubeConnector.delete(link)));
      // MachinePool deletion returns a Status with status==='Success'
      const failedResponse = destroyResponses.find((dr) => dr.kind === 'Status' && dr.status !== 'Success');
      if (failedResponse) {
        return failedResponse.code;
      }
    }

    return 204;
  }

  async getClusterImageSets() {
    const clusterImageSets = {};
    // global--no namespace
    const response = await this.kubeConnector.get('/apis/hive.openshift.io/v1/clusterimagesets');
    response.items.forEach((imageSet) => {
      const name = _.get(imageSet, 'metadata.name');
      const releaseImage = _.get(imageSet, 'spec.releaseImage');
      if (name && releaseImage) {
        clusterImageSets[releaseImage] = name;
      }
    });
    return Object.entries(clusterImageSets).map(([releaseImage, name]) => ({ releaseImage, name }));
  }

  async createClusterResource(args) {
    const { cluster } = args;
    if (!cluster || !Array.isArray(cluster)) {
      throw new Error('cluster argument is required for createClusterResource');
    }

    const [clusterTemplate, klusterletTemplate] = cluster;
    if (!klusterletTemplate) {
      throw new Error('KlusterletConfig is required for createClusterResource');
    }

    const config = klusterletTemplate.spec;
    const { clusterName, clusterNamespace } = config;

    const clusterNamespaceResponse = this.createClusterNamespace(clusterNamespace);
    if (responseHasError(clusterNamespaceResponse)) {
      return clusterNamespaceResponse;
    }

    if (config.privateRegistryEnabled) {
      const { imageRegistry, registryUsername, registryPassword } = config;
      const auth = Buffer.from(`${registryUsername}:${registryPassword}`).toString('base64');
      const dockerConfigJson = Buffer.from(JSON.stringify({ auths: { [`${imageRegistry}`]: { auth } } })).toString('base64');
      const secret = { metadata: { name: clusterName }, data: { '.dockerconfigjson': dockerConfigJson }, type: 'kubernetes.io/dockerconfigjson' };

      const registrySecretResponse = await this.kubeConnector.post(`/api/v1/namespaces/${clusterNamespace}/secrets`, secret);
      // skip error for existing secret
      if (responseHasError(registrySecretResponse) && registrySecretResponse.code !== 409) {
        return responseForError('Create private docker registry secret failed', registrySecretResponse);
      }
    }

    klusterletTemplate.imagePullSecret = config.privateRegistryEnabled ? clusterName : undefined;
    const klusterletConfigResponse = await this.kubeConnector.post(
      `/apis/agent.open-cluster-management.io/v1beta1/namespaces/${clusterNamespace}/klusterletconfigs`,
      klusterletTemplate,
    );

    if (responseHasError(klusterletConfigResponse)) {
      return responseForError('Create KlusterletConfig resource failed', klusterletConfigResponse);
    }

    const clusterResponse = await this.kubeConnector.post('/apis/cluster.open-cluster-management.io/v1/managedclusters', clusterTemplate);
    if (responseHasError(clusterResponse)) {
      if (clusterResponse.code === 409) {
        return clusterResponse;
      }

      // Delete the klusterletconfig so the user can try again
      await this.kubeConnector.delete(`/apis/agent.open-cluster-management.io/v1beta1/namespaces/${clusterNamespace}/klusterletconfigs/${clusterName}`);
      return responseForError('Create Cluster resource failed', clusterResponse);
    }

    // fetch and return the generated secret
    return this.pollImportYamlSecret(clusterNamespace, clusterName);
  }

  async pollImportYamlSecret(clusterNamespace, clusterName) {
    let count = 0;
    let importYamlSecret;

    const poll = async (resolve, reject) => {
      const secretUrl = `/api/v1/namespaces/${clusterNamespace}/secrets/${clusterName}-import`;
      importYamlSecret = await this.kubeConnector.get(secretUrl, {}, true);

      if (importYamlSecret.code === 404 && count < 5) {
        count += 1;
        setTimeout(poll, 2000, resolve, reject);
      } else {
        resolve(importYamlSecret);
      }
    };

    return new Promise(poll);
  }
}

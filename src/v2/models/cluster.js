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
import { getLatestResource, responseHasError } from '../lib/utils';
import KubeModel from './kube';

export const HIVE_DOMAIN = 'hive.openshift.io';
export const UNINSTALL_LABEL = `${HIVE_DOMAIN}/uninstall`;
export const INSTALL_LABEL = `${HIVE_DOMAIN}/install`;
export const CLUSTER_LABEL = `${HIVE_DOMAIN}/cluster-deployment-name`;
export const UNINSTALL_LABEL_SELECTOR = (cluster) => `labelSelector=${UNINSTALL_LABEL}%3Dtrue%2C${CLUSTER_LABEL}%3D${cluster}`;
export const INSTALL_LABEL_SELECTOR = (cluster) => `labelSelector=${INSTALL_LABEL}%3Dtrue%2C${CLUSTER_LABEL}%3D${cluster}`;
export const UNINSTALL_LABEL_SELECTOR_ALL = `labelSelector=${UNINSTALL_LABEL}%3Dtrue`;
export const INSTALL_LABEL_SELECTOR_ALL = `labelSelector=${INSTALL_LABEL}%3Dtrue`;

export const CLUSTER_DOMAIN = 'cluster.open-cluster-management.io';
export const CLUSTER_NAMESPACE_LABEL = `${CLUSTER_DOMAIN}/managedCluster`;

export const CSR_LABEL = 'open-cluster-management.io/cluster-name';
export const CSR_LABEL_SELECTOR = (cluster) => `labelSelector=${CSR_LABEL}%3D${cluster}`;
export const CSR_LABEL_SELECTOR_ALL = `labelSelector=${CSR_LABEL}`;

// The last char(s) in usage are units - need to be removed in order to get an int for calculation
function getPercentage(usage, capacity) {
  return (usage.substring(0, usage.length - 2) / capacity.substring(0, capacity.length - 2)) * 100;
}

function getCPUPercentage(usage, capacity) {
  return ((usage.substring(0, usage.length - 1) / 1000) / capacity) * 100;
}

function getClusterDeploymentStatus(clusterDeployment, uninstall, install) {
  const conditions = _.get(clusterDeployment, 'status.clusterVersionStatus.conditions');
  const conditionIndex = _.findIndex(conditions, (c) => c.type === 'Available');
  let status = 'pending';
  if ((install && install.every((i) => i.status.failed > 0))
  || (uninstall && uninstall.every((i) => i.status.failed > 0))) {
    status = 'provisionfailed';
  } else if (uninstall && uninstall.some((i) => i.status.active > 0)) {
    status = 'destroying';
  } else if (conditionIndex >= 0 && conditions[conditionIndex].status === 'True') {
    status = 'detached';
  } else if (install) {
    status = 'creating';
  }
  return status;
}

function getStatus(cluster, csrs, clusterDeployment, uninstall, install) {
  const clusterDeploymentStatus = clusterDeployment
    ? getClusterDeploymentStatus(clusterDeployment, uninstall, install)
    : '';

  if (cluster) {
    if (_.get(cluster, 'metadata.deletionTimestamp')) {
      return 'detaching';
    }

    let status;
    const clusterConditions = _.get(cluster, 'status.conditions') || [];
    const checkForCondition = (condition) => _.get(
      clusterConditions.find((c) => c.type === condition),
      'status',
    ) === 'True';
    const clusterAccepted = checkForCondition('HubAcceptedManagedCluster');
    const clusterJoined = checkForCondition('ManagedClusterJoined');
    const clusterAvailable = checkForCondition('ManagedClusterConditionAvailable');
    if (!clusterAccepted) {
      status = 'notaccepted';
    } else if (!clusterJoined) {
      status = 'pendingimport';
      if (csrs && csrs.length) {
        status = !_.get(getLatestResource(csrs), 'status.certificate')
          ? 'needsapproval' : 'pending';
      }
    } else {
      status = clusterAvailable ? 'ok' : 'offline';
    }

    // if ManagedCluster has not joined, show ClusterDeployment status
    // as long as it is not 'detached' (which is the ready state when there is no attached ManagedCluster)
    if (!clusterJoined && clusterDeploymentStatus && clusterDeploymentStatus !== 'detached') {
      return clusterDeploymentStatus;
    }
    return status;
  }
  return clusterDeploymentStatus;
}

function mapResources(resources, kind) {
  const resultMap = new Map();
  if (resources) {
    resources.forEach((r) => {
      if (r.metadata && (!r.kind || r.kind === kind)) {
        const key = r.metadata.name;
        resultMap.set(key, { metadata: r.metadata, raw: r });
      }
    });
  }
  return resultMap;
}

function mapResourceListByLabel(resourceList, label) {
  return new Map(Object.entries(_.groupBy(resourceList, (i) => i.metadata.labels[label])));
}

function mapData({
  managedClusters,
  managedClusterInfos,
  clusterDeployments,
  certificateSigningRequestList,
  uninstallJobList,
  installJobList,
}) {
  const managedClusterMap = mapResources(managedClusters, 'ManagedCluster');
  const clusterDeploymentMap = mapResources(clusterDeployments, 'ClusterDeployment');
  const managedClusterInfoMap = mapResources(managedClusterInfos, 'ManagedClusterInfo');
  const certificateSigningRequestListMap = mapResourceListByLabel(certificateSigningRequestList, CSR_LABEL);
  const uninstallJobListMap = mapResourceListByLabel(uninstallJobList, CLUSTER_LABEL);
  const installJobListMap = mapResourceListByLabel(installJobList, CLUSTER_LABEL);

  const uniqueClusterNames = new Set([
    ...managedClusterMap.keys(),
    ...clusterDeploymentMap.keys(),
  ]);

  return {
    managedClusterMap,
    clusterDeploymentMap,
    managedClusterInfoMap,
    certificateSigningRequestListMap,
    uninstallJobListMap,
    installJobListMap,
    uniqueClusterNames,
  };
}

function getClusterResourcesFromMappedData({
  managedClusterMap,
  clusterDeploymentMap,
  managedClusterInfoMap,
  certificateSigningRequestListMap,
  uninstallJobListMap,
  installJobListMap,
}, cluster) {
  const managedCluster = managedClusterMap.get(cluster);
  const managedClusterInfo = managedClusterInfoMap.get(cluster);
  const clusterDeployment = clusterDeploymentMap.get(cluster);
  const certificateSigningRequestList = certificateSigningRequestListMap.get(cluster);
  const uninstallJobList = uninstallJobListMap.get(cluster);
  const installJobList = installJobListMap.get(cluster);
  return {
    managedCluster,
    managedClusterInfo,
    clusterDeployment,
    certificateSigningRequestList,
    uninstallJobList,
    installJobList,
  };
}

function getBaseCluster(mappedData, cluster) {
  const { managedCluster, managedClusterInfo, clusterDeployment } = getClusterResourcesFromMappedData(mappedData, cluster);

  const metadata = _.get(managedCluster, 'metadata')
  || _.pick(_.get(managedClusterInfo || clusterDeployment, 'metadata'), ['name', 'namespace']);
  if (!metadata.namespace) {
    metadata.namespace = _.get(managedClusterInfo || clusterDeployment, 'metadata.namespace') || metadata.name;
  }

  const clusterip = _.get(managedClusterInfo, 'raw.spec.masterEndpoint');

  const consoleURL = _.get(managedClusterInfo, 'raw.status.consoleURL') || _.get(clusterDeployment, 'raw.status.webConsoleURL');

  const apiURL = _.get(clusterDeployment, 'raw.status.apiURL');
  const masterEndpoint = _.get(managedClusterInfo, 'raw.spec.masterEndpoint');
  const serverAddress = apiURL || masterEndpoint;

  return {
    metadata,
    clusterip,
    consoleURL,
    rawCluster: _.get(managedCluster, 'raw'),
    rawStatus: _.get(managedClusterInfo, 'raw'),
    serverAddress,
  };
}

function findMatchedStatus(data) {
  const mappedData = mapData(data);
  const { uniqueClusterNames } = mappedData;
  const resultMap = new Map();

  uniqueClusterNames.forEach((c) => {
    const cluster = getBaseCluster(mappedData, c);
    const {
      managedCluster,
      managedClusterInfo,
      clusterDeployment,
      certificateSigningRequestList,
      uninstallJobList,
      installJobList,
    } = getClusterResourcesFromMappedData(mappedData, c);

    const nodeCount = (_.get(managedClusterInfo, 'raw.status.nodeList') || []).length;
    const nodes = nodeCount > 0 ? nodeCount : null;
    const k8sVersion = _.get(managedClusterInfo, 'raw.status.version', '-');
    const status = getStatus(
      _.get(managedCluster, 'raw'),
      certificateSigningRequestList,
      _.get(clusterDeployment, 'raw'),
      uninstallJobList,
      installJobList,
    );
    _.merge(cluster, {
      nodes,
      status,
      k8sVersion,
      isHive: !!clusterDeployment,
      isManaged: !!managedCluster,
    });

    const OCP_DISTRIBUTION_INFO = 'raw.status.distributionInfo.ocp';
    if (managedClusterInfo && _.has(managedClusterInfo, OCP_DISTRIBUTION_INFO)) {
      const {
        availableUpdates: availableVersions,
        desiredVersion,
        upgradeFailed,
        version: distributionVersion,
      } = _.get(managedClusterInfo, OCP_DISTRIBUTION_INFO);
      _.merge(cluster, {
        availableVersions,
        desiredVersion,
        distributionVersion,
        upgradeFailed,
      });
    }
    resultMap.set(c, cluster);
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

function findMatchedStatusForOverview(data) {
  const mappedData = mapData(data);
  const { uniqueClusterNames } = mappedData;
  const resultMap = new Map();

  uniqueClusterNames.forEach((c) => {
    const cluster = getBaseCluster(mappedData, c);
    const { managedCluster } = getClusterResourcesFromMappedData(mappedData, c);

    const status = getStatus(_.get(managedCluster, 'raw'));
    const capacity = _.get(managedCluster, 'raw.status.capacity');
    const allocatable = _.get(managedCluster, 'raw.status.allocatable');

    _.merge(cluster, {
      status,
      capacity,
      allocatable,
    });
    resultMap.set(c, cluster);
  });
  return [...resultMap.values()];
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
        const existingNamespaceClusters = await this.kubeConnector.get(`/apis/cluster.open-cluster-management.io/v1/managedclusters/${clusterNamespace}`);
        if (existingNamespaceClusters.items && existingNamespaceClusters.items.length > 0) {
          throw new Error(`Create Cluster Namespace failed: A ManagedCluster of the name "${clusterNamespace}" already exists.`);
        }
        if (checkForDeployment) {
          const existingNamespaceClusterDeployments = await this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${clusterNamespace}/clusterdeployments`);
          if (existingNamespaceClusterDeployments.items && existingNamespaceClusterDeployments.items.length > 0) {
            throw new Error(`Create Cluster Namespace failed: Namespace "${clusterNamespace}" already contains a ClusterDeployment resource`);
          }
        }
      } else {
        return projectResponse;
      }
    }

    // Mark namespace as a cluster namespace
    // First try adding a label
    const labelNamespaceResponse = await this.kubeConnector.patch(
      `/api/v1/namespaces/${clusterNamespace}`,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
        body: {
          metadata: {
            labels: {
              [CLUSTER_NAMESPACE_LABEL]: clusterNamespace,
            },
          },
        },
      },
    );

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
    resources = resources.filter(({ kind, metadata = {}, spec = {} }) => {
      switch (kind) {
        case 'Namespace':
          namespace = metadata.name;
          return false;

        case 'ClusterDeployment':
          ({ namespace } = metadata);
          break;

        case 'ManagedCluster':
          ({ name: namespace } = metadata);
          break;

        default:
          if (spec && spec.clusterNamespace) {
            namespace = spec.clusterNamespace;
          }
          break;
      }
      return true;
    });

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

    // if there's a namespace, try to create it
    if (!namespace) {
      errors.push({ message: 'No namespace specified' });
      return { errors };
    }
    let namespaceResponse;
    try {
      namespaceResponse = await this.createClusterNamespace(namespace, !!clusterResource);
    } catch (error) {
      errors.push({ message: error.message });
      return { errors };
    }
    if (responseHasError(namespaceResponse)) {
      // failed to create the namespace at all
      errors.push({ message: namespaceResponse.message });
      return { errors };
    }

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

    let importSecret;
    if (errors.length === 0) {
      if (clusterResource) {
        // last but not least, if everything else deployed, deploy ClusterDeployment
        // if that fails--user can press create again and not get a "Already Exists" message
        const deployment = await this.kubeConnector.post(clusterRequestPath, clusterResource)
          .catch((err) => ({
            status: 'Failure',
            message: err.message,
          }));
        if (deployment.code >= 400 || deployment.status === 'Failure' || deployment.message) {
          errors.push({ message: deployment.message });
        }
      } else {
        // import case - fetch and return the generated secret
        importSecret = await this.pollImportYamlSecret(namespace, namespace);
      }
    }

    return {
      errors,
      updated,
      created,
      importSecret,
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

    const [
      managedClusters,
      managedClusterInfos,
      clusterDeployments,
      certificateSigningRequestList,
      uninstallJobList,
      installJobList,
    ] = await Promise.all([
      rbacFallbackQuery(
        '/apis/cluster.open-cluster-management.io/v1/managedclusters',
        (ns) => `/apis/cluster.open-cluster-management.io/v1/managedclusters/${ns}`,
      ),
      rbacFallbackQuery(
        '/apis/internal.open-cluster-management.io/v1beta1/managedclusterinfos',
        (ns) => `/apis/internal.open-cluster-management.io/v1beta1/namespaces/${ns}/managedclusterinfos`,
      ),
      rbacFallbackQuery(
        '/apis/hive.openshift.io/v1/clusterdeployments',
        (ns) => `/apis/hive.openshift.io/v1/namespaces/${ns}/clusterdeployments`,
      ),
      this.kubeConnector.get(`/apis/certificates.k8s.io/v1beta1/certificatesigningrequests?${CSR_LABEL_SELECTOR_ALL}`)
        .then((allItems) => (allItems.items
          ? allItems.items
          : [])),
      rbacFallbackQuery(
        `/apis/batch/v1/jobs?${UNINSTALL_LABEL_SELECTOR_ALL}`,
        (ns) => `/apis/batch/v1/namespaces/${ns}/jobs?${UNINSTALL_LABEL_SELECTOR(ns)}`,
      ),
      rbacFallbackQuery(
        `/apis/batch/v1/jobs?${INSTALL_LABEL_SELECTOR_ALL}`,
        (ns) => `/apis/batch/v1/namespaces/${ns}/jobs?${INSTALL_LABEL_SELECTOR(ns)}`,
      ),
    ]);

    return {
      managedClusters,
      managedClusterInfos,
      clusterDeployments,
      certificateSigningRequestList,
      uninstallJobList,
      installJobList,
    };
  }

  async getNodeList(args = {}) {
    const { name } = args;
    const managedClusterInfo = await this.kubeConnector.get(
      `/apis/internal.open-cluster-management.io/v1beta1/namespaces/${name}/managedclusterinfos/${name}`,
    );
    return (_.get(managedClusterInfo, 'status.nodeList') || []).map((n) => ({ ...n, cluster: name }));
  }

  async getSingleCluster(args = {}) {
    const { name } = args;
    const listQuery = (query) => (
      this.kubeConnector.get(query).then((allItems) => (allItems.items ? allItems.items : []))
    );
    const [
      managedCluster,
      clusterDeployment,
      managedClusterInfo,
      certificateSigningRequestList,
      uninstallJobList,
      installJobList,
    ] = await Promise.all([
      this.kubeConnector.get(`/apis/cluster.open-cluster-management.io/v1/managedclusters/${name}`),
      this.kubeConnector.get(`/apis/hive.openshift.io/v1/namespaces/${name}/clusterdeployments/${name}`),
      this.kubeConnector.get(`/apis/internal.open-cluster-management.io/v1beta1/namespaces/${name}/managedclusterinfos/${name}`),
      listQuery(`/apis/certificates.k8s.io/v1beta1/certificatesigningrequests?${CSR_LABEL_SELECTOR(name)}`),
      listQuery(`/apis/batch/v1/namespaces/${name}/jobs?${UNINSTALL_LABEL_SELECTOR(name)}`),
      listQuery(`/apis/batch/v1/namespaces/${name}/jobs?${INSTALL_LABEL_SELECTOR(name)}`),
    ]);
    const [result] = findMatchedStatus({
      managedClusters: [managedCluster],
      clusterDeployments: [clusterDeployment],
      managedClusterInfos: [managedClusterInfo],
      certificateSigningRequestList,
      uninstallJobList,
      installJobList,
    });
    const clusterDeploymentSecrets = getClusterDeploymentSecrets(clusterDeployment);

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
    const allocatable = _.get(clusterstatus, `spec.allocatable.${kind}`, defaultUsage);
    const capacity = _.get(clusterstatus, `spec.capacity.${kind}`, defaultCapacity);

    if (capacity === '0' || capacity === 0) {
      return '0';
    }

    if (kind === 'cpu') {
      return parseInt(getCPUPercentage(allocatable, capacity), 10);
    }

    return parseInt(getPercentage(allocatable, capacity), 10);
  }

  async detachCluster(args) {
    const { namespace, cluster, destroy = false } = args;
    const managedCluster = `/apis/cluster.open-cluster-management.io/v1/managedclusters/${cluster}`;
    const clusterDeployment = `/apis/hive.openshift.io/v1/namespaces/${namespace}/clusterdeployments/${cluster}`;
    const machinePools = `/apis/hive.openshift.io/v1/namespaces/${namespace}/machinepools`;

    const detachManagedClusterResponse = await this.kubeConnector.delete(managedCluster);

    if (!destroy && responseHasError(detachManagedClusterResponse)) {
      return detachManagedClusterResponse.code;
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

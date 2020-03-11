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

async function getClusterResources(kube) {
  // Try cluster scope query, falling back to per-namespace
  const allClusters = await kube.get('/apis/clusterregistry.k8s.io/v1alpha1/clusters');
  const clusters = allClusters.items ? allClusters.items : await kube.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`);

  // For clusterstatuses, query only namespaces that have clusters
  const names = Array.from(new Set(clusters.map(c => c.metadata.name)));
  const namespaces = Array.from(new Set(clusters.map(c => c.metadata.namespace)));
  const [clusterstatuses, ...clusterversions] = await Promise.all([
    kube.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`,
      { namespaces },
    ),
    ...names.map(n => kube.resourceViewQuery('clusterversions', n, 'version', null, 'config.openshift.io')),
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
      const data = {
        metadata: resultMap.get(uniqueClusterName).metadata,
        nodes: _.get(clusterstatus, 'spec.capacity.nodes'),
        clusterip: _.get(clusterstatus, 'spec.masterAddresses[0].ip'),
        consoleURL: _.get(clusterstatus, 'spec.consoleURL'),
        rawStatus: clusterstatus,
        klusterletVersion: _.get(clusterstatus, 'spec.klusterletVersion', '-'),
        k8sVersion: _.get(clusterstatus, 'spec.version', '-'),
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
    };
    resultMap.set(uniqueClusterName, data);
  });
  return [...resultMap.values()];
}

export default class ClusterModel extends KubeModel {
  async getSingleCluster(args = {}) {
    const { name, namespace } = args;
    const [clusters, clusterstatuses, ...clusterversions] = await Promise.all([
      this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${namespace}/clusters/${name}`),
      this.kubeConnector.get(`/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/clusterstatuses/${name}`),
      this.kubeConnector.resourceViewQuery('clusterversions', name, 'version', null, 'config.openshift.io'),
    ]);
    const results = findMatchedStatus([clusters], [clusterstatuses], clusterversions);
    return results;
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

  // responseHasError(response) {
  //   return (response.statusCode < 200 || response.statusCode >= 300);
  // }


  // responseForError(errorTitle, response) {
  //   logger.error(`RCM API ERROR: ${errorTitle} - ${this.getErrorMsg(response)}`);
  //   return {
  //     error: {
  //       rawResponse: response,
  //       statusCode: response.statusCode,
  //       statusMsg: response.message || response.description || response.statusMessage,
  //     },
  //   };
  // }
}

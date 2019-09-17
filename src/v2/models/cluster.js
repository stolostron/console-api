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
  const status = _.get(cluster, 'status.conditions[0].type', 'offline');
  return status === '' ? 'offline' : status.toLowerCase();
}

function findClusterIntersection(clusters, clusterstatuses) {
  const uniqueNameForCluster = (name, namespace) => `${name}_${namespace}`;
  const clusterSet = new Set(clusters.map(item =>
    ((item && item.metadata)
      ? uniqueNameForCluster(item.metadata.name, item.metadata.namespace)
      : null)));
  const clusterStatusSet = new Set(clusterstatuses.map(item =>
    ((item && item.metadata)
      ? uniqueNameForCluster(item.metadata.name, item.metadata.namespace)
      : null)));
  const intersect = new Set([...clusterSet].filter(name => clusterStatusSet.has(name)));
  const resultMap = new Map();
  clusters.forEach((cluster) => {
    const clusterName = _.get(cluster, 'metadata.name', 'noClusterName');
    const clusterNamespace = _.get(cluster, 'metadata.namespace', 'noClusterNamespace');
    if (intersect.has(uniqueNameForCluster(clusterName, clusterNamespace))) {
      resultMap.set(clusterName, { metadata: cluster.metadata, raw: cluster });
    }
  });
  return resultMap;
}

function findMatchedStatus(clusters, clusterstatuses) {
  const resultMap = findClusterIntersection(clusters, clusterstatuses);
  clusterstatuses.forEach((clusterstatus) => {
    const clusterName = _.get(clusterstatus, 'metadata.name');
    if (resultMap.has(clusterName)) {
      const data = {
        metadata: resultMap.get(clusterName).metadata,
        nodes: _.get(clusterstatus, 'spec.capacity.nodes'),
        clusterip: _.get(clusterstatus, 'spec.masterAddresses[0].ip'),
        consoleURL: _.get(clusterstatus, 'spec.consoleURL'),
        rawStatus: clusterstatus,
        klusterletVersion: _.get(clusterstatus, 'spec.klusterletVersion', '-'),
        k8sVersion: _.get(clusterstatus, 'spec.version', '-'),
      };
      resultMap.set(clusterName, data);
    }
  });
  return [...resultMap.values()];
}

function findMatchedStatusForOverview(clusters, clusterstatuses) {
  const resultMap = findClusterIntersection(clusters, clusterstatuses);
  clusterstatuses.forEach((clusterstatus) => {
    const clusterName = _.get(clusterstatus, 'metadata.name');
    if (resultMap.has(clusterName)) {
      const cluster = resultMap.get(clusterName);
      const data = {
        metadata: cluster.metadata,
        status: getStatus(cluster.raw),
        clusterip: _.get(clusterstatus, 'spec.masterAddresses[0].ip'),
        consoleURL: _.get(clusterstatus, 'spec.consoleURL'),
        capacity: _.get(clusterstatus, 'spec.capacity'),
        usage: _.get(clusterstatus, 'spec.usage'),
        rawCluster: cluster.raw,
        rawStatus: clusterstatus,
      };
      resultMap.set(clusterName, data);
    }
  });
  return [...resultMap.values()];
}

export default class ClusterModel extends KubeModel {
  async getSingleCluster(args = {}) {
    const { name, namespace } = args;
    const [clusters, clusterstatuses] = await Promise.all([
      this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${namespace}/clusters/${name}`),
      this.kubeConnector.get(`/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/clusterstatuses/${name}`),
    ]);
    const results = findMatchedStatus([clusters], [clusterstatuses]);
    return results;
  }

  async getClusters(args = {}) {
    const [clusters, clusterstatuses] = await Promise.all([
      this.kubeConnector.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`),
      this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`),
    ]);
    const results = findMatchedStatus(clusters, clusterstatuses);
    if (args.name) {
      return results.filter(c => c.metadata.name === args.name)[0];
    }
    return results;
  }

  async getAllClusters(args = {}) {
    const [clusters, clusterstatuses] = await Promise.all([
      this.kubeConnector.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`),
      this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`),
    ]);
    const results = findMatchedStatusForOverview(clusters, clusterstatuses);
    if (args.name) {
      return results.filter(c => c.metadata.name === args.name)[0];
    }
    return results;
  }

  static resolveUsage(kind, clusterstatus) {
    const usage = _.get(clusterstatus, `spec.usage.${kind}`, '0000Mi');
    const capacity = _.get(clusterstatus, `spec.capacity.${kind}`, '0001Mi');
    if (kind === 'cpu') {
      return parseInt(getCPUPercentage(usage, capacity), 10);
    }

    return parseInt(getPercentage(usage, capacity), 10);
  }

  async getStatus(clusterstatus) {
    const [cluster] = await this.kubeConnector.getResources(
      ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`,
      { namespaces: [clusterstatus.metadata.namespace] },
    );

    const status = _.get(cluster, 'status.conditions[0].type', 'offline');
    return status === '' ? 'offline' : status.toLowerCase();
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

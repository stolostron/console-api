/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
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

export default class ClusterModel extends KubeModel {
  async getClusters(args = {}) {
    const [clusters, clusterstatuses] = await Promise.all([
      this.kubeConnector.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`),
      this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`),
    ]);
    const results = clusterstatuses.reduce((accum, clusterstatus, idx) => {
      // namespace doesn't contain a cluster
      if (!clusterstatus) {
        return accum;
      }

      const result = {
        metadata: clusters[idx].metadata,
        nodes: _.get(clusterstatus, 'spec.capacity.nodes'),
        clusterip: _.get(clusterstatus, 'spec.masterAddresses[0].ip'),
        consoleURL: _.get(clusterstatus, 'spec.consoleURL'),
        rawStatus: clusterstatus,
      };

      accum.push(result);
      return accum;
    }, []);


    if (args.name) {
      return results.filter(c => c.metadata.name === args.name)[0];
    }
    return results;
  }

  // temporary function for dashboard schema
  async getAllClusters(args = {}) {
    const [clusters, clusterstatuses] = await Promise.all([
      this.kubeConnector.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters`),
      this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`),
    ]);

    const results = clusters.reduce((accum, cluster, idx) => {
      // namespace doesn't contain a cluster
      if (!cluster) {
        return accum;
      }

      const clusterstatus = clusterstatuses[idx];

      const result = {
        metadata: cluster.metadata,
        status: getStatus(cluster),
        nodes: _.get(clusterstatus, 'spec.capacity.nodes'),
        clusterip: _.get(clusterstatus, 'spec.masterAddresses[0].ip'),
        consoleURL: _.get(clusterstatus, 'spec.consoleURL'),
        rawCluster: cluster,
        rawStatus: clusterstatus,
      };

      accum.push(result);
      return accum;
    }, []);


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

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import logger from '../lib/logger';

// The last char(s) in usage are units - need to be removed in order to get an int for calculation
function getPercentage(usage, capacity) {
  return (usage.substring(0, usage.length - 2) / capacity.substring(0, capacity.length - 2)) * 100;
}

function getCPUPercentage(usage, capacity) {
  return ((usage.substring(0, usage.length - 1) / 1000) / capacity) * 100;
}

function getStatus(cluster) {
  const status = _.get(cluster, 'status.conditions[0].type', 'unknown');
  return status === '' ? 'unknown' : status.toLowerCase();
}

export default class ClusterModel {
  constructor({ kubeConnector }) {
    if (!kubeConnector) {
      throw new Error('kubeConnector is a required parameter');
    }

    this.kubeConnector = kubeConnector;
  }

  async getClusters() {
    const response = await this.kubeConnector.get('/apis/clusterregistry.k8s.io/v1alpha1/clusters');
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);

      // TODO: How should we handle errors? - 07/25/18 10:20:57 sidney.wijngaarde1@ibm.com
      return [];
    }

    const clusterStatus = await this.getClusterStatus();
    const result = [];

    response.items.forEach((cluster, idx) => {
      result.push({
        createdAt: cluster.metadata.creationTimestamp,
        clusterip: clusterStatus[idx].ip,
        labels: cluster.metadata.labels,
        name: cluster.metadata.name,
        namespace: cluster.metadata.namespace,
        status: getStatus(cluster),
        uid: cluster.metadata.uid,
        nodes: clusterStatus[idx].nodes,
        totalMemory: parseInt(clusterStatus[idx].memoryUtilization, 10),
        totalStorage: parseInt(clusterStatus[idx].storageUtilization, 10),
      });
    });
    return result;
  }

  async getClusterStatus() {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/clusterstatuses');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);
      return [];
    }

    const result = [];
    response.items.forEach((cluster) => {
      result.push({
        createdAt: cluster.metadata.creationTimestamp,
        labels: cluster.metadata.labels,
        name: cluster.metadata.name,
        namespace: cluster.metadata.namespace,
        uid: cluster.metadata.uid,
        nodes: cluster.spec.capacity.nodes,
        pods: cluster.spec.usage.pods,
        ip: cluster.spec.masterAddresses[0].ip,
        memoryUtilization: getPercentage(
          cluster.spec.usage.memory,
          cluster.spec.capacity.memory,
        ),
        storageUtilization: getPercentage(
          cluster.spec.usage.storage,
          cluster.spec.capacity.storage,
        ),
        cpuUtilization: getCPUPercentage(
          cluster.spec.usage.cpu,
          cluster.spec.capacity.cpu,
        ),
      });
    });
    return result;
  }
}

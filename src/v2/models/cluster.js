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

  async getClusterByNamespace(namespace) {
    const response = await this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${namespace}/clusters`);
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return null;
    }

    if (response.items.length > 1) {
      logger.error('MCMM ERROR - cluster query return more than one cluster for a namespace');
      return null;
    }

    return response.items[0];
  }

  async getClusterStatusByNamespace(namespace) {
    const response = await this.kubeConnector.get(`/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/clusterstatuses`);
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return null;
    }

    if (response.items.length > 1) {
      logger.error('MCMM ERROR - cluster query return more than one cluster for a namespace');
      return null;
    }

    return response.items[0];
  }

  async getClusters({ user }) {
    const clusterQueries = user.namespaces.map(({ namespaceId }) => Promise.all([
      this.getClusterByNamespace(namespaceId),
      this.getClusterStatusByNamespace(namespaceId),
    ]));

    const clusterData = await Promise.all(clusterQueries);

    const results = clusterData.reduce((accum, [cluster, clusterstatus]) => {
      // namespace doesn't contain a cluster
      if (!cluster) {
        return accum;
      }

      const result = {
        createdAt: cluster.metadata.creationTimestamp,
        labels: cluster.metadata.labels,
        metadata: cluster.metadata,
        name: cluster.metadata.name,
        namespace: cluster.metadata.namespace,
        uid: cluster.metadata.uid,
        status: getStatus(cluster),
        nodes: _.get(clusterstatus, 'spec.capacity.nodes'),
        clusterip: _.get(clusterstatus, 'spec.masterAddresses[0].ip'),
      };

      const memoryUsage = _.get(clusterstatus, 'spec.usage.memory');
      const memoryCapacity = _.get(clusterstatus, 'spec.capacity.memory');
      if (memoryUsage && memoryCapacity) {
        result.totalMemory = parseInt(getPercentage(memoryUsage, memoryCapacity), 10);
      }

      const storageUsage = _.get(clusterstatus, 'spec.usage.storage');
      const storageCapacity = _.get(clusterstatus, 'spec.capacity.storage');
      if (storageUsage && storageCapacity) {
        result.totalStorage = parseInt(getPercentage(storageUsage, storageCapacity), 10);
      }

      accum.push(result);
      return accum;
    }, []);

    return results;
  }

  async getClusterStatus({ user }) {
    const clusterstatusQueries = await Promise.all(user.namespaces.map(({ namespaceId }) =>
      this.getClusterStatusByNamespace(namespaceId)));

    return clusterstatusQueries.reduce((accum, cluster) => {
      if (!cluster) {
        return accum;
      }

      accum.push({
        createdAt: cluster.metadata.creationTimestamp,
        labels: cluster.metadata.labels,
        metadata: cluster.metadata,
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

      return accum;
    }, []);
  }
}

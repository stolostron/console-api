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
  const status = _.get(cluster, 'status.conditions[0].type', 'unknown');
  return status === '' ? 'unknown' : status.toLowerCase();
}

export default class ClusterModel extends KubeModel {
  async getClusters(args) {
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


    if (args.name) {
      return results.filter(c => c.metadata.name === args.name)[0];
    }
    return results;
  }

  async getClusterStatus() {
    const clusterstatuses = await this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/clusterstatuses`);

    return clusterstatuses.reduce((accum, cluster) => {
      if (!cluster) {
        return accum;
      }

      accum.push({
        metadata: cluster.metadata,
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

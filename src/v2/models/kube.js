/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import logger from '../lib/logger';
import requestLib from '../lib/request';
import KubeConnector from '../connectors/kube';

const mock = (prefix, obj) => {
  logger.warn(`Using mocked values for ${prefix}`, Object.keys(obj));
  return obj;
};

export default class KubeModel {
  constructor({ kubeConnector, request, httpLib = requestLib }) {
    if (kubeConnector) {
      this.kubeConnector = kubeConnector;
    } else if (request && httpLib) {
      this.kubeConnector = new KubeConnector({ request, httpLib });
    } else {
      throw new Error('Either initialize with KubeConnector or request + httpLib');
    }
  }

  async getClusters() {
    const response = await this.kubeConnector.get('/apis/clusterregistry.k8s.io/v1alpha1/clusters');
    return response.items.map(cluster => ({
      createdAt: cluster.metadata.creationTimestamp,
      labels: cluster.metadata.labels,
      name: cluster.metadata.name,
      namespace: cluster.metadata.namespace,
      status: cluster.status.conditions[0].type.toLowerCase(),
      uid: cluster.metadata.uid,
      ...mock('Cluster', {
        nodes: 1,
        totalMemory: 0,
        totalStorage: 0,
      }),
    }));
  }
}

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import requestLib from '../lib/request';
import KubeConnector from '../connectors/kube';

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
    const cluster = response.items[0];

    return [{
      name: cluster.metadata.name,
      namespace: cluster.metadata.namespace,
      uid: cluster.metadata.uid,
      status: cluster.status.conditions[0].type,
      createdAt: cluster.metadata.creationTimestamp,
      labels: cluster.metadata.labels,
    }];
  }
}

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
  constructor({ kubeConnector, token, httpLib = requestLib }) {
    if (kubeConnector) {
      this.kubeConnector = kubeConnector;
    } else if (token && httpLib) {
      this.kubeConnector = new KubeConnector({ token, httpLib });
    } else {
      throw new Error('Either initialize with KubeConnector or token + httpLib');
    }
  }

  async getClusters() {
    const response = await this.kubeConnector.get('/apis/clusterregistry.k8s.io/v1alpha1/clusters');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);

      // TODO: How should we handle errors? - 07/25/18 10:20:57 sidney.wijngaarde1@ibm.com
      return [];
    }

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

  async getPods() {
    const response = await this.kubeConnector.worksetResourceQuery('pods');
    return Object.keys(response.status.results).reduce((accum, clusterName) => {
      const pods = response.status.results[clusterName].items;

      pods.map(pod => accum.push({
        cluster: clusterName,
        containers: pod.spec.containers,
        createdAt: pod.metadata.creationTimestamp,
        hostIP: pod.status.hostIP,
        labels: pod.metadata.labels,
        name: pod.metadata.name,
        namespace: pod.metadata.namespace,
        owners: pod.metadata.ownerReferences,
        podIP: pod.status.podIP,
        startedAt: pod.status.startTime,
        status: pod.status.phase,
        uid: pod.metadata.uid,
      }));

      return accum;
    }, []);
  }

  async getRepos() {
    const response = await this.kubeConnector.get('/apis/hcm.ibm.com/v1alpha1/helmrepos');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return response.items.map(cluster => ({
      Name: cluster.metadata.name,
      URL: cluster.spec.url,
    }));
  }

  async getCharts() {
    const response = await this.kubeConnector.get('/apis/hcm.ibm.com/v1alpha1/helmrepos');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    const charts = [];
    response.items.forEach((cluster) => {
      const rName = cluster.metadata.name;
      const repo = Object.values(cluster.status.charts);
      repo.forEach((chart) => {
        charts.push({
          repoName: rName,
          name: chart.chartVersions[0].name,
          version: chart.chartVersions[0].version,
          urls: chart.chartVersions[0].urls,
        });
      });
    });
    return charts;
  }
}

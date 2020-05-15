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
import KubeModel from './kube';
import logger from '../lib/logger';

export default class HelmModel extends KubeModel {
  async getRelease(name, namespace, clusterName) {
    const response = await this.kubeConnector.resourceViewQuery('releases', clusterName, name, namespace);
    const rels = response.status.results[clusterName].items[0];
    return [{
      chartName: rels.spec.chartName,
      chartVersion: rels.spec.chartVersion,
      namespace: rels.spec.namespace,
      status: rels.spec.status,
      version: rels.spec.version,
      name: rels.metadata.name,
      cluster: clusterName,
      lastDeployed: new Date(rels.spec.lastDeployed).getTime() / 1000,
    }];
  }

  async getReleases() {
    const response = await this.kubeConnector.resourceViewQuery('releases');
    const results = _.get(response, 'status.results', {});
    return Object.keys(results).reduce((accum, clusterName) => {
      const rels = response.status.results[clusterName].items;

      rels.map(rel => accum.push({
        chartName: rel.spec.chartName,
        chartVersion: rel.spec.chartVersion,
        namespace: rel.spec.namespace,
        status: rel.spec.status,
        version: rel.spec.version,
        name: rel.metadata.name,
        cluster: clusterName,
        lastDeployed: new Date(rel.spec.lastDeployed).getTime() / 1000,
      }));

      return accum;
    }, []);
  }

  async getCharts() {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/helmrepos');
    if (response.code || response.message) {
      logger.error(`OCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    const charts = [];
    response.items.forEach((cluster) => {
      const rName = cluster.metadata.name;
      if (cluster.status.charts) {
        const repo = Object.values(cluster.status.charts);
        repo.forEach((chart) => {
          charts.push({
            repoName: rName,
            name: chart.chartVersions[0].name,
            version: chart.chartVersions[0].version,
            urls: chart.chartVersions[0].urls,
          });
        });
      }
    });
    return charts;
  }

  async getRepos() {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/helmrepos');
    if (response.code || response.message) {
      logger.error(`OCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return response.items.map(cluster => ({
      Name: cluster.metadata.name,
      URL: cluster.spec.url,
    }));
  }

  async setRepo(input) {
    const jsonBody = {
      apiVersion: 'mcm.ibm.com/v1alpha1',
      kind: 'HelmRepo',
      metadata: {
        name: input.Name,
      },
      spec: {
        url: input.URL,
      },
    };
    const response = await this.kubeConnector.post('/apis/mcm.ibm.com/v1alpha1/namespaces/default/helmrepos', jsonBody);
    if (response.code || response.message) {
      logger.error(`OCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return {
      Name: response.metadata.name,
      URL: response.spec.url,
    };
  }
}

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


export default class ApplicationModel {
  constructor({ kubeConnector, token, httpLib = requestLib }) {
    if (kubeConnector) {
      this.kubeConnector = kubeConnector;
    } else if (token && httpLib) {
      this.kubeConnector = new KubeConnector({ token, httpLib });
    } else {
      throw new Error('Either initialize with KubeConnector or token + httpLib');
    }
  }


  async getApplications(name, namespace = 'default') {
    const response = name ?
      await this.kubeConnector.get(`/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/applications/${name}`) :
      await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/applications');

    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    const applications = name ? [response] : response.items;

    return applications.map(app => ({
      details: {
        dashboard: app.status.Dashboard,
        ...app.metadata,
      },
      selector: app.spec.selector,
    }));
  }

  async getDeployables(selector) {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/deployables');
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return [];
    }

    const deployables = response.items.filter(dep => Object.keys(dep.metadata.labels).find(key =>
      Object.keys(selector.matchLabels).lastIndexOf(key) > -1 &&
        dep.metadata.labels[key] === selector.matchLabels[key]));

    return deployables.map(deployable => ({
      name: deployable.metadata.name,
      dependencies: deployable.spec.dependencies && deployable.spec.dependencies.map(dep => ({
        name: dep.destination.name,
        kind: dep.destination.kind,
      })),
      deployer: deployable.spec.deployer && deployable.spec.deployer.helm,
    }));
  }

  async getPlacementPolicies(selector) {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/placementpolicies');
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return [];
    }

    const placementPolicies = response.items.filter(pp =>
      Object.keys(pp.metadata.labels).find(key =>
        Object.keys(selector.matchLabels).lastIndexOf(key) > -1 &&
          pp.metadata.labels[key] === selector.matchLabels[key]));

    return placementPolicies.map(deployable => ({
      name: deployable.metadata.name,
    }));
  }
}

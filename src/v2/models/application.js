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


  async createApplication(resources) {
    const appKinds = {
      Application: 'applications',
      ConfigMap: 'configmaps',
      DeployableOverride: 'deployableoverrides',
      Deployable: 'deployables',
      PlacementPolicy: 'placementpolicies',
    };

    if (!resources.find(resource => resource.kind === 'Application')) {
      return {
        errors: [{ message: 'Must contain a resource with kind "Application".' }],
      };
    }

    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', 'default');
      if (appKinds[resource.kind] === 'undefined') {
        return Promise.resolve({
          status: 'Failure',
          message: `Invalid Kind: ${resource.kind}`,
        });
      }
      return this.kubeConnector.post(`/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/${appKinds[resource.kind]}`, resource)
        .catch(err => ({
          status: 'Failure',
          message: err.message,
        }));
    }));

    const errors = [];
    result.forEach((item) => {
      if (item.code > 400 || item.status === 'Failure') {
        errors.push({ message: item.message });
      }
    });

    return {
      errors,
      result,
    };
  }

  /**
   * NOTE: This only deletes the top level Application object. Related objects like Deployable,
   * PlacementPolicy, ConfigMap, or DeployableOverride aren't deleted yet.
   */
  async deleteApplication(namespace = 'default', name) {
    const response = await this.kubeConnector.delete(`/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/applications/${name}`);
    if (response.code || response.message) {
      throw new Error(`MCM ERROR ${response.code} - ${response.message}`);
    }
    return response.metadata.name;
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

    return placementPolicies.map(({ metadata, spec }) => ({
      name: metadata.name,
      namespace: metadata.namespace,
      annotations: metadata.annotations,
      clusterSelector: spec.clusterSelector,
      replicas: spec.replicas,
      resourceSelector: spec.resourceSelector,
    }));
  }
}

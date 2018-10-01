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

// use selector to filter objects by labels
const getSelected = (selector, items) => {
  const { matchLabels, matchExpressions } = selector;
  return items.filter(({ metadata: { labels } }) => {
    let r = false;
    const keys = Object.keys(labels);
    for (let i = 0; i < keys.length && !r;) {
      const key = keys[i];
      if (matchLabels) {
        r = ((Object.keys(matchLabels).lastIndexOf(key) > -1 &&
                     labels[key] === matchLabels[key]));
      } else if (matchExpressions) {
        for (let j = 0; j < matchExpressions.length && !r;) {
          const { key: k, operator = '', values = [] } = matchExpressions[i];
          switch (operator.toLowerCase()) {
            case 'in':
              if (labels[k] && values.indexOf(labels[k]) !== -1) {
                r = true;
              }
              break;

            case 'notin':
              // TODO
              break;

            default:
              break;
          }
          j += 1;
        }
      }
      i += 1;
    }
    return r;
  });
};

export default class ApplicationModel extends KubeModel {
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
      if (item.code >= 400 || item.status === 'Failure') {
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
    let apps;
    if (name) {
      apps = await this.kubeConnector.getResources(
        ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/applications/${name}`,
        { namespaces: [namespace] },
      );
    } else {
      apps = await this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/applications`);
    }

    return apps.map(app => ({
      dashboard: app.status.Dashboard,
      metadata: app.metadata,
      raw: app,
      selector: app.spec.selector,
    }));
  }

  async getDeployables(selector) {
    const response = await this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/deployables`);

    return getSelected(selector, response).map(deployable => ({
      dependencies: deployable.spec.dependencies && deployable.spec.dependencies.map(dep => ({
        name: dep.destination.name,
        kind: dep.destination.kind,
      })),
      deployer: deployable.spec.deployer && deployable.spec.deployer.helm,
      metadata: deployable.metadata,
      raw: deployable,
    }));
  }

  async getPlacementPolicies(selector) {
    const response = await this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/placementpolicies`);

    return getSelected(selector, response).map(pp => ({
      clusterSelector: pp.spec.clusterSelector,
      metadata: pp.metadata,
      raw: pp,
      replicas: pp.spec.replicas,
      resourceSelector: pp.spec.resourceSelector,
    }));
  }
}

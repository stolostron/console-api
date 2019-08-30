/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import KubeModel from './kube';

const filterByName = (names, items) =>
  items.filter(item => names.find(name => name === item.metadata.name));

const filterByNameNamespace = (names, items) =>
  items.filter(({ metadata }) => names.find((name) => {
    const path = name.split('/');
    return path[1] === metadata.name && path[0] === metadata.namespace;
  }));

export default class ApplicationModel extends KubeModel {
  async createApplication(resources) {
    const appKinds = {
      Application: 'applications',
      ApplicationRelationship: 'applicationrelationships',
      ConfigMap: 'configmaps',
      DeployableOverride: 'deployableoverrides',
      Deployable: 'deployables',
      PlacementBinding: 'placementbindings',
      PlacementPolicy: 'placementpolicies',
    };

    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', 'default');
      if (appKinds[resource.kind] === 'undefined') {
        return Promise.resolve({
          status: 'Failure',
          message: `Invalid Kind: ${resource.kind}`,
        });
      }
      if (appKinds[resource.kind] === 'applications') {
        return this.kubeConnector.post(`/apis/app.k8s.io/v1beta1/namespaces/${namespace}/applications`, resource)
          .catch(err => ({
            status: 'Failure',
            message: err.message,
          }));
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

  // //////////////// USED IN OVERVIEW PAGE /////////
  // //////////////// USED IN OVERVIEW PAGE /////////
  // //////////////// USED IN OVERVIEW PAGE /////////
  // //////////////// USED IN OVERVIEW PAGE /////////

  async getApplicationOverview(name, namespace = 'default') {
    let apps;
    if (name) {
      apps = await this.kubeConnector.getResources(
        ns => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications/${name}`,
        { namespaces: [namespace] },
      );
    } else {
      apps = await this.kubeConnector.getResources(ns => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications`);
    }
    apps = await Promise.all(apps);
    return apps
      .map(app => ({
        metadata: app.metadata,
      }));
  }

  // ///////////// USED FOR APPLICATION TOPOLOGY ////////////////
  // ///////////// USED FOR APPLICATION TOPOLOGY ////////////////
  // ///////////// USED FOR APPLICATION TOPOLOGY ////////////////
  // ///////////// USED FOR APPLICATION TOPOLOGY ////////////////

  async getApplication(name, namespace, channel) {
    // get application
    let model = null;
    const apps = await this.kubeConnector.getResources(
      ns => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications/${name}`,
      { namespaces: [namespace] },
    );
    if (apps.length > 0) {
      const app = apps[0];

      // get its associated resources
      model = { name, namespace, app };

      // get subscriptions to channels (pipelines)
      let subscriptionNames = _.get(app, 'metadata.annotations["app.ibm.com/subscriptions"]') ||
        _.get(app, 'metadata.annotations["apps.ibm.com/subscriptions"]');
      let deployableNames = _.get(app, 'metadata.annotations["app.ibm.com/deployables"]') ||
        _.get(app, 'metadata.annotations["apps.ibm.com/deployables"]');
      if (subscriptionNames && subscriptionNames.length > 0) {
        subscriptionNames = subscriptionNames.split(',');
        const subscriptions =
          await this.getApplicationResources(subscriptionNames, 'subscriptions', 'Subscription');

        // pick subscription based on channel requested by ui
        const getChannelName = (subscription) => {
          const { metadata: { name: nm, namespace: ns } } = subscription;
          const chn = _.get(subscription, 'spec.channel');
          return `${ns}/${nm}//${chn}`;
        };
        let [subscription] = subscriptions;
        model.activeChannel = getChannelName(subscription);
        model.channels = [];
        subscriptions.forEach((sub) => {
          let chn = _.get(sub, 'spec.channel');
          if (chn) {
            chn = getChannelName(sub);
            model.channels.push(chn);
            if (chn === channel) {
              subscription = sub;
              model.activeChannel = channel;
            }
          }
        });

        deployableNames = _.get(subscription, 'metadata.annotations["app.ibm.com/deployables"]');
        if (deployableNames && deployableNames.length > 0) {
          deployableNames = deployableNames.split(',');
          model.deployables =
            await this.getApplicationResources(deployableNames, 'deployables', 'Deployable');
        }
        ([subscription] = await this.getPlacementRules([subscription]));
        model.subscription = subscription;
      } else if (deployableNames && deployableNames.length > 0) {
        deployableNames = deployableNames.split(',');
        model.deployables =
          await this.getApplicationResources(deployableNames, 'deployables', 'Deployable');
        await this.getPlacementRules(model.deployables);
      }
    }
    return model;
  }

  async getApplicationResources(names, type, kind) {
    const namespaces = new Set(names.map(name => name.split('/')[0]));
    const response = await this.kubeConnector.getResources(
      ns => `/apis/app.ibm.com/v1alpha1/namespaces/${ns}/${type}`,
      { kind, namespaces: Array.from(namespaces) },
    );
    return filterByNameNamespace(names, response);
  }

  async getPlacementRules(resources) {
    const requests = resources.map(async (resource) => {
      // if this one has a placement rule reference get that
      const placementRule = _.get(resource, 'spec.placement.placementRef.name');
      if (placementRule) {
        const namespace = _.get(resource, 'metadata.namespace');
        const response = await this.kubeConnector.getResources(
          ns => `/apis/app.ibm.com/v1alpha1/namespaces/${ns}/placementrules`,
          { kind: 'PlacementRule', namespaces: [namespace] },
        );
        if (Array.isArray(response)) {
          const [rules] = response;
          return _.merge(resource, { rules });
        }
      }
      return resource;
    });
    return Promise.all(requests);
  }

  // ///////////////  deprecated /////////////////////////
  // ///////////////  deprecated /////////////////////////
  // ///////////////  deprecated /////////////////////////
  // ///////////////  deprecated /////////////////////////


  async getApplications(name, namespace = 'default') {
    let apps;
    if (name) {
      apps = await this.kubeConnector.getResources(
        ns => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications/${name}`,
        { namespaces: [namespace] },
      );
    } else {
      apps = await this.kubeConnector.getResources(ns => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications`);
    }
    return apps
      .map(async (app) => {
        const deployableNames = _.get(app, 'metadata.annotations["apps.ibm.com/deployables"]') ? _.get(app, 'metadata.annotations["apps.ibm.com/deployables"]').split(',') : [];
        const placementBindingNames = _.get(app, 'metadata.annotations["apps.ibm.com/placementbindings"]') ? _.get(app, 'metadata.annotations["apps.ibm.com/placementbindings"]').split(',') : [];
        const placementPolicyItems = await Promise.all(placementBindingNames.map(pbName => this.kubeConnector.get(`/apis/mcm.ibm.com/v1alpha1/namespaces/${app.metadata.namespace}/placementbindings/${pbName}`)));
        const placementPolicyNames =
          placementPolicyItems.map(pp => pp.placementRef && pp.placementRef.name);
        return {
          applicationRelationshipNames: _.get(app, 'metadata.annotations["apps.ibm.com/applicationrelationships"]') ? _.get(app, 'metadata.annotations["apps.ibm.com/applicationrelationships"]').split(',') : [],
          applicationWorkNames: app.metadata.name || '',
          dashboard: _.get(app, 'metadata.annotations["apps.ibm.com/dashboard"]') || '',
          deployableNames,
          placementBindingNames,
          placementPolicyNames: placementPolicyNames || [],
          metadata: app.metadata,
          raw: app,
          selector: app.spec.selector,
        };
      });
  }

  async getApplicationRelationships(selector = {}) {
    const { matchNames } = selector;

    const response = await this.kubeConnector.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/applicationrelationships`,
      { kind: 'ApplicationRelationship' },
    );
    const appRelationships = matchNames ? filterByName(matchNames, response) : response;

    return appRelationships.map(ar => ({
      destination: ar.spec.destination,
      metadata: ar.metadata,
      raw: ar,
      source: ar.spec.source,
      type: ar.spec.type,
    }));
  }

  async getDeployables(selector = {}) {
    const { matchNames } = selector;

    const response = await this.kubeConnector.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/deployables`,
      { kind: 'Deployable' },
    );
    const deployables = matchNames ? filterByName(matchNames, response) : response;

    return deployables.map(deployable => ({
      dependencies: deployable.spec.dependencies && deployable.spec.dependencies.map(dep => ({
        name: dep.destination.name,
        kind: dep.destination.kind,
      })),
      metadata: deployable.metadata,
      raw: deployable,
      deployer: Object.assign(
        // when chart was used
        _.get(deployable, 'spec.deployer.helm', {}),

        // when a k8 object was selected
        { kubeKind: _.get(deployable, 'spec.deployer.kind', '') },
        { kubeName: _.get(deployable, 'spec.deployer.kube.template.metadata.name', '') },
      ),

    }));
  }

  async getPlacementBindings(selector = {}) {
    const { matchNames } = selector;

    const response = await this.kubeConnector.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/placementbindings`,
      { kind: 'PlacementBinding' },
    );
    const placementBindings = matchNames ? filterByName(matchNames, response) : response;

    return placementBindings.map(pb => ({
      metadata: pb.metadata,
      raw: pb,
      placementRef: pb.placementRef,
      subjects: pb.subjects,
    }));
  }

  async getPlacementPolicies(selector = {}) {
    const { matchNames } = selector;

    const response = await this.kubeConnector.getResources(
      ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/placementpolicies`,
      { kind: 'PlacementPolicy' },
    );
    const placementPolicies = matchNames ? filterByName(matchNames, response) : response;

    return placementPolicies.map(pp => ({
      clusterLabels: pp.spec.clusterLabels,
      metadata: pp.metadata,
      raw: pp,
      clusterReplicas: pp.spec.clusterReplicas,
      resourceSelector: pp.spec.resourceHint,
      status: pp.status,
    }));
  }

  async getApplicationWorks(selector = {}) {
    const { deployableNames, placementBindingNames } = selector;

    const response = await this.kubeConnector.getResources(ns => `/apis/mcm.ibm.com/v1alpha1/namespaces/${ns}/works?labelSelector=deployable+in+%28${deployableNames.join(',')}%29%2CplacementBinding+in+%28${placementBindingNames.join(',')}%29`);
    return response.map(work => ({
      metadata: work.metadata,
      release: _.get(work, 'status.result.metadata.name', '-'),
      cluster: work.spec.cluster.name,
      status: work.status.type,
      reason: work.status.reason || '-',
      result: Object.assign(
        _.get(work, 'status.result.spec', {}),

        // when chart was used
        _.get(work, 'spec.helm', {}),

        // when a k8 object was selected
        { kubeKind: _.get(work, 'spec.kube.template.kind', '') },
        { kubeName: _.get(work, 'spec.kube.template.metadata.name', '') },
        { kubeCluster: _.get(work, 'spec.cluster.name', '') },
      ),
    }));
  }
}

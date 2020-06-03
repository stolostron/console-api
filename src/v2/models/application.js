/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
/* eslint no-param-reassign: "error" */
import _ from 'lodash';
import KubeModel from './kube';


const EVERYTHING_CHANNEL = '__ALL__/__ALL__//__ALL__/__ALL__';

export const filterByName = (names, items) =>
  items.filter(item => names.find(name => name === item.metadata.name));

export const filterByNameNamespace = (names, items) =>
  items.filter(({ metadata }) => names.find((name) => {
    const path = name.split('/');
    return path[1] === metadata.name && path[0] === metadata.namespace;
  }));


const longestCommonSubstring = (str1, str2) => {
  let sequence = '';
  const str1Length = str1.length;
  const str2Length = str2.length;
  const num = new Array(str1Length);
  let maxlen = 0;
  let lastSubsBegin = 0;
  let i = 0;
  let j = 0;

  // create matrix
  while (i < str1Length) {
    const subArray = new Array(str2Length);
    j = 0;
    while (j < str2Length) {
      subArray[j] = 0;
      j += 1;
    }
    num[i] = subArray;
    i += 1;
  }

  // search matrix
  let thisSubsBegin = null;
  i = 0;
  while (i < str1Length) {
    j = 0;
    while (j < str2Length) {
      if (str1[i] !== str2[j]) {
        num[i][j] = 0;
      } else {
        if ((i === 0) || (j === 0)) {
          num[i][j] = 1;
        } else {
          num[i][j] = 1 + num[i - 1][j - 1];
        }
        if (num[i][j] > maxlen) {
          maxlen = num[i][j];
          thisSubsBegin = (i - num[i][j]) + 1;
          if (lastSubsBegin === thisSubsBegin) {
            sequence += str1[i];
          } else {
            lastSubsBegin = thisSubsBegin;
            sequence = str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
          }
        }
      }
      j += 1;
    }
    i += 1;
  }
  return sequence;
};


// if channel has sub channels, get subchannel name
export const getSubChannelName = (paths, isChucked) => {
  if (isChucked) {
    const getName = (rname) => {
      let [, name] = rname.split('/');
      name = name.replace(/.[\d.]+$/, '');
      return name;
    };

    // get first and last path
    const len = paths.length - 1;
    let begName = getName(paths[0]);
    let endName = getName(paths[len]);

    // find longest common string between paths
    const common = longestCommonSubstring(begName, endName);

    // replace common string in both paths
    begName = begName.replace(common, '');
    endName = endName.replace(common, '');
    return `///${begName}///${endName}`;
  }
  return '';
};

export const getChannelName = (subscription) => {
  const { metadata: { name: nm, namespace: ns }, deployablePaths: paths, isChucked } = subscription;
  const chn = _.get(subscription, 'spec.channel');
  return `${ns}/${nm}//${chn}${getSubChannelName(paths, isChucked)}`;
};

// get deployables from the subscription annotation
export const getSubscriptionsDeployables = (allSubscriptions) => {
  // if a subscription has lots and lots of deployables, break into smaller subscriptions
  let allowAllChannel = true;
  const subscriptions = [];
  allSubscriptions.forEach((subscription) => {
    const deployablePaths = _.get(subscription, 'metadata.annotations["apps.open-cluster-management.io/deployables"]', '').split(',').sort();

    if (deployablePaths.length > 30) {
      const chunks = _.chunk(deployablePaths, 25);
      // if last chunk is just one, append to 2nd to last chunk
      const len = chunks.length - 1;
      if (chunks[len].length === 1) {
        chunks[len - 1].push(chunks[len][0]);
        chunks.pop();
      }
      chunks.forEach((chuck) => {
        subscriptions.push({ ...subscription, deployablePaths: chuck, isChucked: true });
      });
      allowAllChannel = false;
    } else {
      subscriptions.push({ ...subscription, deployablePaths });
    }
  });

  return { subscriptions, allowAllChannel };
};

export const getAllChannels = (subscriptions, channels, selectedChannel, allowAllChannel) => {
  let selectedSubscription = null;
  subscriptions.forEach((subscription) => {
    if (_.get(subscription, 'spec.channel')) {
      const subscriptionChannel = getChannelName(subscription);
      channels.push(subscriptionChannel);
      if (selectedChannel === subscriptionChannel) {
        selectedSubscription = [subscription];
      }
    }
  });
  // add an ALL channel?
  if (allowAllChannel) {
    if (channels.length > 1) {
      channels.unshift(EVERYTHING_CHANNEL);
    }
  } else if (!selectedSubscription) {
    selectedSubscription = [subscriptions[0]];
  }
  return selectedSubscription;
};

export const buildDeployablesMap = (subscriptions, modelSubscriptions) => {
  const rulesMap = {};
  const deployableMap = {};
  let arr = null;

  subscriptions.forEach((subscription) => {
    modelSubscriptions.push(subscription);
    // build up map of what deployables to get for a bulk fetch
    subscription.deployablePaths.forEach((deployablePath) => {
      if (deployablePath && deployablePath.split('/').length > 0) {
        const [deployableNamespace, deployableName] = deployablePath.split('/');
        arr = deployableMap[deployableNamespace];
        if (!arr) {
          deployableMap[deployableNamespace] = [];
          arr = deployableMap[deployableNamespace];
        }
        arr.push({ deployableName, subscription });
        subscription.deployables = [];
      }
    });
    delete subscription.deployablePaths;

    // ditto for rules
    const ruleNamespace = _.get(subscription, 'metadata.namespace');
    _.get(subscription, 'spec.placement.placementRef.name', '')
      .split(',').forEach((ruleName) => {
        if (ruleName) {
          arr = rulesMap[ruleNamespace];
          if (!arr) {
            rulesMap[ruleNamespace] = [];
            arr = rulesMap[ruleNamespace];
          }
          arr.push({ ruleName, subscription });
          subscription.rules = [];
        }
      });
  });

  return { deployableMap, rulesMap };
};

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

      return this.kubeConnector.post(`/apis/apps.open-cluster-management.io/v1/namespaces/${namespace}/${appKinds[resource.kind]}`, resource)
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


  // return application namespace object
  async getApplicationNamespace(namespace) {
    const namespaces = await this.kubeConnector.getNamespaceResources({ namespaces: namespace.split(',') });
    return namespaces.map(async ns => ({
      metadata: ns.metadata,
      name: ns.metadata.name || '',
      raw: ns,
    }));
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
    return apps.filter(app => app.metadata)
      .map(app => ({
        metadata: app.metadata,
      }));
  }

  // ///////////// USED FOR APPLICATION TOPOLOGY ////////////////
  // ///////////// USED FOR APPLICATION TOPOLOGY ////////////////
  // ///////////// USED FOR APPLICATION TOPOLOGY ////////////////
  // ///////////// USED FOR APPLICATION TOPOLOGY ////////////////

  async getApplication(name, namespace, selectedChannel) {
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
      let subscriptionNames = _.get(app, 'metadata.annotations["apps.open-cluster-management.io/subscriptions"]') ||
        _.get(app, 'metadata.annotations["app.ibm.com/subscriptions"]');
      let deployableNames = _.get(app, 'metadata.annotations["apps.open-cluster-management.io/deployables"]') ||
        _.get(app, 'metadata.annotations["app.ibm.com/subscriptions/deployables"]');
      if (subscriptionNames && subscriptionNames.length > 0) {
        subscriptionNames = subscriptionNames.split(',');
        const allSubscriptions =
          await this.getApplicationResources(subscriptionNames, 'subscriptions', 'Subscription');

        // get deployables from the subscription annotation
        const { subscriptions, allowAllChannel } = getSubscriptionsDeployables(allSubscriptions);
        // pick subscription based on channel requested by ui
        model.activeChannel = selectedChannel;

        // what subscriptions does user want to see
        model.channels = [];
        model.subscriptions = [];

        // get all the channels ad find selected subscription from selected channel
        const subscr = getAllChannels(
          subscriptions, model.channels
          , selectedChannel, allowAllChannel,
        );
        // get all requested subscriptions
        const selectedSubscription = subscr;
        const { deployableMap, rulesMap } =
          buildDeployablesMap(selectedSubscription || subscriptions, model.subscriptions);
        // now fetch them
        await this.getAppDeployables(deployableMap, namespace, selectedSubscription, subscriptions);
        await this.getAppRules(rulesMap);
      } else if (deployableNames && deployableNames.length > 0) {
        deployableNames = deployableNames.split(',');
        model.deployables =
          await this.getApplicationResources(deployableNames, 'deployables', 'Deployable');
        await this.getPlacementRules(model.deployables);
      }
    }
    return model;
  }

  async getAppDeployables(deployableMap) {
    const requests = Object.entries(deployableMap).map(async ([namespace, values]) => {
      // get all deployables in this namespace
      const response = await this.kubeConnector.getResources(
        ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/deployables`,
        { kind: 'Deployable', namespaces: [namespace] },
      ) || [];

      // stuff responses into subscriptions that requested them
      response.forEach((deployable) => {
        const name = _.get(deployable, 'metadata.name');
        values.forEach(({ deployableName, subscription }) => {
          if (name === deployableName) {
            subscription.deployables.push(deployable);
          }
        });
      });
    });
    return Promise.all(requests);
  }

  async getAppRules(rulesMap) {
    const requests = Object.entries(rulesMap).map(async ([namespace, values]) => {
      // get all rules in this namespace
      const response = await this.kubeConnector.getResources(
        ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules`,
        { kind: 'PlacementRule', namespaces: [namespace] },
      ) || [];

      // stuff responses into subscriptions that requested them
      response.forEach((rule) => {
        const name = _.get(rule, 'metadata.name');
        values.forEach(({ ruleName, subscription }) => {
          if (name === ruleName) {
            subscription.rules.push(rule);
          }
        });
      });
    });
    return Promise.all(requests);
  }

  async getApplicationResources(names, type, kind) {
    const namespaces = new Set(names.map(name => name.split('/')[0]));
    const response = await this.kubeConnector.getResources(
      ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/${type}`,
      { kind, namespaces: Array.from(namespaces) },
    );
    return filterByNameNamespace(names, response);
  }

  async getPlacementRules(resources) {
    const requests = resources.map(async (resource) => {
      // if this one has a placement rule reference get that
      const name = _.get(resource, 'spec.placement.placementRef.name');
      if (name) {
        const namespace = _.get(resource, 'metadata.namespace');
        const response = await this.kubeConnector.getResources(
          ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules`,
          { kind: 'PlacementRule', namespaces: [namespace] },
        );
        if (Array.isArray(response)) {
          const [rules] = filterByName([name], response);
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
    return apps.filter(app => app.metadata)
      .map(async (app) => {
        const deployableNames = _.get(app, 'metadata.annotations["apps.open-cluster-management.io/deployables"]') ?
          _.get(app, 'metadata.annotations["apps.open-cluster-management.io/deployables"]').split(',') : [];
        const placementBindingNames = _.get(app, 'metadata.annotations["apps.open-cluster-management.io/placementbindings"]') ?
          _.get(app, 'metadata.annotations["apps.open-cluster-management.io/placementbindings"]').split(',') : [];
        const placementPolicyItems = await Promise.all(placementBindingNames.map(pbName => this.kubeConnector.get(`/apis/apps.open-cluster-management.io/v1/namespaces/${app.metadata.namespace}/placementbindings/${pbName}`)));
        const placementPolicyNames =
          placementPolicyItems.map(pp => pp.placementRef && pp.placementRef.name);
        return {
          applicationRelationshipNames: _.get(app, 'metadata.annotations["apps.open-cluster-management.io/applicationrelationships"]') ? _.get(app, 'metadata.annotations["apps.open-cluster-management.io/applicationrelationships"]').split(',') : [],
          applicationWorkNames: app.metadata.name || '',
          dashboard: _.get(app, 'metadata.annotations["apps.open-cluster-management.io/dashboard"]') || '',
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
      ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/deployables`,
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

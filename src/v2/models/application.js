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
import { responseHasError } from '../lib/utils';
import logger from '../lib/logger';
import GenericModel from './generic';

export const ALL_SUBSCRIPTIONS = '__ALL__/SUBSCRIPTIONS__';
const EVERYTHING_CHANNEL = '__ALL__/__ALL__//__ALL__/__ALL__';
const DEPLOYABLES = 'metadata.annotations["apps.open-cluster-management.io/deployables"]';
const NAMESPACE = 'metadata.namespace';

export const filterByName = (names, items) => items.filter((item) => names.find((name) => name === item.metadata.name));

export const filterByNameNamespace = (names, items) => items.filter(({ metadata }) => names.find((name) => {
  const path = name.split('/');
  return metadata && path.length === 2 && path[1] === metadata.name && path[0] === metadata.namespace;
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
  let allDeployablePaths = 0;
  allSubscriptions.forEach((subscription) => {
    const deployablePaths = _.get(subscription, DEPLOYABLES, '').split(',').sort();
    allDeployablePaths += deployablePaths.length;

    if (deployablePaths.length > 20) {
      const chunks = _.chunk(deployablePaths, 16);
      // if last chunk is just one, append to 2nd to last chunk
      const len = chunks.length - 1;
      if (chunks[len].length === 1) {
        chunks[len - 1].push(chunks[len][0]);
        chunks.pop();
      }
      chunks.forEach((chuck) => {
        subscriptions.push({ ...subscription, deployablePaths: chuck, isChucked: true });
      });
    } else {
      subscriptions.push({ ...subscription, deployablePaths });
    }
  });
  // hide all subscription option
  if (allDeployablePaths > 100 || allSubscriptions.length <= 1) {
    allowAllChannel = false;
  }

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
      // set default selectedSubscription when topology first render
      if (!selectedSubscription) {
        selectedSubscription = subscriptions.length > 0 ? [subscriptions[0]] : null;
      }
    }
  } else if (!selectedSubscription) {
    selectedSubscription = subscriptions.length > 0 ? [subscriptions[0]] : null;
  }
  // renders all subscriptions when selected all subscriptions
  if (allowAllChannel && selectedChannel === '__ALL__/__ALL__//__ALL__/__ALL__') {
    selectedSubscription = subscriptions;
  }
  return selectedSubscription;
};

export const buildDeployablesMap = (subscriptions, modelSubscriptions) => {
  const rulesMap = {};
  const deployableMap = {};
  const channelsMap = {};
  const postHooksMap = {};
  const preHooksMap = {};
  let arr = null;

  subscriptions.forEach((subscription) => {
    modelSubscriptions.push(subscription);
    // build up map of what deployables to get for a bulk fetch
    if (subscription.deployablePaths) {
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
    }

    // get post hooks
    const postHooks = _.get(subscription, 'status.ansiblejobs.posthookjobshistory', []);
    postHooks.forEach((value) => {
      const [deployableNamespace, deployableName] = value.split('/');
      if (deployableNamespace && deployableName) {
        arr = postHooksMap[deployableNamespace];
        if (!arr) {
          postHooksMap[deployableNamespace] = [];
          arr = postHooksMap[deployableNamespace];
        }
        arr.push({ deployableName, subscription });
      }
    });

    // get pre hooks
    const preHooks = _.get(subscription, 'status.ansiblejobs.prehookjobshistory', []);
    preHooks.forEach((value) => {
      const [deployableNamespace, deployableName] = value.split('/');
      if (deployableNamespace && deployableName) {
        arr = preHooksMap[deployableNamespace];
        if (!arr) {
          preHooksMap[deployableNamespace] = [];
          arr = preHooksMap[deployableNamespace];
        }
        arr.push({ deployableName, subscription });
      }
    });

    // ditto for channels
    const [chnNamespace, chnName] = _.get(subscription, 'spec.channel', '').split('/');
    if (chnNamespace && chnName) {
      arr = channelsMap[chnNamespace];
      if (!arr) {
        channelsMap[chnNamespace] = [];
        arr = channelsMap[chnNamespace];
      }
      arr.push({ chnName, subscription });
      subscription.channels = [];
    }

    // ditto for rules
    const ruleNamespace = _.get(subscription, NAMESPACE);
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
  return {
    deployableMap,
    channelsMap,
    rulesMap,
    preHooksMap,
    postHooksMap,
  };
};

export const evaluateSingleAnd = (operand1, operand2) => operand1 && operand2;

export const evaluateDoubleAnd = (operand1, operand2, operand3) => operand1 && operand2 && operand3;

export const evaluateSingleOr = (operand1, operand2) => operand1 || operand2;

export default class ApplicationModel extends GenericModel {
  // ///////////// CREATE APPLICATION ////////////////
  // ///////////// CREATE APPLICATION ////////////////
  // ///////////// CREATE APPLICATION ////////////////

  async createApplication(args) {
    const { application } = args;
    const response = await this.mutateApplication(application);
    return response;
  }

  // ///////////// UPDATE APPLICATION ////////////////
  // ///////////// UPDATE APPLICATION ////////////////
  // ///////////// UPDATE APPLICATION ////////////////

  async updateApplication(args) {
    const { application } = args;
    const deleteLinks = application.pop();
    const response = await this.mutateApplication(application, deleteLinks);
    return response;
  }

  // ///////////// UPDATE APPLICATION ////////////////
  // ///////////// UPDATE APPLICATION ////////////////
  // ///////////// UPDATE APPLICATION ////////////////

  async mutateApplication(application, deleteLinks) {
    let resources = application;
    const created = [];
    const updated = [];
    const errors = [];
    const isEdit = !!deleteLinks;

    const checkAndCollectError = (response) => {
      if (response.code >= 400 || response.status === 'Failure' || response.message) {
        errors.push({ message: response.message });
        return true;
      }
      return false;
    };

    // determine resources that require a namespace
    let namespace;
    let namespaces = new Set();
    resources.forEach(({ kind, metadata = {} }) => {
      switch (kind) {
        case 'Application':
        case 'Channel':
        case 'Subscription':
          ({ namespace } = metadata);
          if (namespace === null) {
            // namespace has all whitespace characters
            errors.push({ message: `${kind} namespace is invalid, it contains only whitespace characters.` });
            return { errors };
          }

          namespaces.add(namespace);
          break;

        default:
          break;
      }
      return true;
    });

    // filter out Namespace resources that don't belong to App, Channel, Subscription
    // if a namespace belongs to app, etc, we create them all at once
    // if a namespace is independant, we create it separately (might be a secret, etc)
    // ignore reqource path with no apiVersion, such as deleteLinks
    resources = resources.filter(({ kind, metadata = {} }) => kind !== undefined && (kind !== 'Namespace' || !namespaces.has(metadata.name)));
    namespaces = Array.from(namespaces);

    // get resource end point for each resource
    const requestPaths = await Promise.all(resources.map(async (resource) => this.getResourceEndPoint(resource)));
    if (requestPaths.length > 0) {
      const missingTypes = [];
      const missingEndPoints = [];
      requestPaths.forEach((path, index) => {
        if (path === undefined) {
          missingTypes.push(`${resources[index].apiVersion}`);
        } else if (path === null) {
          missingEndPoints.push(`${resources[index].kind}`);
        }
      });
      if (missingTypes.length > 0) {
        errors.push({ message: `Cannot find resource types: ${missingTypes.join(', ')}` });
      }
      if (missingEndPoints.length > 0) {
        errors.push({ message: `Cannot find endpoints: ${missingEndPoints.join(', ')}` });
      }
      if (errors.length > 0) {
        return { errors };
      }
    } else {
      errors.push({ message: 'Cannot find any endpoints' });
      return { errors };
    }

    // create/modify the Application last
    let applicationResource;
    let applicationRequestPath;
    resources = resources.filter((resource, index) => {
      if (resource.kind === 'Application') {
        applicationResource = resource;
        ([applicationRequestPath] = requestPaths.splice(index, 1));
        return false;
      }
      return true;
    });

    // if there's a namespace, try to create it
    if (namespaces.length === 0) {
      errors.push({ message: 'No namespaces specified' });
      return { errors };
    }

    const existingNamespaces = await this.kubeConnector.get('/api/v1/namespaces');
    const namespaceResponses = await Promise.all(namespaces.map((ns) => {
      let namespaceExists = false;
      if (existingNamespaces && existingNamespaces.items) {
        namespaceExists = existingNamespaces.items.find((existingNamespace) => existingNamespace.metadata.name === ns);
      }
      return !namespaceExists ? this.createNamespace(ns) : undefined;
    }));

    namespaceResponses.forEach((item) => {
      if (item) {
        checkAndCollectError(item);
      }
    });
    if (errors.length !== 0) {
      return { errors };
    }

    // try to create application resources
    const result = await Promise.all(resources.map((resource, index) => this.kubeConnector.post(requestPaths[index], resource)
      .catch((err) => ({
        status: 'Failure',
        message: err.message,
      }))));
    const updates = [];
    result.filter((item, index) => {
      if (!responseHasError(item)) {
        const { kind, metadata = {} } = item;
        created.push({ name: metadata.name, kind });
        return false;
      }
      if (item.code === 409) {
        // filter out "already existing" errors
        _.unset(resources[index], 'metadata.selfLink');
        updates.push({
          requestPath: requestPaths[index],
          resource: resources[index],
        });
        return false;
      }
      return true;
    }).forEach((item) => {
      checkAndCollectError(item);
    });

    // if the only errors were "already existing", patch those resources
    if (errors.length === 0 && updates.length > 0) {
      // Update the existing resources
      const replaced = await Promise.all(updates.map(({ requestPath, resource }) => {
        const name = _.get(resource, 'metadata.name');
        const path = `${requestPath}/${name}`;
        return this.kubeConnector.get(path)
          .then((existing) => {
            const resourceVersion = _.get(existing, 'metadata.resourceVersion');
            _.set(resource, 'metadata.resourceVersion', resourceVersion);
            const requestBody = {
              body: resource,
            };
            return this.kubeConnector.put(path, requestBody);
          }).catch((err) => {
            logger.error(err);
            throw err;
          });
      }));

      // report any errors
      replaced.forEach((item) => {
        if (!checkAndCollectError(item)) {
          const { kind, metadata = {} } = item;
          updated.push({ name: metadata.name, kind });
        }
      });
    }

    // if everything else created/updated
    if (errors.length === 0) {
      // if update
      if (isEdit) {
        // delete any removed resources except placement rules
        const destroyResponses = await Promise.all(Object.values(deleteLinks)[0]
          .filter((link) => link.kind !== 'PlacementRule' && (!link.selfLink || link.selfLink.indexOf('/placementrules/') === -1))
          .map((link) => this.deleteResource(link)))
          .catch((err) => ({
            status: 'Failure',
            message: err.message,
          }));
        checkAndCollectError(destroyResponses);

        // don't update application--constantly changing
      } else {
        // if create, create the application
        const deployment = await this.kubeConnector.post(applicationRequestPath, applicationResource)
          .catch((err) => ({
            status: 'Failure',
            message: err.message,
          }));
        checkAndCollectError(deployment);
      }
    }

    return {
      errors,
      updated,
      created,
    };
  }

  async createNamespace(namespace) {
    let response = await this.kubeConnector.post('/apis/project.openshift.io/v1/projectrequests', { metadata: { name: namespace } }).catch((err) => {
      logger.error(err);
      throw err;
    });
    if (responseHasError(response)) {
      if (response.code === 409) {
        response = await this.kubeConnector.get(`/api/v1/namespaces/${namespace}`);
      }
    } else {
      this.updateUserNamespaces(response);
    }
    return response;
  }

  // ///////////// GET APPLICATION OVERVIEW ////////////////
  // ///////////// GET APPLICATION OVERVIEW ////////////////
  // ///////////// GET APPLICATION OVERVIEW ////////////////

  // for overview page
  async getApplicationOverview(name, namespace = 'default') {
    let apps;
    try {
      if (name) {
        apps = await this.kubeConnector.getResources(
          (ns) => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications/${name}`,
          { namespaces: [namespace] },
        );
      } else {
        apps = await this.kubeConnector.getResources((ns) => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications`);
      }
      apps = await Promise.all(apps);
    } catch (err) {
      logger.error(err);
      throw err;
    }
    return apps.filter((app) => app.metadata)
      .map((app) => ({
        metadata: app.metadata,
      }));
  }

  // ///////////// GET APPLICATION ////////////////
  // ///////////// GET APPLICATION ////////////////
  // ///////////// GET APPLICATION ////////////////

  // for topology and editor pages
  async getApplication(name, namespace, selectedChannel, includeChannels) {
    // get application
    let model = null;
    let apps;
    let applicationSet;
    try {
      apps = await this.kubeConnector.getResources(
        (ns) => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications/${name}`,
        { namespaces: [namespace] },
      );

      if (apps.length === 0) {
        // get all argo apps in this namespace
        apps = await this.kubeConnector.getResources(
          (ns) => `/apis/argoproj.io/v1alpha1/namespaces/${ns}/applications`,
          { namespaces: [namespace] },
        );

        applicationSet = apps.find((appItem) => evaluateSingleAnd(appItem.metadata.name === name, appItem.metadata.namespace === namespace));

        if (!applicationSet) {
          return model;
        }
        // array for grouping similar apps
        const appGroup = [];
        _.set(applicationSet, 'spec.apps', appGroup);
        // this is where we keep all destinations
        const destinations = [];
        _.set(applicationSet, 'spec.destinations', destinations);

        if (apps.length > 1) {
          // get targets from all apps and put them to the first app
          // this will behave as the application set, containing all info used to build the topology
          // provide application group of apps with the same repo
          apps.forEach((app) => {
            const appDestination = _.get(app, 'spec.destination');
            if (appDestination) {
              destinations.push(appDestination);
            }
            const appRepo = _.get(app, 'spec.source.repoURL');
            const appRepoPath = _.get(app, 'spec.source.path');
            if (evaluateDoubleAnd(app.metadata.name !== name,
              appRepo === applicationSet.spec.source.repoURL,
              appRepoPath === applicationSet.spec.source.path)) {
              appGroup.push(app);
            }
          });
        }
      }
    } catch (err) {
      logger.error(err);
      throw err;
    }

    if (apps.length > 0) {
      const app = !applicationSet ? apps[0] : applicationSet;

      // get its associated resources
      model = {
        name, namespace, app, metadata: app.metadata,
      };

      if (app.apiVersion.indexOf('argoproj.io') > -1) {
        return model;
      }

      // get subscriptions to channels (pipelines)
      let subscriptionNames = _.get(app, 'metadata.annotations["apps.open-cluster-management.io/subscriptions"]');
      let deployableNames = _.get(app, DEPLOYABLES);
      if (evaluateSingleAnd(subscriptionNames, subscriptionNames.length > 0)) {
        subscriptionNames = subscriptionNames.split(',');
        // filter local hub subscription
        const filteredSubscriptions = [];
        subscriptionNames.forEach((subscriptionName) => {
          if (!(evaluateSingleAnd(_.endsWith(subscriptionName, '-local'), _.indexOf(subscriptionNames, _.trimEnd(subscriptionName, '-local')) !== -1))) {
            filteredSubscriptions.push(subscriptionName);
          }
        });
        const allSubscriptions = await this.getApplicationResources(filteredSubscriptions, 'subscriptions', 'Subscription');

        // get deployables from the subscription annotation
        const { subscriptions, allowAllChannel } = getSubscriptionsDeployables(allSubscriptions);
        // pick subscription based on channel requested by ui
        model.activeChannel = selectedChannel;

        // what subscriptions does user want to see
        model.channels = [];
        model.subscriptions = [];
        model.allSubscriptions = allSubscriptions;
        model.allChannels = [];
        model.allClusters = [];

        // get all the channels and find selected subscription from selected channel
        const subscr = getAllChannels(
          subscriptions, model.channels,
          selectedChannel, allowAllChannel,
        );

        // get all requested subscriptions
        const selectedSubscription = selectedChannel === ALL_SUBSCRIPTIONS ? allSubscriptions : subscr;
        const {
          deployableMap, channelsMap, rulesMap, preHooksMap, postHooksMap,
        } = buildDeployablesMap(evaluateSingleOr(selectedSubscription, subscriptions), model.subscriptions);
        // now fetch them
        await this.getAppDeployables(deployableMap, namespace, selectedSubscription, subscriptions);
        await this.getAppHooks(preHooksMap, true);
        await this.getAppHooks(postHooksMap, false);
        await this.getAppRules(rulesMap, model.allClusters);
        // get all channels
        await this.getAllAppChannels(model.allChannels, allSubscriptions);
        if (includeChannels) {
          await this.getAppChannels(channelsMap);
        }
      } else if (evaluateSingleAnd(deployableNames, deployableNames.length > 0)) {
        deployableNames = deployableNames.split(',');
        model.deployables = await this.getApplicationResources(deployableNames, 'deployables', 'Deployable');
        await this.getPlacementRules(model.deployables);
      }
    }
    return model;
  }

  async getAppDeployables(deployableMap) {
    const requests = Object.entries(deployableMap).map(async ([namespace, values]) => {
      // get all deployables in this namespace
      let response;
      try {
        response = await this.kubeConnector.getResources(
          (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/deployables`,
          { kind: 'Deployable', namespaces: [namespace] },
        ) || [];
      } catch (err) {
        logger.error(err);
        throw err;
      }

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

  async getAppHooks(hooks, isPreHooks) {
    const requests = Object.entries(hooks).map(async ([namespace, values]) => {
      // get all ansible hooks in this namespace
      let response;
      try {
        response = await this.kubeConnector.getResources(
          (ns) => `/apis/tower.ansible.com/v1alpha1/namespaces/${ns}/ansiblejobs`,
          { kind: 'AnsibleJob', namespaces: [namespace] },
        ) || [];
      } catch (err) {
        logger.error(err);
        throw err;
      }
      // stuff responses into subscriptions that requested them
      response.forEach((deployable) => {
        const name = _.get(deployable, 'metadata.name');
        values.forEach(({ deployableName, subscription }) => {
          if (name === deployableName) {
            if (isPreHooks) {
              if (!subscription.prehooks) {
                subscription.prehooks = [];
              }
              subscription.prehooks.push(deployable);
            } else {
              if (!subscription.posthooks) {
                subscription.posthooks = [];
              }
              subscription.posthooks.push(deployable);
            }
          }
        });
      });
    });
    return Promise.all(requests);
  }

  async getAppChannels(channelsMap) {
    const requests = Object.entries(channelsMap).map(async ([namespace, values]) => {
      // get all rules in this namespace
      const response = await this.kubeConnector.getResources(
        (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels`,
        { kind: 'Channel', namespaces: [namespace] },
      ) || [];

      // stuff responses into subscriptions that requested them
      response.forEach((channel) => {
        const name = _.get(channel, 'metadata.name');
        values.forEach(({ chnName, subscription }) => {
          if (name === chnName) {
            subscription.channels.push(channel);
          }
        });
      });
    });
    return Promise.all(requests);
  }

  // get all channels for all subscriptions
  // this is used to build the subscription cards information
  async getAllAppChannels(appAllChannels, allSubscriptions) {
    let requests;
    try {
      // get all channels information
      const channelsMap = {};
      allSubscriptions.forEach((subscription) => {
        const chnlData = _.get(subscription, 'spec.channel', '').split('/');
        if (chnlData.length === 2) {
          // eslint-disable-next-line prefer-destructuring
          channelsMap[chnlData[0]] = chnlData[1];
        }
      });
      requests = Object.entries(channelsMap).map(async ([channelNS, channelName]) => {
        const response = await this.kubeConnector.getResources(
          (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels/${channelName}`,
          { kind: 'Channel', namespaces: [channelNS] },
        ) || [];
        // stuff response into appAllChannels
        response.forEach((channel) => {
          appAllChannels.push(channel);
        });
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
    return Promise.all(requests);
  }

  async getAppRules(rulesMap, allClusters) {
    let requests;
    try {
      requests = Object.entries(rulesMap).map(async ([namespace, values]) => {
        // get all rules in this namespace
        const response = await this.kubeConnector.getResources(
          (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules`,
          { kind: 'PlacementRule', namespaces: [namespace] },
        ) || [];

        // stuff responses into subscriptions that requested them
        response.forEach((rule) => {
          const name = _.get(rule, 'metadata.name');
          values.forEach(({ ruleName, subscription }) => {
            if (name === ruleName) {
              subscription.rules.push(rule);
              const clusters = _.get(rule, 'status.decisions', []);
              clusters.forEach((cluster) => {
                // get cluster name
                const clusterName = _.get(cluster, 'clusterName');
                if (clusterName && allClusters.indexOf(clusterName) === -1) {
                  allClusters.push(clusterName);
                }
              });
            }
          });
        });
      });
    } catch (err) {
      logger.error(err);
      throw err;
    }
    return Promise.all(requests);
  }

  async getApplicationResources(names, type, kind) {
    const namespaces = new Set(names.map((name) => name.split('/')[0]));
    let response;
    try {
      response = await this.kubeConnector.getResources(
        (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/${type}`,
        { kind, namespaces: Array.from(namespaces) },
      );
    } catch (err) {
      logger.error(err);
      throw err;
    }

    return filterByNameNamespace(names, response);
  }

  async getPlacementRules(resources) {
    const requests = resources.map(async (resource) => {
      // if this one has a placement rule reference get that
      const name = _.get(resource, 'spec.placement.placementRef.name');
      if (name) {
        const namespace = _.get(resource, NAMESPACE);
        let response;
        try {
          response = await this.kubeConnector.getResources(
            (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules`,
            { kind: 'PlacementRule', namespaces: [namespace] },
          );
        } catch (err) {
          logger.error(err);
          throw err;
        }
        if (Array.isArray(response)) {
          const [rules] = filterByName([name], response);
          return _.merge(resource, { rules });
        }
      }
      return resource;
    });
    return Promise.all(requests);
  }

  async getApplicationNamespace() {
    const namespaces = await this.kubeConnector.getNamespaceResources({ });
    return _.filter(namespaces, (ns) => !_.get(ns, 'metadata.name', '').startsWith('openshift') && !_.get(ns, 'metadata.name', '').startsWith('open-cluster-management'));
  }

  async getSecrets(namespace) {
    const secrets = await this.kubeConnector.getResources((ns) => `/api/v1/namespaces/${ns}/secrets`, { namespaces: [namespace] }).catch((err) => {
      logger.error(err);
      throw err;
    });
    return secrets.filter((secret) => secret.metadata && _.get(secret, 'data.host') && _.get(secret, 'data.token'))
      .map((secret) => ({
        name: _.get(secret, 'metadata.name', 'unknown'),
        namespace: _.get(secret, 'metadata.name', 'unknown'),
      }));
  }
}

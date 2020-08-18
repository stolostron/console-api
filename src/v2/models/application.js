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
import { responseHasError } from '../lib/utils';
import logger from '../lib/logger';

const EVERYTHING_CHANNEL = '__ALL__/__ALL__//__ALL__/__ALL__';
const DEPLOYABLES = 'metadata.annotations["apps.open-cluster-management.io/deployables"]';
const NAMESPACE = 'metadata.namespace';

export const filterByName = (names, items) => items.filter((item) => names.find((name) => name === item.metadata.name));

export const filterByNameNamespace = (names, items) => items.filter(({ metadata }) => names.find((name) => {
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
    const deployablePaths = _.get(subscription, DEPLOYABLES, '').split(',').sort();

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
  const channelsMap = {};
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

  return { deployableMap, channelsMap, rulesMap };
};

export default class ApplicationModel extends KubeModel {
  // ///////////// CREATE APPLICATION ////////////////
  // ///////////// CREATE APPLICATION ////////////////
  // ///////////// CREATE APPLICATION ////////////////

  async createApplication(args) {
    let { application: resources } = args;
    const created = [];
    const updated = [];
    const errors = [];

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
    resources = resources.filter(({ kind, metadata = {} }) => kind !== 'Namespace' || !namespaces.has(metadata.name));
    namespaces = Array.from(namespaces);

    // get resource end point for each resource
    const k8sPaths = await this.kubeConnector.get('/');
    const requestPaths = await Promise.all(resources.map(async (resource) => this.getResourceEndPoint(resource, k8sPaths)));
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

    // try to create all resouces EXCEPT ClusterDeployment
    // we don't want to create ClusterDeployment until all the other resources successfully created
    // because we check if the ClusterDeployment exists in this namespace
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
      const namespaceExists = existingNamespaces.items.find((existingNamespace) => existingNamespace.metadata.name === ns);
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
      // get the selfLinks of the existing resources
      const existing = await Promise.all(updates.map(({ requestPath, resource }) => {
        const name = _.get(resource, 'metadata.name');
        return this.kubeConnector.get(`${requestPath}/${name}`);
      }));

      // then update the resources
      const replaced = await Promise.all(updates.map(({ resource }, index) => {
        const selfLink = _.get(existing, `[${index}].metadata.selfLink`);
        const resourceVersion = _.get(existing, `[${index}].metadata.resourceVersion`);
        _.set(resource, 'metadata.resourceVersion', resourceVersion);
        const requestBody = {
          body: resource,
        };
        return this.kubeConnector.put(`${selfLink}`, requestBody);
      }));

      // report any errors
      replaced.forEach((item) => {
        if (!checkAndCollectError(item)) {
          const { kind, metadata = {} } = item;
          updated.push({ name: metadata.name, kind });
        }
      });
    }

    if (errors.length === 0) {
      // last but not least, if everything else deployed, deploy Application
      const deployment = await this.kubeConnector.post(applicationRequestPath, applicationResource)
        .catch((err) => ({
          status: 'Failure',
          message: err.message,
        }));
      checkAndCollectError(deployment);
    }

    return {
      errors,
      updated,
      created,
    };
  }

  async getResourceEndPoint(resource, k8sPaths) {
    // dynamically get resource endpoint from kebernetes API
    // ie.https://ec2-54-84-124-218.compute-1.amazonaws.com:8443/kubernetes/
    if (k8sPaths) {
      const { apiVersion, kind } = resource;
      const apiPath = k8sPaths.paths.find((path) => path.match(`/[0-9a-zA-z]*/?${apiVersion}`));
      if (apiPath) {
        return (async () => {
          const k8sResourceList = await this.kubeConnector.get(`${apiPath}`);
          const resourceType = k8sResourceList.resources.find((item) => item.kind === kind);
          const namespace = _.get(resource, 'metadata.namespace');
          const { name, namespaced } = resourceType;
          if (namespaced && !namespace) {
            return null;
          }
          const requestPath = namespaced ? `namespaces/${namespace}/` : '';
          return `${apiPath}/${requestPath}${name}`;
        })();
      }
    }
    return undefined;
  }

  async createNamespace(namespace) {
    const body = {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: namespace,
      },
    };
    let response = await this.kubeConnector.post('/api/v1/namespaces', body);
    if (responseHasError(response)) {
      if (response.code === 409) {
        response = await this.kubeConnector.get(`/api/v1/namespaces/${namespace}`);
      }
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
    try {
      apps = await this.kubeConnector.getResources(
        (ns) => `/apis/app.k8s.io/v1beta1/namespaces/${ns}/applications/${name}`,
        { namespaces: [namespace] },
      );
    } catch (err) {
      logger.error(err);
      throw err;
    }

    if (apps.length > 0) {
      const app = apps[0];

      // get its associated resources
      model = {
        name, namespace, app, metadata: app.metadata,
      };

      // get subscriptions to channels (pipelines)
      let subscriptionNames = _.get(app, 'metadata.annotations["apps.open-cluster-management.io/subscriptions"]')
        || _.get(app, 'metadata.annotations["app.ibm.com/subscriptions"]');
      let deployableNames = _.get(app, DEPLOYABLES)
        || _.get(app, 'metadata.annotations["app.ibm.com/subscriptions/deployables"]');
      if (subscriptionNames && subscriptionNames.length > 0) {
        subscriptionNames = subscriptionNames.split(',');
        const allSubscriptions = await this.getApplicationResources(subscriptionNames, 'subscriptions', 'Subscription');

        // get deployables from the subscription annotation
        const { subscriptions, allowAllChannel } = getSubscriptionsDeployables(allSubscriptions);
        // pick subscription based on channel requested by ui
        model.activeChannel = selectedChannel;

        // what subscriptions does user want to see
        model.channels = [];
        model.subscriptions = [];

        // get all the channels ad find selected subscription from selected channel
        const subscr = getAllChannels(
          subscriptions, model.channels,
          selectedChannel, allowAllChannel,
        );
        // get all requested subscriptions
        const selectedSubscription = subscr;
        const { deployableMap, channelsMap, rulesMap } = buildDeployablesMap(selectedSubscription || subscriptions, model.subscriptions);
        // now fetch them
        await this.getAppDeployables(deployableMap, namespace, selectedSubscription, subscriptions);
        await this.getAppRules(rulesMap);
        if (includeChannels) {
          await this.getAppChannels(channelsMap);
        }
      } else if (deployableNames && deployableNames.length > 0) {
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

  async getAppRules(rulesMap) {
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
}

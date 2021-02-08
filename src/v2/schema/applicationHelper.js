/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc.
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
/* eslint no-param-reassign: "error" */
import _ from 'lodash';
import logger from '../lib/logger';

import {
  isPrePostHookDeployable,
  getClusterName,
  createReplicaChild,
  createIngressRouteChild,
  createGenericPackageObject,
  removeHelmReleaseName,
  addSubscriptionDeployable,
  addClusters,
} from './application-helper-util';

const templateKind = 'spec.template.kind';
const localClusterName = 'local-cluster';
const metadataName = 'metadata.name';
const preHookType = 'pre-hook';

function addSubscription(appId, subscription, isPlaced, links, nodes) {
  const { metadata: { namespace, name } } = subscription;
  const subscriptionId = `member--subscription--${namespace}--${name}`;
  const rule = _.get(subscription, 'rules[0]');
  nodes.push({
    name,
    namespace,
    type: 'subscription',
    id: subscriptionId,
    uid: subscriptionId,
    specs: {
      isDesign: true, hasRules: !!rule, isPlaced, raw: subscription,
    },
  });

  links.push({
    from: { uid: appId },
    to: { uid: subscriptionId },
    type: '',
    specs: { isDesign: true },
  });
  return subscriptionId;
}

function addSubscriptionRules(parentId, subscription, links, nodes) {
  subscription.rules.forEach((rule, idx) => {
    const { metadata: { name, namespace } } = rule;
    const ruleId = `member--rules--${namespace}--${name}--${idx}`;
    nodes.push({
      name,
      namespace,
      type: 'placements',
      id: ruleId,
      uid: ruleId,
      specs: { isDesign: true, raw: rule },
    });
    links.push({
      from: { uid: parentId },
      to: { uid: ruleId },
      type: '',
      specs: { isDesign: true },
    });
  });
}

// Route, Ingress, StatefulSet
export const processServiceOwner = (
  clusterId, routes, links, nodes,
  subscriptionStatusMap, names, namespace, subscription,
) => {
  const servicesMap = {};
  routes.forEach((deployable) => {
    const topoObject = addSubscriptionDeployable(
      clusterId, deployable, links, nodes,
      subscriptionStatusMap, names, namespace, subscription,
    );

    // get service info and map it to the object id
    const kind = _.get(deployable, templateKind, '');

    if (kind === 'Route') {
      const service = _.get(deployable, 'spec.template.spec.to.name');
      if (service) {
        servicesMap[service] = topoObject.id;
      }
    } else if (kind === 'Ingress') {
      // ingress
      const rules = _.get(deployable, 'spec.template.spec.rules', []);

      rules.forEach((rule) => {
        const rulePaths = _.get(rule, 'http.paths', []);
        rulePaths.forEach((path) => {
          const service = _.get(path, 'backend.serviceName');
          if (service) {
            servicesMap[service] = topoObject.id;
          }
        });
      });
    } else if (kind === 'StatefulSet') {
      const service = _.get(deployable, 'spec.template.spec.serviceName');
      if (service) {
        servicesMap[service] = topoObject.id;
      }
    }
  });
  // return a map of services that must be linked to these router
  return servicesMap;
};

export const processServices = (
  clusterId, services, links, nodes,
  subscriptionStatusMap, names, namespace, servicesMap, subscription,
) => {
  services.forEach((deployable) => {
    const serviceName = _.get(deployable, 'spec.template.metadata.name', '');
    let parentId = servicesMap[serviceName];
    if (!parentId) {
      parentId = clusterId;
    }

    addSubscriptionDeployable(
      parentId, deployable, links, nodes,
      subscriptionStatusMap, names, namespace, subscription,
    );
  });
};

export const processDeployables = (
  deployables,
  clusterId, links, nodes, subscriptionStatusMap, names, namespace, subscription,
) => {
  const routes = _.filter(deployables, (obj) => {
    const kind = _.get(obj, templateKind, '');
    return _.includes(['Route', 'Ingress', 'StatefulSet'], kind);
  });

  // process route and ingress first
  const serviceMap = processServiceOwner(
    clusterId, routes, links, nodes,
    subscriptionStatusMap, names, namespace, subscription,
  );

  const services = _.filter(deployables, (obj) => {
    const kind = _.get(obj, templateKind, '');
    return _.includes(['Service'], kind);
  });

  // then service
  processServices(
    clusterId, services, links, nodes,
    subscriptionStatusMap, names, namespace, serviceMap, subscription,
  );

  // then the rest
  const other = _.remove(deployables, (obj) => {
    const kind = _.get(obj, templateKind, '');
    return !_.includes(['Route', 'Ingress', 'Service', 'StatefulSet'], kind);
  });

  other.forEach((deployable) => {
    addSubscriptionDeployable(
      clusterId, deployable, links, nodes,
      subscriptionStatusMap, names, namespace, subscription,
    );
  });
};

export const getSubscriptionPackageInfo = (topoAnnotation, subscriptionName, appNamespace, channelInfo, subscription) => {
  const deployablesList = [];

  const deployables = _.split(topoAnnotation, ',');

  deployables.forEach((deployableInfo) => {
    const deployableData = _.split(deployableInfo, '/');

    if (deployableData.length === 6) {
      let dName = deployableData[4];

      let namespace = deployableData[3].length === 0 ? appNamespace : deployableData[3];
      let deployableName = deployableData[4];
      const deployableTypeLower = _.toLower(deployableData[2]);

      const isHook = isPrePostHookDeployable(subscription, dName, namespace);
      // process only helm charts and hooks
      if (deployableData[0] === 'helmchart' || isHook) {
        if (!isHook) {
          dName = removeHelmReleaseName(deployableData[4], deployableData[1]);
          namespace = deployableData[3].length === 0 ? appNamespace : deployableData[3];
          deployableName = `${subscriptionName}-${dName}-${dName}-${deployableTypeLower}`;
        }
        const version = 'apps.open-cluster-management.io/v1';
        const hasReplica = deployableData[5] !== '0';
        const deployable = {
          apiVersion: version,
          kind: 'Deployable',
          metadata: {
            namespace,
            name: deployableName,
            selfLink: `/apis/${version}/namespaces/${deployableData[3]}/deployables/${dName}-${deployableTypeLower}`,
          },
          spec: {
            template: {
              apiVersion: 'apps/v1',
              kind: deployableData[2],
              metadata: {
                namespace,
                name: dName,
              },
              spec: {
              },
            },
          },
        };

        if (hasReplica) {
          deployable.spec.template.spec.replicas = _.parseInt(deployableData[5]);
        }

        if (deployableTypeLower === 'helmrelease') {
          deployable.spec.template.spec.channel = channelInfo;
        }
        deployablesList.push(deployable);
      }
    }
  });
  return deployablesList;
};

export const createDeployableObject = (subscription, name, namespace, type, specData, parentId, nodes, links, linkName) => {
  let linkType = isPrePostHookDeployable(subscription, name, namespace);
  if (linkType === null) {
    linkType = linkName;
  }
  const objId = `member--deployable--${parentId}--${type.toLowerCase()}--${name}`;
  const newObject = {
    id: objId,
    uid: objId,
    name,
    namespace,
    type: type.toLowerCase(),
    specs: {
      isDesign: false,
      raw: {
        kind: type,
        metadata: {
          name,
          namespace,
        },
        spec: specData,
      },
    },

  };
  nodes.push(newObject);
  if (linkType === preHookType) {
    links.push({
      from: { uid: objId },
      to: { uid: parentId },
      type: linkType,
    });
  } else {
    links.push({
      from: { uid: parentId },
      to: { uid: objId },
      type: linkType,
    });
  }
  return newObject;
};

export const addSubscriptionCharts = (
  parentId, subscriptionStatusMap,
  nodes, links, names, appNamespace, channelInfo, subscriptionName,
  topoAnnotation, subscription,
) => {
  if (topoAnnotation) {
    const deployablesFromTopo = getSubscriptionPackageInfo(topoAnnotation, subscriptionName, appNamespace, channelInfo, subscription);
    processDeployables(
      deployablesFromTopo,
      parentId, links, nodes, subscriptionStatusMap, names, appNamespace, subscription,
    );
    return nodes;
  }

  let channelName = null;
  if (channelInfo) {
    const splitIndex = _.indexOf(channelInfo, '/');
    if (splitIndex !== -1) {
      channelName = channelInfo.substring(splitIndex + 1);
    }
  }
  const packagedObjects = {};

  if (!channelName) {
    createGenericPackageObject(parentId, appNamespace, nodes, links, subscriptionName);
    return nodes; // could not find the subscription channel name, abort
  }

  let foundDeployables = false;
  Object.values(subscriptionStatusMap).forEach((packageItem) => {
    if (packageItem) {
      Object.keys(packageItem).forEach((packageItemKey) => {
        if (packageItemKey.startsWith(channelName)) {
          const objectInfo = packageItemKey.substring(channelName.length + 1);
          let objectType;
          let objectName;
          // now find the type-name
          const splitIndex = _.indexOf(objectInfo, '-');
          if (splitIndex !== -1) {
            objectName = objectInfo.substring(splitIndex + 1);
            objectType = objectInfo.substring(0, splitIndex);
            const keyStr = `${objectName}-${objectType}`;
            if (!packagedObjects[keyStr]) {
              const resStatus = _.get(packageItem[packageItemKey], 'resourceStatus');
              const chartObject = createDeployableObject(subscription, objectName, appNamespace, objectType, resStatus, parentId, nodes, links, '');
              // create subobject replica subobject, if this object defines a replicas
              createReplicaChild(chartObject, chartObject.specs.raw, links, nodes);

              packagedObjects[keyStr] = chartObject;
              foundDeployables = true;
            }
          }
        }
      });
    }
  });
  if (!foundDeployables) {
    createGenericPackageObject(parentId, appNamespace, nodes, links, subscriptionName);
  }

  return nodes;
};

async function buildArgoApplication(application, name, namespace, nodes, links) {
  const clusters = [];
  let clusterNames = [];
  const serverDestinations = _.get(application, 'app.spec.destinations', []);
  serverDestinations.forEach((destination) => {
    try {
      const serverApi = _.get(destination, 'server', 'http://unknown');
      const serverURI = new URL(serverApi);
      let clusterName = serverURI && serverURI.hostname && serverURI.hostname.split('.').length > 1 ? serverURI.hostname.split('.')[1] : 'unkonwn';
      // console.log('serverURI', serverURI)
      if (clusterName === 'default') {
        // mark this as default cluster
        clusterName = localClusterName;
      }
      clusterNames.push(clusterName);
      clusters.push({ metadata: { name: clusterName, namespace: clusterName }, destination, status: 'ok' });
    } catch (err) {
      logger.error(err);
    }
  });
  clusterNames = _.uniq(clusterNames);

  const appId = `application--${name}`;
  nodes.push({
    name,
    namespace,
    type: 'application',
    id: appId,
    uid: appId,
    specs: {
      apps: { ...application.app.spec.apps },
      isDesign: true,
      raw: application.app,
      activeChannel: application.activeChannel,
      allSubscriptions: [],
      allChannels: [],
      allClusters: {
        isLocal: clusterNames.includes(localClusterName),
        remoteCount: clusterNames.includes(localClusterName) ? clusterNames.length - 1 : clusterNames.length,
      },
      channels: application.channels,
    },
  });

  delete application.app.spec.apps;
  // create cluster node
  const clusterId = addClusters(
    appId, new Set(), null,
    clusterNames, _.uniqBy(clusters, 'metadata.name'), links, nodes,
  );
  const resources = _.get(application, 'app.status.resources', []);

  resources.forEach((deployable) => {
    const {
      name: deployableName,
      namespace: deployableNamespace,
      kind,
      version,
      group,
    } = deployable;
    const type = kind.toLowerCase();

    const memberId = `member--clusters--${getClusterName(clusterId)}--${type}--${deployableNamespace}--${deployableName}`;

    const raw = {
      metadata: {
        deployableName,
        deployableNamespace,
      },
      ...deployable,
    };

    const apiGroup = group ? `${group}/${version}` : version;
    const apiVersion = version ? apiGroup : null;
    if (apiVersion) {
      raw.apiVersion = apiVersion;
    }

    const deployableObj = {
      deployableName,
      deployableNamespace,
      type,
      id: memberId,
      uid: memberId,
      specs: {
        isDesign: false,
        raw,
        parent: {
          clusterId,
        },
      },
    };

    nodes.push(deployableObj);
    links.push({
      from: { uid: clusterId },
      to: { uid: memberId },
      type: '',
    });

    const template = { metadata: {} };
    // create replica subobject, if this object defines a replicas
    createReplicaChild(deployableObj, template, links, nodes);
    // create route subobject, if this object is an ingress
    createIngressRouteChild(deployableObj, template, links, nodes);
  });
}

async function getApplicationElements(application, clusterModel) {
  const links = [];
  const nodes = [];

  // create application node
  let name;
  let namespace;
  ({ name, namespace } = application);

  // console.log('GET APP ELEMENTS', application)

  if (_.get(application, 'app.apiVersion').indexOf('argoproj.io') > -1) {
    buildArgoApplication(application, name, namespace, nodes, links);
    return { resources: _.uniqBy(nodes, 'uid'), relationships: links };
  }

  // create application node
  const allAppClusters = application.allClusters ? application.allClusters : [];
  const appId = `application--${name}`;
  nodes.push({
    name,
    namespace,
    type: 'application',
    id: appId,
    uid: appId,
    specs: {
      isDesign: true,
      raw: application.app,
      activeChannel: application.activeChannel,
      allSubscriptions: application.allSubscriptions ? application.allSubscriptions : [],
      allChannels: application.allChannels ? application.allChannels : [],
      allClusters: {
        isLocal: allAppClusters.indexOf(localClusterName) !== -1,
        remoteCount: allAppClusters.indexOf('local-cluster') !== -1 ? allAppClusters.length - 1 : allAppClusters.length,
      },
      channels: application.channels,
    },
  });

  // get clusters labels
  let clusters = await clusterModel.getAllClusters();
  // if application has subscriptions
  let memberId;
  let parentId;
  let clusterId;
  if (application.subscriptions) {
    const createdClusterElements = new Set();
    application.subscriptions.forEach((subscription) => {
      const subscriptionChannel = _.get(subscription, 'spec.channel');
      const subscriptionName = _.get(subscription, metadataName, '');
      const topoAnnotation = _.get(subscription, 'metadata.annotations', {})['apps.open-cluster-management.io/topo'];
      // get cluster placement if any
      const ruleDecisionMap = {};
      if (subscription.rules) {
        subscription.rules.forEach((rule) => {
          const ruleDecisions = _.get(rule, 'status.decisions');
          if (ruleDecisions) {
            ruleDecisions.forEach(({ clusterName, clusterNamespace }) => {
              ruleDecisionMap[clusterName] = clusterNamespace;
            });
          }
        });
      }
      if (_.get(subscription, 'spec.placement.local', '') === true && subscription.rules && _.includes(clusters, localClusterName) === false) {
        const localCluster = {
          metadata: {
            name: localClusterName,
            namespace: localClusterName,
          },
        };
        clusters = _.concat(clusters, localCluster);
        ruleDecisionMap[localClusterName] = localClusterName;
      }

      const ruleClusterNames = Object.keys(ruleDecisionMap);
      const isRulePlaced = ruleClusterNames.length > 0;

      // get subscription statuses
      const subscriptionStatusMap = {};
      const subscribeDecisions = _.get(subscription, 'status.statuses');
      if (subscribeDecisions) {
        Object.entries(subscribeDecisions).forEach(([clusterName, value]) => {
          subscriptionStatusMap[clusterName] = _.get(value, 'packages');
        });
      }

      // add subscription
      parentId = addSubscription(appId, subscription, isRulePlaced, links, nodes);

      // add rules if any
      let hasPlacementRules = false;
      if (subscription.rules) {
        addSubscriptionRules(parentId, subscription, links, nodes);
        delete subscription.rules;
        hasPlacementRules = true;
      }

      // add cluster(s) if any
      if (isRulePlaced) {
        // add cluster(s) if any or if too many
        const clusterShapes = ruleClusterNames.length > 1
          ? [ruleClusterNames] : ruleClusterNames.map((cn) => [cn]);
        clusterShapes.forEach((names) => {
          // add cluster element
          clusterId = addClusters(
            parentId, createdClusterElements, subscription,
            names, clusters, links, nodes,
          );

          if (subscription.deployables) {
            // add deployables if any

            processDeployables(
              subscription.deployables,
              clusterId, links, nodes, subscriptionStatusMap, names, namespace, subscription,
            );
          }

          if (topoAnnotation) {
            addSubscriptionCharts(
              clusterId, subscriptionStatusMap, nodes,
              links, names, namespace, subscriptionChannel, subscriptionName, topoAnnotation, subscription,
            );
          }
        });
      }

      // no deployables was placed on a cluster but there were subscription decisions
      if (!subscription.deployables && !hasPlacementRules && subscribeDecisions) {
        addSubscriptionCharts(
          parentId, subscriptionStatusMap, nodes,
          links, null, namespace, subscriptionChannel, subscriptionName, topoAnnotation, subscription,
        );
      }
      delete subscription.deployables;
    });

    // if application has deployables
    // (unsubscribed--possibly a template)
  } else if (application.deployables) {
    application.deployables.forEach((deployable) => {
      ({ name, namespace } = _.get(deployable, 'metadata'));
      memberId = `member--deployable--${name}`;
      nodes.push({
        name,
        namespace,
        type: 'deployable',
        id: memberId,
        uid: memberId,
        specs: { isDesign: true, raw: deployable },
      });
      links.push({
        from: { uid: parentId },
        to: { uid: memberId },
        type: '',
        specs: { isDesign: true },
      });
    });
  }

  // remove duplicate nodes
  return { resources: _.uniqBy(nodes, 'uid'), relationships: links };
}

export { getApplicationElements as default };

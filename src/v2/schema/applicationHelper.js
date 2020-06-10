/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc.
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* eslint no-param-reassign: "error" */
import _ from 'lodash';

const templateKind = 'spec.template.kind';

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
      type: 'rules',
      id: ruleId,
      uid: ruleId,
      specs: { isDesign: true, raw: rule },
    });
    links.push({
      from: { uid: parentId },
      to: { uid: ruleId },
      type: 'uses',
      specs: { isDesign: true },
    });
  });
}

export const addClusters = (
  parentId, createdClusterElements, subscription,
  clusterNames, clusters, links, nodes,
) => {
  // create element if not already created
  const cns = clusterNames.join(', ');
  const clusterId = `member--clusters--${cns}`;
  if (!createdClusterElements.has(clusterId)) {
    const filteredClusters = clusters.filter((cluster) => {
      const cname = _.get(cluster, 'metadata.name');
      return cname && clusterNames.includes(cname);
    });
    nodes.push({
      name: cns,
      namespace: '',
      type: 'cluster',
      id: clusterId,
      uid: clusterId,
      specs: {
        cluster: filteredClusters.length === 1 ? filteredClusters[0] : undefined,
        clusters: filteredClusters,
        clusterNames,
      },
    });
    createdClusterElements.add(clusterId);
  }
  links.push({
    from: { uid: parentId },
    to: { uid: clusterId },
    type: '',
    specs: { isDesign: true },
  });
  return clusterId;
};

const getClusterName = (nodeId) => {
  const startPos = nodeId.indexOf('--clusters--') + 12;
  const endPos = nodeId.indexOf('--', startPos);

  return nodeId.slice(startPos, endPos);
};


export const createReplicaChild = (parentObject, template, links, nodes) => {
  if (!_.get(parentObject, 'specs.raw.spec.replicas')) {
    return null; // no replica
  }
  const parentType = _.get(parentObject, 'type', '');
  if (parentType !== 'deploymentconfig' && parentType !== 'deployment') {
    // create only for deploymentconfig and deployment types
    return null;
  }

  const type = parentType === 'deploymentconfig' ? 'replicationcontroller' : 'replicaset';
  const { name, namespace } = parentObject;

  const parentId = parentObject.id;
  const memberId = `member--member--deployable--member--clusters--${getClusterName(parentId)}--${type}--${name}`;

  const rawData = {
    kind: type,
    metadata: {
      name,
      namespace,
    },
    spec: {
      desired: _.get(template, 'spec.replicas', 0),
      template: Object.assign({}, _.get(template, 'spec.template', {})),
    },
  };
  const deployableObj = {
    name,
    namespace,
    type,
    id: memberId,
    uid: memberId,
    specs: {
      isDesign: true,
      raw: rawData,
      parent: {
        parentId,
        parentName: name,
        parentType,
      },
    },
  };

  nodes.push(deployableObj);
  links.push({
    from: { uid: parentId },
    to: { uid: memberId },
    type: '',
  });

  return deployableObj;
};

export const addSubscriptionDeployable = (
  parentId, deployable, links, nodes,
  subscriptionStatusMap, names, appNamespace,
) => {
  // deployable shape
  const { name, namespace } = _.get(deployable, 'metadata');
  const deployableId = `member--deployable--${parentId}--${namespace}--${name}`;

  // installs these K8 objects
  const deployStatuses = [];
  names.forEach((cname) => {
    const status = _.get(subscriptionStatusMap, `${cname}.${name}`);
    if (status) {
      deployStatuses.push(status);
    }
  });

  const parentNode = nodes.find(n => n.id === parentId);
  const parentObject = parentNode ?
    {
      parentId,
      parentName: parentNode.name,
      parentType: parentNode.type,
    } : undefined;

  const template = _.get(deployable, 'spec.template', { metadata: {} });
  let { kind = 'container' } = template;
  const { metadata: { name: k8Name } } = template;
  kind = kind.toLowerCase();
  const memberId = `member--${deployableId}--${kind}--${k8Name}`;

  const topoObject =
  {
    name: k8Name,
    namespace: appNamespace,
    type: kind,
    id: memberId,
    uid: memberId,
    specs: {
      raw: template,
      deployStatuses,
      isDesign: kind === 'deployable' || kind === 'subscription',
      parent: parentObject,
    },
  };

  nodes.push(topoObject);
  links.push({
    from: { uid: parentId },
    to: { uid: memberId },
    type: '',
  });

  // create subobject replica subobject, if this object defines a replicas
  createReplicaChild(topoObject, template, links, nodes);

  return topoObject;
};

export const processRouteIngress = (
  clusterId, routes, links, nodes,
  subscriptionStatusMap, names, namespace,
) => {
  const servicesMap = {};
  routes.forEach((deployable) => {
    const topoObject = addSubscriptionDeployable(
      clusterId, deployable, links, nodes,
      subscriptionStatusMap, names, namespace,
    );

    // get service info and map it to the object id
    const kind = _.get(deployable, templateKind, '');

    if (kind === 'Route') {
      const service = _.get(deployable, 'spec.template.spec.to.name');
      if (service) {
        servicesMap[service] = topoObject.id;
      }
    } else {
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
    }
  });
  // return a map of services that must be linked to these router
  return servicesMap;
};

export const processServices = (
  clusterId, services, links, nodes,
  subscriptionStatusMap, names, namespace, servicesMap,
) => {
  services.forEach((deployable) => {
    const serviceName = _.get(deployable, 'spec.template.metadata.name', '');
    let parentId = servicesMap[serviceName];
    if (!parentId) {
      parentId = clusterId;
    }

    addSubscriptionDeployable(
      parentId, deployable, links, nodes,
      subscriptionStatusMap, names, namespace,
    );
  });
};

export const processDeployables = (
  deployables
  , clusterId, links, nodes, subscriptionStatusMap, names, namespace,
) => {
  const routes = _.filter(deployables, (obj) => {
    const kind = _.get(obj, templateKind, '');
    return _.includes(['Route', 'Ingress'], kind);
  });

  // process route and ingress first
  const serviceMap = processRouteIngress(
    clusterId, routes, links, nodes,
    subscriptionStatusMap, names, namespace,
  );

  const services = _.filter(deployables, (obj) => {
    const kind = _.get(obj, templateKind, '');
    return _.includes(['Service'], kind);
  });

  // then service
  processServices(
    clusterId, services, links, nodes,
    subscriptionStatusMap, names, namespace, serviceMap,
  );

  // then the rest
  const other = _.remove(deployables, (obj) => {
    const kind = _.get(obj, templateKind, '');
    return !_.includes(['Route', 'Ingress', 'Service'], kind);
  });

  other.forEach((deployable) => {
    addSubscriptionDeployable(
      clusterId, deployable, links, nodes,
      subscriptionStatusMap, names, namespace,
    );
  });
};

export const createGenericPackageObject = (
  parentId, appNamespace
  , nodes, links, subscriptionName,
) => {
  const packageName = `Package-${subscriptionName}`;
  const memberId = `member--package--${packageName}`;

  const packageObj = {
    name: packageName,
    namespace: appNamespace,
    type: 'package',
    id: memberId,
    uid: memberId,
    specs: {
      raw: {
        kind: 'Package',
        metadata: {
          name: packageName,
          namespace: appNamespace,
        },
        isDesign: false,
      },
    },
  };

  nodes.push(packageObj);
  links.push({
    from: { uid: parentId },
    to: { uid: memberId },
    type: '',
  });

  return packageObj;
};

export const addSubscriptionCharts = (
  parentId, subscriptionStatusMap,
  nodes, links, appNamespace, channelInfo, subscriptionName,
) => {
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
    return null; // could not find the subscription channel name, abort
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
              const objId = `member--deployable--${parentId}--${objectType.toLowerCase()}--${objectName}`;

              const chartObject = {
                id: objId,
                uid: objId,
                name: objectName,
                namespace: appNamespace,
                type: objectType.toLowerCase(),
                specs: {
                  isDesign: true,
                  raw: {
                    kind: objectType,
                    metadata: {
                      name: objectName,
                      namespace: appNamespace,
                    },
                    spec: _.get(packageItem[packageItemKey], 'resourceStatus'),
                  },
                },

              };
              nodes.push(chartObject);
              links.push({
                from: { uid: parentId },
                to: { uid: objId },
                type: 'package',
              });
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

async function getApplicationElements(application, clusterModel) {
  const links = [];
  const nodes = [];

  // create application node
  let name;
  let namespace;
  ({ name, namespace } = application);
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
      channels: application.channels,
    },
  });


  // get clusters labels
  const labelMap = [];
  const clusters = await clusterModel.getAllClusters();
  clusters.forEach(({
    metadata,
  }) => {
    const { labels } = metadata;
    Object.entries(labels).forEach(([key, value]) => {
      labelMap[`${key}: "${value}"`] = { key, value };
    });
  });


  // if application has subscriptions
  let memberId;
  let parentId;
  let clusterId;
  if (application.subscriptions) {
    const createdClusterElements = new Set();
    application.subscriptions.forEach((subscription) => {
      const subscriptionChannel = _.get(subscription, 'spec.channel');
      const subscriptionName = _.get(subscription, 'metadata.name', '');
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
      const isSubscriptionPlaced = Object.keys(subscriptionStatusMap).length > 0;

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
        const clusterShapes = ruleClusterNames.length > 1 ?
          [ruleClusterNames] : ruleClusterNames.map(cn => [cn]);
        clusterShapes.forEach((names) => {
          // add cluster element
          clusterId = addClusters(
            parentId, createdClusterElements, subscription,
            names, clusters, links, nodes,
          );

          // add deployables if any
          if (subscription.deployables) {
            processDeployables(
              subscription.deployables
              , clusterId, links, nodes, subscriptionStatusMap, names, namespace,
            );
          } else if (isSubscriptionPlaced) {
          // else add charts which does deployment
            addSubscriptionCharts(
              clusterId, subscriptionStatusMap, nodes
              , links, namespace, subscriptionChannel, subscriptionName,
            );
          }
        });
      }

      // no deployables was placed on a clutser but there were subscription decisions
      if (!subscription.deployables && !hasPlacementRules && subscribeDecisions) {
        addSubscriptionCharts(
          parentId, subscriptionStatusMap, nodes
          , links, namespace, subscriptionChannel, subscriptionName,
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

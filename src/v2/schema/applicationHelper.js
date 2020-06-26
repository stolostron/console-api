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
      template: { ..._.get(template, 'spec.template', {}) },
    },
  };
  const deployableObj = {
    name,
    namespace,
    type,
    id: memberId,
    uid: memberId,
    specs: {
      isDesign: false,
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
  if (names) {
    names.forEach((cname) => {
      const status = _.get(subscriptionStatusMap, `${cname}.${name}`);
      if (status) {
        deployStatuses.push(status);
      }
    });
  }

  const parentNode = nodes.find((n) => n.id === parentId);
  const parentObject = parentNode
    ? {
      parentId,
      parentName: parentNode.name,
      parentType: parentNode.type,
    } : undefined;

  const template = _.get(deployable, 'spec.template', { metadata: {} });
  let { kind = 'container' } = template;
  const { metadata: { name: k8Name } } = template;
  kind = kind.toLowerCase();
  const memberId = `member--${deployableId}--${kind}--${k8Name}`;

  const topoObject = {
    name: k8Name,
    namespace: appNamespace,
    type: kind,
    id: memberId,
    uid: memberId,
    specs: {
      raw: template,
      deployStatuses,
      isDesign: false,
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

// Route, Ingress, StatefulSet
export const processServiceOwner = (
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
  deployables,
  clusterId, links, nodes, subscriptionStatusMap, names, namespace,
) => {
  const routes = _.filter(deployables, (obj) => {
    const kind = _.get(obj, templateKind, '');
    return _.includes(['Route', 'Ingress', 'StatefulSet'], kind);
  });

  // process route and ingress first
  const serviceMap = processServiceOwner(
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
    return !_.includes(['Route', 'Ingress', 'Service', 'StatefulSet'], kind);
  });

  other.forEach((deployable) => {
    addSubscriptionDeployable(
      clusterId, deployable, links, nodes,
      subscriptionStatusMap, names, namespace,
    );
  });
};

export const createGenericPackageObject = (
  parentId, appNamespace,
  nodes, links, subscriptionName,
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

// remove the release name from the deployable name
export const removeHelmReleaseName = (name, releaseName) => {
  const trimmedReleaseName = _.trimEnd(releaseName, '-');
  let result = _.replace(name, `${trimmedReleaseName}-`, '');
  result = _.replace(result, `${trimmedReleaseName}`, '');

  return result;
};

export const getSubscriptionPackageInfo = (topoAnnotation, subscriptionName, appNamespace, channelInfo) => {
  const deployablesList = [];

  const deployables = _.split(topoAnnotation, ',');

  deployables.forEach((deployableInfo) => {
    const deployableData = _.split(deployableInfo, '/');

    if (deployableData.length === 6 && deployableData[0] === 'helmchart') { // process only helm charts
      const deployableTypeLower = _.toLower(deployableData[2]);
      const dName = removeHelmReleaseName(deployableData[4], deployableData[1]);

      const namespace = deployableData[3].length === 0 ? appNamespace : deployableData[3];
      const deployableName = `${subscriptionName}-${dName}-${dName}-${deployableTypeLower}`;
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
  });
  return deployablesList;
};

export const addSubscriptionCharts = (
  parentId, subscriptionStatusMap,
  nodes, links, names, appNamespace, channelInfo, subscriptionName,
  topoAnnotation,
) => {
  if (topoAnnotation) {
    const deployablesFromTopo = getSubscriptionPackageInfo(topoAnnotation, subscriptionName, appNamespace, channelInfo);
    processDeployables(
      deployablesFromTopo,
      parentId, links, nodes, subscriptionStatusMap, names, appNamespace,
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
              const objId = `member--deployable--${parentId}--${objectType.toLowerCase()}--${objectName}`;

              const chartObject = {
                id: objId,
                uid: objId,
                name: objectName,
                namespace: appNamespace,
                type: objectType.toLowerCase(),
                specs: {
                  isDesign: false,
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
              clusterId, links, nodes, subscriptionStatusMap, names, namespace,
            );
          }

          if (topoAnnotation) {
            addSubscriptionCharts(
              clusterId, subscriptionStatusMap, nodes,
              links, names, namespace, subscriptionChannel, subscriptionName, topoAnnotation,
            );
          }
        });
      }

      // no deployables was placed on a cluster but there were subscription decisions
      if (!subscription.deployables && !hasPlacementRules && subscribeDecisions) {
        addSubscriptionCharts(
          parentId, subscriptionStatusMap, nodes,
          links, null, namespace, subscriptionChannel, subscriptionName, topoAnnotation,
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

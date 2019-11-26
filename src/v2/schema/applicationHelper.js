/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* eslint no-param-reassign: "error" */
import _ from 'lodash';

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

function addClusters(parentId, subscription, clusterNames, clusters, links, nodes) {
  const [namespace, name] = _.get(subscription, 'spec.channel', '').split('/');
  const cns = clusterNames.join(', ');
  const clusterId = `member--clusters--${namespace}--${name}--${cns}`;
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
  links.push({
    from: { uid: parentId },
    to: { uid: clusterId },
    type: '',
    specs: { isDesign: true },
  });
  return clusterId;
}

function addSubscriptionDeployable(parentId, deployable, links, nodes, clusterMap, names) {
  // deployable shape
  const { name, namespace } = _.get(deployable, 'metadata');
  const deployableId = `member--deployable--${parentId}--${namespace}--${name}`;
  nodes.push({
    name,
    namespace,
    type: 'deployable',
    id: deployableId,
    uid: deployableId,
    specs: { isDesign: true, raw: deployable, isDivider: true },
  });
  links.push({
    from: { uid: parentId },
    to: { uid: deployableId },
    type: '',
    specs: { isDesign: true },
  });

  // installs these K8 objects
  let failed = false;
  const deployStatuses = [];
  names.forEach((cname) => {
    const status = _.get(clusterMap, `${cname}.${name}`);
    if (status) {
      deployStatuses.push(status);
      if (status.phase === 'Failed') {
        failed = true;
      }
    }
  });


  const template = _.get(deployable, 'spec.template', { metadata: {} });
  let { kind = 'container' } = template;
  const { metadata: { name: k8Name } } = template;
  kind = kind.toLowerCase();
  const memberId = `member--${deployableId}--${kind}--${k8Name}`;
  nodes.push({
    name: k8Name,
    namespace: '',
    type: kind,
    id: memberId,
    uid: memberId,
    specs: { raw: template, deployStatuses, isDesign: kind === 'deployable' || kind === 'subscription' },
  });
  links.push({
    from: { uid: deployableId },
    to: { uid: memberId },
    type: '',
  });

  // if deployment, show pod--unless deployable failed to deploy deployment
  if (kind === 'deployment' && !failed) {
    const podId = `member--pod--${deployableId}--${k8Name}`;
    nodes.push({
      name: k8Name,
      namespace: '',
      type: 'pod',
      id: podId,
      uid: podId,
      specs: { raw: template },
    });
    links.push({
      from: { uid: memberId },
      to: { uid: podId },
      type: '',
    });
  }
}

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
    application.subscriptions.forEach((subscription) => {
      // get cluster placement if any
      const clusterMap = {};
      if (subscription.rules) {
        subscription.rules.forEach((rule) => {
          const decisions = _.get(rule, 'status.decisions');
          if (decisions) {
            decisions.forEach(({ clusterName, clusterNamespace }) => {
              clusterMap[clusterName] = clusterNamespace;
            });
          }
        });
      }

      const clusterNames = Object.keys(clusterMap);
      const isPlaced = clusterNames.length > 0;

      // add subscription
      parentId = addSubscription(appId, subscription, isPlaced, links, nodes);

      // add rules if any
      let hasPlacementRules = false;
      if (subscription.rules) {
        addSubscriptionRules(parentId, subscription, links, nodes);
        delete subscription.rules;
        hasPlacementRules = true;
      }

      // add cluster(s) if any
      if (isPlaced) {
        // add cluster(s) if any or if too many
        const clusterShapes = clusterNames.length > 3 ?
          [clusterNames] : clusterNames.map(cn => [cn]);
        clusterShapes.forEach((names) => {
          clusterId = addClusters(parentId, subscription, names, clusters, links, nodes);

          // add deployables if any
          if (subscription.deployables) {
            subscription.deployables.forEach((deployable) => {
              addSubscriptionDeployable(clusterId, deployable, links, nodes, clusterMap, names);
            });
          }
        });
      }

      // no deployables but packages were placed!
      const decisions = _.get(subscription, 'status.statuses');
      if (!subscription.deployables && !hasPlacementRules && decisions) {
        // TODO might be multiple clusters
        Object.values(clusterMap).forEach((value) => {
          if (value) {
            const [packageName] = Object.keys(value);
            memberId = `member--package--${packageName}`;
            nodes.push({
              name: packageName,
              namespace: '',
              type: 'package',
              id: memberId,
              uid: memberId,
              specs: { raw: value, isDesign: false },
            });
            links.push({
              from: { uid: parentId },
              to: { uid: memberId },
              type: '',
            });
          }
        });
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

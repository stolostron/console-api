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
      isDesign: true, isDivider: true, hasRules: !!rule, isPlaced, raw: subscription,
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
      name: 'placement rules',
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

function addClusters(parentId, subscription, clusterNames, links, nodes) {
  const [namespace, name] = _.get(subscription, 'spec.channel', '').split('/');
  const cns = clusterNames.join(', ');
  const clusterId = `member--clusters--${namespace}--${name}--${cns}`;
  nodes.push({
    name: cns,
    namespace: '',
    type: 'clusters',
    id: clusterId,
    uid: clusterId,
    specs: { clusterNames, isDivider: true },
  });
  links.push({
    from: { uid: parentId },
    to: { uid: clusterId },
    type: '',
    specs: { isDesign: true },
  });
  return clusterId;
}

function addSubscriptionDeployable(parentId, deployable, links, nodes, isPlaced) {
  // deployable shape
  const { name, namespace } = _.get(deployable, 'metadata');
  const deployableId = `member--deployable--${namespace}--${name}`;
  nodes.push({
    name,
    namespace,
    type: 'deployable',
    id: deployableId,
    uid: deployableId,
    specs: { isDesign: true, raw: deployable },
  });
  links.push({
    from: { uid: parentId },
    to: { uid: deployableId },
    type: '',
    specs: { isDesign: true },
  });

  // installs these K8 objects
  if (isPlaced) {
    const template = _.get(deployable, 'spec.template', { metadata: {} });
    let { kind = 'container' } = template;
    const { metadata: { name: k8Name } } = template;
    kind = kind.toLowerCase();
    const memberId = `member--${kind}--${k8Name}`;
    nodes.push({
      name: k8Name,
      namespace: '',
      type: kind,
      id: memberId,
      uid: memberId,
      specs: { raw: template, isDesign: kind === 'deployable' || kind === 'subscription' },
    });
    links.push({
      from: { uid: deployableId },
      to: { uid: memberId },
      type: '',
    });

    // if deployment, show pod
    if (kind === 'deployment') {
      const podId = `member--pod--${k8Name}`;
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
      isDivider: true,
      raw: application.app,
      activeChannel: application.activeChannel,
      channels: application.channels,
    },
  });


  // get clusters labels
  const labelMap = [];
  if (clusterModel) {
    const clusters = await clusterModel.getAllClusters();
    clusters.forEach(({
      metadata,
    }) => {
      const { labels } = metadata;
      Object.entries(labels).forEach(([key, value]) => {
        labelMap[`${key}: "${value}"`] = { key, value };
      });
    });
  }
  const clusterLabels = Object.keys(labelMap);


  // if application has subscriptions
  let memberId;
  let parentId;
  if (application.subscriptions) {
    application.subscriptions.forEach((subscription) => {
      // get cluster placement if any
      const clusterMap = {};
      const decisions = _.get(subscription, 'status.statuses');
      if (decisions) {
        Object.entries(decisions).forEach(([clusterName, value]) => {
          clusterMap[clusterName] = _.get(value, 'packages');
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
        subscription.rules.clusterLabels = clusterLabels;
        delete subscription.rules;
        hasPlacementRules = true;
      } else {
        subscription.clusterLabels = clusterLabels;
      }

      // add cluster(s) if any
      if (isPlaced) {
        parentId = addClusters(parentId, subscription, clusterNames, links, nodes);
      }

      // add deployables if any
      if (subscription.deployables) {
        subscription.deployables.forEach((deployable) => {
          addSubscriptionDeployable(parentId, deployable, links, nodes, isPlaced);
        });
        delete subscription.deployables;
      } else if (!hasPlacementRules && decisions) {
        // TODO might be multiple clusters
        // no deployables but packages were placed!
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

  return { resources: nodes, relationships: links };
}

export { getApplicationElements as default };

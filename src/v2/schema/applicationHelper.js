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

async function getApplicationElements(application) {
  const links = [];
  const nodes = [];
  const clusterSet = new Set();

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

  // if application has subscription
  let memberId;
  let parentId = appId;
  if (application.subscription) {
    // add subscription
    name = _.get(application, 'subscription.spec.channel', '');
    name = name.split('/');
    ([namespace] = name);
    name = name.slice(-1).pop();
    memberId = `member--subscription--${name}`;
    nodes.push({
      name,
      namespace,
      type: 'subscription',
      id: memberId,
      uid: memberId,
      specs: { isDesign: true, isDivider: true, raw: application.subscription },
    });

    links.push({
      from: { uid: parentId },
      to: { uid: memberId },
      type: '',
      specs: { isDesign: true },
    });
    parentId = memberId;

    // add placement rules
    if (application.subscription.rules) {
      ({ name, namespace } = _.get(application, 'subscription.rules.metadata'));
      const ruleId = `member--rules--${name}`;
      nodes.push({
        name: 'placement rules',
        namespace,
        type: 'rules',
        id: ruleId,
        uid: ruleId,
        specs: { isDesign: true, raw: application.subscription.rules },
      });

      links.push({
        from: { uid: parentId },
        to: { uid: ruleId },
        type: 'uses',
        specs: { isDesign: true },
      });

      // get clutser placement decisions
      const decisions = _.get(application, 'subscription.rules.status.decisions');
      if (decisions) {
        decisions.forEach(({ clusterName }) => {
          clusterSet.add(clusterName);
        });
      }
      delete application.subscription.rules;
    } else {
      // get cluster placement
      // TODO

    }

    // add cluster(s)
    const clusterNames = Array.from(clusterSet);
    const isPlaced = clusterNames.length > 0;
    if (isPlaced) {
      memberId = 'member--clusters';
      nodes.push({
        name: clusterNames.join(', '),
        namespace: '',
        type: 'clusters',
        id: memberId,
        uid: memberId,
        specs: { clusterNames, isDivider: true },
      });
      links.push({
        from: { uid: parentId },
        to: { uid: memberId },
        type: '',
        specs: { isDesign: true },
      });
      parentId = memberId;
    }

    // if subscription has deployables
    if (application.deployables) {
      application.deployables.forEach((deployable) => {
        // deployable shape
        ({ name, namespace } = _.get(deployable, 'metadata'));
        const deployableId = `member--deployable--${name}`;
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
          memberId = `member--${kind}--${k8Name}`;
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
      });
    }


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

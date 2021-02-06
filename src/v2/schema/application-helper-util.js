/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 * Copyright (c) 2020 Red Hat, Inc.
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2021 Red Hat, Inc.
 ****************************************************************************** */
/* eslint no-param-reassign: "error" */
import _ from 'lodash';

const localClusterName = 'local-cluster';
const metadataName = 'metadata.name';
const metadataNamespace = 'metadata.namespace';
const preHookType = 'pre-hook';
const postHookType = 'post-hook';


export const isPrePostHookDeployable = (subscription, name, namespace) => {
  const preHooks = _.get(subscription, 'status.ansiblejobs.prehookjobshistory', []);
  const postHooks = _.get(subscription, 'status.ansiblejobs.posthookjobshistory', []);
  const objectIdentity = `${namespace}/${name}`;
  if (_.indexOf(preHooks, objectIdentity) !== -1) {
    return preHookType;
  }
  if (_.indexOf(postHooks, objectIdentity) !== -1) {
    return postHookType;
  }
  return null;
};

export const getClusterName = (nodeId) => {
  if (nodeId === undefined) {
    return '';
  }
  const clusterIndex = nodeId.indexOf('--clusters--');
  if (clusterIndex !== -1) {
    const startPos = nodeId.indexOf('--clusters--') + 12;
    const endPos = nodeId.indexOf('--', startPos);
    return nodeId.slice(startPos, endPos > 0 ? endPos : nodeId.length);
  }
  return localClusterName;
};

export const getLocalClusterElement = (createdClusterElements) => {
  let localClusterElement;
  createdClusterElements.forEach((element) => {
    if (element.indexOf(localClusterName) > -1) {
      localClusterElement = element;
    }
  });

  return localClusterElement;
};

export const createChildNode = (parentObject, type, rawData, links, nodes) => {
  const parentType = _.get(parentObject, 'type', '');
  const { name, namespace } = parentObject;

  const parentId = parentObject.id;
  const memberId = `member--member--deployable--member--clusters--${getClusterName(parentId)}--${type}--${name}`;

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

export const createReplicaChild = (parentObject, template, links, nodes) => {
  /* why do we need this ?
  if (!_.get(parentObject, 'specs.raw.spec.replicas')) {
    return null; // no replica
  }
  */
  //console.log('createReplicaChild', parentObject, template, JSON.stringify(parentObject))

  const parentType = _.get(parentObject, 'type', '');
  if (parentType !== 'deploymentconfig' && parentType !== 'deployment') {
    // create only for deploymentconfig and deployment types
    return null;
  }
  const { name, namespace } = parentObject;
  const type = parentType === 'deploymentconfig' ? 'replicationcontroller' : 'replicaset';
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
  return createChildNode(parentObject, type, rawData, links, nodes);
};

export const createIngressRouteChild = (parentObject, template, links, nodes) => {
  const parentType = _.get(parentObject, 'type', '');
  if (parentType !== 'ingress') {
    return null; // not an ingress object
  }
  const { name, namespace } = parentObject;
  const type = 'route';

  const rawData = {
    kind: 'Route',
    metadata: {
      name,
      namespace,
    },
    spec: {
      rules: _.get(template, 'spec.rules', []),
    },
  };
  return createChildNode(parentObject, type, rawData, links, nodes);
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

export const removeReleaseGeneratedSuffix = (name) => name.replace(/-[0-9a-zA-Z]{4,5}$/, '');

// remove the release name from the deployable name
export const removeHelmReleaseName = (name, releaseName) => {
  const trimmedReleaseName = _.trimEnd(releaseName, '-');
  let result = _.replace(name, `${trimmedReleaseName}-`, '');
  result = _.replace(result, `${trimmedReleaseName}`, '');

  // resource name only contains release name, return without the generated suffix
  if (result.length === 0) {
    return removeReleaseGeneratedSuffix(name);
  }
  return result;
};

//add cluster node to RHCAM application
export const addClusters = (
  parentId, createdClusterElements, subscription,
  clusterNames, clusters, links, nodes,
) => {
  // create element if not already created'
  const sortedClusterNames = _.sortBy(clusterNames);
  const cns = sortedClusterNames.join(', ');
  
  let clusterId = `member--clusters--${cns}`;
  const localClusterElement = clusterNames.length === 1 && clusterNames[0] === localClusterName
    ? getLocalClusterElement(createdClusterElements) : undefined;
  if (!createdClusterElements.has(clusterId) && !localClusterElement) {
    const filteredClusters = clusters.filter((cluster) => {
      const cname = _.get(cluster, metadataName);
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
        sortedClusterNames,
      },
    });
    createdClusterElements.add(clusterId);
  }
  if (localClusterElement) {
    clusterId = localClusterElement;
  }
  links.push({
    from: { uid: parentId },
    to: { uid: clusterId },
    type: '',
    specs: { isDesign: true },
  });
  return clusterId;
};

export const addSubscriptionDeployable = (
  parentId, deployable, links, nodes,
  subscriptionStatusMap, names, appNamespace, subscription,
) => {
  // deployable shape
  const subscriptionUid = `member--subscription--${_.get(subscription, metadataNamespace, '')}--${_.get(subscription, metadataName, '')}`;
  const { name, namespace } = _.get(deployable, 'metadata');
  let linkType = isPrePostHookDeployable(subscription, name, namespace);
  if (linkType === null) {
    linkType = '';
  } else {
    const hookList = linkType === preHookType ? _.get(subscription, 'prehooks', []) : _.get(subscription, 'posthooks', []);
    hookList.forEach((hook) => {
      if (_.get(hook, metadataName, '') === name && _.get(hook, metadataNamespace, '') === namespace) {
        deployable.spec.template.spec = hook.status;
      }
    });
  }

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
  if (linkType === preHookType) {
    links.push({
      from: { uid: memberId },
      to: { uid: subscriptionUid },
      type: linkType,
    });
  } else if (linkType === postHookType) {
    links.push({
      from: { uid: subscriptionUid },
      to: { uid: memberId },
      type: linkType,
    });
  } else {
    links.push({
      from: { uid: parentId },
      to: { uid: memberId },
      type: linkType,
    });
  }
  // create replica subobject, if this object defines a replicas
  createReplicaChild(topoObject, template, links, nodes);
  // create route subobject, if this object is an ingress
  createIngressRouteChild(topoObject, template, links, nodes);

  return topoObject;
};

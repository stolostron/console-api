/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type NodeResources {
  cpu: String
  memory: String
}

type Node implements K8sObject {
  allocatable: NodeResources
  architecture: String
  capacity: NodeResources
  cluster: Cluster
  images: [String]
  metadata: Metadata
  operatingSystem: String
  osImage: String
  # Values: proxy, management, masater, va, etcd
  roles: [String]
  status: String
}
`;

async function resolveStatus(parent) {
  const { status: { conditions } } = parent;
  const nodeStatus = conditions.find(cond => (cond.type === 'Ready'));
  return nodeStatus.status;
}

async function resolveRoles(parent) {
  const { metadata: { labels } } = parent;
  const roles = [];
  const nodeRolePrefix = 'node-role.kubernetes.io/';
  const index = nodeRolePrefix.length;
  Object.keys(labels).forEach((label) => {
    if (label.startsWith(nodeRolePrefix)) {
      roles.push(label.substring(index));
    }
  });
  return roles.length > 0 ? roles : ['worker'];
}

export const resolver = {
  Query: {
    nodes: (root, args, { resourceViewModel }) =>
      resourceViewModel.fetchResources({ type: 'nodes' }),
    node: (root, args, { resourceViewModel }) =>
      resourceViewModel.fetchNodeResource('nodes', args.name, args.namespace),
  },
  Node: {
    cluster: async (parent, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, name: parent.cluster, user: req.user }),
    roles: parent => resolveRoles(parent),
    status: parent => resolveStatus(parent),
  },
};

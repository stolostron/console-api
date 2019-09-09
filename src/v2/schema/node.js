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
  cpu: Int
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
  if (labels['node-role.kubernetes.io/proxy'] === 'true') {
    roles.push('proxy');
  }
  if (labels['node-role.kubernetes.io/management'] === 'true') {
    roles.push('management');
  }
  if (labels['node-role.kubernetes.io/master'] === 'true') {
    roles.push('master');
  }
  if (labels['node-role.kubernetes.io/va'] === 'true') {
    roles.push('va');
  }
  if (labels['node-role.kubernetes.io/etcd'] === 'true') {
    roles.push('etcd');
  }
  if (labels['node-role.kubernetes.io/worker'] === 'true') {
    roles.push('worker');
  }
  return roles.length > 0 ? roles : ['worker'];
}

export const resolver = {
  Query: {
    nodes: (root, args, { resourceViewModel }) =>
      resourceViewModel.fetchResources({ type: 'nodes' }),
  },
  Node: {
    cluster: async (parent, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, name: parent.cluster, user: req.user }),
    roles: parent => resolveRoles(parent),
    status: parent => resolveStatus(parent),
  },
};

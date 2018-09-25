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
  ephemeralStorage: String
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
}
`;


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
  },
};

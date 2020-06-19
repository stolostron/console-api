/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
type NodeResources {
  cpu: String
  memory: String
}

type Node {
  capacity: NodeResources
  cluster: Cluster
  name: String
  labels: JSON
  roles: [String]
  status: String
}
`;

async function resolveStatus(parent) {
  const { conditions } = parent;
  const nodeStatus = conditions.find((cond) => (cond.type === 'Ready'));
  return nodeStatus.status;
}

async function resolveRoles(parent) {
  const { labels } = parent;
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
    node: (root, args, { clusterModel }) => clusterModel.getNodeList(args),
  },
  Node: {
    cluster: async (parent, args, { clusterModel }) => (
      clusterModel.getSingleCluster({ name: parent.cluster })
        .then((response) => response[0])
    ),
    roles: (parent) => resolveRoles(parent),
    status: (parent) => resolveStatus(parent),
  },
};

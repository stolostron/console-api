/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import ClusterModel from '../models/cluster';

export const typeDef = `
type Cluster implements K8sObject {
  clusterip: String
  consoleURL: String
  metadata: Metadata
  nodes: Int
  status: String
  # Returns % of memory used.
  totalMemory: String
  # Returns % of storage used.
  totalStorage: String
  # Returns % of CPU used.
  totalCPU: String
}
`;

export const resolver = {
  Query: {
    clusters: (parent, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, user: req.user }),
  },
  Cluster: {
    totalCPU: parent => ClusterModel.resolveUsage('cpu', parent.rawStatus),
    totalMemory: parent => ClusterModel.resolveUsage('memory', parent.rawStatus),
    totalStorage: parent => ClusterModel.resolveUsage('storage', parent.rawStatus),
  },
  Mutation: {
    // patch cluster labels
    updateLabels: (parent, args, { genericModel }) =>
      genericModel.updateLabels(args),
  },
};

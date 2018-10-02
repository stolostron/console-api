/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Cluster implements K8sObject {
  clusterip: String
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
    clusters: (root, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, user: req.user }),
  },
  Mutation: {
    // patch cluster labels
    updateLabels: (root, args, { genericModel }) =>
      genericModel.updateLabels(args),
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Cluster {
  createdAt: String
  clusterip: String
  labels: JSON
  name: String
  namespace: String
  nodes: Int
  status: String
  # Returns % of memory used.
  totalMemory: String
  # Returns % of storage used.
  totalStorage: String
  uid: String,
}
`;

export const resolver = {
  Query: {
    clusters: (root, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, user: req.user }),
  },
};

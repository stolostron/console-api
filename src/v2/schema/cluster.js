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
  createdAt: String @deprecated(reason: "Use metadata.creationTimestamp field.")
  clusterip: String
  labels: JSON @deprecated(reason: "Use metadata.labels field.")
  metadata: Metadata
  name: String @deprecated(reason: "Use metadata.name field.")
  namespace: String @deprecated(reason: "Use metadata.namespace field.")
  nodes: Int
  status: String
  # Returns % of memory used.
  totalMemory: String
  # Returns % of storage used.
  totalStorage: String
  uid: String @deprecated(reason: "Use metadata.uid field.")
}
`;

export const resolver = {
  Query: {
    clusters: (root, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, user: req.user }),
  },
};

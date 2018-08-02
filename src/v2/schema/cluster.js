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
  labels: JSON
  name: String
  namespace: String
  nodes: Int
  status: String
  totalMemory: Int
  totalStorage: Int
  uid: String,
}
`;

export const resolver = {
  Query: {
    clusters: (root, args, { kubeModel }) => kubeModel.getClusters(args),
  },
};
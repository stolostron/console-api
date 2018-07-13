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
  name: String,
  namespace: String,
  uid: String,
  status: String
  createdAt: String
  labels: JSON,
}
`;

export const resolver = {
  Query: {
    clusters: (root, args, { kubeModel }) => kubeModel.getClusters(args),
  },
};

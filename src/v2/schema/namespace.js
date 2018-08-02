/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Namespace {
  cluster: String
  createdAt: String
  name: String
  uid: String
  status: String
}
`;

export const resolver = {
  Query: {
    namespaces: (root, args, { kubeModel }) => kubeModel.getNamespaces(args),
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Namespace implements K8sObject {
  cluster: String
  createdAt: String @deprecated(reason: "Use metadata.creationTimestamp field.")
  metadata: Metadata
  name: String @deprecated(reason: "Use metadata.name field.")
  uid: String @deprecated(reason: "Use metadata.uid field.")
  status: String
}
`;

export const resolver = {
  Query: {
    namespaces: (root, args, { resourceViewModel, req }) =>
      resourceViewModel.getNamespaces({ user: req.user }),
  },
};

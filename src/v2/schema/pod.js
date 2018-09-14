/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
  type Pod implements K8sObject {
    cluster: String
    containers: [Container]
    createdAt: String @deprecated(reason: "Use metadata.creationTimestamp field.")
    hostIP: String
    labels: JSON @deprecated(reason: "Use metadata.labels field.")
    metadata: Metadata
    name: String @deprecated(reason: "Use metadata.name field.")
    namespace: String @deprecated(reason: "Use metadata.namespace field.")
    owners: [Owner]
    podIP: String
    startedAt: String
    status: String
    uid: String @deprecated(reason: "Use metadata.uid field.")
  }

  type Owner {
    controller: Boolean
    kind: String
    name: String
    uid: String
  }

  type Container {
    image: String
    imagePullPolicy: String
    name: String
  }
`;

export const resolver = {
  Query: {
    pods: (root, args, { resourceViewModel }) => resourceViewModel.getPods(args),
  },
};

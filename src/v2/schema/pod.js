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
    hostIP: String
    metadata: Metadata
    owners: [Owner]
    podIP: String
    startedAt: String
    status: String
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

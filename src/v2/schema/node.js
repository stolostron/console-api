/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type NodeResources {
  cpu: Int
  ephemeralStorage: String
  memory: String
}

type Node implements K8sObject {
  allocatable: NodeResources
  architecture: String
  capacity: NodeResources
  cluster: String
  images: [String]
  metadata: Metadata
  operatingSystem: String
  osImage: String
}
`;

export const resolver = {
  Query: {
    nodes: (root, args, { resourceViewModel }) =>
      resourceViewModel.fetchResources({ type: 'nodes' }),
  },
};

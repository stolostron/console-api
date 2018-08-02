/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
interface HCMResource {
  cluster: String
  createdAt: String
  labels: JSON
  name: String
  uid: String
}

type NodeResources {
  cpu: Int
  ephemeralStorage: String
  memory: String
}

type Node implements HCMResource {
  allocatable: NodeResources
  architecture: String
  capacity: NodeResources
  cluster: String
  createdAt: String
  images: [String]
  labels: JSON
  name: String
  operatingSystem: String
  osImage: String
  uid: String
}
`;

export const resolver = {
  Query: {
    nodes: (root, args, { kubeModel }) => kubeModel.getNodes(args),
  },
};

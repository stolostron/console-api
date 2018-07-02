/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Node {
  NodeName: String
  name: String
  cluster: String
  NodeDetails: NodeDetails
}

type NodeDetails {
  Arch: String
  Status: String
  OSImage: String
  Cpu: String
  Labels: JSON
}
`;

export const nodeResolver = {
  Query: {
    nodes: (obj, args, { req, hcmConnector }) => hcmConnector.getWork(req, 'nodes'),
  },
};

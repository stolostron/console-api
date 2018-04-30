/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { nodes } from '../../datasource/hcm';

export const typeDef = `
type Node {
  NodeName: String
  name: String
  cluster: String
  NodeDetails: NodeDetails
}
type NodeDetails {
  Status: String
  OSImage: String
  Cpu: String
  Labels: Labels
}
type Labels {
  management: String
  master: String
  proxy: String
  role: String
  va: String
}
`;

export const nodeResolver = {
  Query: {
    nodes,
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { pods } from '../../datasource/hcm';

export const typeDef = `
type Pod {
  Namespace: String
  PodName: String
  name: String
  cluster: String
  PDetails: PDetails
  State: Boolean
}
type PDetails {
  Node: String
  Labels: JSON
}
`;

export const podResolver = {
  Query: {
    pods: async (root, args = { filter: {} }, req) => pods(root, args, req),
  },
};

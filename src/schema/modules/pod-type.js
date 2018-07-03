/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { transformFilters } from './filter-type';

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
    pods: (obj, args = { filter: {} }, { req, hcmConnector }) => hcmConnector.getWork(req, 'pods', { DstClusters: transformFilters(args) }, true),
  },
};

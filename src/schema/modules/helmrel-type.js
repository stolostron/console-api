/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { deleteHelmRelease } from '../../datasource/hcm';
import { transformFilters } from './filter-type';

export const typeDef = `
type HelmRel {
  ChartName: String
  ChartVersion: String
  HDetails: HelmChartDetails
  HelmName: String
  Namespace: String
  Status: String
  Version: Int
  name: String
  cluster: String
}

input DeleteHelmReleaseInput {
  Names: String!
  Namespaces: String
  ChartName: String
  Version: String
  RepoName: String
  DstClusters: DestinationClusters
}
`;

export const helmRelResolver = {
  Query: {
    releases: (root, args = { filter: {} }, { req, hcmConnector }) => hcmConnector.getWork(req, 'helmrels', {
      Work: { Status: ['DEPLOYED', 'FAILED'] }, DstClusters: transformFilters(args),
    }, true),
  },
  Mutation: {
    deleteHelmRelease: (root, { input }, { req }) => deleteHelmRelease(req, input),
  },
};

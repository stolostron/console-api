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
    releases: (root, args = { filter: {} }, { req, hcmConnector }) => hcmConnector.getWork(req, 'helmrels', {}, {
      Work: { Status: ['DEPLOYED', 'FAILED'] }, DstClusters: transformFilters(args),
    }),
  },
  Mutation: {
    deleteHelmRelease: (root, { input }, { req, hcmConnector }) => {
      const response = hcmConnector.getWork(req, 'helmrels', {
        method: 'POST',
        json: {
          Operation: 'delete',
          DstClusters: input.DstClusters,
          Work: {
            ChartName: input.RepoName && input.ChartName && `${input.RepoName}/${input.ChartName}`,
            Names: input.Names,
            Namespaces: input.Namespaces,
            Version: input.Version,
          },
        },
      }, true);
      return response;
    },
  },
};

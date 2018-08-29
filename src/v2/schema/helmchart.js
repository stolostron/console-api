/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
input DestinationCluster {
  name: String!
  # Namespace that the klusterlet exists in
  namespace: String!
}

input InstallHelmChartInput {
  chartURL: String!
  namespace: String!
  releaseName: String!
  destinationClusters: [DestinationCluster]!
  values: String
}

type HelmChart {
  repoName: String
  name: String
  version: String
  urls: [String]
}

type HelmChartResponse {
  chartName: String
  chartVersion: String
  code: Int
  message: String
  namespace: String
  status: String
  version: String
  name: String
  cluster: String
}
`;

export const resolver = {
  Query: {
    charts: async (root, args, { helmModel }) => helmModel.getCharts(args),
  },
  Mutation: {
    installHelmChart: async (root, { input }, { helmModel }) => helmModel.installHelmChart(input),
  },
};

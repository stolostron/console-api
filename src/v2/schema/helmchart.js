/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
input InstallHelmChartInput {
  chartURL: String!
  namespace: String!
  releaseName: String!
  clusters: [String]!
  values: JSON
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
    charts: async (root, args, { kubeModel }) => kubeModel.getCharts(args),
  },
  Mutation: {
    installHelmChart: async (root, input, { kubeModel }) => kubeModel.installHelmChart(input),
  },
};

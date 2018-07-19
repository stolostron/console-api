/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';

export const typeDef = `
input InstallHelmChartInput {
  ChartName: String!
  Version: String
  RepoName: String!
  DstClusters: DestinationClusters
  ReleaseName: String
  Namespace: String
  URL: String
}

input DestinationClusters {
  Names: [String]
  Labels: [String]
  Status: [String]
  SortBy: String
  TargetNum: Int
}

type HelmChart {
  RepoName: String
  Name: String
  Version: String
  URLs: [String]
}

type HelmChartResponse {
  ChartName: String
  ChartVersion: String
  code: Int
  message: String
  HDetails: HelmChartDetails
  HelmName: String
  Namespace: String
  Status: String
  Version: String
  name: String
  cluster: String
}

type HelmChartDetails {
  Description: String
  FirstDeployed: Time
  Images: [ImageDetails]
  LastDeployed: Time
  Manifest: String
}

type Time {
  nanos: Int
  seconds: Int
}

type ImageDetails {
  ImageName: String,
  ImagePullPolicy: String
}
`;

export const helmChartResolver = {
  Query: {
    charts: async (root, args, { req, hcmConnector }) => {
      const response = await hcmConnector.processRequest(req, '/api/v1alpha1/repo/*', { Resource: 'repo', Operation: 'get' });
      const helmRepos = response ? Object.values(response) : [];

      let catalog = [];
      await Promise.all(helmRepos.map(repo => hcmConnector.search(req, 'repo', repo.Name).catch(err => console.log(err))))
        .then((values) => {
          catalog = values.filter(item => item !== undefined);
        }).catch(err => console.log(err));

      const helmCharts = _.flatten(catalog.map(chart => Object.values(chart)));
      return _.sortBy(helmCharts, chart => `${chart.RepoName}/${chart.Name}`);
    },
  },
  Mutation: {
    installHelmChart: (root, { input }, { req, hcmConnector }) => {
      const response = hcmConnector.getWork(req, 'helmrels', {
        method: 'POST',
        json: {
          Operation: 'install',
          DstClusters: input.DstClusters,
          Work: {
            ChartName: `${input.RepoName}/${input.ChartName}`,
            Namespace: input.Namespace,
            ReleaseName: input.ReleaseName,
            URL: input.URL,
            Values: input.Values,
            Version: input.Version,
          },
        },
      }, true);
      return response;
    },
  },
};

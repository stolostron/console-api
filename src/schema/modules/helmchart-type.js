/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { installHelmChart, charts } from '../../datasource/hcm';

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
  Names: [String],
  Labels: [String],
  Status: [String],
  SortBy: String,
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
  Query: { charts },
  Mutation: {
    installHelmChart: (root, { input }, req) => installHelmChart(req, input),
  },
};

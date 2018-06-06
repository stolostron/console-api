/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { merge } from 'lodash';
import { topologyResolver } from './topology-type';
import { applicationResolver } from './application-type';
import { clusterResolver } from './cluster-type';
import { dashboardResolver } from './dashboard-type';
import { podResolver } from './pod-type';
import { nodeResolver } from './node-type';
import { pvResolver } from './pv-type';
import { namespaceResolver } from './namespace-type';
import { helmRelResolver } from './helmrel-type';
import { helmChartResolver } from './helmchart-type';
import { helmRepoResolver } from './helmrepo-type';

export const typeDef = `
# Root Query
type Query {
  # weave resources
  relationships: [Relationship]
  resource(uid: String!): Resource
  resources(filter: Filter): [Resource]
  repos: [HelmRepo]

  # HCM resources
  applications: [Application]
  charts: [HelmChart]
  clusters: [Cluster]
  dashboard: [DashboardItem]
  labels: [Label]
  namespaces: [Namespace]
  nodes: [Node]
  pods: [Pod]
  pvs: [PV]
  releases: [HelmRel]

  # Topology from mongodb/weave
  topology(filter: Filter): Topology

  # Instance Topology from hcmm
  hcmTopology: HCMTopology

  # All resource types available for filtering.
  resourceTypes: [String]
}

# Root Mutation
type Mutation {
  installHelmChart(input: InstallHelmChartInput): [HelmChartResponse]
  deleteHelmRelease(input: DeleteHelmReleaseInput): [HelmChartResponse]
  deleteHelmRepository(input: DeleteHelmRepositoryInput): HelmRepo
  setHelmRepo(input: HelmRepoInput): HelmRepo
}
`;

export const resolver = merge(
  applicationResolver,
  clusterResolver,
  dashboardResolver,
  helmChartResolver,
  helmRepoResolver,
  helmRelResolver,
  nodeResolver,
  podResolver,
  pvResolver,
  namespaceResolver,
  topologyResolver,
);

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
import { clusterResolver } from './cluster-type';
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
  resource(uid: String): Resource
  resources: [Resource]
  repos: [HelmRepo]

  # HCM resources
  charts: [HelmChart]
  clusters: [Cluster]
  nodes: [Node]
  pods: [Pod]
  pvs: [PV]
  namespaces: [Namespace]
  releases: [HelmRel]
}

# Root Mutation
type Mutation {
  installHelmChart(input: InstallHelmChartInput): [HelmChartResponse]
  setHelmRepo(input: HelmRepoInput): HelmRepo
}
`;

export const resolver = merge(
  clusterResolver,
  helmChartResolver,
  helmRepoResolver,
  nodeResolver,
  podResolver,
  pvResolver,
  namespaceResolver,
  helmRelResolver,
  topologyResolver,
);

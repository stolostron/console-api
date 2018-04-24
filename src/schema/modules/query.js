import { merge } from 'lodash';
import { topologyResolver } from './topology-type';
import { clusterResolver } from './cluster-type';
import { podResolver } from './pod-type';
import { nodeResolver } from './node-type';
import { pvResolver } from './pv-type';
import { helmChartResolver } from './helmchart-type';

export const typeDef = `
# Root Query
type Query {
  # weave resources
  resource(uid: String): Resource
  resources: [Resource]
  relationships: [Relationship]
  # HCM resources
  charts: [HelmChart]
  clusters: [Cluster]
  pods: [Pod]
  nodes: [Node]
  pvs: [PV]
}
# Root Mutation
type Mutation {
  installHelmChart(input: InstallHelmChartInput): [HelmChartResponse]
}
`;

export const resolver = merge(
  helmChartResolver,
  topologyResolver,
  clusterResolver,
  podResolver,
  nodeResolver,
  pvResolver,
);

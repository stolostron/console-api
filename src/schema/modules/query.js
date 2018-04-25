import { merge } from 'lodash';
import { topologyResolver } from './topology-type';
import { clusterResolver } from './cluster-type';
import { podResolver } from './pod-type';
import { nodeResolver } from './node-type';
import { pvResolver } from './pv-type';
import { helmChartResolver } from './helmchart-type';
import { helmRepoResolver } from './helmrepo-type';

export const typeDef = `
# Root Query
type Query {
  # weave resources
  relationships: [Relationship]
  resource(uid: String): Resource
  resources: [Resource]

  # HCM resources
  charts: [HelmChart]
  clusters: [Cluster]
  nodes: [Node]
  pods: [Pod]
  pvs: [PV]
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
  topologyResolver,
);

import { merge } from 'lodash';
import { topologyResolver } from './topology-type';
import { clusterResolver } from './cluster-type';
import { podResolver } from './pod-type';
import { nodeResolver } from './node-type';
import { pvResolver } from './pv-type';

export const typeDef = `
# Root Query
type Query {
  # weave resources
  resource(uid: String): Resource
  resources: [Resource]
  relationships: [Relationship]
  # HCM resources
  clusters: [Cluster]
  pods: [Pod]
  nodes: [Node]
  pvs: [PV]
}
`;

export const resolver = merge(
  topologyResolver,
  clusterResolver,
  podResolver,
  nodeResolver,
  pvResolver,
);

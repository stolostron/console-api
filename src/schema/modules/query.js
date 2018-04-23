import { merge } from 'lodash';
import { topologyResolver } from './topology-type';
import { clusterResolver } from './cluster-type';

export const typeDef = `
# Root Query
type Query {
    resource(uid: String): Resource
    resources: [Resource]
    relationships: [Relationship]
    clusters: [Cluster]
}
`;

export const resolver = merge(
  topologyResolver,
  clusterResolver,
);

import { clusters } from '../../datasource/hcm';

export const typeDef = `
type Cluster {
  ClusterName: String
  ClusterEndpoint: String
  Status: String
  TotalNodes: Int
  TotalDeployments: Int
  TotalPods: Int
  TotalServices: Int
}
`;

export const clusterResolver = {
  Query: {
    clusters,
  },
};

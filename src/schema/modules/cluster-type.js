import { clusters } from '../../datasource/hcm';

export const typeDef = `
type Cluster {
    uid: String
}
`;

export const clusterResolver = {
  Query: {
    clusters: async () => clusters(),
  },
};

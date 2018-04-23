import { pods } from '../../datasource/hcm';

export const typeDef = `
type Pod {
  Namespace: String
  PodName: String
  name: String
  cluster: String
}
`;

export const podResolver = {
  Query: {
    pods,
  },
};

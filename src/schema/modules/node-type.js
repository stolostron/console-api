import { nodes } from '../../datasource/hcm';

export const typeDef = `
type Node {
  NodeName: String
  name: String
  cluster: String
}
`;

export const nodeResolver = {
  Query: {
    nodes,
  },
};

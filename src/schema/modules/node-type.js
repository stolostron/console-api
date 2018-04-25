import { nodes } from '../../datasource/hcm';

export const typeDef = `
type Node {
  NodeName: String
  name: String
  cluster: String
  NodeDetails: NodeDetails
}
type NodeDetails {
  Status: String
  OSImage: String
  Cpu: String
}
`;

export const nodeResolver = {
  Query: {
    nodes,
  },
};

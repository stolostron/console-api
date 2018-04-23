import { resource, relationship } from '../../datasource/mongodb';

export const typeDef = `
type Resource {
    uid: String
    type: String 
    name: String
    relationships: [Relationship]
}
type Relationship {
    type: String
    to: Resource
    from: Resource
}
`;

export const topologyResolver = {
  Query: {
    resource: async (root, args) => {
      const result = await resource(args);
      return result[0];
    },
    resources: async () => resource({}),
    relationships: async () => relationship({}),
  },
  Resource: {
    relationships: async res => relationship({ from: res.uid }),
  },
};

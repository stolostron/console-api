import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  resource(uid: String): Resource
  allResources: [Resource]
  allRelationships: [Relationship]
}

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

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
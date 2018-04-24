import { makeExecutableSchema } from 'graphql-tools';
import * as query from './modules/query';
import * as toplogyType from './modules/topology-type';
import * as clusterType from './modules/cluster-type';
import * as podType from './modules/pod-type';
import * as nodeType from './modules/node-type';
import * as pvType from './modules/pv-type';


const modules = [
  query,
  toplogyType,
  clusterType,
  podType,
  nodeType,
  pvType,
];

const mainDefs = [
  `schema {
      query: Query,
    } `,
];

const resolvers = modules
  .map(m => m.resolver)
  .filter(res => !!res);

const typeDefs = mainDefs
  .concat(modules
    .map(m => m.typeDef)
    .filter(res => !!res));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;

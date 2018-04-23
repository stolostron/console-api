import {GraphQLSchema} from "graphql";
import {makeExecutableSchema} from "graphql-tools";

const modules = [
    require('./modules/query'),
    require('./modules/topology-type'),
    require('./modules/cluster-type')
];

const mainDefs = [
    `schema {
        query: Query,
    } `,
];

const resolvers = modules
    .map(m => {
        return m.resolver;
    })
    .filter(res => {
        return !!res;
    });

const typeDefs = mainDefs
    .concat(
        modules
            .map(m => {
                return m.typeDef
            })
            .filter(res => {
                return !!res
            })
    );

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
})

export {
    schema
}
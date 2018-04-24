import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import schema from './schema/index';
import config from '../config';

const GRAPHQL_PORT = process.env.PORT || config.get('httpPort') || 4000;

const graphQLServer = express();
graphQLServer.use('*', cors({ origin: 'http://localhost:3000' }));


graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(`HCM UI API is now running on http://localhost:${GRAPHQL_PORT}/graphql`);
  console.log(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
});

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import log4js from 'log4js';
import morgan from 'morgan';
import helmet from 'helmet';
import schema from './schema/index';
import config from '../config';


const logger = log4js.getLogger('server');


const log4jsConfig = process.env.LOG4JS_CONFIG ? JSON.parse(process.env.LOG4JS_CONFIG) : undefined;
log4js.configure(log4jsConfig || 'config/log4js.json');

const GRAPHQL_PORT = process.env.PORT || config.get('httpPort') || 4000;

const graphQLServer = express();
graphQLServer.use('*', helmet());

if (process.env.NODE_ENV === 'production') {
  graphQLServer.use('*', cors()); // temp solution
  graphQLServer.use('*', morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  }));
} else {
  graphQLServer.use('*', cors());
  graphQLServer.use('*', morgan('dev'));
}

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () => {
  logger.info(`[pid ${process.pid}] [env ${process.env.NODE_ENV}] started.`);
  logger.info(`HCM UI API is now running on http://localhost:${GRAPHQL_PORT}/graphql`);
  logger.info(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`);
});

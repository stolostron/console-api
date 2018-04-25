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
const CONTEXT_PATH = config.get('contextPath');

const graphQLServer = express();
graphQLServer.use('*', helmet());

if (process.env.NODE_ENV === 'production') {
  graphQLServer.use(
    '*',
    morgan('combined', {
      skip: (req, res) => res.statusCode < 400,
    }),
  );
  graphQLServer.use('*', cors()); // temp solution
} else {
  graphQLServer.use('*', cors());
  graphQLServer.use('*', morgan('dev'));
}

graphQLServer.use(`${CONTEXT_PATH}/graphql`, bodyParser.json(), graphqlExpress({ schema }));
graphQLServer.use(`${CONTEXT_PATH}/graphiql`, graphiqlExpress({ endpointURL: `${CONTEXT_PATH}/graphql` }));

graphQLServer.listen(GRAPHQL_PORT, () => {
  logger.info(`[pid ${process.pid}] [env ${process.env.NODE_ENV}] started.`);
  logger.info(`HCM UI API is now running on http://localhost:${GRAPHQL_PORT}${CONTEXT_PATH}/graphql`);
  logger.info(`GraphiQL is now running on http://localhost:${GRAPHQL_PORT}${CONTEXT_PATH}/graphiql`);
});

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { isInstance as isApolloErrorInstance, formatError as formatApolloError } from 'apollo-errors';
import bodyParser from 'body-parser';
import { app as inspect } from '@icp/security-middleware';
import log4js from 'log4js';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import https from 'https';
import fs from 'fs';
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
  logger.info('Authentication enabled');
  graphQLServer.use(cookieParser(), inspect);
} else {
  graphQLServer.use('*', morgan('dev'));
  // disable security check and enable graphiql only for local dev
  graphQLServer.use(cookieParser());
  graphQLServer.use(`${CONTEXT_PATH}/graphiql`, graphiqlExpress({ endpointURL: `${CONTEXT_PATH}/graphql` }));
}

const formatError = (error) => {
  const { originalError } = error;
  if (isApolloErrorInstance(originalError)) {
    logger.error(JSON.stringify(error.originalError, null, 2));
  }
  return formatApolloError(error);
};

graphQLServer.use(`${CONTEXT_PATH}/graphql`, bodyParser.json(), graphqlExpress(req => ({ formatError, schema, context: req })));

const privateKey = fs.readFileSync(process.env.serverKey || './sslcert/hcmuiapi.key', 'utf8');
const certificate = fs.readFileSync(process.env.serverCert || './sslcert/hcmuiapi.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, graphQLServer);

server.listen(GRAPHQL_PORT, () => {
  logger.info(`[pid ${process.pid}] [env ${process.env.NODE_ENV}] started.`);
  logger.info(`HCM UI API is now running on https://localhost:${GRAPHQL_PORT}${CONTEXT_PATH}/graphql`);
  if (process.env.NODE_ENV !== 'production') {
    logger.info(`GraphiQL is now running on https://localhost:${GRAPHQL_PORT}${CONTEXT_PATH}/graphiql`);
  }
});

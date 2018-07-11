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
import schema from './schema/index';
import config from '../../config';
import HCMConnector from './datasource/lib/hcm-connector';
import MongoConnector from './datasource/lib/mongo-connector';

const logger = log4js.getLogger('server');

const log4jsConfig = process.env.LOG4JS_CONFIG ? JSON.parse(process.env.LOG4JS_CONFIG) : undefined;
log4js.configure(log4jsConfig || 'config/log4js.json');

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


const getProductionOptions = async (req) => {
  const mongoConnector = new MongoConnector();
  const hcmConnector = new HCMConnector({
    hcmUrl: config.get('hcmUrl') || 'http://localhost:8080',
    pollInterval: config.get('hcmPollInterval') || 200,
    pollTimeout: config.get('hcmPollTimeout') || 10000,
  });

  await mongoConnector.connect(config.get('mongodbUrl') || 'mongodb://localhost:27017/weave');
  return {
    formatError,
    schema,
    context: {
      req,
      hcmConnector,
      mongoConnector,
    },
  };
};

graphQLServer.use(`${CONTEXT_PATH}/graphql`, bodyParser.json(), graphqlExpress(getProductionOptions));

export default graphQLServer;

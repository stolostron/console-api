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
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import logger from './lib/logger';
import ApplicationModel from './models/application';
import KubeModel from './models/kube';
import MongoModel from './models/mongo';
import createMockHttp from './mocks/';
import schema from './schema/';
import config from '../../config';
import authMiddleware from './lib/auth-middleware';

export const GRAPHQL_PATH = `${config.get('contextPath')}/graphql`;
export const GRAPHIQL_PATH = `${config.get('contextPath')}/graphiql`;

const formatError = (error) => {
  const { originalError } = error;
  if (isApolloErrorInstance(originalError)) {
    logger.error(JSON.stringify(error.originalError, null, 2));
  }
  return formatApolloError(error);
};

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
  graphQLServer.use(cookieParser(), inspect, authMiddleware());

  const mongoModel = new MongoModel();
  graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress(async (req) => {
    await mongoModel.connect(config.get('mongodbUrl') || 'mongodb://localhost:27017/weave');

    return {
      formatError,
      schema,
      context: {
        req,
        applicationModel: new ApplicationModel({ token: req.kubeToken }),
        kubeModel: new KubeModel({ token: req.kubeToken }),
        mongoModel,
      },
    };
  }));
} else if (process.env.NODE_ENV === 'test') {
  logger.info('RUNNING MOCK SERVER');
  const mockHttp = createMockHttp();
  graphQLServer.use('*', morgan('dev'));
  // disable security check and enable graphiql only for local dev
  graphQLServer.use(cookieParser(), authMiddleware({ shouldLocalAuth: true }));
  graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({ endpointURL: GRAPHQL_PATH }));
  graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress(req => ({
    formatError,
    schema,
    context: {
      req,
      applicationModel: new ApplicationModel({ token: req.kubeToken, httpLib: mockHttp }),
      kubeModel: new KubeModel({ token: req.kubeToken, httpLib: mockHttp }),
    },

  })));
} else {
  graphQLServer.use('*', morgan('dev'));
  // disable security check and enable graphiql only for local dev
  graphQLServer.use(cookieParser(), authMiddleware({ shouldLocalAuth: true }));
  graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({ endpointURL: GRAPHQL_PATH }));

  const mongoModel = new MongoModel();
  graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress(async (req) => {
    await mongoModel.connect(config.get('mongodbUrl') || 'mongodb://localhost:27017/weave');

    return {
      formatError,
      schema,
      context: {
        req,
        applicationModel: new ApplicationModel({ token: req.kubeToken }),
        kubeModel: new KubeModel({ token: req.kubeToken }),
        mongoModel,
      },
    };
  }));
}

export default graphQLServer;

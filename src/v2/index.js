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
import ClusterModel from './models/cluster';
import ComplianceModel from './models/compliance';
import HelmModel from './models/helm';
import KubeConnector from './connectors/kube';
import MongoModel from './models/mongo';
import ResourceViewModel from './models/resourceview';

import createMockKubeHTTP from './mocks/kube-http';
import schema from './schema/';
import config from '../../config';
import authMiddleware from './lib/auth-middleware';

export const GRAPHQL_PATH = `${config.get('contextPath')}/graphql`;
export const GRAPHIQL_PATH = `${config.get('contextPath')}/graphiql`;

const isProd = config.get('NODE_ENV') === 'production';
const isTest = config.get('NODE_ENV') === 'test';

const formatError = (error) => {
  const { originalError } = error;
  if (isApolloErrorInstance(originalError)) {
    logger.error(JSON.stringify(error.originalError, null, 2));
  }
  return formatApolloError(error);
};

const graphQLServer = express();

const requestLogger = isProd ?
  morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  })
  : morgan('dev');

graphQLServer.use('*', helmet(), requestLogger, cookieParser());

const auth = [];

if (isProd) {
  logger.info('Authentication enabled');
  auth.push(inspect, authMiddleware());
} else {
  auth.push(authMiddleware({ shouldLocalAuth: true }));
  graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({ endpointURL: GRAPHQL_PATH }));
}

graphQLServer.use(...auth);
graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress(async (req) => {
  let kubeHTTP;
  if (isTest) {
    logger.info('Running in mock mode');
    kubeHTTP = createMockKubeHTTP();
  }

  const kubeConnector = new KubeConnector({ token: req.kubeToken, httpLib: kubeHTTP });
  const namespaces = req.user.namespaces.map(ns => ns.namespaceId);

  const context = {
    req,
    applicationModel: new ApplicationModel({ kubeConnector, namespaces }),
    clusterModel: new ClusterModel({ kubeConnector, namespaces }),
    complianceModel: new ComplianceModel({ kubeConnector }),
    helmModel: new HelmModel({ kubeConnector, namespaces }),
    resourceViewModel: new ResourceViewModel({ kubeConnector, namespaces }),
  };

  if (!isTest) {
    context.mongoModel = new MongoModel(config.get('mongodbUrl')
      || 'mongodb://localhost:27017/weave');
  }

  return { formatError, schema, context };
}));

export default graphQLServer;

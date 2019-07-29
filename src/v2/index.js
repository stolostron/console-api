/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
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
import compression from 'compression';
import cookieParser from 'cookie-parser';

import logger from './lib/logger';

import KubeConnector from './connectors/kube';

import ApplicationModel from './models/application';
import ChannelModel from './models/channel';
import SubscriptionModel from './models/subscription';
import ClusterModel from './models/cluster';
import GenericModel from './models/generic';
import QueryModel from './models/userquery';
import CemModel from './models/cemincident';
import ComplianceModel from './models/compliance';
import HelmModel from './models/helm';
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
graphQLServer.use(compression());

const requestLogger = isProd ?
  morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  })
  : morgan('dev');

graphQLServer.use('*', helmet(), requestLogger, cookieParser());

graphQLServer.get('/livenessProbe', (req, res) => {
  res.send(`Testing livenessProbe --> ${new Date().toLocaleString()}`);
});

graphQLServer.get('/readinessProbe', (req, res) => {
  res.send(`Testing readinessProbe --> ${new Date().toLocaleString()}`);
});

const auth = [];

if (isProd) {
  logger.info('Authentication enabled');
  auth.push(inspect, authMiddleware());
} else {
  auth.push(authMiddleware({ shouldLocalAuth: true }));
  graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({ endpointURL: GRAPHQL_PATH }));
}

if (isTest) {
  logger.info('Running in mock mode');
}

graphQLServer.use(...auth);
graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress(async (req) => {
  let kubeHTTP;
  if (isTest) {
    kubeHTTP = createMockKubeHTTP();
  }

  const namespaces = req.user.namespaces.map(ns => ns.namespaceId);

  const kubeConnector = new KubeConnector({
    token: req.kubeToken,
    httpLib: kubeHTTP,
    namespaces,
  });

  const context = {
    req,
    applicationModel: new ApplicationModel({ kubeConnector }),
    channelModel: new ChannelModel({ kubeConnector }),
    subscriptionModel: new SubscriptionModel({ kubeConnector }),
    clusterModel: new ClusterModel({ kubeConnector }),
    genericModel: new GenericModel({ kubeConnector }),
    queryModel: new QueryModel({ kubeConnector, req }),
    cemModel: new CemModel({ kubeConnector, req }),
    complianceModel: new ComplianceModel({ kubeConnector }),
    helmModel: new HelmModel({ kubeConnector }),
    mongoModel: new MongoModel(config.get('mongodbUrl'), { namespaces }),
    resourceViewModel: new ResourceViewModel({ kubeConnector }),
  };

  return { formatError, schema, context };
}));

export default graphQLServer;

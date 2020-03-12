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
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import inspect from 'security-middleware';
import _ from 'lodash';

import logger from './lib/logger';

import KubeConnector from './connectors/kube';
import RcmApiConnector from './connectors/rcmApi';

import ApplicationModel from './models/application';
import ChannelModel from './models/channel';
import SubscriptionModel from './models/subscription';
import PlacementRuleModel from './models/placementrule';
import ClusterModel from './models/cluster';
import GenericModel from './models/generic';
import CemModel from './models/cemincident';
import ComplianceModel from './models/compliance';
import HelmModel from './models/helm';
import ResourceViewModel from './models/resourceview';
import SFModel from './models/findings';
import RcmApiModel from './models/rcmApi';

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

graphQLServer.use('*', helmet({
  frameguard: false,
  noSniff: false,
  xssFilter: false,
  noCache: true,
}), requestLogger, cookieParser());

graphQLServer.get('/livenessProbe', (req, res) => {
  res.send(`Testing livenessProbe --> ${new Date().toLocaleString()}`);
});

graphQLServer.get('/readinessProbe', (req, res) => {
  res.send(`Testing readinessProbe --> ${new Date().toLocaleString()}`);
});

const auth = [];

if (isProd) {
  logger.info('Authentication enabled');
  auth.push(inspect.app, authMiddleware());
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

  let namespaces = _.get(req, 'user.namespaces', []);
  namespaces = Array.isArray(namespaces.items) ? namespaces.items.map(ns => ns.metadata.name) : [];

  const kubeConnector = new KubeConnector({
    token: req.kubeToken,
    httpLib: kubeHTTP,
    namespaces,
  });

  const rcmApiConnector = new RcmApiConnector({
    token: _.get(req, "cookies['acm-access-token-cookie']") || config.get('acm-access-token-cookie'),
    httpLib: kubeHTTP,
  });

  const context = {
    req,
    applicationModel: new ApplicationModel({ kubeConnector }),
    channelModel: new ChannelModel({ kubeConnector }),
    subscriptionModel: new SubscriptionModel({ kubeConnector }),
    placementRuleModel: new PlacementRuleModel({ kubeConnector }),
    clusterModel: new ClusterModel({ kubeConnector }),
    genericModel: new GenericModel({ kubeConnector }),
    cemModel: new CemModel({ kubeConnector, req }),
    complianceModel: new ComplianceModel({ kubeConnector }),
    helmModel: new HelmModel({ kubeConnector }),
    resourceViewModel: new ResourceViewModel({ kubeConnector }),
    sfModel: new SFModel({ kubeConnector, req }),
    rcmApiModel: new RcmApiModel({ rcmApiConnector, kubeConnector }),
  };

  return { formatError, schema, context };
}));

export default graphQLServer;

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { isInstance as isApolloErrorInstance, formatError as formatApolloError } from 'apollo-errors';
import morgan from 'morgan';
import helmet from 'helmet';
import noCache from 'nocache';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import inspect from 'security-middleware';
import _ from 'lodash';

import logger from './lib/logger';

import KubeConnector from './connectors/kube';

import ApplicationModel from './models/application';
import ChannelModel from './models/channel';
import SubscriptionModel from './models/subscription';
import PlacementRuleModel from './models/placementrule';
import ClusterModel, { CLUSTER_NAMESPACE_LABEL } from './models/cluster';
import GenericModel from './models/generic';
import ComplianceModel from './models/compliance';
import ResourceViewModel from './models/resourceview';
import SFModel from './models/findings';
import ConnectionModel from './models/connection';

import createMockKubeHTTP from './mocks/kube-http';
import schema from './schema';
import config from '../../config';
import authMiddleware from './lib/auth-middleware';
import BareMetalAssetModel from './models/bare-metal-asset';

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

const apolloServer = new ApolloServer({
  ...schema,
  formatError,
  playground: {
    endpoint: GRAPHQL_PATH,
  },
  context: ({ req }) => {
    let kubeHTTP;
    if (isTest) {
      kubeHTTP = createMockKubeHTTP();
    }

    const namespaceList = _.get(req, 'user.namespaces', []);
    const rawNamespaces = Array.isArray(namespaceList.items) ? namespaceList.items : [];
    const namespaces = rawNamespaces.map((ns) => ns.metadata.name);
    const clusterNamespaces = rawNamespaces.filter((ns) => _.has(ns, `metadata.labels["${CLUSTER_NAMESPACE_LABEL}"]`))
      .map((ns) => ns.metadata.name);

    const { updateUserNamespaces } = req;

    const kubeConnector = new KubeConnector({
      token: req.kubeToken,
      httpLib: kubeHTTP,
      namespaces,
    });

    return {
      req,
      applicationModel: new ApplicationModel({ kubeConnector }),
      channelModel: new ChannelModel({ kubeConnector }),
      subscriptionModel: new SubscriptionModel({ kubeConnector }),
      placementRuleModel: new PlacementRuleModel({ kubeConnector }),
      clusterModel: new ClusterModel({ kubeConnector, clusterNamespaces, updateUserNamespaces }),
      genericModel: new GenericModel({ kubeConnector }),
      complianceModel: new ComplianceModel({ kubeConnector }),
      resourceViewModel: new ResourceViewModel({ kubeConnector }),
      sfModel: new SFModel({ kubeConnector, req }),
      connectionModel: new ConnectionModel({ kubeConnector }),
      bareMetalAssetModel: new BareMetalAssetModel({ kubeConnector }),
    };
  },
});

const graphQLServer = express();
graphQLServer.use(compression());

const requestLogger = isProd
  ? morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  })
  : morgan('dev');

graphQLServer.use('*', helmet({
  frameguard: false,
  noSniff: false,
  xssFilter: false,
}), noCache(), requestLogger, cookieParser());

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
}

if (isTest) {
  logger.info('Running in mock mode');
}

graphQLServer.use(...auth);

apolloServer.applyMiddleware({ app: graphQLServer, path: GRAPHQL_PATH });

export default graphQLServer;

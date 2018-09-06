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
import HelmModel from './models/helm';
import KubeConnector from './connectors/kube';
import KubeModel from './models/kube';
import ResourceViewModel from './models/resourceview';
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

  graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress(async (req) => {
    const kubeConnector = new KubeConnector({ token: req.kubeToken });

    return {
      formatError,
      schema,
      context: {
        req,
        helmModel: new HelmModel({ kubeConnector }),
        applicationModel: new ApplicationModel({ kubeConnector }),
        clusterModel: new ClusterModel({ kubeConnector }),
        kubeModel: new KubeModel({ kubeConnector }),
        mongoModel: new MongoModel(config.get('mongodbUrl') || 'mongodb://localhost:27017/weave'),
        resourceViewModel: new ResourceViewModel({ kubeConnector }),
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
  graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress((req) => {
    const kubeConnector = new KubeConnector({ token: req.kubeToken, httpLib: mockHttp });

    return {
      formatError,
      schema,
      context: {
        req,
        helmModel: new HelmModel({ kubeConnector }),
        applicationModel: new ApplicationModel({ kubeConnector }),
        clusterModel: new ClusterModel({ kubeConnector }),
        kubeModel: new KubeModel({ kubeConnector }),
        resourceViewModel: new ResourceViewModel({ kubeConnector }),
      },
    };
  }));
} else {
  graphQLServer.use('*', morgan('dev'));
  // disable security check and enable graphiql only for local dev
  graphQLServer.use(cookieParser(), authMiddleware({ shouldLocalAuth: true }));
  graphQLServer.use(GRAPHIQL_PATH, graphiqlExpress({ endpointURL: GRAPHQL_PATH }));

  graphQLServer.use(GRAPHQL_PATH, bodyParser.json(), graphqlExpress(async (req) => {
    const kubeConnector = new KubeConnector({ token: req.kubeToken });

    return {
      formatError,
      schema,
      context: {
        req,
        helmModel: new HelmModel({ kubeConnector }),
        applicationModel: new ApplicationModel({ kubeConnector }),
        clusterModel: new ClusterModel({ kubeConnector }),
        kubeModel: new KubeModel({ kubeConnector }),
        resourceViewModel: new ResourceViewModel({ kubeConnector }),
        mongoModel: new MongoModel(config.get('mongodbUrl') || 'mongodb://localhost:27017/weave'),
      },
    };
  }));
}

export default graphQLServer;

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import https from 'https';
import fs from 'fs';
import log4js from 'log4js';
import config from '../config';

const logger = log4js.getLogger('server');

const log4jsConfig = process.env.LOG4JS_CONFIG ? JSON.parse(process.env.LOG4JS_CONFIG) : undefined;
log4js.configure(log4jsConfig || 'config/log4js.json');

const GRAPHQL_PORT = process.env.PORT || config.get('httpPort') || 4000;
const CONTEXT_PATH = config.get('contextPath');

const graphQLServer = require('./v2').default;

const privateKey = fs.readFileSync(process.env.serverKey || './sslcert/consoleapi.key', 'utf8');
const certificate = fs.readFileSync(process.env.serverCert || './sslcert/consoleapi.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

if (process.env.NODE_ENV === 'development') {
  if (!process.env.API_SERVER_URL) {
    throw new Error('environment variable API_SERVER_URL is required');
  }

  if (!process.env.SERVICEACCT_TOKEN) {
    throw new Error('environment variable SERVICEACCT_TOKEN is required');
  }
}

let server = https.createServer(credentials, graphQLServer);

server.listen(GRAPHQL_PORT, () => {
  logger.info(`[pid ${process.pid}] [env ${process.env.NODE_ENV}] [version V2] started.`);
  logger.info(`Console API is now running on https://localhost:${GRAPHQL_PORT}${CONTEXT_PATH}/graphql`);
  if (process.env.NODE_ENV !== 'production') {
    logger.info(`GraphQL Playground is available at https://localhost:${GRAPHQL_PORT}${CONTEXT_PATH}/graphql`);
  }
});

function shutdown() {
  if (server !== null) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        logger.error('shutdown timeout');
        throw new Error('shutdown timeout');
      }, 30 * 1000).unref();
    }

    server.close();
    server = null;
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

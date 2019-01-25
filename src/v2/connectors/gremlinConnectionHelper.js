/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import gremlin from 'gremlin';
import fs from 'fs';
import logger from '../lib/logger';
import config from '../../../config';

const mcmSecretPath = '/opt/secrets';


export default function getGremlinCredentials() {
  if (process.env.NODE_ENV === 'production') {
    try {
      const ca = fs.readFileSync(`${mcmSecretPath}/mcmsearchca.crt`, 'utf8');
      const certificate = fs.readFileSync(`${mcmSecretPath}/mcmsearch.crt`, 'utf8');
      // const key = fs.readFileSync(`${mcmSecretPath}/mcmsearch.key`, 'utf8');
      const gremlinCredentials = fs.readFileSync(`${mcmSecretPath}/users`, 'utf8').split(':');

      if (!gremlinCredentials || gremlinCredentials.length !== 2) {
        logger.error('The gremlin credentials are invalid.');
      }

      logger.info('Establishing secure connection to gremlin using credentials from mounted secret.');

      return {
        gremlinEndpoint: config.get('gremlinEndpoint').replace('ws:', 'wss:'),
        connOpts: {
          authenticator:
            new gremlin.driver.auth.PlainTextSaslAuthenticator(
              gremlinCredentials[0],
              gremlinCredentials[1],
            ),
          rejectUnauthorized: false,
          cert: certificate,
          ca: [ca],
        },
      };
    } catch (e) {
      logger.error('Error getting the gremlin credentials. A secret most be mounted at /opt/secrets');
      logger.error('The secret most contain "mcmsearch.crt", "mcmsearchca.cert", and "users".');
      logger.error('The users object most have the format "username:password".');
      logger.error(e);
      logger.warn('Attempting to establish an insecure connection to gremlin.');
      return {
        gremlinEndpoint: config.get('gremlinEndpoint').replace('wss:', 'ws:'),
        connOpts: {},
      };
    }
  }

  if (config.get('gremlinSecurityEnabled') === true) {
    const gremlinUsername = config.get('gremlinUsername');
    const gremlinPassword = config.get('gremlinPassword');

    logger.warn('Establishing secure connection to gremlin using credentials from environment variables.');
    logger.warn('This should be used only for development and test.');
    return {
      gremlinEndpoint: config.get('gremlinEndpoint').replace('ws:', 'wss:'),
      connOpts: {
        authenticator:
          new gremlin.driver.auth.PlainTextSaslAuthenticator(gremlinUsername, gremlinPassword),
        rejectUnauthorized: false,
      },
    };
  }

  logger.info('Establishing an insecure connection to gremlin. Credentials for a secure connection were not found.');
  return {
    gremlinEndpoint: config.get('gremlinEndpoint').replace('wss:', 'ws:'),
    connOpts: {},
  };
}

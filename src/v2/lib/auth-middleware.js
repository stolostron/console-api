/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import lru from 'lru-cache';
import jws from 'jws';
import config from '../../../config';
import request from './request';

// Async middleware error handler
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

export default function createAuthMiddleWare({
  cache = lru({
    max: 1000,
    maxAge: 60 * 60 * 1000, // 1hr
  }),
  httpLib = request,
  shouldLocalAuth,
} = {}) {
  return asyncMiddleware(async (req, res, next) => {
    let idToken;
    const authorization = req.headers.authorization || req.headers.Authorization;
    if ((_.isEmpty(authorization) && shouldLocalAuth) || process.env.MOCK === 'true') {
      // special case for graphiql to work locally
      // do not exchange for idtoken since authorization header is empty
      idToken = config.get('localKubeToken') || 'localdev';
    } else {
      const accessToken = authorization.substring(7);
      idToken = cache.get(accessToken);
      if (!idToken) {
        const options = {
          url: `${config.get('PLATFORM_IDENTITY_PROVIDER_URL')}/v1/auth/exchangetoken`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
          json: true,
          form: {
            access_token: accessToken,
          },
        };

        const response = await httpLib(options);
        idToken = _.get(response, 'body.id_token');
        if (idToken) {
          cache.set(accessToken, idToken);
        } else {
          throw new Error(`Authentication error: ${response.body}`);
        }
      }
    }

    // eslint-disable-next-line no-param-reassign
    req.kubeToken = `Bearer ${idToken}`;
    // eslint-disable-next-line no-param-reassign
    req.user = _.get(jws.decode(idToken), 'payload.uniqueSecurityName');
    next();
  });
}

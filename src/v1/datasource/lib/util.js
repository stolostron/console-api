/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import lru from 'lru-cache';
import _ from 'lodash';
import request from './request';
import config from '../../../../config';
import { AuthenticationError } from './errors';

const tokenCache = lru({
  max: 1000,
  maxAge: 60 * 60 * 1000, // 1hr
});

export default async function getToken(req) {
  let idToken;
  const authorization = req.headers.authorization ?
    req.headers.authorization : req.headers.Authorization;
  if (_.isEmpty(authorization) && process.env.NODE_ENV === 'development') {
    // special case for graphiql to work locally
    // do not exchange for idtoken since authorization header is empty
    idToken = 'localdev';
  } else {
    const accessToken = authorization.substring(7);
    idToken = tokenCache.get(accessToken);
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
      const response = await request(options);
      idToken = _.get(response, 'body.id_token');
      if (idToken) {
        tokenCache.set(accessToken, idToken);
      } else {
        throw new AuthenticationError({ data: response });
      }
    }
  }
  return `Bearer ${idToken}`;
}

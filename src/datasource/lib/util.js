/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import lru from 'lru-cache';
import _ from 'lodash';
import request from './request';
import config from '../../../config';
import { IDTokenError } from './errors';

const tokenCache = lru({
  max: 1000,
  maxAge: 60 * 60 * 1000, // 1hr
});

export default async function getToken(req) {
  const accessToken = req.cookies['cfc-access-token-cookie'];
  let idToken = tokenCache.get(accessToken);
  if (idToken) {
    return idToken;
  }
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

  const response = await request(options).then(res => res);
  idToken = _.get(response, 'body.id_token');
  if (idToken) {
    tokenCache.set(accessToken, idToken);
  } else if (process.env.NODE_ENV !== 'development') {
    // special case for local dev. we need to allow it for graphiql when running it locally
    throw new IDTokenError({ data: response });
  }
  return idToken;
}

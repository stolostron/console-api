/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import _ from 'lodash';
import LRU from 'lru-cache';
import createMockIAMHTTP from '../mocks/iam-http';
import request from './request';

// Async middleware error handler
const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

async function getKubeToken({
  authorization,
  shouldLocalAuth,
}) {
  let idToken;
  if ((_.isEmpty(authorization) && shouldLocalAuth) || process.env.MOCK === 'true') {
    // special case for graphiql to work locally
    // do not exchange for idtoken since authorization header is empty
    idToken = `Bearer ${process.env.SERVICEACCT_TOKEN}`;
  } else {
    idToken = authorization;
    if (!idToken) {
      throw new Error('Authentication error: invalid token parsed from cookie');
    }
  }

  return idToken;
}

async function getNamespaces(usertoken) {
  const options = {
    url: `${process.env.API_SERVER_URL || 'https://kubernetes.default.svc'}/apis/project.openshift.io/v1/projects`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: usertoken,
    },
    json: true,
    fullResponse: false,
  };
  if (process.env.NODE_ENV === 'test') {
    const mockReq = createMockIAMHTTP();
    return mockReq(options);
  }
  return request(options);
}

export default function createAuthMiddleWare({
  cache = new LRU({
    max: 1000,
    maxAge: 2 * 60 * 1000, // 2 mins. Must keep low because user's permissions can change.
  }),
  shouldLocalAuth,
} = {}) {
  return asyncMiddleware(async (req, res, next) => {
    const idToken = await getKubeToken({
      authorization: req.headers.authorization || req.headers.Authorization || req.cookies['acm-access-token-cookie'],
      shouldLocalAuth,
    });
    req.kubeToken = idToken;

    // Get the namespaces for the user.
    // We cache the promise to prevent starting the same request multiple times.
    let nsPromise = cache.get(`namespaces_${idToken}`);
    if (!nsPromise) {
      nsPromise = getNamespaces(idToken);
      cache.set(`namespaces_${idToken}`, nsPromise);
    }

    req.updateUserNamespaces = async (project) => {
      const projectPromise = await cache.get(`namespaces_${idToken}`);
      if (projectPromise && project) {
        projectPromise.items.push(project);
        cache.set(`namespaces_${idToken}`, projectPromise);
      }
    };

    // Get user's account data.
    // We cache the promise to prevent starting the same request multiple times.
    // let accountPromise = cache.get(`account_${iamToken}`);
    // if (!accountPromise) {
    //   accountPromise = getAccountData({
    //     iamToken,
    //     user: userName,
    //   });
    //   cache.set(`account_${iamToken}`, accountPromise);
    // }

    req.user = {
      // name: userName,
      namespaces: await nsPromise,
      // userAccount: await accountPromise,
      // iamToken,
    };

    next();
  });
}

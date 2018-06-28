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
import config from '../../../config';
import { GenericError, AuthenticationError } from './errors';

const transformResource = (clusterName, resource, resourceName) => ({
  ...resource,
  name: resourceName,
  cluster: clusterName,
});

const transform = (clusterName, resources) =>
  _.reduce(
    resources,
    (transformed, resource, resourceName) => {
      transformed.push(transformResource(clusterName, resource, resourceName));
      return transformed;
    },
    [],
  );

const clustersToItems = clusterData =>
  _.reduce(
    clusterData,
    (accum, { Results: resources }, clusterName) => {
      // Transform all resources for the cluster
      if (resources.code) {
        accum.push(resources);
      } else {
        transform(clusterName, resources).forEach(resource => accum.push(resource));
      }

      return accum;
    },
    [],
  );

export default class HCMConnector {
  constructor({
    hcmUrl = config.get('hcmUrl'),
    pollInterval = config.get('hcmPollInterval'),
    pollTimeout = config.get('hcmPollTimeout'),
    requestLib = request,
  } = {}) {
    this.hcmUrl = hcmUrl;
    this.pollInterval = pollInterval;
    this.pollTimeout = pollTimeout;
    this.request = requestLib;

    this.tokenCache = lru({
      max: 1000,
      maxAge: 60 * 60 * 1000, // 1hr
    });

    this.workDefaults = {
      method: 'POST',
      json: {
        SrcClusters: { Names: null, Labels: null, Status: null },
        DstClusters: { Names: ['*'], Labels: null, Status: ['healthy'] },
        ClientID: '',
        Dryrun: false,
        Completed: false,
        UUID: '',
        Operation: 'get',
        Work: { Namespaces: '', Status: '', Labels: '' },
        Timestamp: new Date(),
        NextRequest: null,
        FinishedRequest: null,
        Description: '',
      },
    };
  }

  async getToken(req) {
    let idToken;
    const authorization = req.headers.authorization ?
      req.headers.authorization : req.headers.Authorization;
    if (_.isEmpty(authorization) && process.env.NODE_ENV === 'development') {
      // special case for graphiql to work locally
      // do not exchange for idtoken since authorization header is empty
      idToken = 'localdev';
    } else {
      const accessToken = authorization.substring(7);
      idToken = this.tokenCache.get(accessToken);
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
        const response = await this.request(options);
        idToken = _.get(response, 'body.id_token');
        if (idToken) {
          this.tokenCache.set(accessToken, idToken);
        } else {
          throw new AuthenticationError({ data: response });
        }
      }
    }
    return `Bearer ${idToken}`;
  }

  async processRequest(req, path, ...httpOverrides) {
    const opts = _.merge({
      url: `${this.hcmUrl}${path}`,
      headers: {
        Authorization: await this.getToken(req),
      },
      json: {},
      method: 'GET',
    }, ...httpOverrides);
    const { body } = await this.request(opts);
    if (body.Error) {
      throw new GenericError({ data: body.Error });
    }

    let returnValue;
    try {
      returnValue = JSON.parse(body.RetString).Result;
    } catch (err) {
      returnValue = body.RetString;
    }

    return returnValue;
  }

  timeout() {
    let timeoutID;
    const timeoutPromise = new Promise((resolve, reject) => {
      timeoutID = setTimeout(reject, this.pollTimeout, new GenericError({ data: { error: 'Manager request timed out' } }));
    });

    return { timeoutID, timeoutPromise };
  }

  poll(req, workID) {
    let intervalID;

    const pollPromise = new Promise(async (resolve, reject) => {
      // eslint-disable-next-line consistent-return
      intervalID = setInterval(async () => {
        const { Completed, Results } = await this.processRequest(req, `/api/v1alpha1/work/${workID}`, { method: 'GET' });
        if (Completed) {
          if (Results.code || Results.message) {
            return reject(Results);
          }

          resolve(Results);
        }
      }, this.pollInterval);
    });

    return { intervalID, pollPromise };
  }

  async pollWork(req, ...httpOverrides) {
    let err;
    let result;

    const workID = await this.processRequest(req, '/api/v1alpha1/work', { method: 'POST' }, ...httpOverrides);

    const { timeoutID, timeoutPromise } = this.timeout();
    const { intervalID, pollPromise } = this.poll(req, workID);

    try {
      result = await Promise.race([timeoutPromise, pollPromise]);
    } catch (error) {
      err = error;
    }

    // Clear interval/timeout in all cases - node doesn't have finally block
    clearInterval(intervalID);
    clearTimeout(timeoutID);

    if (err) {
      throw err;
    }

    return result;
  }

  async getWork(req, type, opts) {
    const result = await this.pollWork(req, { json: { Resource: type } }, this.workDefaults, opts);
    return clustersToItems(result);
  }
}

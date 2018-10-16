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
import logger from '../lib/logger';
import { isRequired } from '../lib/utils';
import config from '../../../config';
import requestLib from '../lib/request';

function selectNamespace(namespaces) {
  return namespaces.find(ns => ns === 'default') || namespaces[0];
}

export default class KubeConnector {
  constructor({
    cache = lru(),
    token = 'Bearer localdev',
    httpLib = requestLib,
    kubeApiEndpoint = `${config.get('cfcRouterUrl')}/kubernetes`,
    namespaces = isRequired('namespaces'),
    pollTimeout = config.get('hcmPollTimeout'),
    pollInterval = config.get('hcmPollInterval'),
    uid = Date.now,
  } = {}) {
    // Caches requests for a single query.
    this.cache = cache;
    this.http = httpLib;
    this.kubeApiEndpoint = kubeApiEndpoint;
    this.namespaces = namespaces;
    this.pollInterval = pollInterval;
    this.pollTimeout = pollTimeout;
    this.resourceViewNamespace = selectNamespace(namespaces);
    this.token = token;
    this.uid = uid;
  }

  /**
   * Excecute Kube API GET requests.
   *
   * @param {*} path - API path
   * @param {*} opts - HTTP request options
   * @param {*} noCache - Don't use a previously cached request.
   */
  get(path = '', opts = {}, noCache) {
    const options = _.merge({
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'GET',
      headers: {
        Authorization: this.token,
      },
    }, opts);

    const cacheKey = `${path}/${JSON.stringify(options.body)}`;

    const cachedRequest = this.cache.get(cacheKey);
    if ((noCache === undefined || noCache === false) && cachedRequest) {
      logger.debug('Kubeconnector: Using cached GET request.');
      return cachedRequest;
    }

    const newRequest = this.http(options).then(res => res.body);

    if (noCache === undefined || noCache === false) {
      this.cache.set(cacheKey, newRequest);
    }

    return newRequest;
  }

  /**
   * Excecute Kube API GET requests for namespaces resources.
   *
   * @param {*} urlTemplate - function from namespace to url path
   * @param {*} opts - default namespace list override
   * @param {*} opts - kind of returned items--used to create valid k8s yaml
   */
  async getResources(urlTemplate, { namespaces, kind } = {}) {
    const namespaceList = (namespaces || this.namespaces);

    const requests = namespaceList.map(async (ns) => {
      let response;
      try {
        response = await this.get(urlTemplate(ns));
      } catch (err) {
        logger.error(`MCM REQUEST ERROR - ${err.message}`);
        return [];
      }

      if (response.code || response.message) {
        logger.error(`MCM ERROR ${response.code} - ${response.message}`);
        return [];
      }

      return (response.items ? response.items : [response]).map(item => (kind ? Object.assign({
        apiVersion: response.apiVersion,
        kind,
      }, item) : item));
    });

    return _.flatten(await Promise.all(requests));
  }

  post(path, jsonBody, opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'POST',
      headers: {
        Authorization: this.token,
      },
      json: jsonBody,
    };

    return this.http(_.merge(defaults, opts)).then(res => res.body);
  }

  delete(path, jsonBody, opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'DELETE',
      headers: {
        Authorization: this.token,
      },
      json: jsonBody,
    };
    return this.http(_.merge(defaults, opts)).then(res => res.body);
  }

  patch(path = '', opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'PATCH',
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json-patch+json',
      },
    };

    const newRequest = this.http(_.merge(defaults, opts)).then(res => res.body);

    return newRequest;
  }

  // TODO: Allow filtering - 07/25/18 10:48:31 sidney.wijngaarde1@ibm.com
  createResourceView(resourceType) {
    const name = `${resourceType}-${this.uid()}`;
    const body = {
      apiVersion: 'mcm.ibm.com/v1alpha1',
      kind: 'ResourceView',
      metadata: {
        labels: {
          name,
        },
        name,
      },
      spec: {
        summaryOnly: false,
        scope: {
          resource: resourceType,
        },
      },
    };

    return this.post(`/apis/mcm.ibm.com/v1alpha1/namespaces/${this.resourceViewNamespace}/resourceviews`, body);
  }

  timeout() {
    return new Promise((r, reject) =>
      setTimeout(reject, this.pollTimeout, new Error('Manager request timed out')));
  }

  pollView(resourceViewLink) {
    let cancel;

    const promise = new Promise(async (resolve, reject) => {
      let pendingRequest = false;
      const intervalID =
      // eslint-disable-next-line consistent-return
      setInterval(async () => {
        if (!pendingRequest) {
          pendingRequest = true;
          try {
            const response = await this.get(resourceViewLink, {}, true);
            pendingRequest = false;

            if (response.code || response.message) {
              clearInterval(intervalID);
              return reject(response);
            }

            const isComplete = _.get(response, 'status.conditions[0].type', 'NO');

            if (isComplete === 'Completed') {
              clearInterval(intervalID);
              resolve(response);
            }
          } catch (err) {
            clearInterval(intervalID);
            reject(err);
          }
        }
      }, this.pollInterval);

      cancel = () => {
        clearInterval(intervalID);
        // reject or resolve?
        reject();
      };
    });

    return { cancel, promise };
  }

  async resourceViewQuery(resourceType) {
    const resource = await this.createResourceView(resourceType);
    if (resource.status === 'Failure' || resource.code >= 400) {
      throw new Error(`Create Resource View Failed [${resource.code}] - ${resource.message}`);
    }
    const { cancel, promise: pollPromise } = this.pollView(_.get(resource, 'metadata.selfLink'));

    try {
      const result = await Promise.race([pollPromise, this.timeout()]);
      if (result) {
        this.delete(`/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/${resource.metadata.name}`)
          .catch(e => logger.error(`Error deleting resourceviews ${resource.metadata.name}`, e.message));
      }
      return result;
    } catch (e) {
      logger.error('Resource View Query Error', e.message);
      cancel();
      throw e;
    }
  }
}

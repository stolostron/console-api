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
import lru from 'lru-cache';
import uuid from 'uuid';
import logger from '../lib/logger';
import { isRequired } from '../lib/utils';
import config from '../../../config';
import requestLib from '../lib/request';


function selectNamespace(namespaces) {
  return namespaces.find(ns => ns === 'default') || namespaces[0];
}

function checkPath(path) {
  if (!path.startsWith('/')) {
    throw new Error('OCM ERROR: invalid path');
  }
  return path;
}

export default class KubeConnector {
  constructor({
    cache = lru(),
    token = 'Bearer localdev',
    httpLib = requestLib,
    kubeApiEndpoint = process.env.API_SERVER_URL || 'https://kubernetes.default.svc',
    namespaces = isRequired('namespaces'),
    pollTimeout = config.get('hcmPollTimeout'),
    pollInterval = config.get('hcmPollInterval'),
    uid = uuid,
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
      url: `${this.kubeApiEndpoint}${checkPath(path)}`,
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

      // if all responses aren't objects, throw error
      const strs = [];
      const items = (response.items ? response.items : [response]);
      items.forEach((item) => {
        if (typeof item === 'string') {
          strs.push(item);
        }
      });
      if (strs.length > 0) {
        logger.error(`MCM RESPONSE ERROR, Expected Objects but Returned this: ${strs.join(', ')}`);
        return [];
      }

      return items.map(item => (kind ? Object.assign({
        apiVersion: response.apiVersion,
        kind,
      }, item) : item));
    });

    return _.flatten(await Promise.all(requests));
  }

  post(path, jsonBody, opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${checkPath(path)}`,
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
      url: `${this.kubeApiEndpoint}${checkPath(path)}`,
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
      url: `${this.kubeApiEndpoint}${checkPath(path)}`,
      method: 'PATCH',
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json-patch+json',
      },
    };
    const newRequest = this.http(_.merge(defaults, opts)).then(res => res.body);
    return newRequest;
  }

  put(path = '', opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${checkPath(path)}`,
      method: 'PUT',
      headers: {
        Authorization: this.token,
        'Content-Type': 'application/json',
      },
    };
    const newRequest = this.http(_.merge(defaults, opts)).then(res => res.body);
    return newRequest;
  }

  /* eslint-disable max-len */
  async createResourceView(resourceType, clusterName, resourceName, resourceNamespace, apiGroup, summaryOnly) {
    const name = `${resourceType}-${this.uid()}`.substr(0, 63);
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
        summaryOnly: !!summaryOnly,
        scope: {
          resource: resourceType,
        },
      },
    };

    if (clusterName) {
      body.spec.clusterSelector = {
        matchLabels: {
          name: clusterName,
        },
      };

      if (resourceName) {
        body.spec.scope = {
          resource: `${resourceType}${apiGroup ? `.${apiGroup}` : ''}`,
          resourceName,
          namespace: resourceNamespace || null,
        };
      }
    }

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
              const links = resourceViewLink.split('/');
              const resourceViewName = links.pop();
              const link = `${links.join('/')}?fieldSelector=metadata.name=${resourceViewName}`;

              logger.debug('start polling: ', new Date(), link);
              const response = await this.get(link, {}, true);
              pendingRequest = false;
              if (response.code || response.message) {
                clearInterval(intervalID);
                return reject(response);
              }
              const isComplete = _.get(response, 'items[0].status.status') || _.get(response, 'items[0].status.type') || _.get(response, 'items[0].status.conditions[0].type', 'NO');

              if (isComplete === 'Completed') {
                clearInterval(intervalID);
                logger.debug('start to get resource: ', new Date(), resourceViewLink);
                const result = await this.get(resourceViewLink, {}, true);
                if (result.code || result.message) {
                  return reject(result);
                }
                resolve(result);
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

  async resourceViewQuery(resourceType, clusterName, name, namespace, apiGroup, summaryOnly) {
    const resource = await this.createResourceView(resourceType, clusterName, name, namespace, apiGroup, summaryOnly);
    if (resource.status === 'Failure' || resource.code >= 400) {
      throw new Error(`Create Resource View Failed [${resource.code}] - ${resource.message}`);
    }
    const { cancel, promise: pollPromise } = this.pollView(_.get(resource, 'metadata.selfLink'));

    try {
      const result = await Promise.race([pollPromise, this.timeout()]);
      if (result) {
        this.delete(`/apis/mcm.ibm.com/v1alpha1/namespaces/${this.resourceViewNamespace}/resourceviews/${resource.metadata.name}`)
          .catch(e => logger.error(`Error deleting resourceviews ${resource.metadata.name}`, e.message));
      }
      return result;
    } catch (e) {
      logger.error(`Resource View Query Error for ${resourceType}`, e.message);
      cancel();
      throw e;
    }
  }

  /**
   * Excecute Kube API GET all namespaces with the specified name.
   * Required by the app ui to get the accountId, used by the ICAM action
   *
   * @param {*} namespaces: a list of namespace names to retrieve; if not provided will use the default namespaces list
   */
  async getNamespaceResources({ namespaces } = {}) {
    const namespaceList = (namespaces || this.namespaces);

    const requests = namespaceList.map(async (ns) => {
      const urlTemplate = `/api/v1/namespaces/${ns}`;

      let response;
      try {
        response = await this.get(urlTemplate);
      } catch (err) {
        logger.error(`MCM REQUEST ERROR - ${err.message}`);
        return [];
      }

      if (response.code || response.message) {
        logger.error(`MCM ERROR ${response.code} - ${response.message}`);
        return [];
      }

      // if all responses aren't objects, throw error
      const strs = [];
      const items = (response.items ? response.items : [response]);
      items.forEach((item) => {
        if (typeof item === 'string') {
          strs.push(item);
        }
      });
      if (strs.length > 0) {
        logger.error(`MCM RESPONSE ERROR, Expected Objects but Returned this: ${strs.join(', ')}`);
        return [];
      }

      return items.map(item => item);
    });

    return _.flatten(await Promise.all(requests));
  }
}

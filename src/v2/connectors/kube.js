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
import uuid from 'uuid';
import crypto from 'crypto';
import logger from '../lib/logger';
import { isRequired } from '../lib/utils';
import config from '../../../config';
import requestLib from '../lib/request';

function selectNamespace(namespaces) {
  return namespaces.find((ns) => ns === 'default') || namespaces[0];
}

export default class KubeConnector {
  constructor({
    token = 'Bearer localdev',
    httpLib = requestLib,
    kubeApiEndpoint = process.env.API_SERVER_URL || 'https://kubernetes.default.svc',
    namespaces = isRequired('namespaces'),
    pollTimeout = config.get('hcmPollTimeout'),
    pollInterval = config.get('hcmPollInterval'),
    uid = uuid,
  } = {}) {
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
   * Helper to check the request is against kubeApiEndpoint
   *
   * @param {*} url - Request url
   */
  checkUrl(url) {
    if (!url.startsWith(`${this.kubeApiEndpoint}/`)) {
      throw new Error(`OCM ERROR: invalid url: ${url}`);
    }
    return url;
  }

  /**
   * Helper to construct defaults for API request
   *
   * @param {*} method - the HTTP method
   * @param {*} path - the request path
   * @param {*} extra - an object with extra properties to be included
   * @param {*} headers - an object with additional headers
   */
  getDefaults(method, path, extra = {}, headers = {}) {
    return {
      url: `${this.kubeApiEndpoint}${path}`,
      method,
      headers: {
        Authorization: this.token,
        ...headers,
      },
      ...extra,
    };
  }

  /**
   * Execute Kube API HTTP requests.
   *
   * @param {*} defaults
   * @param {*} opts
   */
  doRequest(defaults, opts) {
    const options = _.merge(defaults, opts);
    this.checkUrl(options.url);
    return this.http(options).then((res) => res.body);
  }

  /**
   * Excecute Kube API GET requests.
   *
   * @param {*} path - API path
   * @param {*} opts - HTTP request options
   */
  get(path = '', opts = {}) {
    return this.doRequest(this.getDefaults('GET', path), opts);
  }

  post(path, jsonBody, opts = {}) {
    return this.doRequest(this.getDefaults('POST', path, { json: jsonBody }), opts);
  }

  delete(path, jsonBody, opts = {}) {
    return this.doRequest(this.getDefaults('DELETE', path, { json: jsonBody }), opts);
  }

  patch(path = '', opts = {}) {
    const headers = {
      'Content-Type': 'application/json-patch+json',
    };
    return this.doRequest(this.getDefaults('PATCH', path, {}, headers), opts);
  }

  put(path = '', opts = {}) {
    const headers = {
      'Content-Type': 'application/json',
    };
    return this.doRequest(this.getDefaults('PUT', path, {}, headers), opts);
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
        logger.error(`OCM REQUEST ERROR  for ${urlTemplate(ns)} - ${err.message}`);
        return [];
      }

      if (response.code || response.message) {
        logger.error(`OCM ERROR ${response.code} (${urlTemplate(ns)}) - ${response.message}`);
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
        logger.error(`OCM RESPONSE ERROR for ${urlTemplate(ns)}: Expected Objects but Returned this: ${strs.join(', ')}`);
        return [];
      }

      return items.map((item) => (kind ? ({
        apiVersion: response.apiVersion,
        kind,
        ...item,
      }) : item));
    });

    return _.flatten(await Promise.all(requests));
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

    if (Array.isArray(clusterName)) {
      body.spec.clusterSelector = {
        matchExpressions: [
          { key: 'name', operator: 'In', values: clusterName },
        ],
      };
    } else if (clusterName) {
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
    return new Promise((r, reject) => setTimeout(reject, this.pollTimeout, new Error('Manager request timed out')));
  }

  pollView(viewLink) {
    let cancel;

    const promise = new Promise((resolve, reject) => {
      let pendingRequest = false;
      const intervalID = setInterval(async () => {
        if (!pendingRequest) {
          pendingRequest = true;
          try {
            const links = viewLink.split('/');
            const viewName = links.pop();
            const link = `${links.join('/')}?fieldSelector=metadata.name=${viewName}`;

            logger.debug('start polling: ', new Date(), link);
            const response = await this.get(link, {}, true);
            pendingRequest = false;
            if (response.code || response.message) {
              clearInterval(intervalID);
              return reject(response);
            }
            // We are looking for the type to be Processing for ManagedClusterView resources
            // TODO remove the 'Completed' logic when resource view is removed
            const isComplete = _.get(response, 'items[0].status.conditions[0].type') || _.get(response, 'items[0].status.status') || _.get(response, 'items[0].status.type') || _.get(response, 'items[0].status.conditions[0].type', 'NO');
            if (isComplete === 'Processing' || isComplete === 'Completed') {
              clearInterval(intervalID);
              logger.debug('start to get resource: ', new Date(), viewLink);
              const result = await this.get(viewLink, {}, true);
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
        return null;
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
          .catch((e) => logger.error(`Error deleting resourceviews ${resource.metadata.name}`, e.message));
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
        logger.error(`OCM REQUEST ERROR - ${err.message}`);
        return [];
      }

      if (response.code || response.message) {
        logger.error(`OCM ERROR ${response.code} - ${response.message}`);
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
        logger.error(`OCM RESPONSE ERROR, Expected Objects but Returned this: ${strs.join(', ')}`);
        return [];
      }

      return items.map((item) => item);
    });

    return _.flatten(await Promise.all(requests));
  }

  // eslint-disable-next-line max-len
  async managedClusterViewQuery(managedClusterNamespace, apiGroup, kind, resourceName, namespace, updateInterval, deleteAfterUse) {
    // name cannot be long than 63 chars in length
    const name = crypto.createHash('sha1').update(`${managedClusterNamespace}-${resourceName}-${kind}`).digest('hex').substr(0, 63);

    // scope.name is required, and either GKV (scope.apiGroup+kind+version) or scope.resource
    const body = {
      apiVersion: 'view.open-cluster-management.io/v1beta1',
      kind: 'ManagedClusterView',
      metadata: {
        labels: {
          name,
        },
        name,
        namespace: managedClusterNamespace,
      },
      spec: {
        scope: {
          name: resourceName,
          namespace,
          resource: `${kind}${apiGroup && `.${apiGroup}`}`,
        },
      },
    };
    if (updateInterval) {
      body.spec.scope.updateIntervalSeconds = updateInterval; // default is 30 secs
    }
    // Create ManagedClusterView
    const managedClusterViewResponse = await this.post(`/apis/view.open-cluster-management.io/v1beta1/namespaces/${managedClusterNamespace}/managedclusterviews`, body);
    if (_.get(managedClusterViewResponse, 'status.conditions[0].status') === 'False' || managedClusterViewResponse.code >= 400) {
      throw new Error(`Create ManagedClusterView Failed [${managedClusterViewResponse.code}] - ${managedClusterViewResponse.message}`);
    }
    // Poll ManagedClusterView until success or failure
    const { cancel, promise: pollPromise } = this.pollView(_.get(managedClusterViewResponse, 'metadata.selfLink'));
    try {
      const result = await Promise.race([pollPromise, this.timeout()]);
      if (result && deleteAfterUse) {
        this.deleteManagedClusterView(managedClusterNamespace, managedClusterViewResponse.metadata.name);
      }
      return result;
    } catch (e) {
      logger.error(`ManagedClusterView Query Error for ${kind}`, e.message);
      cancel();
      throw e;
    }
  }

  async deleteManagedClusterView(managedClusterNamespace, managedClusterViewName) {
    this.delete(`/apis/view.open-cluster-management.io/v1beta1/namespaces/${managedClusterNamespace}/managedclusterviews/${managedClusterViewName}`)
      .catch((e) => logger.error(`Error deleting managed cluster view ${managedClusterViewName}`, e.message));
  }
}

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import logger from '../lib/logger';
import config from '../../../config';
import requestLib from '../lib/request';

class KubeConnector {
  constructor({
    token = 'Bearer localdev',
    httpLib = requestLib,
    kubeApiEndpoint = `${config.get('cfcRouterUrl')}/kubernetes`,
    pollTimeout = config.get('hcmPollTimeout'),
    pollInterval = config.get('hcmPollInterval'),
    uid = Date.now,
  } = {}) {
    this.token = token;
    this.http = httpLib;
    this.kubeApiEndpoint = kubeApiEndpoint;
    this.pollTimeout = pollTimeout;
    this.pollInterval = pollInterval;
    this.uid = uid;
  }

  get(path = '', opts = {}) {
    const defaults = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'GET',
      headers: {
        Authorization: this.token,
      },
    };

    return this.http(_.merge(defaults, opts)).then(res => res.body);
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

    return this.post('/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews', body);
  }

  timeout() {
    return new Promise((r, reject) =>
      setTimeout(reject, this.pollTimeout, new Error('Manager request timed out')));
  }

  pollView(resourceViewLink) {
    let cancel;

    const promise = new Promise(async (resolve, reject) => {
      const intervalID =
      // eslint-disable-next-line consistent-return
      setInterval(async () => {
        try {
          const response = await this.get(resourceViewLink);

          if (response.code || response.message) {
            clearInterval(intervalID);
            return reject(response);
          }

          const isComplete = (response.status && response.status.conditions && response.status.conditions[0].type) || 'NO';

          if (isComplete === 'Completed') {
            clearInterval(intervalID);
            resolve(response);
          }
        } catch (err) {
          clearInterval(intervalID);
          reject(err);
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
    const { cancel, promise: pollPromise } = this.pollView(resource.metadata.selfLink);

    try {
      const result = await Promise.race([pollPromise, this.timeout()]);
      return result;
    } catch (e) {
      logger.error('Resource View Query Error', e.message);
      cancel();
      throw e;
    }
  }
}

export default KubeConnector;

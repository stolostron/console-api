/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import config from '../../../config';
import requestLib from '../lib/request';

export default class ApiConnector {
  constructor({
    token = 'Bearer',
    apiEndpoint = `${config.get('cfcRouterUrl')}/api`,
    httpLib = requestLib,
  } = {}) {
    this.apiEndpoint = apiEndpoint;
    this.token = token;
    this.http = httpLib;
  }

  getProviders(path) {
    const defaults = {
      url: `${this.apiEndpoint}${path}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    // eslint-disable-next-line arrow-body-style
    return this.http(defaults).then((res) => {
      if (res.statusCode !== 200) {
        const Items = [];
        const item = { statusCode: res.statusCode };
        Items.push(item);
        return Items;
      }
      const Items = res.body && res.body.Items;
      // eslint-disable-next-line arrow-body-style
      const formattedItems = Items && Items.map((item) => {
        return ({
          name: item.name,
          longname: item.longname,
          configMetadata: item.configMetadata,
          configValues: item.configValues,
          clusterMetadata: item.clusterMetadata,
          clusterValues: item.clusterValues,
          statusCode: res.statusCode,
        });
      });
      return (formattedItems);
    });
  }

  post(path, jsonBody) {
    const defaults = {
      url: `${this.apiEndpoint}${path}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: jsonBody,
    };
    // eslint-disable-next-line arrow-body-style
    return this.http(defaults).then((res) => {
      return ({
        connection: res.body,
        statusCode: res.statusCode,
      });
    });
  }

  get(path) {
    const defaults = {
      url: `${this.apiEndpoint}${path}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    // eslint-disable-next-line arrow-body-style
    return this.http(defaults).then((res) => {
      const Items = res.body && res.body.Items;
      if (res.statusCode !== 200) {
        const errors = [];
        const error = {
          metadata: {},
          statusCode: res.statusCode,
          errorMsg: res.body.description,
        };
        errors.push(error);
        return errors;
      }
      if (res.statusCode === 200 && !Items) {
        return [];
      }
      // eslint-disable-next-line arrow-body-style
      const formattedItems = Items && Items.map((item) => {
        return ({
          metadata: {
            name: item.name,
            provider: item.provider,
            namespace: item.namespace,
            name_namespace: item.name.concat(item.namespace),
          },
          statusCode: res.statusCode,
          errorMsg: '',
        });
      });
      return (formattedItems);
    });
  }

  delete(path) {
    const defaults = {
      url: `${this.apiEndpoint}${path}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return this.http(defaults).then(res => res.statusCode);
  }

  put(path, jsonBody) {
    const defaults = {
      url: `${this.apiEndpoint}${path}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body: jsonBody,
    };
    // eslint-disable-next-line arrow-body-style
    return this.http(defaults).then((res) => {
      return ({
        connection: res.body,
        statusCode: res.statusCode,
      });
    });
  }
}

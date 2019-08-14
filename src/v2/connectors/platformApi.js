/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import config from '../../../config';
import requestLib from '../lib/request';

const successCb = (res) => {
  const tmpRes = (typeof res === 'object') ? res : JSON.parse(res);
  tmpRes.body = (typeof tmpRes.body === 'object') ? tmpRes.body : JSON.parse(tmpRes.body);
  tmpRes.body.statusCode = tmpRes.statusCode || '';
  tmpRes.body.statusMessage = tmpRes.statusMessage || '';
  return tmpRes.body;
};

export default class PlatformApiConnector {
  constructor({
    httpLib = requestLib,
    token = 'Bearer localdev',
    platformApiEndpoint = `${config.get('cfcRouterUrl')}/api/v1`,
  } = {}) {
    this.http = httpLib;
    this.token = `Bearer ${token}`;
    this.platformApiEndpoint = platformApiEndpoint;
    this.successCb = successCb;
  }

  postWithString(path, body, opts = {}) {
    const defaults = {
      url: `${this.platformApiEndpoint}${path}`,
      method: 'POST',
      headers: {
        Authorization: this.token,
      },
      body,
      json: false,
    };
    return this.http(_.merge(defaults, opts)).then(this.successCb);
  }

  post(path, body, opts = {}) {
    const defaults = {
      url: `${this.platformApiEndpoint}${path}`,
      method: 'POST',
      headers: {
        Authorization: this.token,
      },
      body,
      json: true,
    };
    return this.http(_.merge(defaults, opts)).then(this.successCb);
  }

  get(path, opts = {}) {
    const defaults = {
      url: `${this.platformApiEndpoint}${path}`,
      method: 'GET',
      headers: {
        Authorization: this.token,
      },
    };
    return this.http(_.merge(defaults, opts)).then(this.successCb);
  }
}

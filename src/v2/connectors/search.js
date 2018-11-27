/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import config from '../../../config';
import requestLib from '../lib/request';

export default class SearchConnector {
  constructor({
    token = 'Bearer localdev',
    httpLib = requestLib,
    mcmSearchEndpoint = `${config.get('cfcRouterUrl')}/query`,
    uid = Date.now,
  } = {}) {
    this.http = httpLib;
    this.mcmSearchEndpoint = mcmSearchEndpoint;
    this.token = token;
    this.uid = uid;
  }
}

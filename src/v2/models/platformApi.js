/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import logger from '../lib/logger';

export default class PlatformApiModel {
  constructor({ platformApiConnector }) {
    if (!platformApiConnector) {
      throw new Error('platformApiConnector is a required parameter');
    }
    this.platformApiConnector = platformApiConnector;
  }

  getErrorMsg(response) {
    let errorMsg = '';
    response.code && (errorMsg += `${response.code} - `);
    response.message && (errorMsg += `${response.message} - `);
    response.statusCode && (errorMsg += `${response.statusCode} - `);
    response.statusMessage && (errorMsg += `${response.statusMessage} - `);
    response.description && (errorMsg += `${response.description}`);
    return errorMsg;
  }

  async createClusterResource(args) {
    let response;
    const { body } = args;

    if (!body) {
      throw new Error('Body is required for createClusterResource');
    } else {
      response = await this.platformApiConnector.postWithString('/clusters', body);
    }
    if (response && (response.code || response.message)) {
      logger.error(`PLATFORM API ERROR: POST ${this.platformApiConnector.platformApiEndpoint}/clusters - ${this.getErrorMsg(response)}`);
      return {
        error: {
          rawResponse: response,
          statusCode: response.statusCode,
        },
      };
    }
    return response;
  }

  async automatedImport(args) {
    let response;
    const { namespace, name, body } = args;

    if (!body || !namespace || !name) {
      throw new Error('Body, namespace, and name are required for automatedImport');
    } else {
      response = await this.platformApiConnector.post(`/clusters/${namespace}/${name}/imports`, body);
    }
    if (response && (response.code || response.message)) {
      logger.error(`PLATFORM API ERROR: POST ${this.platformApiConnector.platformApiEndpoint}/clusters/${namespace}/${name}/imports - ${this.getErrorMsg(response)}`);
      return {
        error: {
          rawResponse: response,
          statusCode: response.statusCode,
        },
      };
    }
    return response;
  }

  async getAutomatedImportStatus(args) {
    let response;
    const { namespace, name } = args;

    if (!namespace || !name) {
      throw new Error('namespace and name are required for getAutomatedImportStatus');
    } else {
      response = await this.platformApiConnector.get(`/clusters/${namespace}/${name}/imports`);
    }
    if (response && (response.code || response.message)) {
      logger.error(`PLATFORM API ERROR: GET ${this.platformApiConnector.platformApiEndpoint}/clusters/${namespace}/${name}/imports - ${this.getErrorMsg(response)}`);
      return {
        error: {
          rawResponse: response,
          statusCode: response.statusCode,
        },
      };
    }
    return response;
  }
}

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
    const errorMsgKeys = ['code', 'message', 'statusCode', 'statusMessage'];
    errorMsgKeys.forEach((key, i) => {
      response[key] && (errorMsg += `${response[key]} ${(i !== errorMsgKeys.length - 1) && '- '}`);
    });
    return errorMsg;
  }

  responseHasError(response) {
    return (response.statusCode < 200 || response.statusCode >= 300);
  }


  responseForError(errorTitle, response) {
    logger.error(`PLATFORM API ERROR: ${errorTitle} - ${this.getErrorMsg(response)}`);
    return {
      error: {
        rawResponse: response,
        statusCode: response.statusCode,
      },
    };
  }
  async getProviders() {
    // eslint-disable-next-line arrow-body-style
    const response = await this.platformApiConnector.get('/cloudproviders');
    if (response && (response.code || response.message)) {
      logger.error(`PLATFORM API ERROR: POST ${this.platformApiEndpoint}/cloudproviders - ${this.getErrorMsg(response)}`);
      return {
        error: {
          rawResponse: response,
          statusCode: response.statusCode,
        },
      };
    }
    if (response.statusCode !== 200) {
      const Items = [];
      const item = { statusCode: response.statusCode };
      Items.push(item);
      return Items;
    }
    const Items = response && response.Items;
    // eslint-disable-next-line arrow-body-style
    const formattedItems = Items && Items.map((item) => {
      return ({
        name: item.name,
        longname: item.longname,
        configMetadata: item.configMetadata,
        configValues: item.configValues,
        clusterMetadata: item.clusterMetadata,
        clusterValues: item.clusterValues,
        statusCode: response.statusCode,
      });
    });
    return (formattedItems);
  }

  async createConnection(args) {
    const { body } = args;
    const response = await this.platformApiConnector.post('/cloudconnections', body);
    return response;
  }

  async getConnections(args = {}) {
    const userNamespaces = args.user.namespaces && args.user.namespaces.map(ns => ns.namespaceId);
    const connections = await this.platformApiConnector.get('/cloudconnections');
    // eslint-disable-next-line arrow-body-style
    if (connections.statusCode !== 200) {
      const errors = [];
      const error = {
        metadata: {},
        statusCode: connections.statusCode,
        errorMsg: connections.statusMessage,
      };
      errors.push(error);
      return errors;
    }
    if (connections.statusCode === 200 && !connections.Items) {
      return [];
    }
    // eslint-disable-next-line arrow-body-style
    const formattedItems = connections.Items && connections.Items.map((item) => {
      return {
        metadata: {
          name: item.name,
          provider: item.provider,
          namespace: item.namespace,
          name_namespace: item.name.concat(item.namespace),
        },
        statusCode: connections.statusCode,
        errorMsg: '',
      };
    });
    return (formattedItems.filter(connection => userNamespaces &&
      userNamespaces.includes(connection.metadata.namespace)));
  }

  async deleteConnection(args) {
    const { namespace, name } = args;
    const response = await this.platformApiConnector.delete(`/cloudconnections/${namespace}/${name}`);
    return response;
  }

  async editConnection(args) {
    const { body, namespace, name } = args;
    const response = await this.platformApiConnector.put(`/cloudconnections/${namespace}/${name}`, body);
    return response;
  }

  async createClusterResource(args) {
    let response;
    const { body } = args;

    if (!body) {
      throw new Error('Body is required for createClusterResource');
    } else {
      response = await this.platformApiConnector.postWithString('/clusters', body);
    }
    if (response && this.responseHasError(response)) {
      return this.responseForError(`POST ${this.platformApiConnector.platformApiEndpoint}/clusters`, response);
    }
    return response;
  }

  async updateClusterResource(args) {
    let response;
    const { namespace, name, body } = args;

    if (!body || !namespace || !name) {
      throw new Error('Body, namespace, and name are required for updateClusterResource');
    } else {
      response = await this.platformApiConnector.putWithString(`/clusters/${namespace}/${name}`, body);
    }
    if (response && this.responseHasError(response)) {
      return this.responseForError(`PUT ${this.platformApiConnector.platformApiEndpoint}/clusters/${namespace}/${name}`, response);
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
    if (response && this.responseHasError(response)) {
      return this.responseForError(`POST ${this.platformApiConnector.platformApiEndpoint}/clusters/${namespace}/${name}/imports`, response);
    }
    return response;
  }

  async createCluster(args) {
    let response;
    const { namespace, cluster } = args;
    if (!namespace || !cluster) {
      throw new Error('Namespace and cluster are required for createCluster');
    } else {
      response = await this.platformApiConnector.post(`/cloudconnections/${namespace}/${cluster.name}/clusters`, cluster);
    }
    if (response && this.responseHasError(response)) {
      return this.responseForError(`POST ${this.platformApiConnector.platformApiEndpoint}/cloudconnections/${namespace}/${cluster.name}/clusters`, response);
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
    if (response && this.responseHasError(response)) {
      return this.responseForError(`GET ${this.platformApiConnector.platformApiEndpoint}/clusters/${namespace}/${name}/imports`, response);
    }
    return response;
  }

  async deleteCluster(args) {
    let response;
    const { namespace, cluster } = args;

    if (!cluster) {
      throw new Error('cluster name is required for deleteCluster');
    } else {
      response = await this.platformApiConnector.delete(`/clusters/${namespace}/${cluster}`);
    }
    if (response && this.responseHasError(response)) {
      return this.responseForError(`DELETE ${this.platformApiConnector.platformApiEndpoint}/clusters/${namespace}/${cluster}`, response);
    }
    return response;
  }
}

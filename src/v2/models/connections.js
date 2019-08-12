/* eslint-disable max-len */
/* eslint-disable no-else-return */
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import ApiModel from './api';

export default class ConnectionsModel extends ApiModel {
  async getProviders() {
    const response = await this.apiConnector.getProviders('/v1/cloudproviders');
    return response;
  }

  async createConnection(args) {
    const { body } = args;
    const response = await this.apiConnector.post('/v1/cloudconnections', body);
    return response;
  }

  async getConnections(args = {}) {
    const userNamespaces = args.user.namespaces && args.user.namespaces.map(ns => ns.namespaceId);
    const connections = await this.apiConnector.get('/v1/cloudconnections');
    // eslint-disable-next-line arrow-body-style
    if (connections && connections.length > 0 && connections[0].statusCode !== 200) {
      return connections;
    }
    if (connections && connections.length === 0) {
      return [];
    } else {
      return connections.filter(connection => userNamespaces && userNamespaces.includes(connection.metadata.namespace));
    }
  }

  async deleteConnection(args) {
    const { namespace, name } = args;
    const response = await this.apiConnector.delete(`/v1/cloudconnections/${namespace}/${name}`);
    return response;
  }

  async editConnection(args) {
    const { body, namespace, name } = args;
    const response = await this.apiConnector.put(`/v1/cloudconnections/${namespace}/${name}`, body);
    return response;
  }
}

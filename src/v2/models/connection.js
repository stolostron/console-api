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

import yaml from 'js-yaml';
import KubeModel from './kube';

export const CLUSTER_DOMAIN = 'cluster.open-cluster-management.io';
export const CONNECTION_LABEL = `${CLUSTER_DOMAIN}/cloudconnection`;
export const CONNECTION_LABEL_SELECTOR = `labelSelector=${CONNECTION_LABEL}`;
export const PROVIDER_LABEL = `${CLUSTER_DOMAIN}/provider`;

const generateSecret = body => ({
  apiVersion: 'v1',
  kind: 'Secret',
  type: 'Opaque',
  metadata: {
    labels: {
      'cluster.open-cluster-management.io/cloudconnection': '',
      'cluster.open-cluster-management.io/provider': body.provider,
    },
    name: body.name,
    namespace: body.namespace,
  },
  stringData: {
    metadata: body.metadata,
  },
});

export default class ConnectionModel extends KubeModel {
  async createConnection(args) {
    const { body } = args;
    const resource = generateSecret(body);
    const response = await this.kubeConnector.post(`/api/v1/namespaces/${body.namespace}/secrets`, resource);
    const statusCode = response.kind === 'Status' ? response.code : 201;
    return { ...response, statusCode };
  }

  async getConnections() {
    const connections = await this.kubeConnector.getResources(ns => `/api/v1/namespaces/${ns}/secrets?${CONNECTION_LABEL_SELECTOR}`);
    const ret = [];
    connections.forEach(({ metadata }) => {
      ret.push({
        metadata: {
          name: metadata.name,
          namespace: metadata.namespace,
          provider: metadata.labels[PROVIDER_LABEL],
          name_namespace: metadata.name + metadata.namespace,
        },
      });
    });
    return ret;
  }

  async getConnectionDetails() {
    const connections = await this.kubeConnector.getResources(ns => `/api/v1/namespaces/${ns}/secrets?${CONNECTION_LABEL_SELECTOR}`);
    const ret = [];
    connections.forEach(({ metadata, data }) => {
      ret.push({
        name: metadata.name,
        namespace: metadata.namespace,
        provider: metadata.labels[PROVIDER_LABEL],
        metadata: yaml.safeLoad(Buffer.from(data.metadata, 'base64').toString('ascii')),
      });
    });
    return ret;
  }

  async deleteConnection(args) {
    const { namespace, name } = args;
    const response = await this.kubeConnector.delete(`/api/v1/namespaces/${namespace}/secrets/${name}`);
    return response;
  }

  async editConnection(args) {
    const { body, namespace, name } = args;
    const resource = generateSecret(body);
    const response = await this.kubeConnector.put(`/api/v1/namespaces/${namespace}/secrets/${name}`, { body: resource });
    const statusCode = response.kind === 'Status' ? response.code : 200;
    return { ...response, statusCode };
  }
}


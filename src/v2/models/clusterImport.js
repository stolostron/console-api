/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import logger from '../lib/logger';

export default class ClusterImportModel {
  constructor({ kubeConnector }) {
    this.kubeConnector = kubeConnector;
  }

  getErrorMsg(response) {
    let errorMsg = '';
    const errorMsgKeys = ['code', 'message', 'description', 'statusCode', 'statusMessage'];
    errorMsgKeys.forEach((key, i) => {
      response[key] && (errorMsg += `${response[key]} ${(i !== errorMsgKeys.length - 1) && '- '}`);
    });
    return errorMsg;
  }

  responseHasError(response) {
    const code = response.statusCode || response.code;
    return (code < 200 || code >= 300);
  }


  responseForError(errorTitle, response) {
    const code = response.statusCode || response.code;
    logger.error(`CLUSTER IMPORT ERROR: ${errorTitle} - ${this.getErrorMsg(response)}`);
    return {
      error: {
        rawResponse: response,
        statusCode: code,
        statusMsg: response.message || response.description || response.statusMessage,
      },
    };
  }

  async createClusterResource(args) {
    const { cluster } = args;
    const [clusterTemplate, endpointTemplate] = cluster;
    if (!endpointTemplate) throw new Error('EndpointConfig is required for createClusterResource');

    const config = endpointTemplate.spec;
    const { clusterName, clusterNamespace } = config;

    const namespaceResponse = await this.kubeConnector.post('/apis/project.openshift.io/v1/projectrequests', { metadata: { name: clusterNamespace } });

    if (this.responseHasError(namespaceResponse)) {
      if (namespaceResponse.code === 409) {
        const existingNamespaceClusters = await this.kubeConnector.get(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${clusterNamespace}/clusters`);
        if (existingNamespaceClusters.items.length > 0) throw new Error(`Create Cluster failed: Namespace "${clusterNamespace}" already contains a Cluster resource`);
      } else {
        return namespaceResponse;
      }
    }

    if (config.privateRegistryEnabled) {
      const { imageRegistry, registryUsername, registryPassword } = config;
      const auth = Buffer.from(`${registryUsername}:${registryPassword}`).toString('base64');
      const dockerConfigJson = Buffer.from(JSON.stringify({ auths: { [`${imageRegistry}`]: { auth } } })).toString('base64');
      const secret = { metadata: { name: clusterName }, data: { '.dockerconfigjson': dockerConfigJson }, type: 'kubernetes.io/dockerconfigjson' };

      const registrySecretResponse = await this.kubeConnector.post(`/api/v1/namespaces/${clusterNamespace}/secrets`, secret);
      if (this.responseHasError(registrySecretResponse)) {
        // skip error for existing secret
        if (registrySecretResponse.code !== 409) {
          return this.responseForError('Create private docker registry secret failed', registrySecretResponse);
        }
      }
    }

    endpointTemplate.imagePullSecret = config.privateRegistryEnabled ? clusterName : undefined;
    const endpointConfigResponse = await this.kubeConnector.post(`/apis/multicloud.ibm.com/v1alpha1/namespaces/${clusterNamespace}/endpointconfigs`, endpointTemplate);
    if (this.responseHasError(endpointConfigResponse)) {
      return this.responseForError('Create EndpointConfig resource failed', endpointConfigResponse);
    }

    const clusterResponse = await this.kubeConnector.post(`/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${clusterNamespace}/clusters`, clusterTemplate);
    if (this.responseHasError(clusterResponse)) {
      if (clusterResponse.code === 409) return clusterResponse;

      // Delete the endpointconfig so the user can try again
      await this.kubeConnector.delete(`/apis/multicloud.ibm.com/v1alpha1/namespaces/${clusterNamespace}/endpointconfigs/${clusterName}`);
      return this.responseForError('Create Cluster resource failed', clusterResponse);
    }

    // fetch and return the generated secret
    const importYamlSecret = await this.pollImportYamlSecret(clusterNamespace, clusterName);
    return importYamlSecret;
  }

  async pollImportYamlSecret(clusterNamespace, clusterName) {
    let count = 0;
    let importYamlSecret;

    const poll = async (resolve, reject) => {
      const secretUrl = `/api/v1/namespaces/${clusterNamespace}/secrets/${clusterName}-import`;
      importYamlSecret = await this.kubeConnector.get(secretUrl, {}, true);

      if (importYamlSecret.code === 404 && count < 5) {
        count += 1;
        setTimeout(poll, 2000, resolve, reject);
      } else {
        resolve(importYamlSecret);
      }
    };

    return new Promise(poll);
  }
}

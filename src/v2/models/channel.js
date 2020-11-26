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
import atob from 'atob';
import GitHub from 'github-api';
import KubeModel from './kube';
import logger from '../lib/logger';

export default class ChannelModel extends KubeModel {
  async createChannel(resources) {
    const channelKinds = {
      Channel: 'channels',
      ConfigMap: 'configmaps',
    };

    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', 'default');
      if (channelKinds[resource.kind] === 'undefined') {
        return Promise.resolve({
          status: 'Failure',
          message: `Invalid Kind: ${resource.kind}`,
        });
      }
      if (channelKinds[resource.kind] === 'channels') {
        return this.kubeConnector
          .post(`/apis/apps.open-cluster-management.io/v1/namespaces/${namespace}/channels`, resource)
          .catch((err) => ({
            status: 'Failure',
            message: err.message,
          }));
      }

      return this.kubeConnector
        .post(
          `/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/${channelKinds[resource.kind]}`,
          resource,
        )
        .catch((err) => ({
          status: 'Failure',
          message: err.message,
        }));
    }));

    const errors = [];
    result.forEach((item) => {
      if (item.code >= 400 || item.status === 'Failure') {
        errors.push({ message: item.message });
      }
    });

    return {
      errors,
      result,
    };
  }

  async getChannelOverview(name, namespace = 'default') {
    let chs;
    if (name) {
      chs = await this.kubeConnector.getResources(
        (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels/${name}`,
        { namespaces: [namespace] },
      ).catch((err) => {
        logger.error(err);
        throw err;
      });
    } else {
      chs = await this.kubeConnector.getResources((ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels`).catch((err) => {
        logger.error(err);
        throw err;
      });
    }
    chs = await Promise.all(chs);
    return chs.map((channel) => ({
      metadata: channel.metadata,
      channelWorkNames: channel.channelWorkNames,
    }));
  }

  async getChannels(name, namespace = 'default') {
    let chs;
    if (name) {
      chs = await this.kubeConnector.getResources(
        (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels/${name}`,
        { namespaces: [namespace] },
      ).catch((err) => {
        logger.error(err);
        throw err;
      });
    } else {
      chs = await this.kubeConnector.getResources((ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels`).catch((err) => {
        logger.error(err);
        throw err;
      });
    }
    return chs.map(async (channel) => {
      const { spec } = channel;
      return {
        metadata: channel.metadata,
        channelWorkNames: channel.metadata.name || '',
        namespace: channel.metadata.namespace,
        type: (spec && spec.type) || '', // HelmRepo or ObjectBucket
        objectPath: (spec && spec.pathname) || '',
        secretRef: (spec && spec.secretRef && spec.secretRef.name) || '',
        raw: channel,
        gates: (spec && spec.gates) || {},
        sourceNamespaces: (spec && spec.sourceNamespaces) || {},
      };
    });
  }

  async getGitChannelCredentials({
    namespace, secretRef, user, accessToken,
  }) {
    return namespace && secretRef
      ? this.kubeConnector.get(`/api/v1/namespaces/${namespace}/secrets/${secretRef}`)
        .then((response) => (
          {
            user: atob(_.get(response, 'data.user', '')),
            accessToken: atob(_.get(response, 'data.accessToken', '')),
          }
        ))
        .catch((err) => {
          logger.error(err);
          throw err;
        })
      : Promise.resolve({ user, accessToken });
  }

  async getGitConnection(args) {
    const { gitUrl } = args;
    return this.getGitChannelCredentials(args)
      .then(({ user, accessToken }) => {
        const githubOptions = user && accessToken ? { username: user, password: accessToken, auth: 'basic' } : {};
        const gitHub = new GitHub(githubOptions);
        // get the url path, then remove first / and .git
        const url = new URL(gitUrl);
        const gitApiPath = url.pathname.substring(1).replace('.git', '');
        return gitHub.getRepo(gitApiPath);
      });
  }

  handleGitError = (err) => {
    throw Error(err.response.statusText);
  }

  async getGitChannelBranches(args) {
    return this.getGitConnection(args)
      .then((gitRepo) => (
        gitRepo.listBranches().then((result) => (
          result.data ? result.data.map((branch) => branch.name) : []
        ))
      ))
      .catch(this.handleGitError);
  }

  async getGitChannelPaths(args) {
    const { branch, path = '' } = args;
    return this.getGitConnection(args)
      .then((gitRepo) => (
        gitRepo.getContents(branch, path, false).then((result) => (
          result.data ? result.data.filter((item) => item.type === 'dir').map((item) => item.name) : []
        ))
      ))
      .catch(this.handleGitError);
  }
}

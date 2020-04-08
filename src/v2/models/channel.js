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
import KubeModel from './kube';

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
          .catch(err => ({
            status: 'Failure',
            message: err.message,
          }));
      }

      return this.kubeConnector
        .post(
          `/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/${channelKinds[resource.kind]}`,
          resource,
        )
        .catch(err => ({
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
        ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels/${name}`,
        { namespaces: [namespace] },
      );
    } else {
      chs = await this.kubeConnector.getResources(ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels`);
    }
    chs = await Promise.all(chs);
    return chs.map(channel => ({
      metadata: channel.metadata,
      channelWorkNames: channel.channelWorkNames,
    }));
  }

  async getChannels(name, namespace = 'default') {
    let chs;
    if (name) {
      chs = await this.kubeConnector.getResources(
        ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels/${name}`,
        { namespaces: [namespace] },
      );
    } else {
      chs = await this.kubeConnector.getResources(ns => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/channels`);
    }
    return chs.map(async channel => ({
      metadata: channel.metadata,
      channelWorkNames: channel.metadata.name || '',
      namespace: channel.metadata.namespace,
      type: channel.spec.type, // HelmRepo or ObjectBucket
      objectPath: channel.spec.pathname,
      secret: channel.spec.secretRef ? channel.spec.secretRef.name : '',
      raw: channel,
      gates: channel.spec.gates || {},
      sourceNamespaces: channel.spec.sourceNamespaces || {},
    }));
  }
}

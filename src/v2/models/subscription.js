/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import KubeModel from './kube';

export default class SubscriptionModel extends KubeModel {
  async createSubscription(resources) {
    const subscriptionKinds = {
      Subscription: 'subscriptions',
      ConfigMap: 'configmaps',
    };

    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', 'default');
      if (subscriptionKinds[resource.kind] === 'undefined') {
        return Promise.resolve({
          status: 'Failure',
          message: `Invalid Kind: ${resource.kind}`,
        });
      }
      if (subscriptionKinds[resource.kind] === 'subscriptions') {
        return this.kubeConnector
          .post(`/apis/apps.open-cluster-management.io/v1alpha1/namespaces/${namespace}/subscriptions`, resource)
          .catch(err => ({
            status: 'Failure',
            message: err.message,
          }));
      }

      return this.kubeConnector
        .post(
          `/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/${subscriptionKinds[resource.kind]}`,
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

  async getSubscriptionOverview(name, namespace = 'default') {
    let chs;
    if (name) {
      chs = await this.kubeConnector.getResources(
        ns => `/apis/apps.open-cluster-management.io/v1alpha1/namespaces/${ns}/subscriptions/${name}`,
        { namespaces: [namespace] },
      );
    } else {
      chs = await this.kubeConnector.getResources(ns => `/apis/apps.open-cluster-management.io/v1alpha1/namespaces/${ns}/subscriptions`);
    }
    chs = await Promise.all(chs);
    return chs.map(subscription => ({
      metadata: subscription.metadata,
      subscriptionWorkNames: subscription.subscriptionWorkNames,
    }));
  }

  async getSubscriptions(name, namespace = 'default') {
    let chs;
    if (name) {
      chs = await this.kubeConnector.getResources(
        ns => `/apis/apps.open-cluster-management.io/v1alpha1/namespaces/${ns}/subscriptions/${name}`,
        { namespaces: [namespace] },
      );
    } else {
      chs = await this.kubeConnector.getResources(ns => `/apis/apps.open-cluster-management.io/v1alpha1/namespaces/${ns}/subscriptions`);
    }
    return chs.map(async subscription => ({
      metadata: subscription.metadata,
      subscriptionWorkNames: subscription.metadata.name || '',
      namespace: subscription.metadata.namespace,
      sourceNamespace: subscription.spec.sourceNamespace,
      source: subscription.spec.source,
      channel: subscription.spec.channel,
      package: subscription.spec.package,
      packageFilter: subscription.spec.packageFilter,
      packageOverrides: subscription.spec.packageOverrides,
      placement: subscription.spec.placement,
      raw: subscription,
    }));
  }
}

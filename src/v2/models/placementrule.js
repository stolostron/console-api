/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import _ from 'lodash';
import KubeModel from './kube';

export default class PlacementRuleModel extends KubeModel {
  async createPlacementRule(resources) {
    const placementruleKinds = {
      PlacementRule: 'placementrules',
      ConfigMap: 'configmaps',
    };

    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', 'default');
      if (placementruleKinds[resource.kind] === 'undefined') {
        return Promise.resolve({
          status: 'Failure',
          message: `Invalid Kind: ${resource.kind}`,
        });
      }
      if (placementruleKinds[resource.kind] === 'placementrules') {
        return this.kubeConnector
          .post(`/apis/apps.open-cluster-management.io/v1/namespaces/${namespace}/placementrules`, resource)
          .catch((err) => ({
            status: 'Failure',
            message: err.message,
          }));
      }

      return this.kubeConnector
        .post(
          `/apis/mcm.ibm.com/v1alpha1/namespaces/${namespace}/${placementruleKinds[resource.kind]}`,
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

  async getPlacementRuleOverview(name, namespace = 'default') {
    let chs;
    if (name) {
      chs = await this.kubeConnector.getResources(
        (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules/${name}`,
        { namespaces: [namespace] },
      );
    } else {
      chs = await this.kubeConnector.getResources((ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules`);
    }
    chs = await Promise.all(chs);
    return chs.map((placementrule) => ({
      metadata: placementrule.metadata,
      placementruleWorkNames: placementrule.name,
    }));
  }

  async getPlacementRules(name, namespace) {
    let chs;
    const selectedNs = namespace || 'default';
    if (name) {
      chs = await this.kubeConnector.getResources(
        (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules/${name}`,
        { namespaces: [selectedNs] },
      );
    } else if (namespace) {
      chs = await this.kubeConnector.getResources(
        (ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules`,
        { namespaces: [selectedNs] },
      );
    } else {
      chs = await this.kubeConnector.getResources((ns) => `/apis/apps.open-cluster-management.io/v1/namespaces/${ns}/placementrules`);
    }
    return chs.map(async (placementrule) => ({
      metadata: placementrule.metadata,
      placementruleWorkNames: placementrule.metadata.name || '',
      namespace: placementrule.metadata.namespace,
      raw: placementrule,
    }));
  }

  async getPlacements(namespace) {
    let chs;
    const selectedNs = namespace || 'default';
    if (namespace) {
      chs = await this.kubeConnector.getResources(
        (ns) => `/apis/cluster.open-cluster-management.io/v1alpha1/namespaces/${ns}/placements`,
        { namespaces: [selectedNs] },
      );
    } else {
      chs = await this.kubeConnector.getResources((ns) => `/apis/cluster.open-cluster-management.io/v1alpha1/namespaces/${ns}/placements`);
    }
    return chs.map(async (placement) => ({
      metadata: placement.metadata,
      placementWorkNames: placement.metadata.name || '',
      namespace: placement.metadata.namespace,
      raw: placement,
    }));
  }
}

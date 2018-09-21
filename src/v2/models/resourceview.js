/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';

function selectNamespace(namespaces) {
  return namespaces.find(ns => ns === 'default') || namespaces[0];
}

export default class ResourceView {
  constructor({ kubeConnector, namespaces }) {
    // TODO: Find a better way to enforce parameters - 09/19/18 09:50:26 sidney
    if (!kubeConnector) {
      throw new Error('kubeConnector is a required parameter');
    }

    if (!namespaces && namespaces.length) {
      throw new Error('namespaces is a required parameter');
    }

    this.kubeConnector = kubeConnector;
    this.resourceViewNamespace = selectNamespace(namespaces);
  }

  async getPods() {
    const response = await this.kubeConnector.resourceViewQuery('pods', this.resourceViewNamespace);
    const results = _.get(response, 'status.results', {});
    return Object.keys(results).reduce((accum, clusterName) => {
      const pods = response.status.results[clusterName].items;

      pods.map(pod => accum.push({
        cluster: clusterName,
        containers: pod.spec.containers,
        createdAt: pod.metadata.creationTimestamp, // TODO Jorge: Remove, use metadata.
        hostIP: pod.status.hostIP,
        labels: pod.metadata.labels, // TODO Jorge: Remove, use metadata.
        metadata: pod.metadata,
        name: pod.metadata.name, // TODO Jorge: Remove, use metadata.
        namespace: pod.metadata.namespace, // TODO Jorge: Remove, use metadata.
        owners: pod.metadata.ownerReferences,
        podIP: pod.status.podIP,
        startedAt: pod.status.startTime,
        status: pod.status.phase,
        uid: pod.metadata.uid, // TODO Jorge: Remove, use metadata.
      }));

      return accum;
    }, []);
  }

  async getNodes() {
    const response = await this.kubeConnector.resourceViewQuery('nodes', this.resourceViewNamespace);
    const results = _.get(response, 'status.results', {});
    return Object.keys(results).reduce((accum, clusterName) => {
      const nodes = response.status.results[clusterName].items;

      nodes.map(node => accum.push({
        allocatable: node.status.allocatable,
        architecture: node.status.nodeInfo.architecture,
        capacity: node.status.capacity,
        cluster: clusterName,
        createdAt: node.metadata.creationTimestamp, // TODO Jorge: Remove, use metadata.
        labels: node.metadata.labels, // TODO Jorge: Remove, use metadata.
        metadata: node.metadata,
        name: node.metadata.name, // TODO Jorge: Remove, use metadata.
        images: node.status.images.reduce((imageNames, curr) => {
          imageNames.push(...curr.names);
          return imageNames;
        }, []),
        operatingSystem: node.status.nodeInfo.operatingSystem,
        osImage: node.status.nodeInfo.osImage,
        startedAt: node.status.startTime,
        status: node.status.phase,
        uid: node.metadata.uid, // TODO Jorge: Remove, use metadata.
      }));

      return accum;
    }, []);
  }

  async getNamespaces() {
    const response = await this.kubeConnector.resourceViewQuery('namespaces', this.resourceViewNamespace);
    const results = _.get(response, 'status.results', {});
    return Object.keys(results).reduce((accum, clusterName) => {
      const namespaces = response.status.results[clusterName].items;

      namespaces.map(namespace => accum.push({
        cluster: clusterName,
        createdAt: namespace.metadata.creationTimestamp, // TODO Jorge: Remove, use metadata.
        labels: namespace.metadata.labels, // TODO Jorge: Remove, use metadata.
        metadata: namespace.metadata,
        name: namespace.metadata.name, // TODO Jorge: Remove, use metadata.
        status: namespace.status.phase,
        uid: namespace.metadata.uid, // TODO Jorge: Remove, use metadata.
      }));

      return accum;
    }, []);
  }
}

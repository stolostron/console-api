/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import KubeModel from './kube';
import { isRequired } from '../lib/utils';

function selectNamespace(namespaces) {
  return namespaces.find(ns => ns === 'default') || namespaces[0];
}

const formatPod = (clusterName, pod) => ({
  cluster: clusterName,
  containers: pod.spec.containers,
  hostIP: pod.status.hostIP,
  metadata: pod.metadata,
  owners: pod.metadata.ownerReferences,
  podIP: pod.status.podIP,
  startedAt: pod.status.startTime,
  status: pod.status.phase,
});

const formatNode = (clusterName, node) => ({
  allocatable: node.status.allocatable,
  architecture: node.status.nodeInfo.architecture,
  capacity: node.status.capacity,
  cluster: clusterName,
  metadata: node.metadata,
  images: node.status.images.reduce((imageNames, curr) => {
    imageNames.push(...curr.names);
    return imageNames;
  }, []),
  operatingSystem: node.status.nodeInfo.operatingSystem,
  osImage: node.status.nodeInfo.osImage,
  startedAt: node.status.startTime,
  status: node.status.phase,
});

const formatNamespace = (clusterName, namespace) => ({
  cluster: clusterName,
  metadata: namespace.metadata,
  status: namespace.status.phase,
});

export default class ResourceView extends KubeModel {
  constructor(params) {
    super(params);

    this.resourceViewNamespace = selectNamespace(this.namespaces);
    this.transforms = {
      namespaces: formatNamespace,
      nodes: formatNode,
      pods: formatPod,
    };
  }

  async fetchResources({ type = isRequired('type') }) {
    const response = await this.kubeConnector.resourceViewQuery(type, this.resourceViewNamespace);
    const results = _.get(response, 'status.results', {});

    const transform = this.transforms[type];
    return Object.keys(results).reduce((accum, clusterName) => {
      const resourceList = response.status.results[clusterName].items;
      resourceList.map(resource => accum.push(transform(clusterName, resource)));

      return accum;
    }, []);
  }
}

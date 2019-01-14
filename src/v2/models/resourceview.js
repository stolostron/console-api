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
import { isRequired, getType } from '../lib/utils';

const formatPod = (clusterName, pod) => ({
  cluster: { metadata: { name: clusterName } },
  containers: pod.spec.containers,
  hostIP: pod.status.hostIP,
  metadata: pod.metadata,
  owners: pod.metadata.ownerReferences,
  podIP: pod.status.podIP,
  // eslint-disable-next-line
  restarts: _.reduce(pod.status.containerStatuses, (accum, curr) => {
    return accum + curr.restartCount;
  }, 0),
  startedAt: pod.status.startTime,
  status: pod.status.phase,
});

const formatPVs = (clusterName, pvs) => ({
  cluster: { metadata: { name: clusterName } },
  accessModes: _.get(pvs, 'spec.accessModes', ['-']),
  capacity: _.get(pvs, 'spec.capacity.storage', '-'),
  claim: pvs.spec.local
    ? _.get(pvs, 'spec.local.path', '-')
    : _.get(pvs, 'spec.hostPath.path', '-'),
  claimRef: {
    name: _.get(pvs, 'spec.claimRef.name', null),
    namespace: _.get(pvs, 'spec.claimRef.namespace', null),
  },
  metadata: pvs.metadata,
  reclaimPolicy: _.get(pvs, 'spec.persistentVolumeReclaimPolicy', '-'),
  status: _.get(pvs, 'status.phase', '-'),
  type: getType(pvs),
});

const formatPVsClaims = (clusterName, claim) => ({
  cluster: { metadata: { name: clusterName } },
  accessModes: _.get(claim, 'spec.accessModes', ['-']),
  metadata: claim.metadata,
  persistentVolume: _.get(claim, 'spec.volumeName', '-'),
  requests: _.get(claim, 'spec.resources.requests.storage', '-'),
  status: _.get(claim, 'status.phase', '-'),
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

    this.transforms = {
      namespaces: formatNamespace,
      nodes: formatNode,
      pods: formatPod,
      persistentvolumes: formatPVs,
      persistentvolumeclaims: formatPVsClaims,
    };
  }

  async fetchResources({ type = isRequired('type') }) {
    const response = await this.kubeConnector.resourceViewQuery(type);
    const results = _.get(response, 'status.results', {});

    const transform = this.transforms[type];
    return Object.keys(results).reduce((accum, clusterName) => {
      const resourceList = response.status.results[clusterName].items;
      resourceList.map(resource => accum.push(transform(clusterName, resource)));

      return accum;
    }, []);
  }
}

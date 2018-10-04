/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { ResourceModel } from '../models/mongo';

export const clusterModel = new ResourceModel({
  cluster: null,
  labels: [],
  name: 'managed-cluster',
  namespace: null,
  relationships: [],
  topology: 'cluster',
  type: 'cluster',
  uid: 'mycluster',
  id: '5b8e8fd76c5e67341711845d',
});

// Basic model with all fields
export const topologyModel = new ResourceModel({
  cluster: '5b8e8fd76c5e67341711845d',
  labels: [
    {
      name: 'app',
      value: 'ibm-mcm-controller',
    },
    {
      name: 'chart',
      value: 'ibm-mcm-controller-3.1.0',
    },
    {
      name: 'component',
      value: 'mcm-apiserver',
    },
    {
      name: 'heritage',
      value: 'Tiller',
    },
    {
      name: 'release',
      value: 'mcm-controller',
    },
  ],
  name: 'mcm-controller-ibm-mcm-controller',
  namespace: 'kube-system',
  relationships: [
    {
      type: 'service',
    },
    {
      type: 'service',
    },
  ],
  topology: '',
  type: 'service',
  uid: '1bf9a702-abc2-11e8-8a50-005056a0d11b',
  id: '5ba2729f6c5e673417266b92',
});

// Following models included for type query
export const hostModel = new ResourceModel({
  cluster: '5b8e8fd76c5e67341711845d',
  type: 'host',
});
export const podModel = new ResourceModel({
  cluster: '5b8e8fd76c5e67341711845d',
  type: 'pod',
});
export const statefulsetModel = new ResourceModel({
  cluster: '5b8e8fd76c5e67341711845d',
  type: 'statefulset',
});
export const deploymentModel = new ResourceModel({
  cluster: '5b8e8fd76c5e67341711845d',
  type: 'deployment',
});
export const daemonsetModel = new ResourceModel({
  cluster: '5b8e8fd76c5e67341711845d',
  type: 'daemonset',
});
export const containerModel = new ResourceModel({
  cluster: '5b8e8fd76c5e67341711845d',
  type: 'container',
});

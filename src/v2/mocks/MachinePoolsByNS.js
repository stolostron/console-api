// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

export default {
  body: {
    apiVersion: 'v1',
    items: [
      {
        apiVersion: 'hive.openshift.io/v1',
        kind: 'MachinePool',
        metadata: {
          creationTimestamp: '2020-04-24T23:13:33Z',
          generation: 2,
          name: 'managed-cluster-worker',
          namespace: 'default',
          resourceVersion: '94226',
          selfLink: '/apis/hive.openshift.io/v1/namespaces/default/machinepools/managed-cluster-worker',
          uid: 'a8b8374d-a358-4b77-88a2-335f61c65174',
        },
        spec: {
          clusterDeploymentRef: {
            name: 'managed-cluster',
          },
          name: 'worker',
          platform: {
            aws: {
              rootVolume: {
                iops: 100,
                size: 100,
                type: 'gp2',
              },
              type: 'm5.large',
            },
          },
          replicas: 3,
        },
      },
    ],
    kind: 'List',
    metadata: {
      resourceVersion: '',
      selfLink: '',
    },
  },
};

export const kubeSystem = {
  body: {
    apiVersion: 'v1',
    items: [
      {
        apiVersion: 'hive.openshift.io/v1',
        kind: 'MachinePool',
        metadata: {
          creationTimestamp: '2020-04-24T23:13:33Z',
          generation: 2,
          name: 'new-cluster-worker',
          namespace: 'kube-system',
          resourceVersion: '94226',
          selfLink: '/apis/hive.openshift.io/v1/namespaces/kube-system/machinepools/new-cluster-worker',
          uid: 'a8b8374d-a358-4b77-88a2-335f61c65174',
        },
        spec: {
          clusterDeploymentRef: {
            name: 'new-cluster',
          },
          name: 'worker',
          platform: {
            aws: {
              rootVolume: {
                iops: 100,
                size: 100,
                type: 'gp2',
              },
              type: 'm5.large',
            },
          },
          replicas: 3,
        },
      },
    ],
    kind: 'List',
    metadata: {
      resourceVersion: '',
      selfLink: '',
    },
  },
};

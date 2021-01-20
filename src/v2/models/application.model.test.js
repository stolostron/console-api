/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
import {
  getChannelName,
  getSubChannelName,
  getAllChannels,
  getSubscriptionsDeployables,
  buildDeployablesMap,
  filterByName,
  filterByNameNamespace,
} from './application';

describe('getSubChannelName', () => {
  it('should match getSubChannelName isChucked', () => {
    const paths = ['default/guestbook-app-staging-storage-redis-redis-sentinel-service',
      'default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod',
      'default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-service',
      'default/guestbook-app-staging-storage-rethinkdb-rethinkdb-driver-service',
      'default/guestbook-app-staging-storage-rethinkdb-rethinkdb-rc-replicationcontroller',
      'default/guestbook-app-staging-storage-vitess-guestbook-replicationcontroller',
      'default/guestbook-app-staging-storage-vitess-guestbook-service',
      'default/guestbook-app-staging-storage-vitess-vtctld-replicationcontroller',
      'default/guestbook-app-staging-storage-vitess-vtctld-service',
      'default/guestbook-app-staging-storage-vitess-vtgate-service',
      'default/guestbook-app-staging-storm-storm-worker-controller-deployment',
      'default/guestbook-app-staging-sysdig-cloud-sysdig-agent-daemonset',
      'default/guestbook-app-staging-sysdig-cloud-sysdig-agent-replicationcontroller',
      'default/guestbook-app-staging-volumes-cinder-cinder-web-pod',
      'default/guestbook-app-staging-volumes-flexvolume-deploy-flex-ds-daemonset',
      'default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-attachable-pod',
      'default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod',
      'default/guestbook-app-staging-volumes-flexvolume-nginx-nfs-pod',
      'default/guestbook-app-staging-volumes-flexvolume-nginx-pod',
      'default/guestbook-app-staging-volumes-flocker-flocker-ghost-replicationcontroller',
      'default/guestbook-app-staging-volumes-flocker-flocker-ghost-service',
      'default/guestbook-app-staging-volumes-flocker-flocker-web-pod',
      'default/guestbook-app-staging-volumes-nfs-nfs-busybox-replicationcontroller',
      'default/guestbook-app-staging-volumes-nfs-nfs-persistentvolume',
      'default/guestbook-app-staging-volumes-nfs-nfs-persistentvolumeclaim'];
    const isChucked = true;

    const result = '///storage-redis-redis-sentinel-service///volumes-nfs-nfs-persistentvolumeclaim';
    expect(getSubChannelName(paths, isChucked)).toEqual(result);
  });
});

describe('getSubChannelName chucked', () => {
  it('should match getSubChannelName is not chucked', () => {
    const paths = ['default/cassandra-app-subscription-cassandra-cassandra-service',
      'default/cassandra-app-subscription-cassandra-cassandra-statefulset'];
    const isChucked = false;

    const result = '';
    expect(getSubChannelName(paths, isChucked)).toEqual(result);
  });
});

describe('getSubChannelName not chucked', () => {
  it('should match getSubChannelName chucked undefined', () => {
    const paths = ['default/cassandra-app-subscription-cassandra-cassandra-service',
      'default/cassandra-app-subscription-cassandra-cassandra-statefulset'];

    const result = '';
    expect(getSubChannelName(paths, undefined)).toEqual(result);
  });
});

describe('getChannelName', () => {
  it('should match getChannelName', () => {
    const subscription = {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Subscription',
      metadata:
     {
       annotations:
        {
          'apps.open-cluster-management.io/deployables': 'default/cassandra-app-subscription-cassandra-cassandra-statefulset,default/cassandra-app-subscription-cassandra-cassandra-service',
          'apps.open-cluster-management.io/git-commit': '6f9fad9e3df6a439becde6985c20e6f18554a78e',
          'apps.open-cluster-management.io/github-branch': 'master',
          'apps.open-cluster-management.io/github-commit': '67f8fd1c825a48334a98a1258a9e988fa4fc02ce',
          'apps.open-cluster-management.io/github-path': 'cassandra',
          'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"apps.open-cluster-management.io/v1","kind":"Subscription","metadata":{"annotations":{"apps.open-cluster-management.io/github-branch":"master","apps.open-cluster-management.io/github-path":"cassandra"},"labels":{"app":"cassandra-app-cassandra"},"name":"cassandra-app-subscription","namespace":"default"},"spec":{"channel":"cassandra-ch/cassandra-channel","placement":{"placementRef":{"group":"apps.open-cluster-management.io","kind":"PlacementRule","name":"cassandra-app-placement"}}}}\n',
        },
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: { app: 'cassandra-app-cassandra' },
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
      spec:
     { channel: 'cassandra-ch/cassandra-channel' },
      status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
     },
      deployablePaths:
     ['default/cassandra-app-subscription-cassandra-cassandra-service',
       'default/cassandra-app-subscription-cassandra-cassandra-statefulset'],
    };

    const result = 'default/cassandra-app-subscription//cassandra-ch/cassandra-channel';
    expect(getChannelName(subscription)).toEqual(result);
  });
});

describe('getSubscriptionsDeployables', () => {
  it('should match getSubscriptionsDeployables', () => {
    const allSubscriptions = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Subscription',
        metadata:
     {
       annotations: {},
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
        spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
        status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      }];

    const result = {
      allowAllChannel: false,
      subscriptions: [{
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: [''],
        kind: 'Subscription',
        metadata: {
          annotations: {}, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }],
    };
    expect(getSubscriptionsDeployables(allSubscriptions)).toEqual(result);
  });
});

describe('getSubscriptionsDeployables one chunck', () => {
  it('should match getSubscriptionsDeployables one chunck', () => {
    const allSubscriptions = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Subscription',
        metadata:
     {
       annotations: {
         'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod',
       },
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
        spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
        status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      }];

    const result = {
      allowAllChannel: false,
      subscriptions: [{
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget', '1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '3', '4'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['5', '6', '7', '8', '9', 'default/guestbook-app-cassandra-cassandra-statefulset', 'default/guestbook-app-guestbook-all-in-one-frontend-deployment', 'default/guestbook-app-guestbook-all-in-one-redis-master-deployment', 'default/guestbook-app-guestbook-legacy-frontend-replicationcontroller', 'default/guestbook-app-guestbook-redis-master-deployment', 'default/guestbook-app-mysql-cinder-pd-mysql-service', 'default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount', 'default/guestbook-app-staging-openshift-origin-openshift-deployment', 'default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding', 'default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding', 'default/guestbook-app-staging-selenium-selenium-hub-service'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['default/guestbook-app-staging-selenium-selenium-node-chrome-deployment', 'default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints', 'default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller', 'default/guestbook-app-staging-storage-minio-minio-statefulset', 'default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service', 'default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod', 'default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod', 'default/guestbook-app-staging-volumes-nfs-nfs-server-service', 'default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller', 'default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim', 'default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim', 'default/guestbook-app-staging-volumes-vsphere-pvpod-pod', 'default/guestbook-app-volumes-iscsi-chap-secret-secret', 'default/guestbook-app-volumes-rbd-rbd-pod', 'default/guestbook-app-volumes-storageos-sc-fast-storageclass'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }],
    };

    expect(getSubscriptionsDeployables(allSubscriptions)).toEqual(result);
  });
});

describe('getSubscriptionsDeployables more than 100 deployables', () => {
  it('should match getSubscriptionsDeployables one chunck', () => {
    const allSubscriptions = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Subscription',
        metadata:
     {
       annotations: {
         'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod',
       },
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
        spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
        status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Subscription',
        metadata:
     {
       annotations: {
         'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod',
       },
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
        spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
        status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Subscription',
        metadata:
     {
       annotations: {
         'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod',
       },
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
        spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
        status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      }];

    const result = {
      allowAllChannel: false,
      subscriptions: [{
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget', '1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '3', '4'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['5', '6', '7', '8', '9', 'default/guestbook-app-cassandra-cassandra-statefulset', 'default/guestbook-app-guestbook-all-in-one-frontend-deployment', 'default/guestbook-app-guestbook-all-in-one-redis-master-deployment', 'default/guestbook-app-guestbook-legacy-frontend-replicationcontroller', 'default/guestbook-app-guestbook-redis-master-deployment', 'default/guestbook-app-mysql-cinder-pd-mysql-service', 'default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount', 'default/guestbook-app-staging-openshift-origin-openshift-deployment', 'default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding', 'default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding', 'default/guestbook-app-staging-selenium-selenium-hub-service'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['default/guestbook-app-staging-selenium-selenium-node-chrome-deployment', 'default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints', 'default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller', 'default/guestbook-app-staging-storage-minio-minio-statefulset', 'default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service', 'default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod', 'default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod', 'default/guestbook-app-staging-volumes-nfs-nfs-server-service', 'default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller', 'default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim', 'default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim', 'default/guestbook-app-staging-volumes-vsphere-pvpod-pod', 'default/guestbook-app-volumes-iscsi-chap-secret-secret', 'default/guestbook-app-volumes-rbd-rbd-pod', 'default/guestbook-app-volumes-storageos-sc-fast-storageclass'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget', '1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '3', '4'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['5', '6', '7', '8', '9', 'default/guestbook-app-cassandra-cassandra-statefulset', 'default/guestbook-app-guestbook-all-in-one-frontend-deployment', 'default/guestbook-app-guestbook-all-in-one-redis-master-deployment', 'default/guestbook-app-guestbook-legacy-frontend-replicationcontroller', 'default/guestbook-app-guestbook-redis-master-deployment', 'default/guestbook-app-mysql-cinder-pd-mysql-service', 'default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount', 'default/guestbook-app-staging-openshift-origin-openshift-deployment', 'default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding', 'default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding', 'default/guestbook-app-staging-selenium-selenium-hub-service'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['default/guestbook-app-staging-selenium-selenium-node-chrome-deployment', 'default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints', 'default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller', 'default/guestbook-app-staging-storage-minio-minio-statefulset', 'default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service', 'default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod', 'default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod', 'default/guestbook-app-staging-volumes-nfs-nfs-server-service', 'default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller', 'default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim', 'default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim', 'default/guestbook-app-staging-volumes-vsphere-pvpod-pod', 'default/guestbook-app-volumes-iscsi-chap-secret-secret', 'default/guestbook-app-volumes-rbd-rbd-pod', 'default/guestbook-app-volumes-storageos-sc-fast-storageclass'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget', '1', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '2', '20', '3', '4'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['5', '6', '7', '8', '9', 'default/guestbook-app-cassandra-cassandra-statefulset', 'default/guestbook-app-guestbook-all-in-one-frontend-deployment', 'default/guestbook-app-guestbook-all-in-one-redis-master-deployment', 'default/guestbook-app-guestbook-legacy-frontend-replicationcontroller', 'default/guestbook-app-guestbook-redis-master-deployment', 'default/guestbook-app-mysql-cinder-pd-mysql-service', 'default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount', 'default/guestbook-app-staging-openshift-origin-openshift-deployment', 'default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding', 'default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding', 'default/guestbook-app-staging-selenium-selenium-hub-service'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }, {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['default/guestbook-app-staging-selenium-selenium-node-chrome-deployment', 'default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints', 'default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller', 'default/guestbook-app-staging-storage-minio-minio-statefulset', 'default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service', 'default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod', 'default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod', 'default/guestbook-app-staging-volumes-nfs-nfs-server-service', 'default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller', 'default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim', 'default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim', 'default/guestbook-app-staging-volumes-vsphere-pvpod-pod', 'default/guestbook-app-volumes-iscsi-chap-secret-secret', 'default/guestbook-app-volumes-rbd-rbd-pod', 'default/guestbook-app-volumes-storageos-sc-fast-storageclass'],
        isChucked: true,
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,/default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget,default/guestbook-app-staging-openshift-origin-openshift-deployment,default/guestbook-app-staging-selenium-selenium-hub-service,default/guestbook-app-staging-volumes-nfs-nfs-server-service,default/guestbook-app-staging-podsecuritypolicy-rbac-edit-clusterrolebinding,default/guestbook-app-staging-volumes-nfs-nfs-web-replicationcontroller,default/guestbook-app-guestbook-legacy-frontend-replicationcontroller,default/guestbook-app-staging-volumes-scaleio-pvc-sio-small-persistentvolumeclaim,default/guestbook-app-staging-volumes-vsphere-pvc0001-persistentvolumeclaim,default/guestbook-app-guestbook-redis-master-deployment,default/guestbook-app-staging-selenium-selenium-node-chrome-deployment,default/guestbook-app-guestbook-all-in-one-redis-master-deployment,default/guestbook-app-staging-spark-zeppelin-controller-replicationcontroller,default/guestbook-app-staging-podsecuritypolicy-rbac-privileged-psp-users-clusterrolebinding,default/guestbook-app-staging-volumes-vsphere-pvpod-pod,default/guestbook-app-staging-storage-minio-minio-statefulset,default/guestbook-app-staging-elasticsearch-elasticsearch-serviceaccount,default/guestbook-app-cassandra-cassandra-statefulset,default/guestbook-app-staging-spark-spark-gluster-glusterfs-cluster-endpoints,default/guestbook-app-volumes-rbd-rbd-pod,default/guestbook-app-guestbook-all-in-one-frontend-deployment,default/guestbook-app-mysql-cinder-pd-mysql-service,default/guestbook-app-volumes-storageos-sc-fast-storageclass,default/guestbook-app-volumes-iscsi-chap-secret-secret,default/guestbook-app-staging-storage-mysql-galera-pxc-node2-service,default/guestbook-app-staging-volumes-flexvolume-nginx-dummy-pod,default/guestbook-app-staging-storage-rethinkdb-rethinkdb-admin-pod' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }],
    };

    expect(getSubscriptionsDeployables(allSubscriptions)).toEqual(result);
  });
});

describe('getSubscriptionsDeployables more than 20 but smaller than 100 deployables', () => {
  it('should match getSubscriptionsDeployables', () => {
    const allSubscriptions = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Subscription',
        metadata:
     {
       annotations: {
         'apps.open-cluster-management.io/deployables': 'default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget',
       },
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
        spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
        status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      },
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Subscription',
        metadata:
     {
       annotations: {
         'apps.open-cluster-management.io/deployables': 'default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget',
       },
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
        spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
        status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      }];

    const result = {
      allowAllChannel: true,
      subscriptions: [{
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget'],
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': 'default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      },
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        deployablePaths: ['default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget'],
        kind: 'Subscription',
        metadata: {
          annotations: { 'apps.open-cluster-management.io/deployables': 'default/guestbook-app-staging-cockroachdb-cockroachdb-budget-poddisruptionbudget' }, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
        status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
      }],
    };
    expect(getSubscriptionsDeployables(allSubscriptions)).toEqual(result);
  });
});

describe('getAllChannels no subscriptions', () => {
  it('getAllChannels without any subscription', () => {
    const subscriptions = [];

    const selectedChannel = '__ALL__/__ALL__//__ALL__/__ALL__';
    expect(getAllChannels(subscriptions, [], selectedChannel, true)).toEqual(subscriptions);
  });
});

describe('getAllChannels allow all channels', () => {
  it('getAllChannels allowAllChannel', () => {
    const subscriptions = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Subscription',
      metadata:
     {
       annotations: {},
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
      spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
      status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      deployablePaths:
     ['default/cassandra-app-subscription-cassandra-cassandra-service',
       'default/cassandra-app-subscription-cassandra-cassandra-statefulset'],
    }];

    const selectedChannel = '__ALL__/__ALL__//__ALL__/__ALL__';
    expect(getAllChannels(subscriptions, [], selectedChannel, true)).toEqual(subscriptions);
  });
});

describe('getAllChannels do not allow all channels', () => {
  it('getAllChannels', () => {
    const subscriptions = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Subscription',
      metadata:
     {
       annotations: {},
       creationTimestamp: '2020-05-12T19:41:20Z',
       generation: 2,
       labels: {},
       name: 'cassandra-app-subscription',
       namespace: 'default',
       resourceVersion: '55436209',
       selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
       uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
     },
      spec:
     {
       channel: 'cassandra-ch/cassandra-channel',
       placement: {},
     },
      status:
     {
       lastUpdateTime: '2020-06-01T10:42:30Z',
       phase: 'Propagated',
       statuses: {},
     },
      deployablePaths:
     ['default/cassandra-app-subscription-cassandra-cassandra-service',
       'default/cassandra-app-subscription-cassandra-cassandra-statefulset'],
    }];

    const selectedChannel = '__ALL__/__ALL__//__ALL__/__ALL__';

    const result = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      deployablePaths: ['default/cassandra-app-subscription-cassandra-cassandra-service', 'default/cassandra-app-subscription-cassandra-cassandra-statefulset'],
      kind: 'Subscription',
      metadata: {
        annotations: {}, creationTimestamp: '2020-05-12T19:41:20Z', generation: 2, labels: {}, name: 'cassandra-app-subscription', namespace: 'default', resourceVersion: '55436209', selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription', uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
      },
      spec: { channel: 'cassandra-ch/cassandra-channel', placement: {} },
      status: { lastUpdateTime: '2020-06-01T10:42:30Z', phase: 'Propagated', statuses: {} },
    }];

    expect(getAllChannels(subscriptions, [], selectedChannel, false)).toEqual(result);
  });
});

describe('getAllChannels no subs', () => {
  it('getAllChannels', () => {
    const subscriptions = [];

    const selectedChannel = '__ALL__/__ALL__//__ALL__/__ALL__';
    expect(getAllChannels(subscriptions, [], selectedChannel, false)).toEqual(null);
  });
});

describe('buildDeployablesMap', () => {
  it('buildDeployablesMap', () => {
    const subscriptions = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Subscription',
        metadata:
        {
          annotations: {},
          creationTimestamp: '2020-05-12T19:41:20Z',
          generation: 2,
          labels: {},
          name: 'cassandra-app-subscription',
          namespace: 'default',
          resourceVersion: '55436209',
          selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
          uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
        },
        spec:
        {
          channel: 'cassandra-ch/cassandra-channel',
          placement: {},
        },
        status:
        {
          lastUpdateTime: '2020-06-01T10:42:30Z',
          phase: 'Propagated',
          ansiblejobs: {
            prehookjobshistory: ['default/prehook-test-1-9750056'],
            posthookjobshistory: ['default/posthook-test-1-9750056'],
          },
          statuses: {},
        },
        deployablePaths:
        ['default/cassandra-app-subscription-cassandra-cassandra-service',
          'default/cassandra-app-subscription-cassandra-cassandra-statefulset'],
      },
    ];

    const result = {
      deployableMap: {
        default: [
          {
            deployableName: 'cassandra-app-subscription-cassandra-cassandra-service',
            subscription: {
              apiVersion: 'apps.open-cluster-management.io/v1',
              kind: 'Subscription',
              metadata: {
                annotations: {

                },
                creationTimestamp: '2020-05-12T19:41:20Z',
                generation: 2,
                labels: {

                },
                name: 'cassandra-app-subscription',
                namespace: 'default',
                resourceVersion: '55436209',
                selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
                uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
              },
              spec: {
                channel: 'cassandra-ch/cassandra-channel',
                placement: {

                },
              },
              status: {
                lastUpdateTime: '2020-06-01T10:42:30Z',
                phase: 'Propagated',
                ansiblejobs: {
                  prehookjobshistory: ['default/prehook-test-1-9750056'],
                  posthookjobshistory: ['default/posthook-test-1-9750056'],
                },
                statuses: {},
              },
              deployables: [

              ],
              channels: [

              ],
            },
          },
          {
            deployableName: 'cassandra-app-subscription-cassandra-cassandra-statefulset',
            subscription: {
              apiVersion: 'apps.open-cluster-management.io/v1',
              kind: 'Subscription',
              metadata: {
                annotations: {

                },
                creationTimestamp: '2020-05-12T19:41:20Z',
                generation: 2,
                labels: {

                },
                name: 'cassandra-app-subscription',
                namespace: 'default',
                resourceVersion: '55436209',
                selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
                uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
              },
              spec: {
                channel: 'cassandra-ch/cassandra-channel',
                placement: {

                },
              },
              status: {
                lastUpdateTime: '2020-06-01T10:42:30Z',
                phase: 'Propagated',
                ansiblejobs: {
                  prehookjobshistory: ['default/prehook-test-1-9750056'],
                  posthookjobshistory: ['default/posthook-test-1-9750056'],
                },
                statuses: {},
              },
              deployables: [

              ],
              channels: [

              ],
            },
          },
        ],
      },
      channelsMap: {
        'cassandra-ch': [
          {
            chnName: 'cassandra-channel',
            subscription: {
              apiVersion: 'apps.open-cluster-management.io/v1',
              kind: 'Subscription',
              metadata: {
                annotations: {

                },
                creationTimestamp: '2020-05-12T19:41:20Z',
                generation: 2,
                labels: {

                },
                name: 'cassandra-app-subscription',
                namespace: 'default',
                resourceVersion: '55436209',
                selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
                uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
              },
              spec: {
                channel: 'cassandra-ch/cassandra-channel',
                placement: {

                },
              },
              status: {
                lastUpdateTime: '2020-06-01T10:42:30Z',
                phase: 'Propagated',
                ansiblejobs: {
                  prehookjobshistory: ['default/prehook-test-1-9750056'],
                  posthookjobshistory: ['default/posthook-test-1-9750056'],
                },
                statuses: {},
              },
              deployables: [

              ],
              channels: [

              ],
            },
          },
        ],
      },
      rulesMap: {

      },
      preHooksMap: {
        default: [
          {
            deployableName: 'prehook-test-1-9750056',
            subscription: {
              apiVersion: 'apps.open-cluster-management.io/v1',
              kind: 'Subscription',
              metadata:
              {
                annotations: {},
                creationTimestamp: '2020-05-12T19:41:20Z',
                generation: 2,
                labels: {},
                name: 'cassandra-app-subscription',
                namespace: 'default',
                resourceVersion: '55436209',
                selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
                uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
              },
              spec:
              {
                channel: 'cassandra-ch/cassandra-channel',
                placement: {},
              },
              status:
              {
                lastUpdateTime: '2020-06-01T10:42:30Z',
                phase: 'Propagated',
                ansiblejobs: {
                  prehookjobshistory: ['default/prehook-test-1-9750056'],
                  posthookjobshistory: ['default/posthook-test-1-9750056'],
                },
                statuses: {},
              },
              deployables: [

              ],
              channels: [

              ],
            },
          },
        ],
      },
      postHooksMap: {
        default: [
          {
            deployableName: 'posthook-test-1-9750056',
            subscription: {
              apiVersion: 'apps.open-cluster-management.io/v1',
              kind: 'Subscription',
              metadata:
              {
                annotations: {},
                creationTimestamp: '2020-05-12T19:41:20Z',
                generation: 2,
                labels: {},
                name: 'cassandra-app-subscription',
                namespace: 'default',
                resourceVersion: '55436209',
                selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/subscriptions/cassandra-app-subscription',
                uid: '64511c0d-8ec5-4257-a318-79e8d04ad7ff',
              },
              spec:
              {
                channel: 'cassandra-ch/cassandra-channel',
                placement: {},
              },
              status:
              {
                lastUpdateTime: '2020-06-01T10:42:30Z',
                phase: 'Propagated',
                ansiblejobs: {
                  prehookjobshistory: ['default/prehook-test-1-9750056'],
                  posthookjobshistory: ['default/posthook-test-1-9750056'],
                },
                statuses: {},
              },
              deployables: [

              ],
              channels: [

              ],
            },
          },
        ],
      },
    };
    expect(buildDeployablesMap(subscriptions, [])).toEqual(result);
  });
});

describe('filterByName', () => {
  it('filterByNameName', () => {
    const names = ['aaa', 'bbb'];
    const items = [
      {
        metadata: {
          name: 'ddd',
        },
      },
      {
        metadata: {
          name: 'aaa',
        },

      },
      {
        metadata: {
          name: 'aaa',
        },

      },
    ];

    const result = [{ metadata: { name: 'aaa' } }, { metadata: { name: 'aaa' } }];
    expect(filterByName(names, items)).toEqual(result);
  });
});

describe('filterByNameNamespace', () => {
  it('filterByNameNamespace', () => {
    const names = ['aaa', 'bbb'];
    const items = [
      {
        metadata: {
          namespace: 'ddd',
        },
      },
      {
        metadata: {
          namespace: 'aaa',
        },

      },
      {
        metadata: {
          namespace: 'aaa',
        },

      },
    ];

    expect(filterByNameNamespace(names, items)).toEqual([]);
  });
});

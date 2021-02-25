// Copyright (c) 2020 Red Hat, Inc.

const mockResponse = {
  apiVersion: 'addon.open-cluster-management.io/v1alpha1',
  items: [{
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ClusterManagementAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:48:35Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1', fieldsType: 'FieldsV1', fieldsV1: { 'f:spec': { '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} } }, 'f:status': {} }, manager: 'endpoint-operator', operation: 'Update', time: '2020-09-09T17:48:35Z',
      }],
      name: 'application-manager',
      resourceVersion: '2878854',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons/application-manager',
      uid: '8abf6f17-ec7d-49e4-8390-a7319ff232d8',
    },
    spec: { addOnConfiguration: { crName: '', crdName: 'klusterletaddonconfigs.agent.open-cluster-management.io' }, addOnMeta: { description: 'Processes events and other requests to managed resources.', displayName: 'Application Manager' } },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ClusterManagementAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:48:35Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1', fieldsType: 'FieldsV1', fieldsV1: { 'f:spec': { '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} } }, 'f:status': {} }, manager: 'endpoint-operator', operation: 'Update', time: '2020-09-09T17:48:35Z',
      }],
      name: 'cert-policy-controller',
      resourceVersion: '2878855',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons/cert-policy-controller',
      uid: '5b198c74-d4b0-4226-b284-c5707511a20d',
    },
    spec: { addOnConfiguration: { crName: '', crdName: 'klusterletaddonconfigs.agent.open-cluster-management.io' }, addOnMeta: { description: 'Monitors certificate expiration based on distributed policies.', displayName: 'Cert Policy Controller' } },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ClusterManagementAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:48:35Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1', fieldsType: 'FieldsV1', fieldsV1: { 'f:spec': { '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} } }, 'f:status': {} }, manager: 'endpoint-operator', operation: 'Update', time: '2020-09-09T17:48:35Z',
      }],
      name: 'iam-policy-controller',
      resourceVersion: '2878856',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons/iam-policy-controller',
      uid: '666816c6-5ac9-47d3-8ac8-9297023df25c',
    },
    spec: { addOnConfiguration: { crName: '', crdName: 'klusterletaddonconfigs.agent.open-cluster-management.io' }, addOnMeta: { description: 'Monitors identity controls based on distributed policies.', displayName: 'IAM Policy Controller' } },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ClusterManagementAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:48:35Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1', fieldsType: 'FieldsV1', fieldsV1: { 'f:spec': { '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} } }, 'f:status': {} }, manager: 'endpoint-operator', operation: 'Update', time: '2020-09-09T17:48:35Z',
      }],
      name: 'policy-controller',
      resourceVersion: '2878857',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons/policy-controller',
      uid: 'c0286e45-12cd-47cb-bece-d323222eeb27',
    },
    spec: { addOnConfiguration: { crName: '', crdName: 'klusterletaddonconfigs.agent.open-cluster-management.io' }, addOnMeta: { description: 'Distributes configured policies and monitors Kubernetes-based policies.', displayName: 'Policy Controller' } },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ClusterManagementAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:48:35Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1', fieldsType: 'FieldsV1', fieldsV1: { 'f:spec': { '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} } }, 'f:status': {} }, manager: 'endpoint-operator', operation: 'Update', time: '2020-09-09T17:48:35Z',
      }],
      name: 'search-collector',
      resourceVersion: '2878858',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons/search-collector',
      uid: 'cdc2a1f6-7f64-4b8c-9405-337cfe57d963',
    },
    spec: { addOnConfiguration: { crName: '', crdName: 'klusterletaddonconfigs.agent.open-cluster-management.io' }, addOnMeta: { description: 'Collects cluster data to be indexed by search components on the hub cluster.', displayName: 'Search Collector' } },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ClusterManagementAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:48:35Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1', fieldsType: 'FieldsV1', fieldsV1: { 'f:spec': { '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} } }, 'f:status': {} }, manager: 'endpoint-operator', operation: 'Update', time: '2020-09-09T17:48:35Z',
      }],
      name: 'work-manager',
      resourceVersion: '2878859',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons/work-manager',
      uid: '954e0672-1e2f-47eb-bfc6-c3c730e1edd1',
    },
    spec: { addOnConfiguration: { crName: '', crdName: 'klusterletaddonconfigs.agent.open-cluster-management.io' }, addOnMeta: { description: 'Component that handles endpoint work requests and managed cluster status.', displayName: 'Work Manager' } },
  }],
  kind: 'ClusterManagementAddOnList',
  metadata: { continue: '', resourceVersion: '2924924', selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons' },
};

export default mockResponse;

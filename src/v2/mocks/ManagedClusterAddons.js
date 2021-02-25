// Copyright (c) 2020 Red Hat, Inc.

const mockResponse = {
  apiVersion: 'addon.open-cluster-management.io/v1alpha1',
  items: [{
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ManagedClusterAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:53:25Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"f6dedd38-2973-40a5-8dcb-d2a055359156"}': {
                '.': {}, 'f:apiVersion': {}, 'f:blockOwnerDeletion': {}, 'f:controller': {}, 'f:kind': {}, 'f:name': {}, 'f:uid': {},
              },
            },
          },
          'f:spec': {},
          'f:status': {
            '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} }, 'f:conditions': {}, 'f:relatedObjects': {},
          },
        },
        manager: 'endpoint-operator',
        operation: 'Update',
        time: '2020-09-09T19:11:23Z',
      }],
      name: 'application-manager',
      namespace: 'han-test',
      ownerReferences: [{
        apiVersion: 'agent.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'KlusterletAddonConfig', name: 'han-test', uid: 'f6dedd38-2973-40a5-8dcb-d2a055359156',
      }],
      resourceVersion: '2920509',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/namespaces/han-test/managedclusteraddons/application-manager',
      uid: 'f7678b07-1286-4437-8c2b-2971dd2b7956',
    },
    spec: {},
    status: {
      addOnConfiguration: { crName: '', crdName: '' },
      addOnMeta: { description: 'application-manager description', displayName: '' },
      conditions: [{
        lastTransitionTime: '2020-09-09T18:15:53Z', message: 'Applied ManifestWork', reason: 'ManifestWorkApplied', status: 'False', type: 'Progressing',
      }, {
        lastTransitionTime: '2020-09-09T19:11:23Z', message: 'Addon is available', reason: 'AddonAvailable', status: 'True', type: 'Available',
      }],
      relatedObjects: [{ group: 'agent.open-cluster-management.io', name: 'han-test', resource: 'klusterletaddonconfigs' }],
    },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ManagedClusterAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:53:25Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"f6dedd38-2973-40a5-8dcb-d2a055359156"}': {
                '.': {}, 'f:apiVersion': {}, 'f:blockOwnerDeletion': {}, 'f:controller': {}, 'f:kind': {}, 'f:name': {}, 'f:uid': {},
              },
            },
          },
          'f:spec': {},
          'f:status': {
            '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} }, 'f:conditions': {}, 'f:relatedObjects': {},
          },
        },
        manager: 'endpoint-operator',
        operation: 'Update',
        time: '2020-09-09T19:01:40Z',
      }],
      name: 'cert-policy-controller',
      namespace: 'han-test',
      ownerReferences: [{
        apiVersion: 'agent.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'KlusterletAddonConfig', name: 'han-test', uid: 'f6dedd38-2973-40a5-8dcb-d2a055359156',
      }],
      resourceVersion: '2915730',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/namespaces/han-test/managedclusteraddons/cert-policy-controller',
      uid: '8d513d73-93c4-441f-a186-66788081ee30',
    },
    spec: {},
    status: {
      addOnConfiguration: { crName: '', crdName: '' },
      addOnMeta: { description: 'cert-policy-controller description', displayName: '' },
      conditions: [{
        lastTransitionTime: '2020-09-09T18:15:53Z', message: 'Applied ManifestWork', reason: 'ManifestWorkApplied', status: 'False', type: 'Progressing',
      }, {
        lastTransitionTime: '2020-09-09T19:01:40Z', message: 'Addon is available', reason: 'AddonAvailable', status: 'True', type: 'Available',
      }],
      relatedObjects: [{ group: 'agent.open-cluster-management.io', name: 'han-test', resource: 'klusterletaddonconfigs' }],
    },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ManagedClusterAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:53:26Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"f6dedd38-2973-40a5-8dcb-d2a055359156"}': {
                '.': {}, 'f:apiVersion': {}, 'f:blockOwnerDeletion': {}, 'f:controller': {}, 'f:kind': {}, 'f:name': {}, 'f:uid': {},
              },
            },
          },
          'f:spec': {},
          'f:status': {
            '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} }, 'f:conditions': {}, 'f:relatedObjects': {},
          },
        },
        manager: 'endpoint-operator',
        operation: 'Update',
        time: '2020-09-09T19:11:20Z',
      }],
      name: 'policy-controller',
      namespace: 'han-test',
      ownerReferences: [{
        apiVersion: 'agent.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'KlusterletAddonConfig', name: 'han-test', uid: 'f6dedd38-2973-40a5-8dcb-d2a055359156',
      }],
      resourceVersion: '2920481',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/namespaces/han-test/managedclusteraddons/policy-controller',
      uid: '9ef60e69-3645-4a8e-bb5e-007bf92fbee7',
    },
    spec: {},
    status: {
      addOnConfiguration: { crName: '', crdName: '' },
      addOnMeta: { description: 'policy-controller description', displayName: '' },
      conditions: [{
        lastTransitionTime: '2020-09-09T18:15:51Z', message: 'Applied ManifestWork', reason: 'ManifestWorkApplied', status: 'False', type: 'Progressing',
      }, {
        lastTransitionTime: '2020-09-09T19:11:20Z', message: 'Addon is available', reason: 'AddonAvailable', status: 'True', type: 'Available',
      }],
      relatedObjects: [{ group: 'agent.open-cluster-management.io', name: 'han-test', resource: 'klusterletaddonconfigs' }],
    },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ManagedClusterAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T19:01:44Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"f6dedd38-2973-40a5-8dcb-d2a055359156"}': {
                '.': {}, 'f:apiVersion': {}, 'f:blockOwnerDeletion': {}, 'f:controller': {}, 'f:kind': {}, 'f:name': {}, 'f:uid': {},
              },
            },
          },
          'f:spec': {},
          'f:status': {
            '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} }, 'f:conditions': {}, 'f:relatedObjects': {},
          },
        },
        manager: 'endpoint-operator',
        operation: 'Update',
        time: '2020-09-09T19:01:51Z',
      }],
      name: 'search-collector',
      namespace: 'han-test',
      ownerReferences: [{
        apiVersion: 'agent.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'KlusterletAddonConfig', name: 'han-test', uid: 'f6dedd38-2973-40a5-8dcb-d2a055359156',
      }],
      resourceVersion: '2915826',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/namespaces/han-test/managedclusteraddons/search-collector',
      uid: '485bd9d9-6f8e-4fae-b3fa-7c2461d7a528',
    },
    spec: {},
    status: {
      addOnConfiguration: { crName: '', crdName: '' },
      addOnMeta: { description: 'search-collector description', displayName: '' },
      conditions: [{
        lastTransitionTime: '2020-09-09T19:01:51Z', message: 'Applied ManifestWork', reason: 'ManifestWorkApplied', status: 'False', type: 'Progressing',
      }, {
        lastTransitionTime: '2020-09-09T19:01:44Z', message: 'Addon is not available', reason: 'AddonNotReady', status: 'False', type: 'Available',
      }],
      relatedObjects: [{ group: 'agent.open-cluster-management.io', name: 'han-test', resource: 'klusterletaddonconfigs' }],
    },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ManagedClusterAddOn',
    metadata: {
      creationTimestamp: '2020-09-09T17:53:29Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"f6dedd38-2973-40a5-8dcb-d2a055359156"}': {
                '.': {}, 'f:apiVersion': {}, 'f:blockOwnerDeletion': {}, 'f:controller': {}, 'f:kind': {}, 'f:name': {}, 'f:uid': {},
              },
            },
          },
          'f:spec': {},
          'f:status': {
            '.': {}, 'f:addOnConfiguration': { '.': {}, 'f:crName': {}, 'f:crdName': {} }, 'f:addOnMeta': { '.': {}, 'f:description': {}, 'f:displayName': {} }, 'f:conditions': {}, 'f:relatedObjects': {},
          },
        },
        manager: 'endpoint-operator',
        operation: 'Update',
        time: '2020-09-09T19:11:20Z',
      }],
      name: 'work-manager',
      namespace: 'han-test',
      ownerReferences: [{
        apiVersion: 'agent.open-cluster-management.io/v1', blockOwnerDeletion: true, controller: true, kind: 'KlusterletAddonConfig', name: 'han-test', uid: 'f6dedd38-2973-40a5-8dcb-d2a055359156',
      }],
      resourceVersion: '2920479',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/namespaces/han-test/managedclusteraddons/work-manager',
      uid: '9a152b81-e537-4b8c-9451-afc9816da6ce',
    },
    spec: {},
    status: {
      addOnConfiguration: { crName: '', crdName: '' },
      addOnMeta: { description: 'work-manager description', displayName: '' },
      conditions: [{
        lastTransitionTime: '2020-09-09T18:15:50Z', message: 'Applied ManifestWork', reason: 'ManifestWorkApplied', status: 'False', type: 'Progressing',
      }, {
        lastTransitionTime: '2020-09-09T19:11:20Z', message: 'Addon is available', reason: 'AddonAvailable', status: 'True', type: 'Available',
      }],
      relatedObjects: [{ group: 'agent.open-cluster-management.io', name: 'han-test', resource: 'klusterletaddonconfigs' }],
    },
  }],
  kind: 'ManagedClusterAddOnList',
  metadata: { continue: '', resourceVersion: '2925619', selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/namespaces/han-test/managedclusteraddons' },
};

export default mockResponse;

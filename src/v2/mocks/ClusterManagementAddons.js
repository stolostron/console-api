/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

const mockResponse = {
  apiVersion: 'addon.open-cluster-management.io/v1alpha1',
  items: [{
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ClusterManagementAddOn',
    metadata: {
      creationTimestamp: '2020-08-31T23:54:01Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:spec': {
            '.': {}, 'f:addOnConfigCRD': {}, 'f:description': {}, 'f:displayName': {},
          },
        },
        manager: 'Mozilla',
        operation: 'Update',
        time: '2020-08-31T23:54:01Z',
      }],
      name: 'observability-addon',
      resourceVersion: '5885884',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons/observability-addon',
      uid: '196ec5b4-5e06-4ad0-9440-31f08ee7c252',
    },
    spec: { addOnConfigCRD: 'observability.agent.open-cluster-management.io', description: 'This is the tooltip for Observability', displayName: 'Observability' },
  }, {
    apiVersion: 'addon.open-cluster-management.io/v1alpha1',
    kind: 'ClusterManagementAddOn',
    metadata: {
      creationTimestamp: '2020-08-31T17:50:51Z',
      generation: 1,
      managedFields: [{
        apiVersion: 'addon.open-cluster-management.io/v1alpha1',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:spec': {
            '.': {}, 'f:addOnConfigCRD': {}, 'f:description': {}, 'f:displayName': {},
          },
        },
        manager: 'Mozilla',
        operation: 'Update',
        time: '2020-08-31T17:50:51Z',
      }],
      name: 'open-cluster-management-addon-application-manager',
      resourceVersion: '5681832',
      selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons/open-cluster-management-addon-application-manager',
      uid: 'c58c532b-1d00-4aea-ad26-40df407fca6a',
    },
    spec: { addOnConfigCRD: 'klusterletaddonconfigs.agent.open-cluster-management.io', description: 'application manager', displayName: 'application-manager' },
  }],
  kind: 'ClusterManagementAddOnList',
  metadata: { continue: '', resourceVersion: '5947757', selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/clustermanagementaddons' },
};

export default mockResponse;

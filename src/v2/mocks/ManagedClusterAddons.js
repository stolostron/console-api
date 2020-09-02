/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

const mockResponse = {
  apiVersion: 'addon.open-cluster-management.io/v1alpha1',
  kind: 'ManagedClusterAddOnList',
  metadata: {
    continue: '',
    resourceVersion: '5933793',
    selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/namespaces/hub-cluster/managedclusteraddons',
  },
  items: [
    {
      apiVersion: 'addon.open-cluster-management.io/v1alpha1',
      kind: 'ManagedClusterAddOn',
      metadata: {
        creationTimestamp: '2020-08-31T17:51:07Z',
        generation: 2,
        managedFields: [
          {
            apiVersion: 'addon.open-cluster-management.io/v1alpha1',
            fieldsType: 'FieldsV1',
            fieldsV1: {
              'f:spec': {

              },
              'f:status': {
                '.': {

                },
                'f:addOnResource': {
                  '.': {

                  },
                  'f:group': {

                  },
                  'f:name': {

                  },
                  'f:resource': {

                  },
                },
                'f:conditions': {

                },
              },
            },
            manager: 'Mozilla',
            operation: 'Update',
            time: '2020-08-31T21:48:31Z',
          },
        ],
        name: 'open-cluster-management-addon-application-manager',
        namespace: 'hub-cluster',
        resourceVersion: '5814291',
        selfLink: '/apis/addon.open-cluster-management.io/v1alpha1/namespaces/hub-cluster/managedclusteraddons/open-cluster-management-addon-application-manager',
        uid: '7096881e-363d-4a7f-9c37-364451cc6571',
      },
      spec: {

      },
      status: {
        addOnResource: {
          group: 'agent.open-cluster-management.io',
          name: 'test-cluster',
          resource: 'klusterletaddonconfigs',
        },
        conditions: [
          {
            lastTransitionTime: '2020-08-31T14:55:25Z',
            message: 'manifestwork applying',
            reason: 'ManifestWorkApplying',
            status: 'True',
            type: 'Progressing',
          },
          {
            lastTransitionTime: '2020-08-31T14:58:25Z',
            message: 'addon is not ready',
            reason: 'AddOnNotReady',
            status: 'False',
            type: 'Available',
          },
        ],
      },
    },
  ],
};

export default mockResponse;

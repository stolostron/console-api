/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc. All Rights Reserved.
 ****************************************************************************** */

const mockResponse = {
  body: {
    apiVersion: 'v1',
    data: {
      password: 'dGVzdDE=',
      username: 'dGVzdDE=',
    },
    kind: 'Secret',
    metadata: {
      creationTimestamp: '2020-07-23T18:07:07Z',
      generateName: 'worker-0-bmc-secret',
      name: 'worker-0-bmc-secret',
      namespace: 'fake-cluster',
      ownerReferences: [{
        apiVersion: 'inventory.open-cluster-management.io/v1alpha1',
        kind: 'BareMetalAsset',
        name: 'worker-0',
        uid: '86683623-be4d-4210-9276-3fa320b45617',
      }],
      resourceVersion: '10449699',
      selfLink: '/api/v1/namespaces/fake-cluster/secrets/worker-0-bmc-secret-9bmgg',
      uid: '8c18d6a7-1f44-4928-81b5-489bdc4bacc7',
    },
    type: 'Opaque',
  },
};
export default mockResponse;

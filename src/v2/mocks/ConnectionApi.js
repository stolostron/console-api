/* eslint-disable no-trailing-spaces */
/* eslint-disable key-spacing */
/* eslint-disable quote-props */
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

export const getCloudConnectionSecrets = {
  body: {
    items: [
      {
        'metadata': {
          'name': 'aws',
          'namespace': 'default',
          'selfLink': '/api/v1/namespaces/default/secrets/aws',
          'uid': '0cf5e090-a880-4c5e-a784-d7c77c645161',
          'resourceVersion': '764723',
          'creationTimestamp': '2020-03-12T14:24:45Z',
          'labels': {
            'cluster.open-cluster-management.io/cloudconnection': '',
            'cluster.open-cluster-management.io/provider': 'aws',
          },
        },
        'data': {
          'metadata': 'YXdzQWNjZXNzS2V5SUQ6IGF3cy1hY2Nlc3Mta2V5LWlkCmF3c1NlY3JldEFjY2Vzc0tleUlEOiBhd3Mtc2VjcmV0LWFjY2Vzcy1rZXktaWQKcHVsbFNlY3JldDogJ3sibm90IjoiYSIsInJlYWwiOiJwdWxsIiwic2VjcmV0IjoiISJ9Jwpzc2hQcml2YXRla2V5OiBzc2gtcHJpdmF0ZS1rZXkKc3NoUHVibGlja2V5OiBzc2gtcHVibGljLWtleQppc09jcDogdHJ1ZQo=',
        },
        'type': 'Opaque',
      },
      {
        'metadata': {
          'name': 'google',
          'namespace': 'hive',
          'selfLink': '/api/v1/namespaces/hive/secrets/google',
          'uid': '873171bf-597f-4054-b754-18ae479fffc5',
          'resourceVersion': '766027',
          'creationTimestamp': '2020-03-12T14:27:35Z',
          'labels': {
            'cluster.open-cluster-management.io/cloudconnection': '',
            'cluster.open-cluster-management.io/provider': 'gke',
          },
        },
        'data': {
          'metadata': 'Z2NQcm9qZWN0SUQ6IGdjcC1wcm9qZWN0CmdjU2VydmljZUFjY291bnRLZXk6ICd7ImZha2UiOiJqc29uIiwia2V5IjoiaGFoYSEifScKcHVsbFNlY3JldDogJ3sicHVsbCI6InNlY3JldCJ9Jwpzc2hQcml2YXRla2V5OiBzc2gtcHJpdmF0ZS1rZXktZm9yLWdvb2dsZQpzc2hQdWJsaWNrZXk6IGdvb2dsZS1wdWJsaWMta2V5CmlzT2NwOiB0cnVlCg==',
        },
        'type': 'Opaque',
      },
      {
        'metadata': {
          'name': 'microsoft',
          'namespace': 'ocm',
          'selfLink': '/api/v1/namespaces/ocm/secrets/microsoft',
          'uid': 'a012ea96-02ae-460c-a6e1-221c27a4aab8',
          'resourceVersion': '769915',
          'creationTimestamp': '2020-03-12T14:35:44Z',
          'labels': {
            'cluster.open-cluster-management.io/cloudconnection': '',
            'cluster.open-cluster-management.io/provider': 'aks',
          },
        },
        'data': {
          'metadata': 'YmFzZURvbWFpblJlc291cmNlR3JvdXBOYW1lOiBhY20ubWljcm9zb2Z0LmlvCm9zU2VydmljZVByaW5jaXBhbDogJ3siZmFrZSI6Impzb24ifScKcHVsbFNlY3JldDogJ3sibXkiOiJwdWxsIiwic2VjcmV0Ijoibm90aGluZyJ9Jwpzc2hQcml2YXRla2V5OiBtc2Z0LXByaXZhdGUta2V5CnNzaFB1YmxpY2tleTogbXNmdC1wdWJsaWMta2V5CmlzT2NwOiB0cnVlCg==',
        },
        'type': 'Opaque',
      },
    ],
  },
};

export const createCloudConnection = {
  body: {
    kind: 'Secret',
  },
};

export const createCloudConnectionError = {
  body: {
    kind: 'Status',
    code: 409,
  },
};

export const editCloudConnection = {
  body: {
    kind: 'Secret',
  },
};

export const editCloudConnectionError = {
  body: {
    kind: 'Status',
    code: 409,
  },
};

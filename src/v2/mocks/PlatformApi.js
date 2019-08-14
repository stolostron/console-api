/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const getAutomatedImportStatusResponse = {
  body: {
    Items: [
      {
        name: 'alec-import-job952zf',
        startTime: '2019-08-07T16:49:28Z',
        status: 'Complete',
      },
    ],
    code: 'E004',
  },
  statusCode: 200,
};

const automatedImportResponse = {
  body: {
    name: 'alec-import-jobmndvm',
    status: 'Active',
    code: 'E004',
  },
  statusCode: 200,
};

const createClusterResourceResponse = {
  body: {
    metadata: {
      name: 'test',
      namespace: 'test',
      selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/test/clusters/test',
      uid: 'c752f750-b8b0-11e9-a492-6ac0b040c894',
      resourceVersion: '947616',
      creationTimestamp: '2019-08-07T01:15:00Z',
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50cyxzeXN0ZW06c2VydmljZWFjY291bnRzOmt1YmUtc3lzdGVtLHN5c3RlbTphdXRoZW50aWNhdGVk',
        'mcm.ibm.com/user-identity': 'c3lzdGVtOnNlcnZpY2VhY2NvdW50Omt1YmUtc3lzdGVtOmRlZmF1bHQ=',
      },
    },
    spec: {
      kubernetesApiEndpoints: {},
      authInfo: {},
    },
    status: {},
    code: 'E004',
  },
  statusCode: 200,
};

export { createClusterResourceResponse, automatedImportResponse, getAutomatedImportStatusResponse };

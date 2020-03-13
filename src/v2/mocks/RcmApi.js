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
const getCloudConnectionsResponse = {
  body: {
    Items: [
      {
        name: 'iks-test',
        namespace: 'default',
        provider: 'iks',
        metadata: 'secret:\n  apiKey: iks-test\n',
      },
    ],
  },
  statusCode: 200,
};

const getCloudProvidersResponse = {
  body: {
    Items: [
      {
        name: 'iks-test',
        longname: 'iks-test',
        type: '',
        configMetadata: '',
        configValues: '',
        clusterMetadata: '',
        clusterValues: '',
      },
    ],
  },
  statusCode: 200,
};

const getClusterCreationResponse = {
  metadata: {
    name: 'ericabrtest4',
    namespace: 'iks',
    selfLink: '/apis/cluster.k8s.io/v1alpha1/namespaces/iks/clusters/ericabrtest4',
    uid: '3b0c9b68-c3c7-11e9-b18a-00163e01f736',
    resourceVersion: '4330986',
    generation: 1,
    creationTimestamp: '2019-08-21T03:53:26Z',
    labels: {
      'cluster-provider': 'iks',
      'ibm.com/cloud-connection': 'iks-account-privatecloud-2',
      'ibm.com/cloud-connection-ns': 'iks',
    },
  },
  'spec':{  
    'clusterNetwork' :{
      'services':{  
        'cidrBlocks':[  
          '172.32.0.0/16',
        ],
      },
      'pods':{  
        'cidrBlocks':[  
          '192.168.0.0/16',
        ],
      },
      'serviceDomain':'cluster.local',
    },
    'providerSpec':{  
      'value':{  
        'apiVersion':'iks/v1alpha1',
        'kind':'IKSClusterProviderSpec',
        'spec':{  
          'machineType':'u3c.2x4',
          'privateVlan':2646659,
          'publicVlan':2646657,
          'region':null,
          'secretName':'iks-account-privatecloud-2-apikey',
          'workers':1,
          'zone':'dal10',
        },
      },
    },
  },
  'status':{  

  },
  'statusCode':201,
  'statusMessage':'Created',
};

const getClusterCreationResponseWithError = {
  metadata: {
    name: 'ericabrtest5',
    namespace: 'iks',
    selfLink: '/apis/cluster.k8s.io/v1alpha1/namespaces/iks/clusters/ericabrtest5',
    uid: '3b0c9b68-c3c7-11e9-b18a-00163e01f736',
    resourceVersion: '4330986',
    generation: 1,
    creationTimestamp: '2019-08-21T03:53:26Z',
    labels: {
      'cluster-provider': 'iks',
      'ibm.com/cloud-connection': 'iks-account-privatecloud-2',
      'ibm.com/cloud-connection-ns': 'iks',
    },
  },
  'spec':{  
    'clusterNetwork' :{
      'services':{  
        'cidrBlocks':[  
          '172.32.0.0/16',
        ],
      },
      'pods':{  
        'cidrBlocks':[  
          '192.168.0.0/16',
        ],
      },
      'serviceDomain':'cluster.local',
    },
    'providerSpec':{  
      'value':{  
        'apiVersion':'iks/v1alpha1',
        'kind':'IKSClusterProviderSpec',
        'spec':{  
          'machineType':'u3c.2x4',
          'privateVlan':2646659,
          'publicVlan':2646657,
          'region':null,
          'secretName':'iks-account-privatecloud-2-apikey',
          'workers':1,
          'zone':'dal10',
        },
      },
    },
  },
  'status':{  

  },
  'statusCode':400,
  'statusMessage':'Invalid body',
};

const getNamespaceCreationResponse = {
  body: {
    kind: 'Namespace',
  },
  statusCode: 201,
};

const getEndpointConfigsResponse = {
  body: {
    kind: 'EndpointConfig',
  },
  statusCode: 201,
};

const getClusterResponse = {
  body: {
    kind: 'Cluster',
  },
  statusCode: 201,
};

const getImportYamlSecret = {
  body: {
    kind: 'Secret',
  },
  statusCode: 200,
};

export {
  createClusterResourceResponse, automatedImportResponse, getAutomatedImportStatusResponse,
  getCloudConnectionsResponse, getCloudProvidersResponse, getClusterCreationResponse,
  getClusterCreationResponseWithError, getNamespaceCreationResponse, getEndpointConfigsResponse,
  getClusterResponse, getImportYamlSecret,
};

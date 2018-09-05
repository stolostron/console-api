/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockResourceView = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'namespaces-1394570287',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/namespaces-1394570287',
      uid: '120ade98-b123-11e8-bd43-b69970856045',
      resourceVersion: '15529',
      creationTimestamp: '2018-09-05T15:48:01Z',
      labels: {
        name: 'getnamespace',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'namespaces',
      },
    },
    status: {},
  },
};

export const mockResponse = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'namespaces-1394570287',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/namespaces-1394570287',
      uid: '120ade98-b123-11e8-bd43-b69970856045',
      resourceVersion: '15533',
      creationTimestamp: '2018-09-05T15:48:01Z',
      labels: {
        name: 'getnamespace',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'namespaces',
      },
    },
    status: {
      conditions: [
        {
          type: 'Completed',
          lastUpdateTime: '2018-09-05T15:48:02Z',
        },
      ],
      results: {
        mycluster: {
          apiVersion: 'v1',
          items: [
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-18T15:50:20Z',
                labels: {
                  icp: 'system',
                },
                name: 'cert-manager',
                resourceVersion: '274',
                selfLink: '/api/v1/namespaces/cert-manager',
                uid: '697842dd-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-18T15:50:10Z',
                name: 'default',
                resourceVersion: '4',
                selfLink: '/api/v1/namespaces/default',
                uid: '637f88cb-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-20T18:25:18Z',
                name: 'hcm',
                resourceVersion: '404655',
                selfLink: '/api/v1/namespaces/hcm',
                uid: '64218564-a4a6-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-23T12:35:51Z',
                name: 'hope-this-works',
                resourceVersion: '1093054',
                selfLink: '/api/v1/namespaces/hope-this-works',
                uid: '121d54b9-a6d1-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-18T15:50:21Z',
                labels: {
                  icp: 'system',
                },
                name: 'istio-system',
                resourceVersion: '279',
                selfLink: '/api/v1/namespaces/istio-system',
                uid: '69eff5d4-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-18T15:50:10Z',
                name: 'kube-public',
                resourceVersion: '11',
                selfLink: '/api/v1/namespaces/kube-public',
                uid: '6382a56b-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-18T15:50:10Z',
                labels: {
                  icp: 'system',
                },
                name: 'kube-system',
                resourceVersion: '243',
                selfLink: '/api/v1/namespaces/kube-system',
                uid: '63819938-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-27T19:15:07Z',
                name: 'mcm',
                resourceVersion: '2628761',
                selfLink: '/api/v1/namespaces/mcm',
                uid: '829d12e9-aa2d-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-22T21:31:42Z',
                name: 'mcm-hope-this-works',
                resourceVersion: '891066',
                selfLink: '/api/v1/namespaces/mcm-hope-this-works',
                uid: 'c357a6e7-a652-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-19T00:44:18Z',
                name: 'mcm-icp',
                resourceVersion: '73015',
                selfLink: '/api/v1/namespaces/mcm-icp',
                uid: '019d2092-a349-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-19T01:05:26Z',
                name: 'mcm-jpadilla',
                resourceVersion: '75869',
                selfLink: '/api/v1/namespaces/mcm-jpadilla',
                uid: 'f50e2191-a34b-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-23T12:44:10Z',
                name: 'mcm-mycluster',
                resourceVersion: '1096175',
                selfLink: '/api/v1/namespaces/mcm-mycluster',
                uid: '3b36c246-a6d2-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-20T16:56:54Z',
                name: 'mcm-tempcluster1',
                resourceVersion: '392722',
                selfLink: '/api/v1/namespaces/mcm-tempcluster1',
                uid: '0aa521a9-a49a-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-28T20:58:08Z',
                name: 'mycluster',
                resourceVersion: '3021224',
                selfLink: '/api/v1/namespaces/mycluster',
                uid: '10d76128-ab05-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                creationTimestamp: '2018-08-18T15:57:31Z',
                name: 'platform',
                resourceVersion: '1820',
                selfLink: '/api/v1/namespaces/platform',
                uid: '69d3c789-a2ff-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Namespace',
              metadata: {
                annotations: {
                  'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"v1","kind":"Namespace","metadata":{"annotations":{},"name":"services","namespace":""}}\n',
                },
                creationTimestamp: '2018-08-18T16:00:37Z',
                name: 'services',
                resourceVersion: '3172',
                selfLink: '/api/v1/namespaces/services',
                uid: 'd8daf334-a2ff-11e8-8a50-005056a0d11b',
              },
              spec: {
                finalizers: [
                  'kubernetes',
                ],
              },
              status: {
                phase: 'Active',
              },
            },
          ],
          kind: 'NamespaceList',
          metadata: {
            resourceVersion: '3941780',
            selfLink: '/api/v1/namespaces',
          },
        },
      },
    },
  },
};

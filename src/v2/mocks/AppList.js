/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockAppsResponse = {
  body: {
    kind: 'ApplicationList',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      selfLink: '/apis/mcm.ibm.com/v1alpha1/applications',
      resourceVersion: '54525',
    },
    items: [
      {
        metadata: {
          name: 'app01',
          namespace: 'default',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/applications/app01',
          uid: '9167fa5d-b05c-11e8-bd43-b69970856045',
          resourceVersion: '1385',
          creationTimestamp: '2018-09-04T16:07:05Z',
          labels: {
            deployable: 'deployable01',
            hcmapp: 'app01',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
            'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
          },
        },
        spec: {
          componentKinds: [
            {
              group: 'mcm.ibm.com/v1alpha1',
              kind: 'PlacementPolicy',
            },
            {
              group: 'mcm.ibm.com/v1alpha1',
              kind: 'Deployable',
            },
          ],
          descriptor: {},
          selector: {
            matchLabels: {
              hcmapp: 'app01',
            },
          },
        },
        status: {
          Deployable: {
            metadata: {
              creationTimestamp: null,
            },
            spec: {
              deployer: {
                helm: {},
              },
            },
            status: {},
          },
        },
      },
      {
        metadata: {
          name: 'app02',
          namespace: 'default',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/applications/app02',
          uid: '9992d3aa-b05c-11e8-bd43-b69970856045',
          resourceVersion: '1389',
          creationTimestamp: '2018-09-04T16:07:19Z',
          labels: {
            name: 'app02',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
            'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
          },
        },
        spec: {
          componentKinds: [
            {
              group: 'mcm.ibm.com/v1alpha1',
              kind: 'PlacementPolicy',
            },
            {
              group: 'mcm.ibm.com/v1alpha1',
              kind: 'Deployable',
            },
          ],
          descriptor: {},
          selector: {
            matchLabels: {
              hcmapp: 'app02',
            },
          },
        },
        status: {
          Deployable: {
            metadata: {
              creationTimestamp: null,
            },
            spec: {
              deployer: {
                helm: {},
              },
            },
            status: {},
          },
        },
      },
    ],
  },
};

export const mockSingleAppResponse = {
  body: {
    kind: 'Application',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'app02',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/applications/app02',
      uid: '9992d3aa-b05c-11e8-bd43-b69970856045',
      resourceVersion: '1389',
      creationTimestamp: '2018-09-04T16:07:19Z',
      labels: {
        name: 'app02',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      componentKinds: [
        {
          group: 'mcm.ibm.com/v1alpha1',
          kind: 'PlacementPolicy',
        },
        {
          group: 'mcm.ibm.com/v1alpha1',
          kind: 'Deployable',
        },
      ],
      descriptor: {},
      selector: {
        matchLabels: {
          hcmapp: 'app02',
        },
      },
    },
    status: {
      Deployable: {
        metadata: {
          creationTimestamp: null,
        },
        spec: {
          deployer: {
            helm: {},
          },
        },
        status: {},
      },
    },
  },
};

export const mockDeployablesResponse = {
  body: {
    kind: 'DeployableList',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      selfLink: '/apis/mcm.ibm.com/v1alpha1/deployables',
      resourceVersion: '54593',
    },
    items: [
      {
        metadata: {
          name: 'deployable01',
          namespace: 'default',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/deployables/deployable01',
          uid: '9142e8d6-b05c-11e8-bd43-b69970856045',
          resourceVersion: '1383',
          creationTimestamp: '2018-09-04T16:07:05Z',
          labels: {
            hcmapp: 'app01',
            placementpolicy: 'placement01',
            servicekind: 'ApplicationService',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
            'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
          },
        },
        spec: {
          deployer: {
            kind: 'helm',
            helm: {
              chartName: 'nginx-lego',
              repository: 'google',
              version: '0.3.1',
              namespace: 'default',
            },
          },
        },
        status: {},
      },
      {
        metadata: {
          name: 'deployable02-a',
          namespace: 'default',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/deployables/deployable02-a',
          uid: '9992de86-b05c-11e8-bd43-b69970856045',
          resourceVersion: '1388',
          creationTimestamp: '2018-09-04T16:07:19Z',
          labels: {
            hcmapp: 'app02',
            servicekind: 'ApplicationService',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
            'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
          },
        },
        spec: {
          deployer: {
            kind: 'helm',
            helm: {
              chartName: 'nginx-lego',
              repository: 'google',
              version: '0.3.1',
              namespace: 'default',
            },
          },
        },
        status: {},
      },
      {
        metadata: {
          name: 'deployable02-b',
          namespace: 'default',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/deployables/deployable02-b',
          uid: '9992c569-b05c-11e8-bd43-b69970856045',
          resourceVersion: '1387',
          creationTimestamp: '2018-09-04T16:07:19Z',
          labels: {
            hcmapp: 'app02',
            servicekind: 'ApplicationService',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
            'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
          },
        },
        spec: {
          deployer: {
            kind: 'helm',
            helm: {
              chartName: 'nginx-lego',
              repository: 'google',
              version: '0.3.1',
              namespace: 'default',
            },
          },
        },
        status: {},
      },
    ],
  },
};

export const mockPlacementPoliciesResponse = {
  body: {
    kind: 'PlacementPolicyList',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      selfLink: '/apis/mcm.ibm.com/v1alpha1/placementpolicies',
      resourceVersion: '55453',
    },
    items: [
      {
        metadata: {
          name: 'placement01',
          namespace: 'default',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/placementpolicies/placement01',
          uid: '9142f75c-b05c-11e8-bd43-b69970856045',
          resourceVersion: '1384',
          creationTimestamp: '2018-09-04T16:07:05Z',
          labels: {
            hcmapp: 'app01',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
            'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
          },
        },
        spec: {
          replicas: 1,
          clusterSelector: {
            matchLabels: {
              name: 'mycluster.icp',
            },
          },
          resourceSelector: {},
        },
        status: {},
      },
      {
        metadata: {
          name: 'placement02',
          namespace: 'default',
          selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/placementpolicies/placement02',
          uid: '99933832-b05c-11e8-bd43-b69970856045',
          resourceVersion: '1390',
          creationTimestamp: '2018-09-04T16:07:19Z',
          labels: {
            hcmapp: 'app02',
          },
          annotations: {
            'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
            'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
          },
        },
        spec: {
          replicas: 1,
          clusterSelector: {
            matchLabels: {
              name: 'mycluster.icp',
            },
          },
          resourceSelector: {},
        },
        status: {},
      },
    ],
  },
};

export const mockCreateAppResponse = {
  body: {
    kind: 'Application',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'testapp',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/applications/testapp',
      uid: 'f849165a-b2a8-11e8-bd43-b69970856045',
      resourceVersion: '59905',
      creationTimestamp: '2018-09-07T14:19:02Z',
      labels: {
        deployable: 'deployable01',
        hcmapp: 'testapp',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      componentKinds: [
        {
          group: 'mcm.ibm.com/v1alpha1',
          kind: 'PlacementPolicy',
        },
        {
          group: 'mcm.ibm.com/v1alpha1',
          kind: 'Deployable',
        },
      ],
      descriptor: {},
      selector: {
        matchLabels: {
          hcmapp: 'testapp',
        },
      },
    },
    status: {
      Deployable: {
        metadata: {
          creationTimestamp: null,
        },
        spec: {
          deployer: {
            helm: {},
          },
        },
        status: {},
      },
    },
  },
};

export const mockDeleteAppResponse = {
  body: {
    kind: 'Application',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'testapp',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/applications/testapp',
      uid: '07094028-b2a7-11e8-bd43-b69970856045',
      resourceVersion: '59872',
      creationTimestamp: '2018-09-07T14:05:08Z',
      labels: {
        deployable: 'deployable01',
        hcmapp: 'testapp',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      componentKinds: [
        {
          group: 'mcm.ibm.com/v1alpha1',
          kind: 'PlacementPolicy',
        },
        {
          group: 'mcm.ibm.com/v1alpha1',
          kind: 'Deployable',
        },
      ],
      descriptor: {},
      selector: {
        matchLabels: {
          hcmapp: 'testapp',
        },
      },
    },
    status: {
      Deployable: {
        metadata: {
          creationTimestamp: null,
        },
        spec: {
          deployer: {
            helm: {},
          },
        },
        status: {},
      },
    },
  },
};

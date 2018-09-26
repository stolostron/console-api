/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockPVsResourceView = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'persistentvolumes',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/persistentvolumes',
      uid: '38e639a2-c199-11e8-bd43-b69970856045',
      resourceVersion: '408774',
      creationTimestamp: '2018-09-26T14:34:06Z',
      labels: {
        name: 'persistentvolumes',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'persistentvolumes',
      },
    },
    status: {},
  },
};

export const mockPVsClaimResourceView = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'persistentvolumeclaims',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/persistentvolumeclaims',
      uid: '6aef30b2-c19a-11e8-bd43-b69970856045',
      resourceVersion: '410052',
      creationTimestamp: '2018-09-26T14:42:39Z',
      labels: {
        name: 'persistentvolumeclaims',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'persistentvolumeclaims',
      },
    },
    status: {},
  },
};

export const mockPVsResponse = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'persistentvolumes',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/persistentvolumes',
      uid: '8c65042d-c199-11e8-bd43-b69970856045',
      resourceVersion: '409738',
      creationTimestamp: '2018-09-26T14:36:26Z',
      labels: {
        name: 'persistentvolumes',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'persistentvolumes',
      },
    },
    status: {
      conditions: [
        {
          type: 'Completed',
          lastUpdateTime: '2018-09-26T14:36:26Z',
        },
      ],
      results: {
        mycluster: {
          apiVersion: 'v1',
          items: [
            {
              apiVersion: 'v1',
              kind: 'PersistentVolume',
              metadata: {
                annotations: {
                  'pv.beta.kubernetes.io/gid': '1000',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T15:59:55Z',
                finalizers: [
                  'kubernetes.io/pv-protection',
                ],
                labels: {
                  type: 'helm-repo',
                },
                name: 'helm-repo-pv',
                resourceVersion: '2440',
                selfLink: '/api/v1/persistentvolumes/helm-repo-pv',
                uid: 'bfadcfdd-a2ff-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '5Gi',
                },
                claimRef: {
                  apiVersion: 'v1',
                  kind: 'PersistentVolumeClaim',
                  name: 'helm-repo-pvc',
                  namespace: 'kube-system',
                  resourceVersion: '2434',
                  uid: 'bfae55ce-a2ff-11e8-8a50-005056a0d11b',
                },
                hostPath: {
                  path: '/var/lib/icp/helmrepo',
                  type: '',
                },
                persistentVolumeReclaimPolicy: 'Delete',
                storageClassName: 'helm-repo-storage',
              },
              status: {
                phase: 'Bound',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolume',
              metadata: {
                annotations: {
                  'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"v1","kind":"PersistentVolume","metadata":{"annotations":{},"name":"image-manager-9.42.23.230","namespace":""},"spec":{"accessModes":["ReadWriteOnce"],"capacity":{"storage":"20Gi"},"local":{"path":"/var/lib/registry"},"nodeAffinity":{"required":{"nodeSelectorTerms":[{"matchExpressions":[{"key":"kubernetes.io/hostname","operator":"In","values":["9.42.23.230"]}]}]}},"persistentVolumeReclaimPolicy":"Retain","storageClassName":"image-manager-storage"}}\n',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T15:50:32Z',
                finalizers: [
                  'kubernetes.io/pv-protection',
                ],
                name: 'image-manager-9.42.23.230',
                resourceVersion: '369',
                selfLink: '/api/v1/persistentvolumes/image-manager-9.42.23.230',
                uid: '707a32d8-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '20Gi',
                },
                claimRef: {
                  apiVersion: 'v1',
                  kind: 'PersistentVolumeClaim',
                  name: 'image-manager-image-manager-0',
                  namespace: 'kube-system',
                  resourceVersion: '361',
                  uid: '7c7a901f-a2fe-11e8-8a50-005056a0d11b',
                },
                local: {
                  path: '/var/lib/registry',
                },
                nodeAffinity: {
                  required: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'kubernetes.io/hostname',
                            operator: 'In',
                            values: [
                              '9.42.23.230',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                persistentVolumeReclaimPolicy: 'Retain',
                storageClassName: 'image-manager-storage',
              },
              status: {
                phase: 'Bound',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolume',
              metadata: {
                annotations: {
                  'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"v1","kind":"PersistentVolume","metadata":{"annotations":{},"name":"logging-datanode-9.42.23.230","namespace":""},"spec":{"accessModes":["ReadWriteOnce"],"capacity":{"storage":"20Gi"},"local":{"path":"/var/lib/icp/logging/elk-data"},"nodeAffinity":{"required":{"nodeSelectorTerms":[{"matchExpressions":[{"key":"kubernetes.io/hostname","operator":"In","values":["9.42.23.230"]}]}]}},"persistentVolumeReclaimPolicy":"Retain","storageClassName":"logging-storage-datanode"}}\n',
                },
                creationTimestamp: '2018-08-18T15:50:43Z',
                finalizers: [
                  'kubernetes.io/pv-protection',
                ],
                name: 'logging-datanode-9.42.23.230',
                resourceVersion: '333',
                selfLink: '/api/v1/persistentvolumes/logging-datanode-9.42.23.230',
                uid: '770cc19f-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '20Gi',
                },
                local: {
                  path: '/var/lib/icp/logging/elk-data',
                },
                nodeAffinity: {
                  required: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'kubernetes.io/hostname',
                            operator: 'In',
                            values: [
                              '9.42.23.230',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                persistentVolumeReclaimPolicy: 'Retain',
                storageClassName: 'logging-storage-datanode',
              },
              status: {
                phase: 'Available',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolume',
              metadata: {
                annotations: {
                  'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"v1","kind":"PersistentVolume","metadata":{"annotations":{},"name":"mariadb-9.42.23.230","namespace":""},"spec":{"accessModes":["ReadWriteOnce"],"capacity":{"storage":"10Gi"},"local":{"path":"/var/lib/mysql"},"nodeAffinity":{"required":{"nodeSelectorTerms":[{"matchExpressions":[{"key":"kubernetes.io/hostname","operator":"In","values":["9.42.23.230"]}]}]}},"persistentVolumeReclaimPolicy":"Retain","storageClassName":"mariadb-storage"}}\n',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T15:50:40Z',
                finalizers: [
                  'kubernetes.io/pv-protection',
                ],
                name: 'mariadb-9.42.23.230',
                resourceVersion: '1123',
                selfLink: '/api/v1/persistentvolumes/mariadb-9.42.23.230',
                uid: '751dd0e2-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '10Gi',
                },
                claimRef: {
                  apiVersion: 'v1',
                  kind: 'PersistentVolumeClaim',
                  name: 'mysqldata-mariadb-0',
                  namespace: 'kube-system',
                  resourceVersion: '1114',
                  uid: '118fb780-a2ff-11e8-8a50-005056a0d11b',
                },
                local: {
                  path: '/var/lib/mysql',
                },
                nodeAffinity: {
                  required: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'kubernetes.io/hostname',
                            operator: 'In',
                            values: [
                              '9.42.23.230',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                persistentVolumeReclaimPolicy: 'Retain',
                storageClassName: 'mariadb-storage',
              },
              status: {
                phase: 'Bound',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolume',
              metadata: {
                annotations: {
                  'pv.beta.kubernetes.io/gid': '1000',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T16:00:13Z',
                finalizers: [
                  'kubernetes.io/pv-protection',
                ],
                labels: {
                  type: 'mgmt-repo',
                },
                name: 'mgmt-repo-pv',
                resourceVersion: '2805',
                selfLink: '/api/v1/persistentvolumes/mgmt-repo-pv',
                uid: 'ca6ccaca-a2ff-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '5Gi',
                },
                claimRef: {
                  apiVersion: 'v1',
                  kind: 'PersistentVolumeClaim',
                  name: 'mgmt-repo-pvc',
                  namespace: 'kube-system',
                  resourceVersion: '2680',
                  uid: 'ca6df3b3-a2ff-11e8-8a50-005056a0d11b',
                },
                hostPath: {
                  path: '/var/lib/icp/mgmtrepo',
                  type: '',
                },
                persistentVolumeReclaimPolicy: 'Delete',
                storageClassName: 'mgmt-repo-storage',
              },
              status: {
                phase: 'Bound',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolume',
              metadata: {
                annotations: {
                  'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"v1","kind":"PersistentVolume","metadata":{"annotations":{},"name":"mongodb-9.42.23.230","namespace":""},"spec":{"accessModes":["ReadWriteOnce"],"capacity":{"storage":"20Gi"},"local":{"path":"/var/lib/icp/mongodb"},"nodeAffinity":{"required":{"nodeSelectorTerms":[{"matchExpressions":[{"key":"kubernetes.io/hostname","operator":"In","values":["9.42.23.230"]}]}]}},"persistentVolumeReclaimPolicy":"Retain","storageClassName":"mongodb-storage"}}\n',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T15:50:37Z',
                finalizers: [
                  'kubernetes.io/pv-protection',
                ],
                name: 'mongodb-9.42.23.230',
                resourceVersion: '1021',
                selfLink: '/api/v1/persistentvolumes/mongodb-9.42.23.230',
                uid: '735320d9-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '20Gi',
                },
                claimRef: {
                  apiVersion: 'v1',
                  kind: 'PersistentVolumeClaim',
                  name: 'mongodbdir-icp-mongodb-0',
                  namespace: 'kube-system',
                  resourceVersion: '1010',
                  uid: '089e8e77-a2ff-11e8-8a50-005056a0d11b',
                },
                local: {
                  path: '/var/lib/icp/mongodb',
                },
                nodeAffinity: {
                  required: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'kubernetes.io/hostname',
                            operator: 'In',
                            values: [
                              '9.42.23.230',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
                persistentVolumeReclaimPolicy: 'Retain',
                storageClassName: 'mongodb-storage',
              },
              status: {
                phase: 'Bound',
              },
            },
          ],
          kind: 'PersistentVolumeList',
          metadata: {
            resourceVersion: '12835491',
            selfLink: '/api/v1/persistentvolumes',
          },
        },
      },
    },
  },
};

export const mockPVsClaimResponse = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'persistentvolumeclaims',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/persistentvolumeclaims',
      uid: '9d5f005e-c19a-11e8-bd43-b69970856045',
      resourceVersion: '410180',
      creationTimestamp: '2018-09-26T14:44:04Z',
      labels: {
        name: 'persistentvolumeclaims',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'persistentvolumeclaims',
      },
    },
    status: {
      conditions: [
        {
          type: 'Completed',
          lastUpdateTime: '2018-09-26T14:44:04Z',
        },
      ],
      results: {
        mycluster: {
          apiVersion: 'v1',
          items: [
            {
              apiVersion: 'v1',
              kind: 'PersistentVolumeClaim',
              metadata: {
                annotations: {
                  'pv.kubernetes.io/bind-completed': 'yes',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T15:59:55Z',
                finalizers: [
                  'kubernetes.io/pvc-protection',
                ],
                name: 'helm-repo-pvc',
                namespace: 'kube-system',
                resourceVersion: '2446',
                selfLink: '/api/v1/namespaces/kube-system/persistentvolumeclaims/helm-repo-pvc',
                uid: 'bfae55ce-a2ff-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                resources: {
                  requests: {
                    storage: '5Gi',
                  },
                },
                selector: {
                  matchLabels: {
                    type: 'helm-repo',
                  },
                },
                storageClassName: 'helm-repo-storage',
                volumeName: 'helm-repo-pv',
              },
              status: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '5Gi',
                },
                phase: 'Bound',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolumeClaim',
              metadata: {
                annotations: {
                  'pv.kubernetes.io/bind-completed': 'yes',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T15:50:52Z',
                finalizers: [
                  'kubernetes.io/pvc-protection',
                ],
                labels: {
                  app: 'image-manager',
                },
                name: 'image-manager-image-manager-0',
                namespace: 'kube-system',
                resourceVersion: '373',
                selfLink: '/api/v1/namespaces/kube-system/persistentvolumeclaims/image-manager-image-manager-0',
                uid: '7c7a901f-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                resources: {
                  requests: {
                    storage: '20Gi',
                  },
                },
                storageClassName: 'image-manager-storage',
                volumeName: 'image-manager-9.42.23.230',
              },
              status: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '20Gi',
                },
                phase: 'Bound',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolumeClaim',
              metadata: {
                annotations: {
                  'pv.kubernetes.io/bind-completed': 'yes',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T16:00:13Z',
                finalizers: [
                  'kubernetes.io/pvc-protection',
                ],
                name: 'mgmt-repo-pvc',
                namespace: 'kube-system',
                resourceVersion: '2808',
                selfLink: '/api/v1/namespaces/kube-system/persistentvolumeclaims/mgmt-repo-pvc',
                uid: 'ca6df3b3-a2ff-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                resources: {
                  requests: {
                    storage: '5Gi',
                  },
                },
                selector: {
                  matchLabels: {
                    type: 'mgmt-repo',
                  },
                },
                storageClassName: 'mgmt-repo-storage',
                volumeName: 'mgmt-repo-pv',
              },
              status: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '5Gi',
                },
                phase: 'Bound',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolumeClaim',
              metadata: {
                annotations: {
                  'pv.kubernetes.io/bind-completed': 'yes',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T15:54:47Z',
                finalizers: [
                  'kubernetes.io/pvc-protection',
                ],
                labels: {
                  app: 'icp-mongodb',
                  release: 'mongodb',
                },
                name: 'mongodbdir-icp-mongodb-0',
                namespace: 'kube-system',
                resourceVersion: '1024',
                selfLink: '/api/v1/namespaces/kube-system/persistentvolumeclaims/mongodbdir-icp-mongodb-0',
                uid: '089e8e77-a2ff-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                resources: {
                  requests: {
                    storage: '20Gi',
                  },
                },
                storageClassName: 'mongodb-storage',
                volumeName: 'mongodb-9.42.23.230',
              },
              status: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '20Gi',
                },
                phase: 'Bound',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'PersistentVolumeClaim',
              metadata: {
                annotations: {
                  'pv.kubernetes.io/bind-completed': 'yes',
                  'pv.kubernetes.io/bound-by-controller': 'yes',
                },
                creationTimestamp: '2018-08-18T15:55:02Z',
                finalizers: [
                  'kubernetes.io/pvc-protection',
                ],
                labels: {
                  'k8s-app': 'mariadb',
                  release: 'mariadb',
                },
                name: 'mysqldata-mariadb-0',
                namespace: 'kube-system',
                resourceVersion: '1127',
                selfLink: '/api/v1/namespaces/kube-system/persistentvolumeclaims/mysqldata-mariadb-0',
                uid: '118fb780-a2ff-11e8-8a50-005056a0d11b',
              },
              spec: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                resources: {
                  requests: {
                    storage: '10Gi',
                  },
                },
                storageClassName: 'mariadb-storage',
                volumeName: 'mariadb-9.42.23.230',
              },
              status: {
                accessModes: [
                  'ReadWriteOnce',
                ],
                capacity: {
                  storage: '10Gi',
                },
                phase: 'Bound',
              },
            },
          ],
          kind: 'PersistentVolumeClaimList',
          metadata: {
            resourceVersion: '12837725',
            selfLink: '/api/v1/persistentvolumeclaims',
          },
        },
      },
    },
  },
};

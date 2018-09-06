/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockPolicyListResponse = {
  body: {
    apiVersion: 'policy.mcm.ibm.com/v1alpha1',
    items: [
      {
        apiVersion: 'policy.mcm.ibm.com/v1alpha1',
        kind: 'Policy',
        metadata: {
          creationTimestamp: '2018-09-04T16:13:50Z',
          finalizers: [
            'finalizer.mcm.ibm.com',
          ],
          generation: 1,
          labels: {
            compliance: 'compliance-xz',
          },
          name: 'policy-xz-1',
          namespace: 'mycluster',
          ownerReferences: [
            {
              apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
              blockOwnerDeletion: true,
              controller: true,
              kind: 'Compliance',
              name: 'compliance-xz',
              uid: '82de70e7-b05d-11e8-9a12-005056a0d11b',
            },
          ],
          resourceVersion: '3997153',
          selfLink: '/apis/policy.mcm.ibm.com/v1alpha1/namespaces/mycluster/policies/policy-xz-1',
          uid: '82e00acc-b05d-11e8-9a12-005056a0d11b',
        },
        spec: {
          complianceType: '',
          namespaces: {
            exclude: [
              'kube*',
            ],
            include: [
              'default',
            ],
          },
          remediationAction: 'inform',
          'role-templates': [
            {
              apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
              complianceType: 'musthave',
              kind: 'RoleTemplate',
              metadata: {
                creationTimestamp: null,
                name: 'role-xz-1',
              },
              rules: [
                {
                  complianceType: 'musthave',
                  policyRule: {
                    apiGroups: [
                      'extensions',
                      'apps',
                    ],
                    resources: [
                      'deployments',
                    ],
                    verbs: [
                      'get',
                      'list',
                      'watch',
                      'create',
                      'delete',
                      'patch',
                    ],
                  },
                },
              ],
              selector: {
                matchLabels: {
                  cloud: 'IBM',
                },
              },
              status: {
                Validity: {},
              },
            },
          ],
        },
        status: {
          Compliant: 'NonCompliant',
          Valid: true,
        },
      },
      {
        apiVersion: 'policy.mcm.ibm.com/v1alpha1',
        kind: 'Policy',
        metadata: {
          creationTimestamp: '2018-09-04T16:13:50Z',
          finalizers: [
            'finalizer.mcm.ibm.com',
          ],
          generation: 1,
          labels: {
            compliance: 'compliance-xz',
          },
          name: 'policy-xz-2',
          namespace: 'mycluster',
          ownerReferences: [
            {
              apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
              blockOwnerDeletion: true,
              controller: true,
              kind: 'Compliance',
              name: 'compliance-xz',
              uid: '82de70e7-b05d-11e8-9a12-005056a0d11b',
            },
          ],
          resourceVersion: '3997159',
          selfLink: '/apis/policy.mcm.ibm.com/v1alpha1/namespaces/mycluster/policies/policy-xz-2',
          uid: '82e0cf8d-b05d-11e8-9a12-005056a0d11b',
        },
        spec: {
          complianceType: '',
          namespaces: {
            exclude: [
              'kube*',
            ],
            include: [
              'default',
            ],
          },
          remediationAction: 'enforce',
          'role-templates': [
            {
              apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
              complianceType: 'musthave',
              kind: 'RoleTemplate',
              metadata: {
                creationTimestamp: null,
                name: 'role-xz-2',
              },
              rules: [
                {
                  complianceType: 'musthave',
                  policyRule: {
                    apiGroups: [
                      'extensions',
                      'apps',
                    ],
                    resources: [
                      'deployments',
                    ],
                    verbs: [
                      'get',
                      'list',
                      'watch',
                      'delete',
                    ],
                  },
                },
                {
                  complianceType: 'mustnothave',
                  policyRule: {
                    apiGroups: [
                      'core',
                    ],
                    resources: [
                      'pods',
                    ],
                    verbs: [
                      'create',
                      'update',
                      'patch',
                    ],
                  },
                },
                {
                  complianceType: 'musthave',
                  policyRule: {
                    apiGroups: [
                      'core',
                    ],
                    resources: [
                      'secrets',
                    ],
                    verbs: [
                      'get',
                      'watch',
                      'list',
                      'create',
                      'delete',
                      'update',
                      'patch',
                    ],
                  },
                },
              ],
              selector: {
                matchLabels: {
                  cloud: 'IBM',
                },
              },
              status: {
                Validity: {
                  valid: true,
                },
              },
            },
          ],
        },
        status: {
          Compliant: 'Compliant',
          Valid: true,
        },
      },
    ],
    kind: 'PolicyList',
    metadata: {
      continue: '',
      resourceVersion: '3997159',
      selfLink: '/apis/policy.mcm.ibm.com/v1alpha1/policies',
    },
  },
};

export const mockSinglePolicyResponse = {
  body: {
    apiVersion: 'policy.mcm.ibm.com/v1alpha1',
    kind: 'Policy',
    metadata: {
      creationTimestamp: '2018-09-04T16:13:50Z',
      finalizers: [
        'finalizer.mcm.ibm.com',
      ],
      generation: 1,
      labels: {
        compliance: 'compliance-xz',
      },
      name: 'policy-xz-1',
      namespace: 'mycluster',
      ownerReferences: [
        {
          apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
          blockOwnerDeletion: true,
          controller: true,
          kind: 'Compliance',
          name: 'compliance-xz',
          uid: '82de70e7-b05d-11e8-9a12-005056a0d11b',
        },
      ],
      resourceVersion: '4349995',
      selfLink: '/apis/policy.mcm.ibm.com/v1alpha1/namespaces/mycluster/policies/policy-xz-1',
      uid: '82e00acc-b05d-11e8-9a12-005056a0d11b',
    },
    spec: {
      complianceType: '',
      namespaces: {
        exclude: [
          'kube*',
        ],
        include: [
          'default',
        ],
      },
      remediationAction: 'inform',
      'role-templates': [
        {
          apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
          complianceType: 'musthave',
          kind: 'RoleTemplate',
          metadata: {
            creationTimestamp: null,
            name: 'role-xz-1',
          },
          rules: [
            {
              complianceType: 'musthave',
              policyRule: {
                apiGroups: [
                  'extensions',
                  'apps',
                ],
                resources: [
                  'deployments',
                ],
                verbs: [
                  'get',
                  'list',
                  'watch',
                  'create',
                  'delete',
                  'patch',
                ],
              },
            },
          ],
          selector: {
            matchLabels: {
              cloud: 'IBM',
            },
          },
          status: {
            Compliant: 'NonCompliant',
            Validity: {
              valid: true,
            },
            conditions: [
              {
                lastTransitionTime: '2018-09-06T15:14:44Z',
                message: 'k8s RBAC role is missing: role-xz-1',
                reason: 'K8s RBAC role is missing',
                status: 'True',
                type: 'completed',
              },
            ],
          },
        },
      ],
    },
    status: {
      Compliant: 'NonCompliant',
      Valid: true,
    },
  },
};

export const mockCreatePolicy = {
  body: {
    apiVersion: 'policy.mcm.ibm.com/v1alpha1',
    kind: 'Policy',
    metadata: {
      creationTimestamp: '2018-09-06T17:12:34Z',
      generation: 1,
      name: 'test-policy',
      namespace: 'default',
      resourceVersion: '4385854',
      selfLink: '/apis/policy.mcm.ibm.com/v1alpha1/namespaces/default/policies/test-policy',
      uid: '0c388331-b1f8-11e8-9a12-005056a0d11b',
    },
    spec: {
      namespaces: {
        exclude: [
          'kube*',
        ],
        include: [
          'default',
        ],
      },
      remediationAction: 'enforce',
      'role-templates': [
        {
          apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
          complianceType: 'musthave',
          kind: 'RoleTemplate',
          metadata: {
            name: 'test-role',
            namespace: '',
          },
          rules: [
            {
              PolicyRule: {
                apiGroups: [
                  'extensions',
                  'apps',
                ],
                resources: [
                  'deployments',
                ],
                verbs: [
                  'get',
                  'list',
                  'watch',
                  'delete',
                ],
              },
              complianceType: 'musthave',
            },
            {
              PolicyRule: {
                apiGroups: [
                  'core',
                ],
                resources: [
                  'pods',
                ],
                verbs: [
                  'create',
                  'update',
                  'patch',
                ],
              },
              complianceType: 'mustnothave',
            },
            {
              PolicyRule: {
                apiGroups: [
                  'core',
                ],
                resources: [
                  'secrets',
                ],
                verbs: [
                  'get',
                  'watch',
                  'list',
                  'create',
                  'delete',
                  'update',
                  'patch',
                ],
              },
            },
          ],
          selector: {
            matchLabels: {
              cloud: 'IBM',
            },
          },
        },
      ],
    },
  },
};

export const mockDeleteResponse = {
  body: {
    apiVersion: 'policy.mcm.ibm.com/v1alpha1',
    kind: 'Policy',
    metadata: {
      creationTimestamp: '2018-09-06T15:06:23Z',
      deletionGracePeriodSeconds: 0,
      deletionTimestamp: '2018-09-06T15:09:33Z',
      finalizers: [
        'finalizer.mcm.ibm.com',
      ],
      generation: 2,
      name: 'test-policy',
      namespace: 'default',
      resourceVersion: '4348453',
      selfLink: '/apis/policy.mcm.ibm.com/v1alpha1/namespaces/default/policies/test-policy',
      uid: '6b4cc90c-b1e6-11e8-9a12-005056a0d11b',
    },
    spec: {
      complianceType: '',
      namespaces: {
        exclude: [
          'kube*',
        ],
        include: [
          'default',
        ],
      },
      remediationAction: 'enforce',
      'role-templates': [
        {
          apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
          complianceType: 'musthave',
          kind: 'RoleTemplate',
          metadata: {
            creationTimestamp: null,
            name: 'test-role',
          },
          rules: [
            {
              complianceType: 'musthave',
              policyRule: {
                apiGroups: [
                  'extensions',
                  'apps',
                ],
                resources: [
                  'deployments',
                ],
                verbs: [
                  'get',
                  'list',
                  'watch',
                  'delete',
                ],
              },
            },
            {
              complianceType: 'mustnothave',
              policyRule: {
                apiGroups: [
                  'core',
                ],
                resources: [
                  'pods',
                ],
                verbs: [
                  'create',
                  'update',
                  'patch',
                ],
              },
            },
            {
              complianceType: 'musthave',
              policyRule: {
                apiGroups: [
                  'core',
                ],
                resources: [
                  'secrets',
                ],
                verbs: [
                  'get',
                  'watch',
                  'list',
                  'create',
                  'delete',
                  'update',
                  'patch',
                ],
              },
            },
          ],
          selector: {
            matchLabels: {
              cloud: 'IBM',
            },
          },
          status: {
            Compliant: 'Compliant',
            Validity: {
              valid: true,
            },
            conditions: [
              {
                lastTransitionTime: '2018-09-06T15:06:24Z',
                message: 'k8s RBAC role "test-role" was missing ',
                reason: 'K8s RBAC role created',
                status: 'True',
                type: 'completed',
              },
            ],
          },
        },
      ],
    },
    status: {
      Compliant: 'Compliant',
      Valid: true,
    },
  },
};

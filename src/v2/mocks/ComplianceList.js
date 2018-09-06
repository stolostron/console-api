/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockComplianceListResponse = {
  body: {
    apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
    items: [
      {
        apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
        kind: 'Compliance',
        metadata: {
          creationTimestamp: '2018-09-04T16:13:50Z',
          finalizers: [
            'finalizer.mcm.ibm.com',
          ],
          generation: 1,
          name: 'compliance-xz',
          namespace: 'mcm',
          resourceVersion: '3657542',
          selfLink: '/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/mcm/compliances/compliance-xz',
          uid: '82dc7a02-b05d-11e8-9a12-005056a0d11b',
        },
        spec: {
          clusterSelector: {
            matchNames: [
              'mycluster',
            ],
          },
          'runtime-rules': [
            {
              apiVersion: 'policy.mcm.ibm.com/v1alpha1',
              kind: 'Policy',
              metadata: {
                creationTimestamp: null,
                name: 'policy-xz-1',
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
              status: {},
            },
            {
              apiVersion: 'policy.mcm.ibm.com/v1alpha1',
              kind: 'Policy',
              metadata: {
                creationTimestamp: null,
                name: 'policy-xz-2',
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
                        complianceType: '',
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
                      Validity: {},
                    },
                  },
                ],
              },
              status: {},
            },
          ],
        },
        status: {
          mycluster: {
            aggregatePoliciesStatus: {
              'policy-xz-1': {
                Compliant: 'NonCompliant',
                Valid: true,
              },
              'policy-xz-2': {
                Compliant: 'Compliant',
                Valid: true,
              },
            },
            clustername: 'mycluster',
            compliant: 'NonCompliant',
          },
        },
      },
    ],
    kind: 'ComplianceList',
    metadata: {
      continue: '',
      resourceVersion: '4401288',
      selfLink: '/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/mcm/compliances',
    },
  },
};

export const mockCreateCompliance = {
  body: {
    apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
    kind: 'Compliance',
    metadata: {
      creationTimestamp: '2018-09-06T18:19:43Z',
      generation: 1,
      name: 'test-compliance',
      namespace: 'mcm',
      resourceVersion: '4405693',
      selfLink: '/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/mcm/compliances/test-compliance',
      uid: '6d5dbb6e-b201-11e8-9a12-005056a0d11b',
    },
    spec: {
      clusterSelector: {
        matchNames: [
          'mycluster',
        ],
      },
      'runtime-rules': [
        {
          apiVersion: 'policy.mcm.ibm.com/v1alpha1',
          kind: 'Policy',
          metadata: {
            description: 'Instance descriptor for policy resource',
            name: 'test-policy-1',
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
            remediationAction: 'inform',
            'role-templates': [
              {
                apiVersion: 'roletemplate.mcm.ibm.com/v1alpha1',
                complianceType: 'musthave',
                kind: 'RoleTemplate',
                metadata: {
                  name: 'role-xz-1',
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
                        'create',
                        'delete',
                        'patch',
                      ],
                    },
                    complianceType: 'musthave',
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
        {
          apiVersion: 'policy.mcm.ibm.com/v1alpha1',
          kind: 'Policy',
          metadata: {
            description: 'Instance descriptor for policy resource',
            name: 'test-policy-2',
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
                  name: 'role-xz-2',
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
      ],
    },
  },
};

export const mockDeleteResponse = {
  body: {
    apiVersion: 'compliance.mcm.ibm.com/v1alpha1',
    kind: 'Compliance',
    metadata: {
      creationTimestamp: '2018-09-04T16:13:50Z',
      deletionGracePeriodSeconds: 0,
      deletionTimestamp: '2018-09-06T18:34:31Z',
      finalizers: [
        'finalizer.mcm.ibm.com',
      ],
      generation: 2,
      name: 'compliance-xz',
      namespace: 'mcm',
      resourceVersion: '4411502',
      selfLink: '/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/mcm/compliances/compliance-xz',
      uid: '82dc7a02-b05d-11e8-9a12-005056a0d11b',
    },
    spec: {
      clusterSelector: {
        matchNames: [
          'mycluster',
        ],
      },
      'runtime-rules': [
        {
          apiVersion: 'policy.mcm.ibm.com/v1alpha1',
          kind: 'Policy',
          metadata: {
            creationTimestamp: null,
            name: 'policy-xz-1',
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
          status: {},
        },
        {
          apiVersion: 'policy.mcm.ibm.com/v1alpha1',
          kind: 'Policy',
          metadata: {
            creationTimestamp: null,
            name: 'policy-xz-2',
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
                    complianceType: '',
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
                  Validity: {},
                },
              },
            ],
          },
          status: {},
        },
      ],
    },
    status: {
      mycluster: {
        aggregatePoliciesStatus: {
          'policy-xz-1': {
            Compliant: 'NonCompliant',
            Valid: true,
          },
          'policy-xz-2': {
            Compliant: 'Compliant',
            Valid: true,
          },
        },
        clustername: 'mycluster',
        compliant: 'NonCompliant',
      },
    },
  },
};

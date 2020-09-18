/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 * * Copyright (c) 2020 Red Hat, Inc.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import getApplicationElements, {
  createReplicaChild,
  createGenericPackageObject,
  addSubscriptionCharts,
  addSubscriptionDeployable,
  addClusters,
  processServiceOwner,
  processServices,
  processDeployables,
  getSubscriptionPackageInfo,
  removeReleaseGeneratedSuffix,
  removeHelmReleaseName,
  isPrePostHookDeployable,
  createDeployableObject
} from './applicationHelper';


describe('createDeployableObject', () => {
  const subscription = {
    apiVersion: 'apps.open-cluster-management.io/v1',
    kind: 'Subscription',
    metadata: {
      annotations: {
        'apps.open-cluster-management.io/deployables': 'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset,cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service',
      },
      labels: { app: 'cassandra-app-cassandra' },
      name: 'cassandra-app-subscription',
      namespace: 'cassandra-app-ns',
    },
    spec: {
      channel: 'cassandra-ch/cassandra-channel',
    },
    status: {
      ansiblejobs: {
        prehookjobshistory: ['cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset'],
        posthookjobshistory: ['cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service']
      },
      lastUpdateTime: '2020-09-18T18:20:03Z',
      phase: 'Propagated',
      statuses: { fxiang: {}, 'kcormier-cluster': [{}] }
    },
    deployablePaths: [
      'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service',
      'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset'
    ]
  };

  it('createDeployableObject', () => {
    const result = {"id": "member--deployable--parentId--ansiblejob--cassandra-app-subscription-cassandra-cassandra-service", "name": "cassandra-app-subscription-cassandra-cassandra-service", "namespace": "cassandra-app-ns", "specs": {"isDesign": false, "raw": {"kind": "AnsibleJob", "metadata": {"name": "cassandra-app-subscription-cassandra-cassandra-service", "namespace": "cassandra-app-ns"}, "spec": {}}}, "type": "ansiblejob", "uid": "member--deployable--parentId--ansiblejob--cassandra-app-subscription-cassandra-cassandra-service"};
    expect(createDeployableObject(subscription, 'cassandra-app-subscription-cassandra-cassandra-service', 'cassandra-app-ns', 'AnsibleJob', {}, 'parentId', [], [], 'hook')).toEqual(result);
  });


});

describe('isPrePostHookDeployable', () => {
  const subscription = {
    apiVersion: 'apps.open-cluster-management.io/v1',
    kind: 'Subscription',
    metadata: {
      annotations: {
        'apps.open-cluster-management.io/deployables': 'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset,cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service',
      },
      labels: { app: 'cassandra-app-cassandra' },
      name: 'cassandra-app-subscription',
      namespace: 'cassandra-app-ns',
    },
    spec: {
      channel: 'cassandra-ch/cassandra-channel',
    },
    status: {
      ansiblejobs: {
        prehookjobshistory: ['cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset'],
        posthookjobshistory: ['cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service']
      },
      lastUpdateTime: '2020-09-18T18:20:03Z',
      phase: 'Propagated',
      statuses: { fxiang: {}, 'kcormier-cluster': [{}] }
    },
    deployablePaths: [
      'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-service',
      'cassandra-app-ns/cassandra-app-subscription-cassandra-cassandra-statefulset'
    ]
  };

  it('post hook', () => {
    const result = 'post-hook';
    expect(isPrePostHookDeployable(subscription, 'cassandra-app-subscription-cassandra-cassandra-service', 'cassandra-app-ns')).toEqual(result);
  });

  it('pre hook', () => {
    const result = 'pre-hook';
    expect(isPrePostHookDeployable(subscription, 'cassandra-app-subscription-cassandra-cassandra-statefulset', 'cassandra-app-ns')).toEqual(result);
  });

  it('no match', () => {
    expect(isPrePostHookDeployable(subscription, 'cassandra-app-subscription-cassandra-cassandra-service1', 'cassandra-app-ns')).toEqual(null);
  }); 

});


describe('applicationHelper', () => {
  it('should match snapshot with subscription', () => {
    const application = {
      name: 'test',
      namespace: 'test',
      activeChannel: 'dev',
      channels: ['dev', 'prod'],
      subscription: {},
      deployables: [],
    };
    expect(getApplicationElements(application)).toMatchSnapshot();
  });

  it('should match snapshot without subscription', () => {
    const application = {
      name: 'test',
      namespace: 'test',
      activeChannel: 'dev',
      channels: ['dev', 'prod'],
      deployables: [],
    };
    expect(getApplicationElements(application)).toMatchSnapshot();
  });
});

describe('createReplicaChild', () => {
  it('createReplicaChild', () => {
    const parentObject = {
      id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',
      uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',
      name: 'redis-slave',
      namespace: 'open-cluster-management',
      type: 'deployment',
      specs:
      {
        isDesign: false,
        raw: {
          kind: 'Deployment',
          metadata: {
            name: 'redis-master',
            namespace: 'open-cluster-management',
          },
          spec: { replicas: 3 },
        },
      },
    };
    const template = {
      kind: 'Deployment',
      metadata: { name: 'redis-slave', namespace: 'open-cluster-management' },
      spec: {
        availableReplicas: 2,
        observedGeneration: 2,
        readyReplicas: 2,
        replicas: 2,
        updatedReplicas: 2,
      },
    };

    const result = {
      id: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--redis-slave',
      name: 'redis-slave',
      namespace: 'open-cluster-management',
      specs: {
        isDesign: false,
        parent: {
          parentId: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',
          parentName: 'redis-slave',
          parentType: 'deployment',
        },
        raw: {
          kind: 'replicaset',
          metadata: {
            name: 'redis-slave',
            namespace: 'open-cluster-management',
          },
          spec: {
            desired: 2,
            template: {},
          },
        },
      },
      type: 'replicaset',
      uid: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--redis-slave',
    };
    expect(createReplicaChild(parentObject, template, [], [])).toEqual(result);
  });
});

describe('createGenericPackageObject', () => {
  it('createGenericPackageObject', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'obj-sub-ns';
    const subscriptionName = 'obj-sub';

    const result = {
      id: 'member--package--Package-obj-sub', name: 'Package-obj-sub', namespace: 'obj-sub-ns', specs: { raw: { isDesign: false, kind: 'Package', metadata: { name: 'Package-obj-sub', namespace: 'obj-sub-ns' } } }, type: 'package', uid: 'member--package--Package-obj-sub',
    };

    expect(createGenericPackageObject(
      parentId, appNamespace,
      [], [], subscriptionName,
    )).toEqual(result);
  });
});

describe('addClusters', () => {
  it('should match clusters', () => {
    const parentId = 'member--subscription--default--mortgagedc-subscription';
    const createdClusterElements = new Set();
    const clusterNames = ['braveman'];
    const clusters = [{
      metadata:
      {
        name: 'braveman',
        namespace: 'braveman-ns',
        selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/braveman-ns/clusters/braveman',
        uid: '7230a560-6a40-4359-b0e9-8b4980327ea4',
        resourceVersion: '6675638',
        creationTimestamp: '2020-04-20T21:41:51Z',
        labels: {},
        annotations: {},
        finalizers: [],
      },
      status: 'ok',
      clusterip: 'api.brave-man.dev06.red-chesterfield.com',
      consoleURL: 'https://console-openshift-console.apps.brave-man.dev06.red-chesterfield.com',
      capacity: {
        cpu: '36', memory: '140809Mi',
      },
      allocatable: {
        cpu: '12682m', memory: '28464Mi',
      },
      rawCluster: { metadata: {}, spec: {}, status: {} },
      rawStatus: { metadata: {}, spec: {} },
      serverAddress: undefined,
    },
    ];

    const result = 'member--clusters--braveman';
    expect(addClusters(
      parentId, createdClusterElements, {},
      clusterNames, clusters, [], [],
    )).toEqual(result);
  });
});

describe('addSubscriptionDeployable', () => {
  it('addSubscriptionDeployable', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployable = {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        annotations:
          {
            'apps.open-cluster-management.io/channel': 'mortgagedc-channel',
            'apps.open-cluster-management.io/deployable-version': 'apps.openshift.io/v1',
            'apps.open-cluster-management.io/external-source': 'mortgagedc',
            'apps.open-cluster-management.io/is-local-deployable': 'false',
          },
        creationTimestamp: '2020-05-27T14:22:28Z',
        generation: 1,
        labels:
          {
            'apps.open-cluster-management.io/channel': 'mortgagedc-channel',
            'apps.open-cluster-management.io/channel-type': 'GitHub',
            'apps.open-cluster-management.io/subscription': 'default-mortgagedc-subscription',
          },
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig',
        namespace: 'default',
        ownerReferences: [{}],
        resourceVersion: '51745834',
        selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/deployables/mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'DeploymentConfig',
            metadata: {},
            spec: {},
          },
      },
    };

    const result = {
      id: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig--deploymentconfig--undefined',
      name: undefined,
      namespace: 'default',
      specs: {
        deployStatuses: [],
        isDesign: false,
        raw: {
          apiVersion: 'apps.openshift.io/v1', kind: 'DeploymentConfig', metadata: {}, spec: {},
        },
      },
      type: 'deploymentconfig',
      uid: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig--deploymentconfig--undefined',
    };

    expect(addSubscriptionDeployable(
      parentId, deployable, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('addSubscriptionDeployable with parent node', () => {
  it('should addSubscriptionDeployable with parent info', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployable = {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        annotations:
          {
            'apps.open-cluster-management.io/channel': 'mortgagedc-channel',
            'apps.open-cluster-management.io/deployable-version': 'apps.openshift.io/v1',
            'apps.open-cluster-management.io/external-source': 'mortgagedc',
            'apps.open-cluster-management.io/is-local-deployable': 'false',
          },
        creationTimestamp: '2020-05-27T14:22:28Z',
        generation: 1,
        labels:
          {
            'apps.open-cluster-management.io/channel': 'mortgagedc-channel',
            'apps.open-cluster-management.io/channel-type': 'GitHub',
            'apps.open-cluster-management.io/subscription': 'default-mortgagedc-subscription',
          },
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig',
        namespace: 'default',
        ownerReferences: [{}],
        resourceVersion: '51745834',
        selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/default/deployables/mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'DeploymentConfig',
            metadata: {},
            spec: {},
          },
      },
    };

    const nodes = [
      {
        id: parentId,
        name: 'braveman',
        type: 'cluster',
      },
    ];
    const result = {
      id: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig--deploymentconfig--undefined',
      name: undefined,
      namespace: 'default',
      specs: {
        deployStatuses: [],
        isDesign: false,
        parent: {
          parentId: 'member--clusters--braveman',
          parentName: 'braveman',
          parentType: 'cluster',
        },
        raw: {
          apiVersion: 'apps.openshift.io/v1', kind: 'DeploymentConfig', metadata: {}, spec: {},
        },
      },
      type: 'deploymentconfig',
      uid: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-deploymentconfig--deploymentconfig--undefined',
    };

    expect(addSubscriptionDeployable(
      parentId, deployable, [], nodes,
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('processServiceOwner for Route', () => {
  it('processServiceOwner for Route', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Route',
            metadata: {},
            spec: {
              to: {
                name: 'service1',
              },
            },
          },
      },
    },
    {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Route',
            metadata: {},
            spec: {
            },
          },
      },
    },
    ];

    const result = { service1: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route--route--undefined' };

    expect(processServiceOwner(
      parentId, deployables, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('processServiceOwner for StatefulSet', () => {
  it('processServiceOwner for StatefulSet', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'StatefulSet',
            spec: {
              serviceName: 'aaa',
            },
            metadata: {},
          },
      },
    },
    {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'StatefulSet',
            metadata: {},
            spec: {
            },
          },
      },
    },
    ];

    const result = {
      aaa: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-route--statefulset--undefined',
    };
    expect(processServiceOwner(
      parentId, deployables, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('processServiceOwner for Ingress', () => {
  it('processServiceOwner for Ingress', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Ingress',
            metadata: {},
            spec: {
              rules: [
                {
                  http: {
                    paths: [{
                      backend: {
                        serviceName: 'service1',
                      },
                    },
                    ],
                  },
                },
              ],
            },
          },
      },
    },
    {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Ingress',
            metadata: {},
            spec: {
              rules: [
                {
                  http: {
                    paths: [{
                      backend: {
                      },
                    },
                    ],
                  },
                },
              ],
            },
          },
      },
    },
    {
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Ingress',
            metadata: {},
            spec: {
              rules: [
              ],
            },
          },
      },
    },
    ];

    const result = { service1: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress--ingress--undefined' };
    expect(processServiceOwner(
      parentId, deployables, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(result);
  });
});

describe('processServices', () => {
  it('processServices', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-service1',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
        spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Service',
            metadata: {
              name: 'service1',
            },
          },
      },
      },
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-service2',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
        spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Service',
            metadata: {
              name: 'service2',
            },
          },
      },
      },
    ];
    const servicesMap = { service1: 'member--member--deployable--member--clusters--braveman--default--mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress--ingress--undefined' };

    expect(processServices(
      parentId, deployables, [], [],
      subscriptionStatusMap, names, appNamespace, servicesMap,null
    )).toEqual(undefined);
  });
});

describe('processDeployables', () => {
  it('processDeployables', () => {
    const parentId = 'member--clusters--braveman';
    const appNamespace = 'default';
    const subscriptionStatusMap = {
      braveman:
      {
        'mortgagedc-channel-Service-mortgagedc-svc':
         {
           lastUpdateTime: '2020-05-31T06:29:54Z',
           phase: 'Failed',
           reason: 'Service "mortgagedc-svc" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
           resourceStatus: {},
         },
      },
    };
    const names = ['braveman'];

    const deployables = [{
      apiVersion: 'apps.open-cluster-management.io/v1',
      kind: 'Deployable',
      metadata:
      {
        name: 'mortgagedc-subscription-mortgagedc-mortgagedc-deploy-ingress',
        namespace: 'default',
        uid: '4ba0370e-4013-41ff-975a-63f87f0ed7ff',
      },
      spec:
      {
        template:
          {
            apiVersion: 'apps.openshift.io/v1',
            kind: 'Ingress',
            metadata: {},
            spec: {
              rules: [
                {
                  http: {
                    paths: [{
                      backend: {
                        serviceName: 'service1',
                      },
                    },
                    ],
                  },
                },
              ],
            },
          },
      },
    }];

    expect(processDeployables(
      deployables, parentId, [], [],
      subscriptionStatusMap, names, appNamespace,
    )).toEqual(undefined);
  });
});

describe('addSubscriptionCharts', () => {
  it('addSubscriptionCharts', () => {
    const parentId = 'member--clusters--possiblereptile, braveman, sharingpenguin, relievedox';
    const appNamespace = 'open-cluster-management';
    const channelInfo = 'gb-app-latest-ns/guestbook-app-latest';
    const subscriptionName = 'guestbook-app';
    const topo = 'deployable//HelmRelease//nginx-2.2.2/0,helmchart/nginx-fdab7-/Deployment/demo-ns-helm-git/nginx-deployment/2';

    const subscriptionStatusMap = {
      braveman:
  {
    'guestbook-app-latest-Deployment-frontend':
     {
       lastUpdateTime: '2020-05-21T15:54:29Z',
       phase: 'Failed',
       reason: 'subscriptions.apps.open-cluster-management.io "sub123" not found',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-master':
     {
       lastUpdateTime: '2020-05-21T15:54:29Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-slave':
     {
       lastUpdateTime: '2020-05-21T15:54:29Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-frontend':
     {
       lastUpdateTime: '2020-05-21T15:55:36Z',
       phase: 'Failed',
       reason: 'Service "frontend" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-master':
     {
       lastUpdateTime: '2020-05-21T15:55:36Z',
       phase: 'Failed',
       reason: 'Service "redis-master" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-slave':
     {
       lastUpdateTime: '2020-05-21T15:55:36Z',
       phase: 'Failed',
       reason: 'Service "redis-slave" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
  },
      possiblereptile:
  {
    'guestbook-app-latest-Deployment-frontend':
     {
       lastUpdateTime: '2020-05-21T17:16:05Z',
       phase: 'Failed',
       reason: 'subscriptions.apps.open-cluster-management.io "guestbook-redis" not found',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:16:05Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:16:05Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-frontend':
     {
       lastUpdateTime: '2020-05-21T17:15:57Z',
       phase: 'Failed',
       reason: 'Service "frontend" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:15:56Z',
       phase: 'Failed',
       reason: 'Service "redis-master" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:15:58Z',
       phase: 'Failed',
       reason: 'Service "redis-slave" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
  },
      relievedox:
  {
    'guestbook-app-latest-Deployment-frontend':
     {
       lastUpdateTime: '2020-05-21T17:16:25Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:16:25Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:16:25Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-frontend':
     {
       lastUpdateTime: '2020-05-21T17:16:24Z',
       phase: 'Failed',
       reason: 'Service "frontend" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:16:24Z',
       phase: 'Failed',
       reason: 'Service "redis-master" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:16:24Z',
       phase: 'Failed',
       reason: 'Service "redis-slave" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
  },
      sharingpenguin:
  {
    'guestbook-app-latest-Deployment-frontend':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Deployment-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Subscribed',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-frontend':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Failed',
       reason: 'Service "frontend" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-master':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Failed',
       reason: 'Service "redis-master" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
    'guestbook-app-latest-Service-redis-slave':
     {
       lastUpdateTime: '2020-05-21T17:17:13Z',
       phase: 'Failed',
       reason: 'Service "redis-slave" is invalid: spec.clusterIP: Invalid value: "": field is immutable',
       resourceStatus: {},
     },
  },
    };
    const result = [
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--frontend',
        name: 'frontend',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Deployment',
            metadata: {
              name: 'frontend',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'deployment',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--frontend',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-master',
        name: 'redis-master',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Deployment',
            metadata: {
              name: 'redis-master',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'deployment',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-master',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',
        name: 'redis-slave',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Deployment',
            metadata: {
              name: 'redis-slave',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'deployment',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--deployment--redis-slave',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--frontend',
        name: 'frontend',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Service',
            metadata: {
              name: 'frontend',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'service',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--frontend',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--redis-master',
        name: 'redis-master',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Service',
            metadata: {
              name: 'redis-master',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'service',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--redis-master',

      },
      {
        id: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--redis-slave',
        name: 'redis-slave',
        namespace: 'open-cluster-management',
        specs: {
          isDesign: false,
          raw: {
            kind: 'Service',
            metadata: {
              name: 'redis-slave',
              namespace: 'open-cluster-management',

            },
            spec: {

            },

          },

        },
        type: 'service',
        uid: 'member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--service--redis-slave',

      },
    ];

    expect(addSubscriptionCharts(
      parentId, subscriptionStatusMap,
      [], [], null, appNamespace, channelInfo, subscriptionName, null,
    )).toEqual(result);

    const result2 = [
      {
        name: 'nginx-deployment',
        namespace: 'open-cluster-management',
        type: 'deployment',
        id: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--demo-ns-helm-git--guestbook-app-nginx-deployment-nginx-deployment-deployment--deployment--nginx-deployment',
        uid: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--demo-ns-helm-git--guestbook-app-nginx-deployment-nginx-deployment-deployment--deployment--nginx-deployment',
        specs: {
          raw: {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: {
              name: 'nginx-deployment',
              namespace: 'demo-ns-helm-git',
            },
            spec: {
              replicas: 2,
            },
          },
          deployStatuses: [],
          isDesign: false,
          parent: undefined,
        },
      },
      {
        name: 'nginx-deployment',
        namespace: 'open-cluster-management',
        type: 'replicaset',
        id: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--nginx-deployment',
        uid: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--nginx-deployment',
        specs: {
          isDesign: false,
          parent: {
            parentId: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--demo-ns-helm-git--guestbook-app-nginx-deployment-nginx-deployment-deployment--deployment--nginx-deployment',
            parentName: 'nginx-deployment',
            parentType: 'deployment',
          },
          raw: {
            kind: 'replicaset',
            metadata: {
              name: 'nginx-deployment',
              namespace: 'open-cluster-management',
            },
            spec: {
              desired: 2,
              template: {},
            },
          },
        },
      },
    ];
    expect(addSubscriptionCharts(
      parentId, subscriptionStatusMap,
      [], [], null, appNamespace, channelInfo, subscriptionName, topo,
    )).toEqual(result2);
  });
});

describe('getSubscriptionPackageInfo', () => {
  it('getSubscriptionPackageInfo', () => {
    const topoAnnotation = 'helmchart/nginx-ingress-4f527-/Service/ns-sub-1/default-backend/0,helmchart/nginx-ingress-4f527-/Deployment/ns-sub-1/controller/1';
    const subscriptionName = 'nginx';
    const appNs = 'default';

    const result = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata: {
          namespace: 'ns-sub-1',
          name: 'nginx-default-backend-default-backend-service',
          selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/ns-sub-1/deployables/default-backend-service',
        },
        spec: {
          template: {
            apiVersion: 'apps/v1',
            kind: 'Service',
            metadata: { namespace: 'ns-sub-1', name: 'default-backend' },
            spec: {},
          },
        },
      },
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata: {
          namespace: 'ns-sub-1',
          name: 'nginx-controller-controller-deployment',
          selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/ns-sub-1/deployables/controller-deployment',
        },
        spec: {
          template: {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: { namespace: 'ns-sub-1', name: 'controller' },
            spec: { replicas: 1 },
          },
        },
      },
    ];

    expect(getSubscriptionPackageInfo(topoAnnotation, subscriptionName, appNs)).toEqual(result);
  });
});

describe('getSubscriptionPackageInfo git helm', () => {
  it('getSubscriptionPackageInfo git helm', () => {
    const topoAnnotation = 'deployable//HelmRelease//nginx-2.2.2/0,helmchart/nginx-fdab7-/Deployment/demo-ns-helm-git/nginx-deployment/2';
    const subscriptionName = 'demo-subscription';
    const channelInfo = 'demo-ns-helm-git-ch/git-helm-ch';

    const result = [
      {
        apiVersion: 'apps.open-cluster-management.io/v1',
        kind: 'Deployable',
        metadata: {
          namespace: 'demo-ns-helm-git',
          name: 'demo-subscription-nginx-deployment-nginx-deployment-deployment',
          selfLink: '/apis/apps.open-cluster-management.io/v1/namespaces/demo-ns-helm-git/deployables/nginx-deployment-deployment',
        },
        spec: {
          template: {
            apiVersion: 'apps/v1',
            kind: 'Deployment',
            metadata: { namespace: 'demo-ns-helm-git', name: 'nginx-deployment' },
            spec: { replicas: 2 },
          },
        },
      },
    ];

    expect(getSubscriptionPackageInfo(topoAnnotation, subscriptionName, 'default', channelInfo)).toEqual(result);
  });
});

describe('removeReleaseGeneratedSuffix remove suffix', () => {
  it('removeReleaseGeneratedSuffix remove suffix', () => {
    expect(removeReleaseGeneratedSuffix('nginx-ingress-66f46')).toEqual('nginx-ingress');
  });
});

describe('removeHelmReleaseName test resource with only release name as the name', () => {
  it('removeHelmReleaseName test resource with only release name as the name', () => {
    expect(removeHelmReleaseName('nginx-ingress-66f46', 'nginx-ingress-66f46')).toEqual('nginx-ingress');
  });
});

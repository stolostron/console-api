/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 * * Copyright (c) 2020 Red Hat, Inc.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import getApplicationElements, {
  createReplicaChild
  , createGenericPackageObject
  , addSubscriptionCharts
  , addSubscriptionDeployable
  , addClusters,
} from './applicationHelper';


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
        isDesign: true,
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
      id: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--redis-slave', name: 'redis-slave', namespace: 'open-cluster-management', specs: { isDesign: true, raw: { kind: 'replicaset', metadata: { name: 'redis-slave', namespace: 'open-cluster-management' }, spec: { desired: 2, template: {} } } }, type: 'replicaset', uid: 'member--member--deployable--member--clusters--possiblereptile, braveman, sharingpenguin, relievedox--replicaset--redis-slave',
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
      id: 'member--package--HelmChart-obj-sub', name: 'HelmChart-obj-sub', namespace: 'obj-sub-ns', specs: { raw: { isDesign: false, kind: 'Package', metadata: { name: 'HelmChart-obj-sub', namespace: 'obj-sub-ns' } } }, type: 'package', uid: 'member--package--HelmChart-obj-sub',
    };

    expect(createGenericPackageObject(
      parentId, appNamespace
      , [], [], subscriptionName,
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
        cpu: '36', memory: '140809Mi', nodes: '6', storage: '8Gi',
      },
      usage: {
        cpu: '12682m', memory: '28464Mi', pods: '297', storage: '8Gi',
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

describe('addSubscriptionCharts', () => {
  it('addSubscriptionCharts', () => {
    const parentId = 'member--clusters--possiblereptile, braveman, sharingpenguin, relievedox';
    const appNamespace = 'open-cluster-management';
    const channelInfo = 'gb-app-latest-ns/guestbook-app-latest';
    const subscriptionName = 'guestbook-app';

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
          isDesign: true,
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
          isDesign: true,
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
          isDesign: true,
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
          isDesign: true,
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
          isDesign: true,
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
          isDesign: true,
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
      [], [], appNamespace, channelInfo, subscriptionName,
    )).toEqual(result);
  });
});


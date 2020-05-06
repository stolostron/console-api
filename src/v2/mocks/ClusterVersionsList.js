/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockClusterVersionsResourceView = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'clusterversions',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/clusterversions',
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
        resource: 'clusterversions',
      },
    },
    status: {},
  },
};

export const mockClusterVersionsResponse = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'clusterversions',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/clusterversions',
      uid: '8c65042d-c199-11e8-bd43-b69970856045',
      resourceVersion: '409738',
      creationTimestamp: '2018-09-26T14:36:26Z',
      labels: {
        name: 'clusterversions',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'clusterversions',
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
        'managed-cluster': {
          apiVersion: 'config.openshift.io/v1',
          kind: 'ClusterVersion',
          metadata: {
            creationTimestamp: '2019-10-24T13:50:12Z',
            generation: 1,
            name: 'version',
            resourceVersion: '16266049',
            selfLink: '/apis/config.openshift.io/v1/clusterversions/version',
            uid: '333b4a77-f665-11e9-80ec-0e3653a06d12',
          },
          spec: {
            channel: 'stable-4.2',
            clusterID: 'e3f8b097-6d48-464e-ba45-acefc5f46c42',
            upstream: 'https://api.openshift.com/api/upgrades_info/v1/graph',
          },
          status: {
            availableUpdates: [
              {
                force: false,
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:4bf307b98beba4d42da3316464013eac120c6e5a398646863ef92b0e2c621230',
                version: '4.2.8',
              },
              {
                force: false,
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:bac62983757570b9b8f8bc84c740782984a255c16372b3e30cfc8b52c0a187b9',
                version: '4.2.7',
              },
              {
                force: false,
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:dc782b44cac3d59101904cc5da2b9d8bdb90e55a07814df50ea7a13071b0f5f0',
                version: '4.2.2',
              },
              {
                force: false,
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:f28cbabd1227352fe704a00df796a4511880174042dece96233036a10ac61639',
                version: '4.2.9',
              },
            ],
            conditions: [
              {
                lastTransitionTime: '2019-10-24T14:04:51Z',
                message: 'Done applying 4.2.0',
                status: 'True',
                type: 'Available',
              },
              {
                lastTransitionTime: '2019-10-29T17:35:37Z',
                status: 'True',
                type: 'Failing',
              },
              {
                lastTransitionTime: '2019-10-24T14:04:51Z',
                message: 'Cluster version is 4.2.0',
                status: 'False',
                type: 'Progressing',
              },
              {
                lastTransitionTime: '2019-11-12T20:39:21Z',
                status: 'True',
                type: 'RetrievedUpdates',
              },
            ],
            history: [
              {
                completionTime: '2019-10-24T14:04:51Z',
                image: 'registry.ng.bluemix.net/armada-master/ocp-release:4.3.5-x86_64',
                startedTime: '2019-10-24T13:50:26Z',
                state: 'Completed',
                verified: false,
                version: '4.2.0',
              },
            ],
            observedGeneration: 1,
            versionHash: 'tM2NjdTMVKw=',
          },
        },
        'hub-cluster': {
          apiVersion: 'config.openshift.io/v1',
          kind: 'ClusterVersion',
          metadata: {
            creationTimestamp: '2019-10-24T13:50:12Z',
            generation: 1,
            name: 'version',
            resourceVersion: '16266049',
            selfLink: '/apis/config.openshift.io/v1/clusterversions/version',
            uid: '333b4a77-f665-11e9-80ec-0e3653a06d12',
          },
          spec: {
            channel: 'stable-4.2',
            clusterID: 'e3f8b097-6d48-464e-ba45-acefc5f46c42',
            upstream: 'https://api.openshift.com/api/upgrades_info/v1/graph',
          },
          status: {
            availableUpdates: [
              {
                force: false,
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:4bf307b98beba4d42da3316464013eac120c6e5a398646863ef92b0e2c621230',
                version: '4.2.8',
              },
              {
                force: false,
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:bac62983757570b9b8f8bc84c740782984a255c16372b3e30cfc8b52c0a187b9',
                version: '4.2.7',
              },
              {
                force: false,
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:dc782b44cac3d59101904cc5da2b9d8bdb90e55a07814df50ea7a13071b0f5f0',
                version: '4.2.2',
              },
              {
                force: false,
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:f28cbabd1227352fe704a00df796a4511880174042dece96233036a10ac61639',
                version: '4.2.9',
              },
            ],
            conditions: [
              {
                lastTransitionTime: '2019-10-24T14:04:51Z',
                message: 'Done applying 4.2.0',
                status: 'True',
                type: 'Available',
              },
              {
                lastTransitionTime: '2019-10-29T17:35:37Z',
                status: 'False',
                type: 'Failing',
              },
              {
                lastTransitionTime: '2019-10-24T14:04:51Z',
                message: 'Cluster version is 4.2.0',
                status: 'False',
                type: 'Progressing',
              },
              {
                lastTransitionTime: '2019-11-12T20:39:21Z',
                status: 'True',
                type: 'RetrievedUpdates',
              },
            ],
            desired: {
              force: false,
              image: 'quay.io/openshift-release-dev/ocp-release@sha256:c5337afd85b94c93ec513f21c8545e3f9e36a227f55d41bc1dfb8fcc3f2be129',
              version: '4.2.2',
            },
            history: [
              {
                completionTime: '2019-10-24T14:04:51Z',
                image: 'quay.io/openshift-release-dev/ocp-release@sha256:c5337afd85b94c93ec513f21c8545e3f9e36a227f55d41bc1dfb8fcc3f2be129',
                startedTime: '2019-10-24T13:50:26Z',
                state: 'Completed',
                verified: false,
                version: '4.2.0',
              },
            ],
            observedGeneration: 1,
            versionHash: 'tM2NjdTMVKw=',
          },
        },
      },
    },
  },
};

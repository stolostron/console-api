/** *****************************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

export default {
  body: {
    apiVersion: 'v1',
    items: [
      {
        apiVersion: 'hive.openshift.io/v1',
        kind: 'ClusterImageSet',
        metadata: {
          annotations: {
            'imagecontentsource.url': 'my-registry.io',
            'imagecontentsource.mirror-url': 'my2-registry.io',
          },
          creationTimestamp: '2020-04-24T23:35:41Z',
          generation: 1,
          name: 'img4.3.0-x86-64',
          labels: {
            channel: 'fast',
            'platform.aws': 'true',
            'platform.azure': 'true',
            'platform.gcp': 'true',
            visible: 'true',
          },
          resourceVersion: '94223',
          selfLink: '/apis/hive.openshift.io/v1/clusterimagesets/img4.3.0-x86-64',
          uid: '11821e9c-f897-4452-83f7-35a05e708122',
        },
        spec: {
          releaseImage: 'quay.io/openshift-release-dev/ocp-release:4.3.0-x86_64',
        },
      },
      {
        apiVersion: 'hive.openshift.io/v1',
        kind: 'ClusterImageSet',
        metadata: {
          creationTimestamp: '2020-04-24T23:13:33Z',
          generation: 1,
          name: 'img4.4.8-x86-64',
          labels: {
            channel: 'stable',
            'platform.aws': 'true',
            'platform.azure': 'true',
            'platform.gcp': 'true',
            'platform.bmc': 'true',
            'platform.vmware': 'true',
            visible: 'false',
          },
          resourceVersion: '81806',
          selfLink: '/apis/hive.openshift.io/v1/clusterimagesets/img4.4.8-x86-64',
          uid: '70b70254-1427-47e0-926d-722623c4da73',
        },
        spec: {
          releaseImage: 'quay.io/openshift-release-dev/ocp-release:4.4.8-x86_64',
        },
      },
    ],
    kind: 'List',
    metadata: {
      resourceVersion: '',
      selfLink: '',
    },
  },
};

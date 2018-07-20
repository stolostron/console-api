/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const mockResponse = {
  body: {
    kind: 'ClusterList',
    apiVersion: 'clusterregistry.k8s.io/v1alpha1',
    metadata: {
      selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/clusters',
      resourceVersion: '3865',
    },
    items: [
      {
        kind: 'Cluster',
        apiVersion: 'clusterregistry.k8s.io/v1alpha1',
        metadata: {
          name: 'crucial-owl',
          namespace: 'default',
          selfLink: '/apis/clusterregistry.k8s.io/v1alpha1/namespaces/default/clusters/crucial-owl',
          uid: '69902715-8386-11e8-95ba-868ccf9e029b',
          resourceVersion: '3865',
          creationTimestamp: '2018-07-09T14:43:15Z',
          labels: {
            name: 'crucial-owl',
          },
          finalizers: [
            'finalizer.hcm.io',
          ],
        },
        spec: {
          kubernetesApiEndpoints: {},
          authInfo: {},
        },
        status: {
          conditions: [
            {
              type: 'OK',
              status: '',
              lastHeartbeatTime: '2018-07-10T19:45:49Z',
              lastTransitionTime: null,
            },
          ],
        },
      },
    ],
  },
};

export default mockResponse;

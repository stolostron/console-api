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
    kind: 'HelmRepoList',
    apiVersion: 'hcm.ibm.com/v1alpha1',
    metadata: {
      selfLink: '/apis/hcm.ibm.com/v1alpha1/helmrepos',
      resourceVersion: '10688',
    },
    items: [
      {
        metadata: {
          name: 'google',
          namespace: 'default',
          selfLink: '/apis/hcm.ibm.com/v1alpha1/namespaces/default/helmrepos/google',
          uid: '0915ef11-8f66-11e8-b63b-169deeb4a8b8',
          resourceVersion: '278',
          creationTimestamp: '2018-07-24T17:21:43z',
          annotations: {
            'kubectl.kubernetes.io/last-applied-configuration': '{"apiVersion":"hcm.ibm.com/v1alpha1","kind":"HelmRepo","metadata":{"annotations":{},"name":"google","namespace":"default"},"spec":{"url":"https://kubernetes-charts.storage.googleapis.com/"}}\n',
          },
        },
        spec: {
          url: 'https://kubernetes-charts.storage.googleapis.com/',
        },
        status: {
          charts: {
            'acs-engine-autoscaler': {
              chartVersions: [
                {
                  name: 'acs-engine-autoscaler',
                  version: '2.2.0',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.2.0.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '2.1.5',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.1.5.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '2.1.4',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.1.4.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '2.1.3',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.1.3.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '2.1.2',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.1.2.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '2.1.1',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.1.1.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '2.1.0',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.1.0.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '2.0.0',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.0.0.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '1.0.0',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-1.0.0.tgz',
                  ],
                },
                {
                  name: 'acs-engine-autoscaler',
                  version: '0.1.0',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-0.1.0.tgz',
                  ],
                },
              ],
            },
            aerospike: {
              chartVersions: [
                {
                  name: 'aerospike',
                  version: '0.1.7',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/aerospike-0.1.7.tgz',
                  ],
                },
                {
                  name: 'aerospike',
                  version: '0.1.6',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/aerospike-0.1.6.tgz',
                  ],
                },
                {
                  name: 'aerospike',
                  version: '0.1.5',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/aerospike-0.1.5.tgz',
                  ],
                },
              ],
            },
            zetcd: {
              chartVersions: [
                {
                  name: 'zetcd',
                  version: '0.1.9',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.9.tgz',
                  ],
                },
                {
                  name: 'zetcd',
                  version: '0.1.8',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.8.tgz',
                  ],
                },
                {
                  name: 'zetcd',
                  version: '0.1.7',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.7.tgz',
                  ],
                },
                {
                  name: 'zetcd',
                  version: '0.1.6',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.6.tgz',
                  ],
                },
                {
                  name: 'zetcd',
                  version: '0.1.5',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.5.tgz',
                  ],
                },
                {
                  name: 'zetcd',
                  version: '0.1.4',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.4.tgz',
                  ],
                },
                {
                  name: 'zetcd',
                  version: '0.1.3',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.3.tgz',
                  ],
                },
                {
                  name: 'zetcd',
                  version: '0.1.2',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.2.tgz',
                  ],
                },
                {
                  name: 'zetcd',
                  version: '0.1.0',
                  urls: [
                    'https://kubernetes-charts.storage.googleapis.com/zetcd-0.1.0.tgz',
                  ],
                },
              ],
            },
          },
        },
      },
    ],
  },
};

export default mockResponse;

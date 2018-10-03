/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const mockResourceView = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'releases-152098429',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/releases-152098429',
      uid: '03a20fab-b12d-11e8-9b78-92c67bb7ffdf',
      resourceVersion: '941',
      creationTimestamp: '2018-09-05T16:59:12Z',
      labels: {
        name: 'getreleases',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'releases',
      },
    },
    status: {},
  },
};

export const mockResponse = {
  body: {
    kind: 'ResourceView',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'releases-152098429',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/releases-152098429',
      uid: '03a20fab-b12d-11e8-9b78-92c67bb7ffdf',
      resourceVersion: '945',
      creationTimestamp: '2018-09-05T16:59:12Z',
      labels: {
        name: 'getreleases',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'releases',
      },
    },
    status: {
      conditions: [
        {
          type: 'Completed',
          lastUpdateTime: '2018-09-05T16:59:13Z',
        },
      ],
      results: {
        'hub-cluster': {
          metadata: {},
          items: [
            {
              metadata: {
                name: 'audit-logging',
                creationTimestamp: null,
              },
              spec: {
                description: 'Audit logging storage and search management solution',
                firstDeployed: '2018-09-04T18:24:06Z',
                lastDeployed: '2018-09-04T18:24:06Z',
                chartName: 'audit-logging',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'auth-apikeys',
                creationTimestamp: null,
              },
              spec: {
                description: 'ICP IAM Token Service',
                firstDeployed: '2018-09-04T18:07:13Z',
                lastDeployed: '2018-09-04T18:07:13Z',
                chartName: 'auth-apikeys',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'auth-idp',
                creationTimestamp: null,
              },
              spec: {
                description: 'ICP Security Authentication Provider',
                firstDeployed: '2018-09-04T18:07:08Z',
                lastDeployed: '2018-09-04T18:07:08Z',
                chartName: 'auth-idp',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'auth-pap',
                creationTimestamp: null,
              },
              spec: {
                description: 'ICP IAM Policy Administration',
                firstDeployed: '2018-09-04T18:07:16Z',
                lastDeployed: '2018-09-04T18:07:16Z',
                chartName: 'auth-pap',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'auth-pdp',
                creationTimestamp: null,
              },
              spec: {
                description: 'ICP IAM Policy Decision',
                firstDeployed: '2018-09-04T18:07:20Z',
                lastDeployed: '2018-09-04T18:07:20Z',
                chartName: 'auth-pdp',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'calico',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for Calico',
                firstDeployed: '2018-09-04T18:02:39Z',
                lastDeployed: '2018-09-04T18:02:39Z',
                chartName: 'calico',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'catalog-ui',
                creationTimestamp: null,
              },
              spec: {
                description: 'Used to deploy Catalog UI microservice into K8s cluster',
                firstDeployed: '2018-09-04T18:23:00Z',
                lastDeployed: '2018-09-04T18:23:00Z',
                chartName: 'icp-catalog-chart',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'cert-manager',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for ICP cert-manager',
                firstDeployed: '2018-09-04T18:03:49Z',
                lastDeployed: '2018-09-04T18:03:49Z',
                chartName: 'ibm-cert-manager',
                chartVersion: '99.99.99',
                namespace: 'cert-manager',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'custom-metrics-adapter',
                creationTimestamp: null,
              },
              spec: {
                description: 'Kubernetes custom metrics adapter for Prometheus',
                firstDeployed: '2018-09-04T18:19:08Z',
                lastDeployed: '2018-09-04T18:19:08Z',
                chartName: 'ibm-custom-metrics-adapter',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'gbapp',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for Kubernetes',
                firstDeployed: '2018-09-05T15:46:23Z',
                lastDeployed: '2018-09-05T15:46:23Z',
                chartName: 'gbapp',
                chartVersion: '0.1.0',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'heapster',
                creationTimestamp: null,
              },
              spec: {
                description: 'Heapster',
                firstDeployed: '2018-09-04T18:18:51Z',
                lastDeployed: '2018-09-04T18:18:51Z',
                chartName: 'heapster',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'helm-api',
                creationTimestamp: null,
              },
              spec: {
                description: 'Used to deploy the helm api into K8s cluster',
                firstDeployed: '2018-09-04T18:23:05Z',
                lastDeployed: '2018-09-04T18:23:05Z',
                chartName: 'helm-api',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'helm-repo',
                creationTimestamp: null,
              },
              spec: {
                description: 'Internal Helm repository for ICP',
                firstDeployed: '2018-09-04T18:18:55Z',
                lastDeployed: '2018-09-04T18:18:55Z',
                chartName: 'helm-repo',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'icp-management-ingress',
                creationTimestamp: null,
              },
              spec: {
                description: 'ICP control plane ingress controller',
                firstDeployed: '2018-09-04T18:07:24Z',
                lastDeployed: '2018-09-04T18:07:24Z',
                chartName: 'icp-management-ingress',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'image-security-enforcement',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart to install IBM Cloud Private Image Security Enforcement',
                firstDeployed: '2018-09-04T18:18:59Z',
                lastDeployed: '2018-09-04T18:18:59Z',
                chartName: 'ibmcloud-image-enforcement',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'kube-dns',
                creationTimestamp: null,
              },
              spec: {
                description: 'Kubernetes buildin dns server',
                firstDeployed: '2018-09-04T18:02:43Z',
                lastDeployed: '2018-09-04T18:02:43Z',
                chartName: 'kube-dns',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'kube-system',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for Kubernetes',
                firstDeployed: '2018-09-05T15:57:12Z',
                lastDeployed: '2018-09-05T15:57:12Z',
                chartName: 'gbapp',
                chartVersion: '0.1.0',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'logging',
                creationTimestamp: null,
              },
              spec: {
                description: 'Log storage and search management solution',
                firstDeployed: '2018-09-04T18:19:16Z',
                lastDeployed: '2018-09-04T18:19:16Z',
                chartName: 'ibm-icplogging',
                chartVersion: '2.0.0',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'mariadb',
                creationTimestamp: null,
              },
              spec: {
                description: 'MariaDB',
                firstDeployed: '2018-09-04T18:04:49Z',
                lastDeployed: '2018-09-04T18:04:49Z',
                chartName: 'mariadb',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'mcm',
                creationTimestamp: null,
              },
              spec: {
                description: 'IBM Multi-Cloud Manager',
                firstDeployed: '2018-09-05T15:35:18Z',
                lastDeployed: '2018-09-05T15:35:18Z',
                chartName: 'ibm-mcm-controller',
                chartVersion: '3.1.0',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'md-gbapp-gbapp-mycluster-icp',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for Kubernetes',
                firstDeployed: '2018-09-05T16:44:49Z',
                lastDeployed: '2018-09-05T16:44:49Z',
                chartName: 'gbf',
                chartVersion: '0.1.0',
                namespace: 'default',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'md-gbapp-gbapp-redismaster-mycluster-icp',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for Kubernetes',
                firstDeployed: '2018-09-05T16:44:45Z',
                lastDeployed: '2018-09-05T16:44:45Z',
                chartName: 'gbrm',
                chartVersion: '0.1.0',
                namespace: 'default',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'md-gbapp-gbapp-redisslave-mycluster-icp',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for Kubernetes',
                firstDeployed: '2018-09-05T16:44:46Z',
                lastDeployed: '2018-09-05T16:44:46Z',
                chartName: 'gbrs',
                chartVersion: '0.1.0',
                namespace: 'default',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'md-kube-system-gbapp-mycluster-icp',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for Kubernetes',
                firstDeployed: '2018-09-05T15:57:25Z',
                lastDeployed: '2018-09-05T15:57:25Z',
                chartName: 'gbf',
                chartVersion: '0.1.0',
                namespace: 'default',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'metering',
                creationTimestamp: null,
              },
              spec: {
                description: 'A Helm chart for deploying the metering service of IBM Cloud Private',
                firstDeployed: '2018-09-04T18:19:03Z',
                lastDeployed: '2018-09-04T18:19:03Z',
                chartName: 'metering',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'metrics-server',
                creationTimestamp: null,
              },
              spec: {
                description: 'Metrics-server',
                firstDeployed: '2018-09-04T18:04:56Z',
                lastDeployed: '2018-09-04T18:04:56Z',
                chartName: 'metrics-server',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'mgmt-repo',
                creationTimestamp: null,
              },
              spec: {
                description: 'Internal Helm chart repository for ICP Platform Charts',
                firstDeployed: '2018-09-04T18:23:51Z',
                lastDeployed: '2018-09-04T18:23:51Z',
                chartName: 'mgmt-repo',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'mongodb',
                creationTimestamp: null,
              },
              spec: {
                description: 'NoSQL document-oriented database that stores JSON-like documents with dynamic schemas, simplifying the integration of data in content-driven applications.',
                firstDeployed: '2018-09-04T18:04:05Z',
                lastDeployed: '2018-09-04T18:04:05Z',
                chartName: 'icp-mongodb',
                chartVersion: '3.0.0',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'monitoring',
                creationTimestamp: null,
              },
              spec: {
                description: 'IBM monitoring service in private cloud',
                firstDeployed: '2018-09-04T18:22:54Z',
                lastDeployed: '2018-09-04T18:22:54Z',
                chartName: 'ibm-icpmonitoring',
                chartVersion: '1.2.0',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'nginx-ingress',
                creationTimestamp: null,
              },
              spec: {
                description: 'Ingress Controller',
                firstDeployed: '2018-09-04T18:04:45Z',
                lastDeployed: '2018-09-04T18:04:45Z',
                chartName: 'nginx-ingress',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'nvidia-device-plugin',
                creationTimestamp: null,
              },
              spec: {
                description: 'nvidia device plugin for Kubernetes',
                firstDeployed: '2018-09-04T18:03:53Z',
                lastDeployed: '2018-09-04T18:03:53Z',
                chartName: 'nvidia-device-plugin',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'platform-api',
                creationTimestamp: null,
              },
              spec: {
                description: 'ICP Platform API Service',
                firstDeployed: '2018-09-04T18:04:52Z',
                lastDeployed: '2018-09-04T18:04:52Z',
                chartName: 'platform-api',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'platform-ui',
                creationTimestamp: null,
              },
              spec: {
                description: 'Platform UI Helm Chart for IBM Cloud Private',
                firstDeployed: '2018-09-04T18:19:12Z',
                lastDeployed: '2018-09-04T18:19:12Z',
                chartName: 'platform-ui',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'secret-watcher',
                creationTimestamp: null,
              },
              spec: {
                description: 'ICP Secret Watcher Service',
                firstDeployed: '2018-09-04T18:23:55Z',
                lastDeployed: '2018-09-04T18:23:55Z',
                chartName: 'secret-watcher',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'security-onboarding',
                creationTimestamp: null,
              },
              spec: {
                description: 'ICP Security Onboarding Chart',
                firstDeployed: '2018-09-04T18:23:59Z',
                lastDeployed: '2018-09-04T18:23:59Z',
                chartName: 'security-onboarding',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'service-catalog',
                creationTimestamp: null,
              },
              spec: {
                description: 'IBM Cloud Private helm chart to deploy service-catalog API server and controller-manager',
                firstDeployed: '2018-09-04T18:04:41Z',
                lastDeployed: '2018-09-04T18:04:41Z',
                chartName: 'service-catalog',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
            {
              metadata: {
                name: 'unified-router',
                creationTimestamp: null,
              },
              spec: {
                description: 'unified-router',
                firstDeployed: '2018-09-04T18:22:49Z',
                lastDeployed: '2018-09-04T18:22:49Z',
                chartName: 'unified-router',
                chartVersion: '99.99.99',
                namespace: 'kube-system',
                version: 1,
                status: 'DEPLOYED',
              },
            },
          ],
        },
      },
    },
  },
};

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
      name: 'pods-1234768023',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/pods-1234768023',
      uid: '4678779f-b124-11e8-9b78-92c67bb7ffdf',
      resourceVersion: '531',
      creationTimestamp: '2018-09-05T15:56:39Z',
      labels: {
        name: 'getpods',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'pods',
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
      name: 'pods-1234768023',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/pods-1234768023',
      uid: '4678779f-b124-11e8-9b78-92c67bb7ffdf',
      resourceVersion: '535',
      creationTimestamp: '2018-09-05T15:56:39Z',
      labels: {
        name: 'getpods',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'pods',
      },
    },
    status: {
      conditions: [
        {
          type: 'Completed',
          lastUpdateTime: '2018-09-05T15:56:39Z',
        },
      ],
      results: {
        'hub-cluster': {
          apiVersion: 'v1',
          items: [
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:11:10Z',
                generateName: 'ibm-cert-manager-cert-manager-749ffc8bbc-',
                labels: {
                  app: 'ibm-cert-manager',
                  chart: 'ibm-cert-manager-3.1.0',
                  heritage: 'Tiller',
                  'k8s-app': 'cert-manager',
                  'pod-template-hash': '3059974667',
                  release: 'cert-manager',
                },
                name: 'ibm-cert-manager-cert-manager-749ffc8bbc-grfrg',
                namespace: 'cert-manager',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'ReplicaSet',
                    name: 'ibm-cert-manager-cert-manager-749ffc8bbc',
                    uid: '01f3701e-cb04-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '1064',
                selfLink: '/api/v1/namespaces/cert-manager/pods/ibm-cert-manager-cert-manager-749ffc8bbc-grfrg',
                uid: '01f77287-cb04-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    args: [
                      '--cluster-resource-namespace=kube-system',
                      '--leader-election-namespace=$(POD_NAMESPACE)',
                    ],
                    env: [
                      {
                        name: 'POD_NAMESPACE',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.namespace',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-cert-manager-controller:0.3.0',
                    imagePullPolicy: 'IfNotPresent',
                    livenessProbe: {
                      exec: {
                        command: [
                          'sh',
                          '-c',
                          'exec echo start cert-manager',
                        ],
                      },
                      failureThreshold: 3,
                      initialDelaySeconds: 30,
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 5,
                    },
                    name: 'ibm-cert-manager',
                    readinessProbe: {
                      exec: {
                        command: [
                          'sh',
                          '-c',
                          'exec echo start cert-manager',
                        ],
                      },
                      failureThreshold: 3,
                      initialDelaySeconds: 10,
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 2,
                    },
                    resources: {},
                    securityContext: {
                      runAsNonRoot: true,
                      runAsUser: 100,
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-5slld',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  master: 'true',
                },
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 30,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                    tolerationSeconds: 300,
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                    tolerationSeconds: 300,
                  },
                ],
                volumes: [
                  {
                    name: 'default-token-5slld',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-5slld',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:11:10Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:11:27Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:11:10Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://ab0f80c77b48a8d0e634c633d1627ca7cc716340f8f0a48ee9959997c6cb9a20',
                    image: 'www.ibm.com/ibmcom-amd64/icp-cert-manager-controller:0.3.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-cert-manager-controller@sha256:1df7fd78a0a2b73c12c11a65ff75dd3191c3733bbec9d0e8131634a969b19291',
                    lastState: {},
                    name: 'ibm-cert-manager',
                    ready: true,
                    restartCount: 5,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:11:14Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://ab0f80c77b48a8d0e634c633d1627ca7cc716340f8f0a48ee9959997c6cb9a21',
                    image: 'www.ibm.com/ibmcom-amd64/icp-cert-manager-controller:0.3.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-cert-manager-controller@sha256:1df7fd78a0a2b73c12c11a65ff75dd3191c3733bbec9d0e8131634a969b19292',
                    lastState: {},
                    name: 'ibm-cert-manager-1',
                    ready: true,
                    restartCount: 6,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:11:14Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                phase: 'Running',
                podIP: '10.1.28.194',
                qosClass: 'BestEffort',
                startTime: '2018-10-08T14:11:10Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                },
                creationTimestamp: '2018-10-29T14:55:44Z',
                name: 'nginx',
                namespace: 'default',
                resourceVersion: '3993658',
                selfLink: '/api/v1/namespaces/default/pods/nginx',
                uid: 'b64949d2-db8a-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    image: 'nginx:1.7.9',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'nginx',
                    ports: [
                      {
                        containerPort: 80,
                        protocol: 'TCP',
                      },
                    ],
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-4jhrm',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                nodeName: '9.37.247.195',
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 30,
                tolerations: [
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                    tolerationSeconds: 300,
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                    tolerationSeconds: 300,
                  },
                ],
                volumes: [
                  {
                    name: 'default-token-4jhrm',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-4jhrm',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-29T14:55:44Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-29T14:55:53Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-29T14:55:44Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://592022b15ad9ec2e77257835d04f9c4768debe576170b9766dc448b7bdc34ae2',
                    image: 'nginx:1.7.9',
                    imageID: 'docker-pullable://nginx@sha256:e3456c851a152494c3e4ff5fcc26f240206abac0c9d794affb40e0714846c451',
                    lastState: {},
                    name: 'nginx',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-29T14:55:52Z',
                      },
                    },
                  },
                ],
                hostIP: '9.37.247.195',
                phase: 'Running',
                podIP: '10.1.69.106',
                qosClass: 'BestEffort',
                startTime: '2018-10-29T14:55:44Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  productID: 'none',
                  productName: 'fluentd',
                  productVersion: 'v1.2',
                },
                creationTimestamp: '2018-10-08T14:22:24Z',
                generateName: 'audit-logging-fluentd-ds-',
                labels: {
                  app: 'audit-logging-fluentd',
                  chart: 'audit-logging-3.1.0',
                  component: 'fluentd',
                  'controller-revision-hash': '1418590040',
                  heritage: 'Tiller',
                  'pod-template-generation': '1',
                  release: 'audit-logging',
                  role: 'fluentd',
                },
                name: 'audit-logging-fluentd-ds-lgjpj',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'audit-logging-fluentd-ds',
                    uid: '9382f8dd-cb05-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '4134',
                selfLink: '/api/v1/namespaces/kube-system/pods/audit-logging-fluentd-ds-lgjpj',
                uid: '9388998d-cb05-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'APP_KEYSTORE_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'appKeystorePassword',
                            name: 'logging-elk-elasticsearch-pki-secret',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/fluentd:v1.2.2-icp',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'fluentd',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/fluentd/etc/fluent.conf',
                        name: 'config',
                        subPath: 'fluent.conf',
                      },
                      {
                        mountPath: '/run/log/journal',
                        name: 'journal',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/lib/icp/audit',
                        name: 'kube-audit',
                        readOnly: true,
                      },
                      {
                        mountPath: '/icp-audit',
                        name: 'shared',
                      },
                      {
                        mountPath: '/fluentd/etc/tls',
                        name: 'certs',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.37.220.141',
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {
                  runAsUser: 0,
                },
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 30,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    hostPath: {
                      path: '/run/log/journal',
                      type: '',
                    },
                    name: 'journal',
                  },
                  {
                    hostPath: {
                      path: '/var/lib/icp/audit',
                      type: '',
                    },
                    name: 'kube-audit',
                  },
                  {
                    configMap: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'fluent.conf',
                          path: 'fluent.conf',
                        },
                      ],
                      name: 'audit-logging-fluentd-ds-config',
                    },
                    name: 'config',
                  },
                  {
                    emptyDir: {},
                    name: 'shared',
                  },
                  {
                    name: 'certs',
                    secret: {
                      defaultMode: 420,
                      secretName: 'logging-elk-certs',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:22:24Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:22:38Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:22:24Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://4bd833d89eb8811c37fd86dbff002387c1ad9787e53b6dada476851dc6bd2480',
                    image: 'www.ibm.com/ibmcom-amd64/fluentd:v1.2.2-icp',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/fluentd@sha256:384a99b8d941c93f96ee5b5cbae5b70500219a3f71c73cf4eddd20d9d693e3b3',
                    lastState: {},
                    name: 'fluentd',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:22:37Z',
                      },
                    },
                  },
                ],
                hostIP: '9.37.220.141',
                phase: 'Running',
                podIP: '10.1.105.132',
                qosClass: 'BestEffort',
                startTime: '2018-10-08T14:22:24Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  productID: 'none',
                  productName: 'fluentd',
                  productVersion: 'v1.2',
                },
                creationTimestamp: '2018-10-08T14:22:24Z',
                generateName: 'audit-logging-fluentd-ds-',
                labels: {
                  app: 'audit-logging-fluentd',
                  chart: 'audit-logging-3.1.0',
                  component: 'fluentd',
                  'controller-revision-hash': '1418590040',
                  heritage: 'Tiller',
                  'pod-template-generation': '1',
                  release: 'audit-logging',
                  role: 'fluentd',
                },
                name: 'audit-logging-fluentd-ds-qzvth',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'audit-logging-fluentd-ds',
                    uid: '9382f8dd-cb05-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '3771237',
                selfLink: '/api/v1/namespaces/kube-system/pods/audit-logging-fluentd-ds-qzvth',
                uid: '9388846a-cb05-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'APP_KEYSTORE_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'appKeystorePassword',
                            name: 'logging-elk-elasticsearch-pki-secret',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/fluentd:v1.2.2-icp',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'fluentd',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/fluentd/etc/fluent.conf',
                        name: 'config',
                        subPath: 'fluent.conf',
                      },
                      {
                        mountPath: '/run/log/journal',
                        name: 'journal',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/lib/icp/audit',
                        name: 'kube-audit',
                        readOnly: true,
                      },
                      {
                        mountPath: '/icp-audit',
                        name: 'shared',
                      },
                      {
                        mountPath: '/fluentd/etc/tls',
                        name: 'certs',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.37.247.195',
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {
                  runAsUser: 0,
                },
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 30,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    hostPath: {
                      path: '/run/log/journal',
                      type: '',
                    },
                    name: 'journal',
                  },
                  {
                    hostPath: {
                      path: '/var/lib/icp/audit',
                      type: '',
                    },
                    name: 'kube-audit',
                  },
                  {
                    configMap: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'fluent.conf',
                          path: 'fluent.conf',
                        },
                      ],
                      name: 'audit-logging-fluentd-ds-config',
                    },
                    name: 'config',
                  },
                  {
                    emptyDir: {},
                    name: 'shared',
                  },
                  {
                    name: 'certs',
                    secret: {
                      defaultMode: 420,
                      secretName: 'logging-elk-certs',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:22:24Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:22:58Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:22:24Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://8c2148b9cfcc721de5c3b2d5f0756712f641a3b98b536854917f0ce0ddc78b67',
                    image: 'www.ibm.com/ibmcom-amd64/fluentd:v1.2.2-icp',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/fluentd@sha256:384a99b8d941c93f96ee5b5cbae5b70500219a3f71c73cf4eddd20d9d693e3b3',
                    lastState: {},
                    name: 'fluentd',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:22:57Z',
                      },
                    },
                  },
                ],
                hostIP: '9.37.247.195',
                phase: 'Running',
                podIP: '10.1.69.68',
                qosClass: 'BestEffort',
                startTime: '2018-10-08T14:22:24Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  productID: 'none',
                  productName: 'fluentd',
                  productVersion: 'v1.2',
                },
                creationTimestamp: '2018-10-08T14:22:24Z',
                generateName: 'audit-logging-fluentd-ds-',
                labels: {
                  app: 'audit-logging-fluentd',
                  chart: 'audit-logging-3.1.0',
                  component: 'fluentd',
                  'controller-revision-hash': '1418590040',
                  heritage: 'Tiller',
                  'pod-template-generation': '1',
                  release: 'audit-logging',
                  role: 'fluentd',
                },
                name: 'audit-logging-fluentd-ds-v7r5b',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'audit-logging-fluentd-ds',
                    uid: '9382f8dd-cb05-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '4605',
                selfLink: '/api/v1/namespaces/kube-system/pods/audit-logging-fluentd-ds-v7r5b',
                uid: '9385c48c-cb05-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'APP_KEYSTORE_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'appKeystorePassword',
                            name: 'logging-elk-elasticsearch-pki-secret',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/fluentd:v1.2.2-icp',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'fluentd',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/fluentd/etc/fluent.conf',
                        name: 'config',
                        subPath: 'fluent.conf',
                      },
                      {
                        mountPath: '/run/log/journal',
                        name: 'journal',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/lib/icp/audit',
                        name: 'kube-audit',
                        readOnly: true,
                      },
                      {
                        mountPath: '/icp-audit',
                        name: 'shared',
                      },
                      {
                        mountPath: '/fluentd/etc/tls',
                        name: 'certs',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.42.82.240',
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {
                  runAsUser: 0,
                },
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 30,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    hostPath: {
                      path: '/run/log/journal',
                      type: '',
                    },
                    name: 'journal',
                  },
                  {
                    hostPath: {
                      path: '/var/lib/icp/audit',
                      type: '',
                    },
                    name: 'kube-audit',
                  },
                  {
                    configMap: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'fluent.conf',
                          path: 'fluent.conf',
                        },
                      ],
                      name: 'audit-logging-fluentd-ds-config',
                    },
                    name: 'config',
                  },
                  {
                    emptyDir: {},
                    name: 'shared',
                  },
                  {
                    name: 'certs',
                    secret: {
                      defaultMode: 420,
                      secretName: 'logging-elk-certs',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:22:24Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:24:45Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:22:24Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://f21acff5af5ea5b9dfd7c6a9900baf6920fd9b5dbdda7da0058a93b72d6025f0',
                    image: 'www.ibm.com/ibmcom-amd64/fluentd:v1.2.2-icp',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/fluentd@sha256:384a99b8d941c93f96ee5b5cbae5b70500219a3f71c73cf4eddd20d9d693e3b3',
                    lastState: {},
                    name: 'fluentd',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:24:44Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                phase: 'Running',
                podIP: '10.1.28.239',
                qosClass: 'BestEffort',
                startTime: '2018-10-08T14:22:24Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:13:02Z',
                generateName: 'auth-apikeys-',
                labels: {
                  component: 'auth-apikeys',
                  'controller-revision-hash': '81911170',
                  'k8s-app': 'auth-apikeys',
                  'pod-template-generation': '1',
                  release: 'auth-apikeys',
                },
                name: 'auth-apikeys-rsfrx',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'auth-apikeys',
                    uid: '448c499c-cb04-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '1961',
                selfLink: '/api/v1/namespaces/kube-system/pods/auth-apikeys-rsfrx',
                uid: '448e529f-cb04-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'MONGO_DB',
                        value: 'platform-db',
                      },
                      {
                        name: 'MONGO_COLLECTION',
                        value: 'iam',
                      },
                      {
                        name: 'MONGO_USERNAME',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'user',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'password',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_HOST',
                        value: 'mongodb',
                      },
                      {
                        name: 'MONGO_PORT',
                        value: '27017',
                      },
                      {
                        name: 'MONGO_AUTHSOURCE',
                        value: 'admin',
                      },
                      {
                        name: 'PLATFORM_IDENTITY_PROVIDER_URL',
                        value: 'https://platform-identity-provider:4300',
                      },
                      {
                        name: 'PLATFORM_IDENTITY_MGMT_URL',
                        value: 'https://platform-identity-management:4500',
                      },
                      {
                        name: 'PLATFORM_IDENTITY_PROVIDER_CLIENTID',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_CLIENT_ID',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'PLATFORM_IDENTITY_PROVIDER_CLIENTSECRET',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_CLIENT_SECRET',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'WLP_SCOPE',
                        value: 'openid+profile+email',
                      },
                      {
                        name: 'DEFAULT_ADMIN_USER',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_username',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_password',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/iam-token-service:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'auth-apikeys',
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/oidc/keys',
                        port: 10443,
                        scheme: 'HTTPS',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      limits: {
                        cpu: '1',
                        memory: '1Gi',
                      },
                      requests: {
                        cpu: '200m',
                        memory: '300Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/certs/mongodb-ca',
                        name: 'mongodb-ca-cert',
                      },
                      {
                        mountPath: '/certs/mongodb-client',
                        name: 'mongodb-client-cert',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  master: 'true',
                },
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 60,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    name: 'mongodb-ca-cert',
                    secret: {
                      defaultMode: 420,
                      secretName: 'cluster-ca-cert',
                    },
                  },
                  {
                    name: 'mongodb-client-cert',
                    secret: {
                      defaultMode: 420,
                      secretName: 'icp-mongodb-client-cert',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:13:02Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:15:07Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:13:02Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://1d30265a502de9cb044e4773d4b45eb8e435e6f1b03a4656940cab43aa494f43',
                    image: 'www.ibm.com/ibmcom-amd64/iam-token-service:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/iam-token-service@sha256:9211161e5b5b9d892a99b46fad4429333ceb7143b4039419df7ea0efa36381a9',
                    lastState: {},
                    name: 'auth-apikeys',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:14:11Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                phase: 'Running',
                podIP: '10.1.28.205',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:13:02Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'privileged',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:12:58Z',
                generateName: 'auth-idp-',
                labels: {
                  component: 'auth-idp',
                  'controller-revision-hash': '830352851',
                  'k8s-app': 'auth-idp',
                  'pod-template-generation': '1',
                  release: 'auth-idp',
                },
                name: 'auth-idp-nl5s5',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'auth-idp',
                    uid: '42686717-cb04-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '3720282',
                selfLink: '/api/v1/namespaces/kube-system/pods/auth-idp-nl5s5',
                uid: '426cec14-cb04-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    image: 'www.ibm.com/ibmcom-amd64/icp-audit-service:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'icp-audit-service',
                    resources: {
                      limits: {
                        cpu: '200m',
                        memory: '512Mi',
                      },
                      requests: {
                        cpu: '100m',
                        memory: '256Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/log/audit',
                        name: 'shared',
                      },
                      {
                        mountPath: '/run/systemd/journal',
                        name: 'journal',
                      },
                      {
                        mountPath: '/etc/logrotate.d/audit',
                        name: 'logrotate',
                        subPath: 'audit',
                      },
                      {
                        mountPath: '/etc/logrotate.conf',
                        name: 'logrotate-conf',
                        subPath: 'logrotate.conf',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    env: [
                      {
                        name: 'NODE_ENV',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'NODE_ENV',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'MONGO_DB_NAME',
                        value: 'platform-db',
                      },
                      {
                        name: 'MONGO_COLLECTION',
                        value: 'iam',
                      },
                      {
                        name: 'MONGO_USERNAME',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'user',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'password',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'POD_NAME',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.name',
                          },
                        },
                      },
                      {
                        name: 'POD_NAMESPACE',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.namespace',
                          },
                        },
                      },
                      {
                        name: 'MONGO_HOST',
                        value: 'mongodb',
                      },
                      {
                        name: 'MONGO_PORT',
                        value: '27017',
                      },
                      {
                        name: 'MONGO_AUTHSOURCE',
                        value: 'admin',
                      },
                      {
                        name: 'WLP_CLIENT_ID',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_CLIENT_ID',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'WLP_CLIENT_SECRET',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_CLIENT_SECRET',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'WLP_SCOPE',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_SCOPE',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'MASTER_HOST',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'MASTER_HOST',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'OAUTH2_CLIENT_REGISTRATION_SECRET',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'OAUTH2_CLIENT_REGISTRATION_SECRET',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'SESSION_TIMEOUT',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'SESSION_TIMEOUT',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'IDTOKEN_LIFETIME',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'IDTOKEN_LIFETIME',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'OAUTH2DB_DB_HOST',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'OAUTH2DB_DB_HOST',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'OAUTH2DB_DB_PORT',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'OAUTH2DB_DB_PORT',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'OAUTH2DB_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'OAUTH2DB_PASSWORD',
                            name: 'platform-mariadb-credentials',
                          },
                        },
                      },
                      {
                        name: 'OAUTH2DB_USER',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'OAUTH2DB_USER',
                            name: 'platform-mariadb-credentials',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_USER',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_username',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_password',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'platform-auth-service',
                    ports: [
                      {
                        containerPort: 9443,
                        hostPort: 9443,
                        name: 'http',
                        protocol: 'TCP',
                      },
                      {
                        containerPort: 3100,
                        hostPort: 3100,
                        name: 'https',
                        protocol: 'TCP',
                      },
                    ],
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/',
                        port: 9443,
                        scheme: 'HTTPS',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      limits: {
                        cpu: '1',
                        memory: '1Gi',
                      },
                      requests: {
                        cpu: '100m',
                        memory: '256Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/certs/platform-auth',
                        name: 'auth-key',
                      },
                      {
                        mountPath: '/opt/ibm/ldaps',
                        name: 'ldaps-ca-cert',
                      },
                      {
                        mountPath: '/certs/mongodb-ca',
                        name: 'mongodb-ca-cert',
                      },
                      {
                        mountPath: '/certs/mongodb-client',
                        name: 'mongodb-client-cert',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    env: [
                      {
                        name: 'NODE_ENV',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'NODE_ENV',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'MONGO_DB_NAME',
                        value: 'platform-db',
                      },
                      {
                        name: 'SERVICE_NAME',
                        value: 'platform-identity-provider',
                      },
                      {
                        name: 'AUDIT_ENABLED',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'AUDIT_ENABLED_IDPROVIDER',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'POD_NAME',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.name',
                          },
                        },
                      },
                      {
                        name: 'POD_NAMESPACE',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.namespace',
                          },
                        },
                      },
                      {
                        name: 'ENCRYPTION_KEY',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'ENCRYPTION_KEY',
                            name: 'platform-auth-idp-encryption',
                          },
                        },
                      },
                      {
                        name: 'algorithm',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'algorithm',
                            name: 'platform-auth-idp-encryption',
                          },
                        },
                      },
                      {
                        name: 'inputEncoding',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'inputEncoding',
                            name: 'platform-auth-idp-encryption',
                          },
                        },
                      },
                      {
                        name: 'outputEncoding',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'outputEncoding',
                            name: 'platform-auth-idp-encryption',
                          },
                        },
                      },
                      {
                        name: 'MONGO_COLLECTION',
                        value: 'iam',
                      },
                      {
                        name: 'MONGO_USERNAME',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'user',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'password',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_HOST',
                        value: 'mongodb',
                      },
                      {
                        name: 'MONGO_PORT',
                        value: '27017',
                      },
                      {
                        name: 'MONGO_AUTHSOURCE',
                        value: 'admin',
                      },
                      {
                        name: 'OPENSHIFT_URL',
                        value: 'https://mycluster.icp:8443',
                      },
                      {
                        name: 'IS_OPENSHIFT_ENV',
                        value: 'false',
                      },
                      {
                        name: 'IDENTITY_PROVIDER_URL',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'IDENTITY_PROVIDER_URL',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'BASE_AUTH_URL',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'BASE_AUTH_URL',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'BASE_OIDC_URL',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'BASE_OIDC_URL',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'OIDC_ISSUER_URL',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'OIDC_ISSUER_URL',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'wlpClientId',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_CLIENT_ID',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'wlpClientSecret',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_CLIENT_SECRET',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'IDMGMT_KUBEDNS_NAME',
                        value: '127.0.0.1',
                      },
                      {
                        name: 'HTTP_ONLY',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'HTTP_ONLY',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'POD_NAME',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.name',
                          },
                        },
                      },
                      {
                        name: 'POD_NAMESPACE',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.namespace',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_USER',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_username',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_password',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-identity-provider:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'platform-identity-provider',
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/',
                        port: 4300,
                        scheme: 'HTTP',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      limits: {
                        cpu: '1',
                        memory: '1Gi',
                      },
                      requests: {
                        cpu: '50m',
                        memory: '128Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/opt/ibm/identity-provider/server/boot/auth-key',
                        name: 'auth-key',
                      },
                      {
                        mountPath: '/var/log/audit',
                        name: 'shared',
                      },
                      {
                        mountPath: '/certs/mongodb-ca',
                        name: 'mongodb-ca-cert',
                      },
                      {
                        mountPath: '/certs/mongodb-client',
                        name: 'mongodb-client-cert',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    env: [
                      {
                        name: 'NODE_ENV',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'NODE_ENV',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'MONGO_DB_NAME',
                        value: 'platform-db',
                      },
                      {
                        name: 'SERVICE_NAME',
                        value: 'platform-identity-management',
                      },
                      {
                        name: 'AUDIT_ENABLED',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'AUDIT_ENABLED_IDMGMT',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'POD_NAME',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.name',
                          },
                        },
                      },
                      {
                        name: 'POD_NAMESPACE',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.namespace',
                          },
                        },
                      },
                      {
                        name: 'MONGO_COLLECTION',
                        value: 'iam',
                      },
                      {
                        name: 'MONGO_USERNAME',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'user',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'password',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_HOST',
                        value: 'mongodb',
                      },
                      {
                        name: 'MONGO_PORT',
                        value: '27017',
                      },
                      {
                        name: 'OPENSHIFT_URL',
                        value: 'https://mycluster.icp:8443',
                      },
                      {
                        name: 'IS_OPENSHIFT_ENV',
                        value: 'false',
                      },
                      {
                        name: 'MONGO_AUTHSOURCE',
                        value: 'admin',
                      },
                      {
                        name: 'IDENTITY_AUTH_DIRECTORY_URL',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'IDENTITY_AUTH_DIRECTORY_URL',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'OIDC_ISSUER_URL',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'OIDC_ISSUER_URL',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'CLUSTER_NAME',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'CLUSTER_NAME',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_USER',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_username',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_password',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'IDPROVIDER_KUBEDNS_NAME',
                        value: 'https://127.0.0.1',
                      },
                      {
                        name: 'KUBE_APISERVER_HOST',
                        value: 'kubernetes.default',
                      },
                      {
                        name: 'MASTER_NODES_LIST',
                        value: '9.42.82.240',
                      },
                      {
                        name: 'LOCAL_NODE_IP',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'status.hostIP',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-identity-manager:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'platform-identity-manager',
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/',
                        port: 4500,
                        scheme: 'HTTP',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      limits: {
                        cpu: '1',
                        memory: '1Gi',
                      },
                      requests: {
                        cpu: '50m',
                        memory: '128Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/opt/ibm/identity-mgmt/certs',
                        name: 'cluster-ca',
                      },
                      {
                        mountPath: '/var/log/audit',
                        name: 'shared',
                      },
                      {
                        mountPath: '/certs/mongodb-ca',
                        name: 'mongodb-ca-cert',
                      },
                      {
                        mountPath: '/certs/mongodb-client',
                        name: 'mongodb-client-cert',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                initContainers: [
                  {
                    command: [
                      'sh',
                      '-c',
                      'until curl  mariadb:3306 --output dummy.txt ; do sleep 2; done;',
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'init-mariadb',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  master: 'true',
                },
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 60,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    hostPath: {
                      path: '/run/systemd/journal',
                      type: '',
                    },
                    name: 'journal',
                  },
                  {
                    name: 'identity-provider-crt',
                    secret: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'tls.key',
                          path: 'tls.key',
                        },
                        {
                          key: 'tls.crt',
                          path: 'tls.crt',
                        },
                      ],
                      secretName: 'identity-provider-secret',
                    },
                  },
                  {
                    emptyDir: {},
                    name: 'shared',
                  },
                  {
                    configMap: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'logrotate',
                          path: 'audit',
                        },
                      ],
                      name: 'platform-auth-idp',
                    },
                    name: 'logrotate',
                  },
                  {
                    configMap: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'logrotate-conf',
                          path: 'logrotate.conf',
                        },
                      ],
                      name: 'platform-auth-idp',
                    },
                    name: 'logrotate-conf',
                  },
                  {
                    name: 'auth-key',
                    secret: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'tls.key',
                          path: 'platformauth-key.crt',
                        },
                        {
                          key: 'tls.crt',
                          path: 'platformauth.crt',
                        },
                      ],
                      secretName: 'platform-auth-secret',
                    },
                  },
                  {
                    name: 'cluster-ca',
                    secret: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'tls.key',
                          path: 'ca.key',
                        },
                        {
                          key: 'tls.crt',
                          path: 'ca.crt',
                        },
                      ],
                      secretName: 'cluster-ca-cert',
                    },
                  },
                  {
                    name: 'ldaps-ca-cert',
                    secret: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'certificate',
                          path: 'ldaps-ca.crt',
                        },
                      ],
                      secretName: 'platform-auth-ldaps-ca-cert',
                    },
                  },
                  {
                    name: 'mongodb-ca-cert',
                    secret: {
                      defaultMode: 420,
                      secretName: 'cluster-ca-cert',
                    },
                  },
                  {
                    name: 'mongodb-client-cert',
                    secret: {
                      defaultMode: 420,
                      secretName: 'icp-mongodb-client-cert',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:14:12Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-28T04:41:17Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:12:58Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://3f4159449cc10a609b8bf519063302bb847409bc79deacc6cfbe6275be5c9fdc',
                    image: 'www.ibm.com/ibmcom-amd64/icp-audit-service:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-audit-service@sha256:9add202c06a43da647380c860d9139fa059701fe103c1f229281215bf99dbbd3',
                    lastState: {},
                    name: 'icp-audit-service',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:15:02Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://5abb68a972437711721b774a8b895de44311e91cf620ba08641620285382713f',
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-platform-auth@sha256:abc258009b8696a83214b7a9d9df63f6d83e19cfca2987c4836b0eadfa4c99c7',
                    lastState: {},
                    name: 'platform-auth-service',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:15:03Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://ad7a3b8016beade78f3d5f446b92a14f5876abfa8dbe56ba20c5f8e39c8017ec',
                    image: 'www.ibm.com/ibmcom-amd64/icp-identity-manager:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-identity-manager@sha256:632f31acd0fcfc3d0cebea31cfb71018f6712bd1a1b4da7476942b3c23aa3521',
                    lastState: {},
                    name: 'platform-identity-manager',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:15:34Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://f030229fbde1569778af499dc19eac255d53c0fec0a1ec7bb671a86ce44b7e8d',
                    image: 'www.ibm.com/ibmcom-amd64/icp-identity-provider:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-identity-provider@sha256:24dba8b07c8295eef99abbf8d83041908516e4e50e4e4cfbbbcd53bdf415dda1',
                    lastState: {},
                    name: 'platform-identity-provider',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:15:16Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                initContainerStatuses: [
                  {
                    containerID: 'docker://cf80c8db4e9d7a4a225107f877c088ae33475c0df7794b27e5c3d45e34dbeada',
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-platform-auth@sha256:abc258009b8696a83214b7a9d9df63f6d83e19cfca2987c4836b0eadfa4c99c7',
                    lastState: {},
                    name: 'init-mariadb',
                    ready: true,
                    restartCount: 0,
                    state: {
                      terminated: {
                        containerID: 'docker://cf80c8db4e9d7a4a225107f877c088ae33475c0df7794b27e5c3d45e34dbeada',
                        exitCode: 0,
                        finishedAt: '2018-10-08T14:14:12Z',
                        reason: 'Completed',
                        startedAt: '2018-10-08T14:14:12Z',
                      },
                    },
                  },
                ],
                phase: 'Running',
                podIP: '10.1.28.206',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:12:58Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:13:06Z',
                generateName: 'auth-pap-',
                labels: {
                  component: 'auth-pap',
                  'controller-revision-hash': '831787736',
                  'k8s-app': 'auth-pap',
                  'pod-template-generation': '1',
                  release: 'auth-pap',
                },
                name: 'auth-pap-dqsnz',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'auth-pap',
                    uid: '46cecd75-cb04-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '3683393',
                selfLink: '/api/v1/namespaces/kube-system/pods/auth-pap-dqsnz',
                uid: '46d08ea4-cb04-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'APP_ENVIRONMENT',
                        value: 'production',
                      },
                      {
                        name: 'NODE_EXTRA_CA_CERTS',
                        value: '/certs/cluster-ca/ca.crt',
                      },
                      {
                        name: 'CHECK_BUILD_TEST',
                        value: 'ENABLE',
                      },
                      {
                        name: 'MONGO_DB',
                        value: 'platform-db',
                      },
                      {
                        name: 'MONGO_COLLECTION',
                        value: 'iam',
                      },
                      {
                        name: 'MONGO_USERNAME',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'user',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'password',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_HOST',
                        value: 'mongodb',
                      },
                      {
                        name: 'MONGO_PORT',
                        value: '27017',
                      },
                      {
                        name: 'MONGO_AUTHSOURCE',
                        value: 'admin',
                      },
                      {
                        name: 'DB_NAME',
                        value: 'platform-db',
                      },
                      {
                        name: 'IAM_USER',
                        value: 'iam',
                      },
                      {
                        name: 'PDP_URL',
                        value: 'https://iam-pdp:7998',
                      },
                      {
                        name: 'PLATFORM',
                        value: 'container',
                      },
                      {
                        name: 'DEFAULT_ADMIN_USER',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_username',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_password',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'IDENTITY_PROVIDER_URL',
                        value: 'https://platform-identity-provider:4300',
                      },
                      {
                        name: 'IDENTITY_MGMT_URL',
                        value: 'https://platform-identity-management:4500',
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/iam-policy-administration:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'auth-pap',
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/v1/health',
                        port: 39001,
                        scheme: 'HTTP',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      limits: {
                        cpu: '1',
                        memory: '1Gi',
                      },
                      requests: {
                        cpu: '50m',
                        memory: '200Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/certs/mongodb-ca',
                        name: 'mongodb-ca-cert',
                      },
                      {
                        mountPath: '/certs/mongodb-client',
                        name: 'mongodb-client-cert',
                      },
                      {
                        mountPath: '/certs/cluster-ca',
                        name: 'cluster-ca',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  master: 'true',
                },
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 60,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    name: 'mongodb-ca-cert',
                    secret: {
                      defaultMode: 420,
                      secretName: 'cluster-ca-cert',
                    },
                  },
                  {
                    name: 'mongodb-client-cert',
                    secret: {
                      defaultMode: 420,
                      secretName: 'icp-mongodb-client-cert',
                    },
                  },
                  {
                    name: 'cluster-ca',
                    secret: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'tls.key',
                          path: 'ca.key',
                        },
                        {
                          key: 'tls.crt',
                          path: 'ca.crt',
                        },
                      ],
                      secretName: 'cluster-ca-cert',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:13:06Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-27T23:59:40Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:13:06Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://c0692c7f001dd510be8efee5d0c00dcae601982f044d720330274801198c4ac1',
                    image: 'www.ibm.com/ibmcom-amd64/iam-policy-administration:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/iam-policy-administration@sha256:e1941aa09a5b692505cb3be3e497d3ff9acb900786b9a2c8c4c00d0243b37dd0',
                    lastState: {},
                    name: 'auth-pap',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:14:49Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                phase: 'Running',
                podIP: '10.1.28.207',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:13:06Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:13:10Z',
                generateName: 'auth-pdp-',
                labels: {
                  component: 'auth-pdp',
                  'controller-revision-hash': '3709421842',
                  'k8s-app': 'auth-pdp',
                  'pod-template-generation': '1',
                  release: 'auth-pdp',
                },
                name: 'auth-pdp-brpms',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'auth-pdp',
                    uid: '49145ec8-cb04-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '2371',
                selfLink: '/api/v1/namespaces/kube-system/pods/auth-pdp-brpms',
                uid: '4916e1e5-cb04-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    image: 'www.ibm.com/ibmcom-amd64/icp-audit-service:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'icp-audit-service',
                    resources: {
                      limits: {
                        cpu: '200m',
                        memory: '512Mi',
                      },
                      requests: {
                        cpu: '100m',
                        memory: '256Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/app/logs/audit',
                        name: 'shared',
                      },
                      {
                        mountPath: '/run/systemd/journal',
                        name: 'journal',
                      },
                      {
                        mountPath: '/etc/logrotate.d/audit',
                        name: 'logrotate',
                        subPath: 'audit',
                      },
                      {
                        mountPath: '/etc/logrotate.conf',
                        name: 'logrotate-conf',
                        subPath: 'logrotate.conf',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    env: [
                      {
                        name: 'DEFAULT_ADMIN_USER',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_username',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'AUDIT_ENABLED',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'AUDIT_ENABLED',
                            name: 'auth-pdp',
                          },
                        },
                      },
                      {
                        name: 'DEFAULT_ADMIN_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'admin_password',
                            name: 'platform-auth-idp-credentials',
                          },
                        },
                      },
                      {
                        name: 'POD_NAME',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.name',
                          },
                        },
                      },
                      {
                        name: 'POD_NAMESPACE',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'metadata.namespace',
                          },
                        },
                      },
                      {
                        name: 'CLUSTER_NAME',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'CLUSTER_NAME',
                            name: 'platform-auth-idp',
                          },
                        },
                      },
                      {
                        name: 'MONGO_DB',
                        value: 'platform-db',
                      },
                      {
                        name: 'MONGO_COLLECTION',
                        value: 'iam',
                      },
                      {
                        name: 'MONGO_USERNAME',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'user',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_PASSWORD',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'password',
                            name: 'icp-mongodb-admin',
                          },
                        },
                      },
                      {
                        name: 'MONGO_HOST',
                        value: 'mongodb',
                      },
                      {
                        name: 'MONGO_PORT',
                        value: '27017',
                      },
                      {
                        name: 'MONGO_AUTHSOURCE',
                        value: 'admin',
                      },
                      {
                        name: 'CF_DB_NAME',
                        value: 'security-data',
                      },
                      {
                        name: 'DB_NAME',
                        value: 'platform-db',
                      },
                      {
                        name: 'CAMS_PDP_URL',
                        value: 'https://iam-pdp:7998',
                      },
                      {
                        name: 'IAM_TOKEN_SERVICE_URL',
                        value: 'https://iam-token-service:10443',
                      },
                      {
                        name: 'IDENTITY_PROVIDER_URL',
                        value: 'https://platform-identity-provider:4300',
                      },
                      {
                        name: 'IAM_PAP_URL',
                        value: 'https://iam-pap:39001',
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/iam-policy-decision:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'auth-pdp',
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/v1/health',
                        port: 7998,
                        scheme: 'HTTP',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      requests: {
                        cpu: '500m',
                        memory: '512Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/certs/mongodb-ca',
                        name: 'mongodb-ca-cert',
                      },
                      {
                        mountPath: '/app/logs/audit',
                        name: 'shared',
                      },
                      {
                        mountPath: '/certs/mongodb-client',
                        name: 'mongodb-client-cert',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                initContainers: [
                  {
                    command: [
                      'sh',
                      '-c',
                      'until curl -k -i -fsS https://platform-auth-service:9443/oidc/endpoint/OP/.well-known/openid-configuration | grep "200 OK"; do sleep 3; done;',
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'init-auth-service',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    command: [
                      'sh',
                      '-c',
                      'until curl -k -i -fsS https://platform-identity-provider:4300 | grep "200 OK"; do sleep 3; done;',
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'init-identity-provider',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    command: [
                      'sh',
                      '-c',
                      'until curl -k -i -fsS https://platform-identity-management:4500 | grep "200 OK"; do sleep 3; done;',
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'init-identity-manager',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    command: [
                      'sh',
                      '-c',
                      'until curl -k -i -fsS https://iam-token-service:10443/oidc/keys | grep "200 OK"; do sleep 3; done;',
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'init-token-service',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    command: [
                      'sh',
                      '-c',
                      'until curl -k -i -fsS https://iam-pap:39001/v1/health | grep "200 OK"; do sleep 3; done;',
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'init-pap',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  master: 'true',
                },
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 60,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    name: 'mongodb-ca-cert',
                    secret: {
                      defaultMode: 420,
                      secretName: 'cluster-ca-cert',
                    },
                  },
                  {
                    hostPath: {
                      path: '/run/systemd/journal',
                      type: '',
                    },
                    name: 'journal',
                  },
                  {
                    emptyDir: {},
                    name: 'shared',
                  },
                  {
                    configMap: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'logrotate',
                          path: 'audit',
                        },
                      ],
                      name: 'auth-pdp',
                    },
                    name: 'logrotate',
                  },
                  {
                    configMap: {
                      defaultMode: 420,
                      items: [
                        {
                          key: 'logrotate-conf',
                          path: 'logrotate.conf',
                        },
                      ],
                      name: 'auth-pdp',
                    },
                    name: 'logrotate-conf',
                  },
                  {
                    name: 'mongodb-client-cert',
                    secret: {
                      defaultMode: 420,
                      secretName: 'icp-mongodb-client-cert',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:17:09Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:17:39Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:13:10Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://41da476c77754444eb5dd82dd0f246d765bc3323be469e62ce7e0d7216f18e17',
                    image: 'www.ibm.com/ibmcom-amd64/iam-policy-decision:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/iam-policy-decision@sha256:d49eb3845c57bb8370a477949d92da10a178b81ade50f0e9d970981fadd6686d',
                    lastState: {},
                    name: 'auth-pdp',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:17:32Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://b15efc68e699b87b515721f201c5558095be37c08d5f68dd30cc529681d11353',
                    image: 'www.ibm.com/ibmcom-amd64/icp-audit-service:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-audit-service@sha256:9add202c06a43da647380c860d9139fa059701fe103c1f229281215bf99dbbd3',
                    lastState: {},
                    name: 'icp-audit-service',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:17:11Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                initContainerStatuses: [
                  {
                    containerID: 'docker://d9f1df1e05e57675e66309c20459298d3f68e0077ba6bd0316af49b9e34e1aad',
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-platform-auth@sha256:abc258009b8696a83214b7a9d9df63f6d83e19cfca2987c4836b0eadfa4c99c7',
                    lastState: {},
                    name: 'init-auth-service',
                    ready: true,
                    restartCount: 0,
                    state: {
                      terminated: {
                        containerID: 'docker://d9f1df1e05e57675e66309c20459298d3f68e0077ba6bd0316af49b9e34e1aad',
                        exitCode: 0,
                        finishedAt: '2018-10-08T14:17:01Z',
                        reason: 'Completed',
                        startedAt: '2018-10-08T14:14:50Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://0a7a4f8df64416a936bd70ef0a85da56ceaaecb5363051cd6a6542ab5c0b3389',
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-platform-auth@sha256:abc258009b8696a83214b7a9d9df63f6d83e19cfca2987c4836b0eadfa4c99c7',
                    lastState: {},
                    name: 'init-identity-provider',
                    ready: true,
                    restartCount: 0,
                    state: {
                      terminated: {
                        containerID: 'docker://0a7a4f8df64416a936bd70ef0a85da56ceaaecb5363051cd6a6542ab5c0b3389',
                        exitCode: 0,
                        finishedAt: '2018-10-08T14:17:02Z',
                        reason: 'Completed',
                        startedAt: '2018-10-08T14:17:02Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://2c58ebff854d561a30cf32ef171bb01c7da9de19e63a1a1b83bfe0148e21dfe5',
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-platform-auth@sha256:abc258009b8696a83214b7a9d9df63f6d83e19cfca2987c4836b0eadfa4c99c7',
                    lastState: {},
                    name: 'init-identity-manager',
                    ready: true,
                    restartCount: 0,
                    state: {
                      terminated: {
                        containerID: 'docker://2c58ebff854d561a30cf32ef171bb01c7da9de19e63a1a1b83bfe0148e21dfe5',
                        exitCode: 0,
                        finishedAt: '2018-10-08T14:17:03Z',
                        reason: 'Completed',
                        startedAt: '2018-10-08T14:17:03Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://a510cf095ec7592564e909991a7209e030fbd1ac773d93f2b7fbd0130679c068',
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-platform-auth@sha256:abc258009b8696a83214b7a9d9df63f6d83e19cfca2987c4836b0eadfa4c99c7',
                    lastState: {},
                    name: 'init-token-service',
                    ready: true,
                    restartCount: 0,
                    state: {
                      terminated: {
                        containerID: 'docker://a510cf095ec7592564e909991a7209e030fbd1ac773d93f2b7fbd0130679c068',
                        exitCode: 0,
                        finishedAt: '2018-10-08T14:17:05Z',
                        reason: 'Completed',
                        startedAt: '2018-10-08T14:17:05Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://b7998409964352012416a14318484bf44faa550d0771a0e86ec5d43760f44f0b',
                    image: 'www.ibm.com/ibmcom-amd64/icp-platform-auth:3.1.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/icp-platform-auth@sha256:abc258009b8696a83214b7a9d9df63f6d83e19cfca2987c4836b0eadfa4c99c7',
                    lastState: {},
                    name: 'init-pap',
                    ready: true,
                    restartCount: 0,
                    state: {
                      terminated: {
                        containerID: 'docker://b7998409964352012416a14318484bf44faa550d0771a0e86ec5d43760f44f0b',
                        exitCode: 0,
                        finishedAt: '2018-10-08T14:17:08Z',
                        reason: 'Completed',
                        startedAt: '2018-10-08T14:17:08Z',
                      },
                    },
                  },
                ],
                phase: 'Running',
                podIP: '10.1.28.208',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:13:10Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'privileged',
                },
                creationTimestamp: '2018-10-08T14:10:02Z',
                generateName: 'calico-kube-controllers-78d477cf58-',
                labels: {
                  app: 'calico-kube-controllers',
                  'pod-template-hash': '3480337914',
                },
                name: 'calico-kube-controllers-78d477cf58-82dhs',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'ReplicaSet',
                    name: 'calico-kube-controllers-78d477cf58',
                    uid: 'd8f22429-cb03-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '711',
                selfLink: '/api/v1/namespaces/kube-system/pods/calico-kube-controllers-78d477cf58-82dhs',
                uid: 'd8f69398-cb03-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'ETCD_ENDPOINTS',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_endpoints',
                            name: 'etcd-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_CA_CERT_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_ca',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_KEY_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_key',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_CERT_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_cert',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ENABLED_CONTROLLERS',
                        value: 'policy,profile,workloadendpoint,node',
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/calico-kube-controllers:v3.1.3',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'calico-kube-controllers',
                    resources: {
                      requests: {
                        cpu: '250m',
                        memory: '100Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/calico-secrets',
                        name: 'etcd-certs',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                hostNetwork: true,
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  role: 'master',
                },
                priority: 2000000000,
                priorityClassName: 'system-cluster-critical',
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 30,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    name: 'etcd-certs',
                    secret: {
                      defaultMode: 256,
                      secretName: 'etcd-secret',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:02Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:06Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:02Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://0a431d2cff58540c8f1ea2359f2cbcc57abc6d1c38b357146400b1242b6da299',
                    image: 'www.ibm.com/ibmcom-amd64/calico-kube-controllers:v3.1.3',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/calico-kube-controllers@sha256:0517bb47bc0f1f79695cbb244a033f00f45613cd9d4df3b49cab384cecdab63c',
                    lastState: {},
                    name: 'calico-kube-controllers',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:10:06Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                phase: 'Running',
                podIP: '9.42.82.240',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:10:02Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'privileged',
                  'prometheus.io/path': '/metrics',
                  'prometheus.io/port': '9091',
                  'prometheus.io/scrape': 'true',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:10:01Z',
                generateName: 'calico-node-',
                labels: {
                  app: 'calico-node',
                  'controller-revision-hash': '1879489521',
                  'pod-template-generation': '1',
                },
                name: 'calico-node-fzxmv',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'calico-node',
                    uid: 'd8f0404b-cb03-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '789',
                selfLink: '/api/v1/namespaces/kube-system/pods/calico-node-fzxmv',
                uid: 'd8f2e24c-cb03-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'ETCD_ENDPOINTS',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_endpoints',
                            name: 'etcd-config',
                          },
                        },
                      },
                      {
                        name: 'CALICO_NETWORKING_BACKEND',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'calico_backend',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'CLUSTER_TYPE',
                        value: 'k8s,bgp',
                      },
                      {
                        name: 'CALICO_DISABLE_FILE_LOGGING',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_DEFAULTENDPOINTTOHOSTACTION',
                        value: 'ACCEPT',
                      },
                      {
                        name: 'CALICO_IPV4POOL_CIDR',
                        value: '10.1.0.0/16',
                      },
                      {
                        name: 'CALICO_IPV4POOL_IPIP',
                        value: 'Always',
                      },
                      {
                        name: 'CALICO_K8S_NODE_REF',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'spec.nodeName',
                          },
                        },
                      },
                      {
                        name: 'FELIX_IPV6SUPPORT',
                        value: 'false',
                      },
                      {
                        name: 'FELIX_LOGSEVERITYSCREEN',
                        value: 'info',
                      },
                      {
                        name: 'FELIX_IPINIPMTU',
                        value: '1430',
                      },
                      {
                        name: 'ETCD_CA_CERT_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_ca',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_KEY_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_key',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_CERT_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_cert',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'IP',
                        value: 'autodetect',
                      },
                      {
                        name: 'FELIX_HEALTHENABLED',
                        value: 'true',
                      },
                      {
                        name: 'IP_AUTODETECTION_METHOD',
                        value: 'can-reach=9.42.82.240',
                      },
                      {
                        name: 'FELIX_PROMETHEUSMETRICSENABLED',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_PROMETHEUSMETRICSPORT',
                        value: '9091',
                      },
                      {
                        name: 'FELIX_PROMETHEUSGOMETRICSENABLED',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_PROMETHEUSPROCESSMETRICSENABLED',
                        value: 'true',
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    imagePullPolicy: 'IfNotPresent',
                    livenessProbe: {
                      failureThreshold: 6,
                      httpGet: {
                        path: '/liveness',
                        port: 9099,
                        scheme: 'HTTP',
                      },
                      initialDelaySeconds: 10,
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    name: 'calico-node',
                    ports: [
                      {
                        containerPort: 9091,
                        hostPort: 9091,
                        name: 'metrics',
                        protocol: 'TCP',
                      },
                    ],
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/readiness',
                        port: 9099,
                        scheme: 'HTTP',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      requests: {
                        cpu: '250m',
                        memory: '100Mi',
                      },
                    },
                    securityContext: {
                      privileged: true,
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/lib/modules',
                        name: 'lib-modules',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/run/calico',
                        name: 'var-run-calico',
                      },
                      {
                        mountPath: '/var/lib/calico',
                        name: 'var-lib-calico',
                      },
                      {
                        mountPath: '/calico-secrets',
                        name: 'etcd-certs',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    command: [
                      '/install-cni.sh',
                    ],
                    env: [
                      {
                        name: 'CNI_CONF_NAME',
                        value: '10-calico.conflist',
                      },
                      {
                        name: 'ETCD_ENDPOINTS',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_endpoints',
                            name: 'etcd-config',
                          },
                        },
                      },
                      {
                        name: 'CNI_NETWORK_CONFIG',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'cni_network_config',
                            name: 'calico-config',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/calico-cni:v3.1.3',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'install-cni',
                    resources: {
                      requests: {
                        cpu: '50m',
                        memory: '50Mi',
                      },
                    },
                    securityContext: {
                      privileged: true,
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/host/opt/cni/bin',
                        name: 'cni-bin-dir',
                      },
                      {
                        mountPath: '/host/etc/cni/net.d',
                        name: 'cni-net-dir',
                      },
                      {
                        mountPath: '/calico-secrets',
                        name: 'etcd-certs',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                hostNetwork: true,
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.42.82.240',
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 0,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    hostPath: {
                      path: '/lib/modules',
                      type: '',
                    },
                    name: 'lib-modules',
                  },
                  {
                    hostPath: {
                      path: '/var/run/calico',
                      type: '',
                    },
                    name: 'var-run-calico',
                  },
                  {
                    hostPath: {
                      path: '/var/lib/calico',
                      type: '',
                    },
                    name: 'var-lib-calico',
                  },
                  {
                    hostPath: {
                      path: '/opt/cni/bin',
                      type: '',
                    },
                    name: 'cni-bin-dir',
                  },
                  {
                    hostPath: {
                      path: '/etc/cni/net.d',
                      type: '',
                    },
                    name: 'cni-net-dir',
                  },
                  {
                    name: 'etcd-certs',
                    secret: {
                      defaultMode: 256,
                      secretName: 'etcd-secret',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:02Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:21Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:02Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://a0753579b0cea2f6262863f9ebaf8be99cdc99206c18397394cdc6b27c94ea0a',
                    image: 'www.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/calico-node@sha256:284b7823a38d58a79605b35eb508976b3302ef87d0b51ff274540b67536b8be5',
                    lastState: {},
                    name: 'calico-node',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:10:13Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://7a11e33728050b955d17e61fb69310622db056ae66a9fb6acb30deb3663aa207',
                    image: 'www.ibm.com/ibmcom-amd64/calico-cni:v3.1.3',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/calico-cni@sha256:0b4eb34f955f35f8d1b182267f7ae9e2be83ca6fe1b1ade63116125feb8d07b9',
                    lastState: {},
                    name: 'install-cni',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:10:18Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                phase: 'Running',
                podIP: '9.42.82.240',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:10:02Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'privileged',
                  'prometheus.io/path': '/metrics',
                  'prometheus.io/port': '9091',
                  'prometheus.io/scrape': 'true',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:10:02Z',
                generateName: 'calico-node-',
                labels: {
                  app: 'calico-node',
                  'controller-revision-hash': '1879489521',
                  'pod-template-generation': '1',
                },
                name: 'calico-node-k8xb6',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'calico-node',
                    uid: 'd8f0404b-cb03-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '793',
                selfLink: '/api/v1/namespaces/kube-system/pods/calico-node-k8xb6',
                uid: 'd8f62ada-cb03-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'ETCD_ENDPOINTS',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_endpoints',
                            name: 'etcd-config',
                          },
                        },
                      },
                      {
                        name: 'CALICO_NETWORKING_BACKEND',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'calico_backend',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'CLUSTER_TYPE',
                        value: 'k8s,bgp',
                      },
                      {
                        name: 'CALICO_DISABLE_FILE_LOGGING',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_DEFAULTENDPOINTTOHOSTACTION',
                        value: 'ACCEPT',
                      },
                      {
                        name: 'CALICO_IPV4POOL_CIDR',
                        value: '10.1.0.0/16',
                      },
                      {
                        name: 'CALICO_IPV4POOL_IPIP',
                        value: 'Always',
                      },
                      {
                        name: 'CALICO_K8S_NODE_REF',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'spec.nodeName',
                          },
                        },
                      },
                      {
                        name: 'FELIX_IPV6SUPPORT',
                        value: 'false',
                      },
                      {
                        name: 'FELIX_LOGSEVERITYSCREEN',
                        value: 'info',
                      },
                      {
                        name: 'FELIX_IPINIPMTU',
                        value: '1430',
                      },
                      {
                        name: 'ETCD_CA_CERT_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_ca',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_KEY_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_key',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_CERT_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_cert',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'IP',
                        value: 'autodetect',
                      },
                      {
                        name: 'FELIX_HEALTHENABLED',
                        value: 'true',
                      },
                      {
                        name: 'IP_AUTODETECTION_METHOD',
                        value: 'can-reach=9.42.82.240',
                      },
                      {
                        name: 'FELIX_PROMETHEUSMETRICSENABLED',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_PROMETHEUSMETRICSPORT',
                        value: '9091',
                      },
                      {
                        name: 'FELIX_PROMETHEUSGOMETRICSENABLED',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_PROMETHEUSPROCESSMETRICSENABLED',
                        value: 'true',
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    imagePullPolicy: 'IfNotPresent',
                    livenessProbe: {
                      failureThreshold: 6,
                      httpGet: {
                        path: '/liveness',
                        port: 9099,
                        scheme: 'HTTP',
                      },
                      initialDelaySeconds: 10,
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    name: 'calico-node',
                    ports: [
                      {
                        containerPort: 9091,
                        hostPort: 9091,
                        name: 'metrics',
                        protocol: 'TCP',
                      },
                    ],
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/readiness',
                        port: 9099,
                        scheme: 'HTTP',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      requests: {
                        cpu: '250m',
                        memory: '100Mi',
                      },
                    },
                    securityContext: {
                      privileged: true,
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/lib/modules',
                        name: 'lib-modules',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/run/calico',
                        name: 'var-run-calico',
                      },
                      {
                        mountPath: '/var/lib/calico',
                        name: 'var-lib-calico',
                      },
                      {
                        mountPath: '/calico-secrets',
                        name: 'etcd-certs',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    command: [
                      '/install-cni.sh',
                    ],
                    env: [
                      {
                        name: 'CNI_CONF_NAME',
                        value: '10-calico.conflist',
                      },
                      {
                        name: 'ETCD_ENDPOINTS',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_endpoints',
                            name: 'etcd-config',
                          },
                        },
                      },
                      {
                        name: 'CNI_NETWORK_CONFIG',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'cni_network_config',
                            name: 'calico-config',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/calico-cni:v3.1.3',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'install-cni',
                    resources: {
                      requests: {
                        cpu: '50m',
                        memory: '50Mi',
                      },
                    },
                    securityContext: {
                      privileged: true,
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/host/opt/cni/bin',
                        name: 'cni-bin-dir',
                      },
                      {
                        mountPath: '/host/etc/cni/net.d',
                        name: 'cni-net-dir',
                      },
                      {
                        mountPath: '/calico-secrets',
                        name: 'etcd-certs',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                hostNetwork: true,
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.37.220.141',
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 0,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    hostPath: {
                      path: '/lib/modules',
                      type: '',
                    },
                    name: 'lib-modules',
                  },
                  {
                    hostPath: {
                      path: '/var/run/calico',
                      type: '',
                    },
                    name: 'var-run-calico',
                  },
                  {
                    hostPath: {
                      path: '/var/lib/calico',
                      type: '',
                    },
                    name: 'var-lib-calico',
                  },
                  {
                    hostPath: {
                      path: '/opt/cni/bin',
                      type: '',
                    },
                    name: 'cni-bin-dir',
                  },
                  {
                    hostPath: {
                      path: '/etc/cni/net.d',
                      type: '',
                    },
                    name: 'cni-net-dir',
                  },
                  {
                    name: 'etcd-certs',
                    secret: {
                      defaultMode: 256,
                      secretName: 'etcd-secret',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:02Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:24Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:02Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://239ef5c4ef7d9093e8eab1dd9b490d968ef9b3c7c1f48fe3a92b3e5e58c0a60d',
                    image: 'www.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/calico-node@sha256:284b7823a38d58a79605b35eb508976b3302ef87d0b51ff274540b67536b8be5',
                    lastState: {},
                    name: 'calico-node',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:10:11Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://09f8905e9db7c95ec2c9f245dc36e32ef56c92f0d50b59ba1b71736a7c41a7fe',
                    image: 'www.ibm.com/ibmcom-amd64/calico-cni:v3.1.3',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/calico-cni@sha256:0b4eb34f955f35f8d1b182267f7ae9e2be83ca6fe1b1ade63116125feb8d07b9',
                    lastState: {},
                    name: 'install-cni',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:10:15Z',
                      },
                    },
                  },
                ],
                hostIP: '9.37.220.141',
                phase: 'Running',
                podIP: '9.37.220.141',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:10:02Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'privileged',
                  'prometheus.io/path': '/metrics',
                  'prometheus.io/port': '9091',
                  'prometheus.io/scrape': 'true',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:10:02Z',
                generateName: 'calico-node-',
                labels: {
                  app: 'calico-node',
                  'controller-revision-hash': '1879489521',
                  'pod-template-generation': '1',
                },
                name: 'calico-node-mhz49',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'calico-node',
                    uid: 'd8f0404b-cb03-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '3771224',
                selfLink: '/api/v1/namespaces/kube-system/pods/calico-node-mhz49',
                uid: 'd8f8d122-cb03-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'ETCD_ENDPOINTS',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_endpoints',
                            name: 'etcd-config',
                          },
                        },
                      },
                      {
                        name: 'CALICO_NETWORKING_BACKEND',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'calico_backend',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'CLUSTER_TYPE',
                        value: 'k8s,bgp',
                      },
                      {
                        name: 'CALICO_DISABLE_FILE_LOGGING',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_DEFAULTENDPOINTTOHOSTACTION',
                        value: 'ACCEPT',
                      },
                      {
                        name: 'CALICO_IPV4POOL_CIDR',
                        value: '10.1.0.0/16',
                      },
                      {
                        name: 'CALICO_IPV4POOL_IPIP',
                        value: 'Always',
                      },
                      {
                        name: 'CALICO_K8S_NODE_REF',
                        valueFrom: {
                          fieldRef: {
                            apiVersion: 'v1',
                            fieldPath: 'spec.nodeName',
                          },
                        },
                      },
                      {
                        name: 'FELIX_IPV6SUPPORT',
                        value: 'false',
                      },
                      {
                        name: 'FELIX_LOGSEVERITYSCREEN',
                        value: 'info',
                      },
                      {
                        name: 'FELIX_IPINIPMTU',
                        value: '1430',
                      },
                      {
                        name: 'ETCD_CA_CERT_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_ca',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_KEY_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_key',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'ETCD_CERT_FILE',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_cert',
                            name: 'calico-config',
                          },
                        },
                      },
                      {
                        name: 'IP',
                        value: 'autodetect',
                      },
                      {
                        name: 'FELIX_HEALTHENABLED',
                        value: 'true',
                      },
                      {
                        name: 'IP_AUTODETECTION_METHOD',
                        value: 'can-reach=9.42.82.240',
                      },
                      {
                        name: 'FELIX_PROMETHEUSMETRICSENABLED',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_PROMETHEUSMETRICSPORT',
                        value: '9091',
                      },
                      {
                        name: 'FELIX_PROMETHEUSGOMETRICSENABLED',
                        value: 'true',
                      },
                      {
                        name: 'FELIX_PROMETHEUSPROCESSMETRICSENABLED',
                        value: 'true',
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    imagePullPolicy: 'IfNotPresent',
                    livenessProbe: {
                      failureThreshold: 6,
                      httpGet: {
                        path: '/liveness',
                        port: 9099,
                        scheme: 'HTTP',
                      },
                      initialDelaySeconds: 10,
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    name: 'calico-node',
                    ports: [
                      {
                        containerPort: 9091,
                        hostPort: 9091,
                        name: 'metrics',
                        protocol: 'TCP',
                      },
                    ],
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/readiness',
                        port: 9099,
                        scheme: 'HTTP',
                      },
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 1,
                    },
                    resources: {
                      requests: {
                        cpu: '250m',
                        memory: '100Mi',
                      },
                    },
                    securityContext: {
                      privileged: true,
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/lib/modules',
                        name: 'lib-modules',
                        readOnly: true,
                      },
                      {
                        mountPath: '/var/run/calico',
                        name: 'var-run-calico',
                      },
                      {
                        mountPath: '/var/lib/calico',
                        name: 'var-lib-calico',
                      },
                      {
                        mountPath: '/calico-secrets',
                        name: 'etcd-certs',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                  {
                    command: [
                      '/install-cni.sh',
                    ],
                    env: [
                      {
                        name: 'CNI_CONF_NAME',
                        value: '10-calico.conflist',
                      },
                      {
                        name: 'ETCD_ENDPOINTS',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'etcd_endpoints',
                            name: 'etcd-config',
                          },
                        },
                      },
                      {
                        name: 'CNI_NETWORK_CONFIG',
                        valueFrom: {
                          configMapKeyRef: {
                            key: 'cni_network_config',
                            name: 'calico-config',
                          },
                        },
                      },
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/calico-cni:v3.1.3',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'install-cni',
                    resources: {
                      requests: {
                        cpu: '50m',
                        memory: '50Mi',
                      },
                    },
                    securityContext: {
                      privileged: true,
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/host/opt/cni/bin',
                        name: 'cni-bin-dir',
                      },
                      {
                        mountPath: '/host/etc/cni/net.d',
                        name: 'cni-net-dir',
                      },
                      {
                        mountPath: '/calico-secrets',
                        name: 'etcd-certs',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                hostNetwork: true,
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.37.247.195',
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 0,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    hostPath: {
                      path: '/lib/modules',
                      type: '',
                    },
                    name: 'lib-modules',
                  },
                  {
                    hostPath: {
                      path: '/var/run/calico',
                      type: '',
                    },
                    name: 'var-run-calico',
                  },
                  {
                    hostPath: {
                      path: '/var/lib/calico',
                      type: '',
                    },
                    name: 'var-lib-calico',
                  },
                  {
                    hostPath: {
                      path: '/opt/cni/bin',
                      type: '',
                    },
                    name: 'cni-bin-dir',
                  },
                  {
                    hostPath: {
                      path: '/etc/cni/net.d',
                      type: '',
                    },
                    name: 'cni-net-dir',
                  },
                  {
                    name: 'etcd-certs',
                    secret: {
                      defaultMode: 256,
                      secretName: 'etcd-secret',
                    },
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:02Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:21Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:10:02Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://f07636a97995df19899ce5ee4e08bfdb8882d8b30f66fff10e1551e8e3c07e4c',
                    image: 'www.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/calico-node@sha256:284b7823a38d58a79605b35eb508976b3302ef87d0b51ff274540b67536b8be5',
                    lastState: {},
                    name: 'calico-node',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:10:10Z',
                      },
                    },
                  },
                  {
                    containerID: 'docker://dec02e86c3b0f2c7f0751e4c53e474a64ed49f6594ec4b3001eeb069e7a49c41',
                    image: 'www.ibm.com/ibmcom-amd64/calico-cni:v3.1.3',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/calico-cni@sha256:0b4eb34f955f35f8d1b182267f7ae9e2be83ca6fe1b1ade63116125feb8d07b9',
                    lastState: {},
                    name: 'install-cni',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:10:14Z',
                      },
                    },
                  },
                ],
                hostIP: '9.37.247.195',
                phase: 'Running',
                podIP: '9.37.247.195',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:10:02Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-12T12:42:39Z',
                generateName: 'catalog-ui-',
                labels: {
                  'controller-revision-hash': '3478305044',
                  'k8s-app': 'catalog-ui',
                  'pod-template-generation': '3',
                },
                name: 'catalog-ui-jc5v5',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'DaemonSet',
                    name: 'catalog-ui',
                    uid: '727807a5-cb05-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '753001',
                selfLink: '/api/v1/namespaces/kube-system/pods/catalog-ui-jc5v5',
                uid: '4d8c53e8-ce1c-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    env: [
                      {
                        name: 'cfcRouterUrl',
                        value: 'https://icp-management-ingress:8443',
                      },
                      {
                        name: 'catalogApiRouteUrl',
                        value: 'https://icp-management-ingress:8443/helm-api',
                      },
                      {
                        name: 'WLP_CLIENT_ID',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_CLIENT_ID',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'WLP_CLIENT_SECRET',
                        valueFrom: {
                          secretKeyRef: {
                            key: 'WLP_CLIENT_SECRET',
                            name: 'platform-oidc-credentials',
                          },
                        },
                      },
                      {
                        name: 'PLATFORM_IDENTITY_PROVIDER_URL',
                        value: 'https://platform-identity-provider:4300',
                      },
                      {
                        name: 'WLP_REDIRECT_URL',
                        value: 'https://localhost:3000/auth/liberty/callback',
                      },
                    ],
                    image: 'www.ibm.com/ibmcom/icp-catalog-ui-amd64:3.1.0-mcm',
                    imagePullPolicy: 'Always',
                    name: 'catalog-ui',
                    resources: {
                      limits: {
                        cpu: '300m',
                        memory: '300Mi',
                      },
                      requests: {
                        cpu: '300m',
                        memory: '300Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'mcm-ibm-mcm-chart-dev-regcred',
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  master: 'true',
                },
                priority: 0,
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 60,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/disk-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                  },
                ],
                volumes: [
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-12T12:42:39Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-12T12:43:08Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-12T12:42:39Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://e2781804b8caefb902c03188875b9b68189348edce4a642ae998cce8a6222fb7',
                    image: 'www.ibm.com/ibmcom/icp-catalog-ui-amd64:3.1.0-mcm',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom/icp-catalog-ui-amd64@sha256:552ca61f749781480ceda93c811000455108c4cd4012ef2ea06b9d13a9985469',
                    lastState: {},
                    name: 'catalog-ui',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-12T12:43:07Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                phase: 'Running',
                podIP: '10.1.28.248',
                qosClass: 'Guaranteed',
                startTime: '2018-10-12T12:42:39Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:19:46Z',
                generateName: 'custom-metrics-adapter-5dfb859b4b-',
                labels: {
                  app: 'custom-metrics-adapter',
                  chart: 'ibm-custom-metrics-adapter-3.1.0',
                  heritage: 'Tiller',
                  'pod-template-hash': '1896415606',
                  release: 'custom-metrics-adapter',
                },
                name: 'custom-metrics-adapter-5dfb859b4b-2xr86',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'ReplicaSet',
                    name: 'custom-metrics-adapter-5dfb859b4b',
                    uid: '3514e6a4-cb05-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '4915',
                selfLink: '/api/v1/namespaces/kube-system/pods/custom-metrics-adapter-5dfb859b4b-2xr86',
                uid: '3516555e-cb05-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    args: [
                      '/adapter',
                      '--secure-port=6443',
                      '--tls-cert-file=/var/run/serving-cert/serving.crt',
                      '--tls-private-key-file=/var/run/serving-cert/serving.key',
                      '--logtostderr=true',
                      '--prometheus-url=https://monitoring-prometheus:9090',
                      '--prometheus-auth-incluster=false',
                      '--metrics-relist-interval=1m',
                      '--rate-interval=5m',
                      '--v=1',
                      '--prometheus-auth-config=/prometheus/prometheus-auth-config',
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/k8s-prometheus-adapter:v0.2.1.1',
                    imagePullPolicy: 'IfNotPresent',
                    livenessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/healthz',
                        port: 6443,
                        scheme: 'HTTPS',
                      },
                      initialDelaySeconds: 30,
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 3,
                    },
                    name: 'custom-metrics-adapter',
                    ports: [
                      {
                        containerPort: 6443,
                        protocol: 'TCP',
                      },
                    ],
                    readinessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/healthz',
                        port: 6443,
                        scheme: 'HTTPS',
                      },
                      initialDelaySeconds: 30,
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 3,
                    },
                    resources: {
                      requests: {
                        cpu: '256m',
                        memory: '256Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/serving-cert',
                        name: 'custom-metrics-adapter-secret-volume',
                      },
                      {
                        mountPath: '/opt/ibm/monitoring/certs',
                        name: 'monitoring-client-certs',
                      },
                      {
                        mountPath: '/prometheus',
                        name: 'custom-metrics-adapter-config-volume',
                      },
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                initContainers: [
                  {
                    command: [
                      'sh',
                      '-c',
                      'until curl --connect-timeout 5  -k https://monitoring-prometheus:9090 --output /dev/null ; do sleep 2; done;',
                    ],
                    image: 'www.ibm.com/ibmcom-amd64/curl:4.0.0',
                    imagePullPolicy: 'IfNotPresent',
                    name: 'init-adapter',
                    resources: {},
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  management: 'true',
                },
                priority: 2000000000,
                priorityClassName: 'system-cluster-critical',
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 30,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                    tolerationSeconds: 300,
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                    tolerationSeconds: 300,
                  },
                ],
                volumes: [
                  {
                    name: 'custom-metrics-adapter-secret-volume',
                    secret: {
                      defaultMode: 420,
                      secretName: 'custom-metrics-adapter-secret',
                    },
                  },
                  {
                    name: 'monitoring-client-certs',
                    secret: {
                      defaultMode: 420,
                      secretName: 'monitoring-monitoring-client-certs',
                    },
                  },
                  {
                    configMap: {
                      defaultMode: 420,
                      name: 'custom-metrics-adapter-config',
                    },
                    name: 'custom-metrics-adapter-config-volume',
                  },
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:25:51Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:26:32Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:19:46Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://17efce5d41d144a6209bae7c9601d89aa8008fd9591a1758787a5f64a94d307d',
                    image: 'www.ibm.com/ibmcom-amd64/k8s-prometheus-adapter:v0.2.1.1',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/k8s-prometheus-adapter@sha256:836b00cb9848b3843a957d6bdde1bb0827ab47195a1faf3c553a692342e2abfa',
                    lastState: {},
                    name: 'custom-metrics-adapter',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:25:58Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                initContainerStatuses: [
                  {
                    containerID: 'docker://969977de969ea12ad5c98222b134466e0766a92e672d61735d6f0cd98ad8452e',
                    image: 'www.ibm.com/ibmcom-amd64/curl:4.0.0',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/curl@sha256:aad05b4e4529f7e70516d8d3028cae6cd1d50de738ce164f2a532ce2470ac43f',
                    lastState: {},
                    name: 'init-adapter',
                    ready: true,
                    restartCount: 0,
                    state: {
                      terminated: {
                        containerID: 'docker://969977de969ea12ad5c98222b134466e0766a92e672d61735d6f0cd98ad8452e',
                        exitCode: 0,
                        finishedAt: '2018-10-08T14:25:50Z',
                        reason: 'Completed',
                        startedAt: '2018-10-08T14:24:15Z',
                      },
                    },
                  },
                ],
                phase: 'Running',
                podIP: '10.1.28.234',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:19:46Z',
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Pod',
              metadata: {
                annotations: {
                  'kubernetes.io/psp': 'default',
                  'scheduler.alpha.kubernetes.io/critical-pod': '',
                },
                creationTimestamp: '2018-10-08T14:11:39Z',
                generateName: 'default-backend-5c6c964bf5-',
                labels: {
                  app: 'default-backend',
                  component: 'default-backend',
                  'pod-template-hash': '1727520691',
                  release: 'nginx-ingress',
                },
                name: 'default-backend-5c6c964bf5-fws56',
                namespace: 'kube-system',
                ownerReferences: [
                  {
                    apiVersion: 'apps/v1',
                    blockOwnerDeletion: true,
                    controller: true,
                    kind: 'ReplicaSet',
                    name: 'default-backend-5c6c964bf5',
                    uid: '12f18e79-cb04-11e8-8a17-005056a0b88e',
                  },
                ],
                resourceVersion: '1326',
                selfLink: '/api/v1/namespaces/kube-system/pods/default-backend-5c6c964bf5-fws56',
                uid: '12f35cfe-cb04-11e8-8a17-005056a0b88e',
              },
              spec: {
                containers: [
                  {
                    image: 'www.ibm.com/ibmcom-amd64/defaultbackend:1.2.1',
                    imagePullPolicy: 'IfNotPresent',
                    livenessProbe: {
                      failureThreshold: 3,
                      httpGet: {
                        path: '/healthz',
                        port: 8080,
                        scheme: 'HTTP',
                      },
                      initialDelaySeconds: 30,
                      periodSeconds: 10,
                      successThreshold: 1,
                      timeoutSeconds: 5,
                    },
                    name: 'default-backend',
                    ports: [
                      {
                        containerPort: 8080,
                        protocol: 'TCP',
                      },
                    ],
                    resources: {
                      requests: {
                        cpu: '20m',
                        memory: '64Mi',
                      },
                    },
                    terminationMessagePath: '/dev/termination-log',
                    terminationMessagePolicy: 'File',
                    volumeMounts: [
                      {
                        mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                        name: 'default-token-zbghg',
                        readOnly: true,
                      },
                    ],
                  },
                ],
                dnsPolicy: 'ClusterFirst',
                imagePullSecrets: [
                  {
                    name: 'infra-registry-key',
                  },
                ],
                nodeName: '9.42.82.240',
                nodeSelector: {
                  proxy: 'true',
                },
                priority: 2000000000,
                priorityClassName: 'system-cluster-critical',
                restartPolicy: 'Always',
                schedulerName: 'default-scheduler',
                securityContext: {},
                serviceAccount: 'default',
                serviceAccountName: 'default',
                terminationGracePeriodSeconds: 60,
                tolerations: [
                  {
                    effect: 'NoSchedule',
                    key: 'node.kubernetes.io/memory-pressure',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    operator: 'Exists',
                  },
                  {
                    key: 'CriticalAddonsOnly',
                    operator: 'Exists',
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/not-ready',
                    operator: 'Exists',
                    tolerationSeconds: 300,
                  },
                  {
                    effect: 'NoExecute',
                    key: 'node.kubernetes.io/unreachable',
                    operator: 'Exists',
                    tolerationSeconds: 300,
                  },
                ],
                volumes: [
                  {
                    name: 'default-token-zbghg',
                    secret: {
                      defaultMode: 420,
                      secretName: 'default-token-zbghg',
                    },
                  },
                ],
              },
              status: {
                conditions: [
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:11:39Z',
                    status: 'True',
                    type: 'Initialized',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:11:51Z',
                    status: 'True',
                    type: 'Ready',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: null,
                    status: 'True',
                    type: 'ContainersReady',
                  },
                  {
                    lastProbeTime: null,
                    lastTransitionTime: '2018-10-08T14:11:39Z',
                    status: 'True',
                    type: 'PodScheduled',
                  },
                ],
                containerStatuses: [
                  {
                    containerID: 'docker://c81f5631af6dd2364a4216531a272b26c36a4bf5192a35aceff09b412cdfcb15',
                    image: 'www.ibm.com/ibmcom-amd64/defaultbackend:1.2.1',
                    imageID: 'docker-pullable://www.ibm.com/ibmcom-amd64/defaultbackend@sha256:3e1b41e424a55a35c891807b5e8145d0ba864870e530b31b6486fe5b57dd4b67',
                    lastState: {},
                    name: 'default-backend',
                    ready: true,
                    restartCount: 0,
                    state: {
                      running: {
                        startedAt: '2018-10-08T14:11:50Z',
                      },
                    },
                  },
                ],
                hostIP: '9.42.82.240',
                phase: 'Running',
                podIP: '10.1.28.201',
                qosClass: 'Burstable',
                startTime: '2018-10-08T14:11:39Z',
              },
            },
          ],
        },
      },
    },
  },
};

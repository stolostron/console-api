/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const mockResponse = {
  body:
{
  kind: 'WorkSet',
  apiVersion: 'hcm.ibm.com/v1alpha1',
  metadata: {
    name: 'pods-1532712227190',
    namespace: 'default',
    selfLink: '/apis/hcm.ibm.com/v1alpha1/namespaces/default/worksets/pods-1532712227190',
    uid: 'd214e6dd-91c1-11e8-b63b-169deeb4a8b8',
    resourceVersion: '11102',
    creationTimestamp: '2018-07-27T17:23:47Z',
    labels: {
      name: 'pods-1532712227190',
    },
  },
  spec: {
    selector: {
      matchLabels: {
        name: 'pods-1532712227190',
      },
    },
    template: {
      metadata: {
        creationTimestamp: null,
        labels: {
          name: 'pods-1532712227190',
        },
      },
      spec: {
        cluster: {},
        type: 'Resource',
        scope: {
          resourceType: 'pods',
        },
        helm: {},
      },
    },
  },
  status: {
    status: 'Completed',
    results: {
      'crucial-owl': {
        apiVersion: 'v1',
        items: [
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:36Z',
              generateName: 'helm-api-helm-service-onboard-job-',
              labels: {
                'controller-uid': '610e2a0a-57b5-11e8-92fb-005056a08eb1',
                'job-name': 'helm-api-helm-service-onboard-job',
              },
              name: 'helm-api-helm-service-onboard-job-79zh9',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'batch/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'Job',
                  name: 'helm-api-helm-service-onboard-job',
                  uid: '610e2a0a-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '4043',
              selfLink: '/api/v1/namespaces/kube-system/pods/helm-api-helm-service-onboard-job-79zh9',
              uid: '61113215-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    'onboard_service.sh',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-cert-gen:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'service-onboarding',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/local/bin/onboard_service.sh',
                      name: 'onboarding-script',
                      subPath: 'onboard_service.sh',
                    },
                    {
                      mountPath: '/cert-tool/action_role_helmapi.json',
                      name: 'onboarding-data',
                      subPath: 'action_role_helmapi.json',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
              restartPolicy: 'Never',
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
              ],
              volumes: [
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'onboard_service.sh',
                        mode: 511,
                        path: 'onboard_service.sh',
                      },
                    ],
                    name: 'helm-api-helm-service-onboard-script',
                  },
                  name: 'onboarding-script',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'action_role_helmapi.json',
                        path: 'action_role_helmapi.json',
                      },
                    ],
                    name: 'helm-api-helm-service-onboard-data',
                  },
                  name: 'onboarding-data',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:36Z',
                  reason: 'PodCompleted',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:29:06Z',
                  reason: 'PodCompleted',
                  status: 'False',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:36Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://d70a9aa1c5bb14fe295f4787fe328ce51d0607edb8b9811d901bebce88ea679a',
                  image: 'registry.ng.bluemix.net/mdelder/icp-cert-gen:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-cert-gen@sha256:5049138e5fb882eeb9920b0bc3b8acb3097b418c9111fa4c32c42ec69e32888e',
                  lastState: {},
                  name: 'service-onboarding',
                  ready: false,
                  restartCount: 0,
                  state: {
                    terminated: {
                      containerID: 'docker://d70a9aa1c5bb14fe295f4787fe328ce51d0607edb8b9811d901bebce88ea679a',
                      exitCode: 0,
                      finishedAt: '2018-05-14T20:29:02Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:29:01Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Succeeded',
              podIP: '10.1.112.103',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:36Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:08Z',
              generateName: 'helm-repo-7d445dbc5b-',
              labels: {
                app: 'helm-repo',
                'pod-template-hash': '3800186716',
              },
              name: 'helm-repo-7d445dbc5b-llftf',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'helm-repo-7d445dbc5b',
                  uid: '50a28e9c-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380333',
              selfLink: '/api/v1/namespaces/kube-system/pods/helm-repo-7d445dbc5b-llftf',
              uid: '50a356d2-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'ISICP',
                      value: 'true',
                    },
                    {
                      name: 'CLUSTER_URL',
                      value: 'https://icp-management-ingress:8443',
                    },
                    {
                      name: 'CLUSTER_CA_DOMAIN',
                      value: 'mycluster.icp',
                    },
                    {
                      name: 'PLATFORM_IDENTITY_PROVIDER_URL',
                      value: 'http://platform-identity-provider:4300',
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
                      name: 'WLP_REDIRECT_URL',
                      value: 'http://localhost:3001/auth/liberty/callback',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-helm-repo:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 10,
                    httpGet: {
                      path: '/healthcheck',
                      port: 3001,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 30,
                    periodSeconds: 120,
                    successThreshold: 1,
                    timeoutSeconds: 30,
                  },
                  name: 'helm-repo',
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      httpHeaders: [
                        {
                          name: 'check-readiness',
                          value: 'true',
                        },
                      ],
                      path: '/healthcheck',
                      port: 3001,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 5,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/src/app/assets',
                      name: 'helmrepo-assets',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostAliases: [
                {
                  hostnames: [
                    'mycluster.icp',
                  ],
                  ip: '9.42.80.212',
                },
              ],
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
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
              ],
              volumes: [
                {
                  name: 'helmrepo-assets',
                  persistentVolumeClaim: {
                    claimName: 'helm-repo-pvc',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:09Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:53Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:09Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://14413eaeb990d9dedc655c8644803e19c9ca653d20d8baa31f24af125c38443f',
                  image: 'registry.ng.bluemix.net/mdelder/icp-helm-repo:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-helm-repo@sha256:9f8a6f6a610da5a0efc49b07c668f68118ca8cfe2e90458d120f39f8962a5fe8',
                  lastState: {
                    terminated: {
                      containerID: 'docker://23707aa64f822f51ff2a0cac913104ba094da3a8a69f552423b60d5b71b6d4eb',
                      exitCode: 0,
                      finishedAt: '2018-07-17T16:29:46Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:28:26Z',
                    },
                  },
                  name: 'helm-repo',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:16Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.112',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:09Z',
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
              creationTimestamp: '2018-05-14T20:16:42Z',
              generateName: 'icp-management-ingress-',
              labels: {
                component: 'icp-management-ingress',
                'controller-revision-hash': '211271660',
                'k8s-app': 'icp-management-ingress',
                'pod-template-generation': '1',
                release: 'icp-management-ingress',
              },
              name: 'icp-management-ingress-lhd8g',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'icp-management-ingress',
                  uid: 'b7739986-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380466',
              selfLink: '/api/v1/namespaces/kube-system/pods/icp-management-ingress-lhd8g',
              uid: 'b7756455-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    '/icp-management-ingress',
                  ],
                  env: [
                    {
                      name: 'CLUSTER_DOMAIN',
                      value: 'cluster.local',
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
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-management-ingress:2.2.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'icp-management-ingress',
                  ports: [
                    {
                      containerPort: 8080,
                      hostPort: 8080,
                      protocol: 'TCP',
                    },
                    {
                      containerPort: 8443,
                      hostPort: 8443,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/opt/ibm/router/nginx/html/dcos-metadata',
                      name: 'router-ui-config',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
                  configMap: {
                    defaultMode: 420,
                    name: 'icp-management-ingress-config',
                  },
                  name: 'router-ui-config',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:16:42Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:20Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:16:42Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://aa6fec0d48235d4804d482d2a2283052e8eed0722c296f62eaf1753e4bc0b3e8',
                  image: 'registry.ng.bluemix.net/mdelder/icp-management-ingress:2.2.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-management-ingress@sha256:011ce3956aa9c3e304f03145631407b53eed17a20c02fb1c85edcf1d8e9cb6fa',
                  lastState: {
                    terminated: {
                      containerID: 'docker://67b80fa8c5d7382aff94b33bc52562a7cbd18de3d5ba07d91fc88e40a93098b8',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:52Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:22:38Z',
                    },
                  },
                  name: 'icp-management-ingress',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:19Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.118',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:16:42Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:13:59Z',
              generateName: 'icp-mongodb-',
              labels: {
                app: 'icp-mongodb',
                'controller-revision-hash': 'icp-mongodb-54856df54',
                release: 'mongodb',
                'statefulset.kubernetes.io/pod-name': 'icp-mongodb-0',
              },
              name: 'icp-mongodb-0',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'StatefulSet',
                  name: 'icp-mongodb',
                  uid: '56445ea7-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380885',
              selfLink: '/api/v1/namespaces/kube-system/pods/icp-mongodb-0',
              uid: '56478a30-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    'mongod',
                    '--config=/config/mongod.conf',
                  ],
                  env: [
                    {
                      name: 'AUTH',
                      value: 'true',
                    },
                    {
                      name: 'ADMIN_USER',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'user',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                    {
                      name: 'ADMIN_PASSWORD',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'password',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-mongodb:3.6.0',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    exec: {
                      command: [
                        'mongo',
                        '--ssl',
                        '--sslCAFile=/ca/tls.crt',
                        '--sslPEMKeyFile=/work-dir/mongo.pem',
                        '--eval',
                        "db.adminCommand('ping')",
                      ],
                    },
                    failureThreshold: 3,
                    initialDelaySeconds: 30,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'icp-mongodb',
                  ports: [
                    {
                      containerPort: 27017,
                      name: 'peer',
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        'mongo',
                        '--ssl',
                        '--sslCAFile=/ca/tls.crt',
                        '--sslPEMKeyFile=/work-dir/mongo.pem',
                        '--eval',
                        "db.adminCommand('ping')",
                      ],
                    },
                    failureThreshold: 3,
                    initialDelaySeconds: 5,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/data/db',
                      name: 'mongodbdir',
                      subPath: 'datadir',
                    },
                    {
                      mountPath: '/config',
                      name: 'config',
                    },
                    {
                      mountPath: '/ca',
                      name: 'ca',
                    },
                    {
                      mountPath: '/work-dir',
                      name: 'mongodbdir',
                      subPath: 'workdir',
                    },
                    {
                      mountPath: '/keydir',
                      name: 'keydir',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostname: 'icp-mongodb-0',
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              initContainers: [
                {
                  args: [
                    '--work-dir=/work-dir',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-mongodb-install:0.5',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'install',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/work-dir',
                      name: 'mongodbdir',
                      subPath: 'workdir',
                    },
                    {
                      mountPath: '/config',
                      name: 'config',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  args: [
                    '-on-start=/work-dir/on-start.sh',
                    '-service=icp-mongodb',
                  ],
                  command: [
                    '/work-dir/peer-finder',
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
                    {
                      name: 'REPLICA_SET',
                      value: 'rs0',
                    },
                    {
                      name: 'AUTH',
                      value: 'true',
                    },
                    {
                      name: 'ADMIN_USER',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'user',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                    {
                      name: 'ADMIN_PASSWORD',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'password',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-mongodb:3.6.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'bootstrap',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/work-dir',
                      name: 'mongodbdir',
                      subPath: 'workdir',
                    },
                    {
                      mountPath: '/config',
                      name: 'config',
                    },
                    {
                      mountPath: '/ca',
                      name: 'ca',
                    },
                    {
                      mountPath: '/data/db',
                      name: 'mongodbdir',
                      subPath: 'datadir',
                    },
                    {
                      mountPath: '/keydir',
                      name: 'keydir',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              subdomain: 'icp-mongodb',
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
                },
                {
                  effect: 'NoExecute',
                  key: 'node.kubernetes.io/unreachable',
                  operator: 'Exists',
                },
              ],
              volumes: [
                {
                  name: 'mongodbdir',
                  persistentVolumeClaim: {
                    claimName: 'mongodbdir-icp-mongodb-0',
                  },
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'icp-mongodb',
                  },
                  name: 'config',
                },
                {
                  name: 'ca',
                  secret: {
                    defaultMode: 511,
                    secretName: 'cluster-ca-cert',
                  },
                },
                {
                  name: 'keydir',
                  secret: {
                    defaultMode: 256,
                    secretName: 'icp-mongodb-keyfile',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:53:40Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:54:12Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:00Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://7d5eb4d0b00c14f38f13f6529ee85e5d7a44f52fd351905f9528c62d11eaced1',
                  image: 'registry.ng.bluemix.net/mdelder/icp-mongodb:3.6.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-mongodb@sha256:e5130ccd914f6fe9a23e5533bc1878e6f47458c907fb48620d444f27d9381593',
                  lastState: {
                    terminated: {
                      containerID: 'docker://c58c5ee119808d0c983741ee819c12228c04bfde53301479409f105367d73d01',
                      exitCode: 255,
                      finishedAt: '2018-07-17T20:47:54Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:16:17Z',
                    },
                  },
                  name: 'icp-mongodb',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:53:48Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://b307e1456c174eae64217d6618e1d9eb97ca35154bb6f084c03899a6d123aec2',
                  image: 'registry.ng.bluemix.net/mdelder/icp-mongodb-install:0.5',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-mongodb-install@sha256:d530f29f0e74f67a2958ba054f96efc7ecbc0db38762954ec70241bef5448b2e',
                  lastState: {},
                  name: 'install',
                  ready: true,
                  restartCount: 1,
                  state: {
                    terminated: {
                      containerID: 'docker://b307e1456c174eae64217d6618e1d9eb97ca35154bb6f084c03899a6d123aec2',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:49:36Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:49:35Z',
                    },
                  },
                },
                {
                  containerID: 'docker://bf0bd0b1a9602e63ff0bb86ef22dba71674b27420b1fd7a9396528266647cafa',
                  image: 'registry.ng.bluemix.net/mdelder/icp-mongodb:3.6.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-mongodb@sha256:e5130ccd914f6fe9a23e5533bc1878e6f47458c907fb48620d444f27d9381593',
                  lastState: {},
                  name: 'bootstrap',
                  ready: true,
                  restartCount: 0,
                  state: {
                    terminated: {
                      containerID: 'docker://bf0bd0b1a9602e63ff0bb86ef22dba71674b27420b1fd7a9396528266647cafa',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:53:40Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:50:06Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.126',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:14:00Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
                'pod.alpha.kubernetes.io/initialized': 'true',
              },
              creationTimestamp: '2018-05-14T20:09:25Z',
              generateName: 'image-manager-',
              labels: {
                app: 'image-manager',
                'controller-revision-hash': 'image-manager-57f6ccb748',
                'statefulset.kubernetes.io/pod-name': 'image-manager-0',
              },
              name: 'image-manager-0',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'StatefulSet',
                  name: 'image-manager',
                  uid: 'b34c7fb0-57b2-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380401',
              selfLink: '/api/v1/namespaces/kube-system/pods/image-manager-0',
              uid: 'b34fed50-57b2-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  image: 'registry.ng.bluemix.net/mdelder/registry:2.6.2',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    exec: {
                      command: [
                        'cat',
                        '/var/lib/registry/file-check',
                      ],
                    },
                    failureThreshold: 3,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  name: 'icp-registry',
                  ports: [
                    {
                      containerPort: 8500,
                      hostPort: 8500,
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        'cat',
                        '/var/lib/registry/file-check',
                      ],
                    },
                    failureThreshold: 3,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/path/to/x509/public',
                      name: 'im-certs',
                      subPath: 'tls.crt',
                    },
                    {
                      mountPath: '/path/to/x509/private',
                      name: 'im-certs',
                      subPath: 'tls.key',
                    },
                    {
                      mountPath: '/etc/docker/registry/config.yml',
                      name: 'registry-config',
                      subPath: 'registry-config.yaml',
                    },
                    {
                      mountPath: '/var/lib/registry',
                      name: 'image-manager',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  command: [
                    '/icp-image-manager',
                    'serve',
                    '--listen-address=0.0.0.0:8600',
                    '--private-key-path=/etc/icp-image-manager/tls.key',
                    '--oidc-url=http://platform-identity-provider:4300',
                    '--registry-url=https://127.0.0.1:8500',
                    '--registry-server-name=mycluster.icp:8500',
                    '--enable-https=true',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-image-manager:2.2.2',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'image-manager',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/icp-image-manager',
                      name: 'im-certs',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirstWithHostNet',
              hostNetwork: true,
              hostname: 'image-manager-0',
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                master: 'true',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              subdomain: 'image-manager',
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
                },
                {
                  effect: 'NoExecute',
                  key: 'node.kubernetes.io/unreachable',
                  operator: 'Exists',
                },
              ],
              volumes: [
                {
                  name: 'image-manager',
                  persistentVolumeClaim: {
                    claimName: 'image-manager-image-manager-0',
                  },
                },
                {
                  name: 'im-certs',
                  secret: {
                    defaultMode: 420,
                    secretName: 'router-certs',
                  },
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'registry-config',
                  },
                  name: 'registry-config',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:09:26Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:18Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:09:26Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://6cde32c17e76d656c9e883cff1c1bc75934ddf7694507233fec262c13ea902c1',
                  image: 'registry.ng.bluemix.net/mdelder/registry:2.6.2',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/registry@sha256:1de51579c6fa8db2957e77f024bd330d6a698a5ea868ea9bdb52431b8166482d',
                  lastState: {
                    terminated: {
                      containerID: 'docker://938805c7b46d281ec985ab17898a2dac570aaf74879576d7593816282f3b0038',
                      exitCode: 255,
                      finishedAt: '2018-07-17T20:47:54Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:09:33Z',
                    },
                  },
                  name: 'icp-registry',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:13Z',
                    },
                  },
                },
                {
                  containerID: 'docker://03a86e3a44a3d7940a428e31f5dc1432fd9507788b67c88ca29db286443e35c2',
                  image: 'registry.ng.bluemix.net/mdelder/icp-image-manager:2.2.2',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-image-manager@sha256:376efb561200186fc6a0390d934a05f7eac1c9199c0506607da5b9fe51b26200',
                  lastState: {
                    terminated: {
                      containerID: 'docker://f14f2e7bbf069b586d3ed12a7affa90d0c3771a85c5083c74bdb852bc0254d2e',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:39Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:09:37Z',
                    },
                  },
                  name: 'image-manager',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:14Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '9.42.80.212',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:09:26Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/config.hash': 'e178edefded89ecbd14743c911d26f00',
                'kubernetes.io/config.mirror': 'e178edefded89ecbd14743c911d26f00',
                'kubernetes.io/config.seen': '2018-05-14T16:06:51.345365696-04:00',
                'kubernetes.io/config.source': 'file',
                'kubernetes.io/psp': 'privileged',
                'scheduler.alpha.kubernetes.io/critical-pod': '',
              },
              creationTimestamp: '2018-05-14T20:10:31Z',
              name: 'k8s-etcd-9.42.80.212',
              namespace: 'kube-system',
              resourceVersion: '9379927',
              selfLink: '/api/v1/namespaces/kube-system/pods/k8s-etcd-9.42.80.212',
              uid: 'da44a162-57b2-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    'etcd',
                    '--name=etcd0',
                    '--data-dir=/var/lib/etcd',
                    '--initial-advertise-peer-urls=https://9.42.80.212:2380',
                    '--listen-peer-urls=https://0.0.0.0:2380',
                    '--listen-client-urls=https://0.0.0.0:4001',
                    '--advertise-client-urls=https://9.42.80.212:4001',
                    '--cert-file=/etc/cfc/conf/etcd/server.pem',
                    '--key-file=/etc/cfc/conf/etcd/server-key.pem',
                    '--client-cert-auth',
                    '--peer-auto-tls',
                    '--trusted-ca-file=/etc/cfc/conf/etcd/ca.pem',
                    '--initial-cluster-token=etcd-cluster-1',
                    '--initial-cluster=etcd0=https://9.42.80.212:2380',
                    '--grpc-keepalive-timeout=0',
                    '--grpc-keepalive-interval=0',
                    '--snapshot-count=10000',
                    '--initial-cluster-state=new',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/etcd:v3.2.14',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'etcd',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/lib/etcd',
                      name: 'data',
                    },
                    {
                      mountPath: '/etc/cfc/conf/etcd',
                      name: 'etcd-certs',
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              nodeName: '9.42.80.212',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              terminationGracePeriodSeconds: 30,
              tolerations: [
                {
                  effect: 'NoExecute',
                  operator: 'Exists',
                },
              ],
              volumes: [
                {
                  hostPath: {
                    path: '/var/lib/etcd',
                    type: '',
                  },
                  name: 'data',
                },
                {
                  hostPath: {
                    path: '/etc/cfc/conf/etcd',
                    type: '',
                  },
                  name: 'etcd-certs',
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:06Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:16Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:06Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://3618a90bd24517c545144c3a5398e09ed1f06d247ea8bd4fdb911be6df44789c',
                  image: 'registry.ng.bluemix.net/mdelder/etcd:v3.2.14',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/etcd@sha256:8ca91e89e035213a7f89850c04f09ff26eb8737a34a129871f208ea6836dcfb8',
                  lastState: {
                    terminated: {
                      containerID: 'docker://9d3eb1505ae90c761ccaedfabd2bea9a255d42c4a84cf7557733170a721c5c27',
                      exitCode: 0,
                      finishedAt: '2018-07-17T16:29:48Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:06:52Z',
                    },
                  },
                  name: 'etcd',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:48:09Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '9.42.80.212',
              qosClass: 'BestEffort',
              startTime: '2018-07-17T20:48:06Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/config.hash': '4ed257d8721a8a08be4a8eefe797c69c',
                'kubernetes.io/config.mirror': '4ed257d8721a8a08be4a8eefe797c69c',
                'kubernetes.io/config.seen': '2018-05-14T16:08:36.179894501-04:00',
                'kubernetes.io/config.source': 'file',
                'kubernetes.io/psp': 'privileged',
                'scheduler.alpha.kubernetes.io/critical-pod': '',
              },
              creationTimestamp: '2018-05-14T20:09:51Z',
              name: 'k8s-master-9.42.80.212',
              namespace: 'kube-system',
              resourceVersion: '9379377',
              selfLink: '/api/v1/namespaces/kube-system/pods/k8s-master-9.42.80.212',
              uid: 'c26d3332-57b2-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    '/hyperkube',
                    'controller-manager',
                    '--master=https://127.0.0.1:8001',
                    '--service-account-private-key-file=/etc/cfc/conf/server.key',
                    '--feature-gates=TaintBasedEvictions=true',
                    '--root-ca-file=/etc/cfc/conf/ca.crt',
                    '--min-resync-period=3m',
                    '--cluster-cidr=10.1.0.0/16',
                    '--cluster-signing-cert-file=/etc/cfc/conf/ca.crt',
                    '--cluster-signing-key-file=/etc/cfc/conf/ca.key',
                    '--use-service-account-credentials=true',
                    '--kubeconfig=/etc/cfc/conf/kube-controller-manager-config.yaml',
                    '--pv-recycler-pod-template-filepath-hostpath=/etc/cfc/conf/recycler.yaml',
                    '--pv-recycler-pod-template-filepath-nfs=/etc/cfc/conf/recycler.yaml',
                    '--v=2',
                    '--leader-elect=true',
                    '--horizontal-pod-autoscaler-use-rest-clients=true',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'controller-manager',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/cfc/conf',
                      name: 'data',
                    },
                    {
                      mountPath: '/var/lib/icp/audit',
                      name: 'audit',
                    },
                    {
                      mountPath: '/usr/libexec/kubernetes/kubelet-plugins/volume/exec',
                      name: 'flexvolume-dir',
                    },
                  ],
                },
                {
                  command: [
                    '/hyperkube',
                    'apiserver',
                    '--secure-port=8001',
                    '--bind-address=0.0.0.0',
                    '--advertise-address=9.42.80.212',
                    '--endpoint-reconciler-type=lease',
                    '--insecure-port=0',
                    '--etcd-servers=https://9.42.80.212:4001',
                    '--etcd-cafile=/etc/cfc/conf/etcd/ca.pem',
                    '--etcd-certfile=/etc/cfc/conf/etcd/client.pem',
                    '--etcd-keyfile=/etc/cfc/conf/etcd/client-key.pem',
                    '--runtime-config=batch/v2alpha1,extensions/v1beta1=true,extensions/v1beta1/podsecuritypolicy=true,admissionregistration.k8s.io/v1alpha1',
                    '--admission-control=Initializers,NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,PodSecurityPolicy,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota',
                    '--oidc-issuer-url=https://mycluster.icp:9443/oidc/endpoint/OP',
                    '--oidc-client-id=0d46132eb4d55409454ba9b158dde324',
                    '--oidc-ca-file=/etc/cfc/conf/ca.crt',
                    '--feature-gates=',
                    '--oidc-groups-claim=teamRoleMappings',
                    '--tls-cert-file=/etc/cfc/conf/server.cert',
                    '--tls-private-key-file=/etc/cfc/conf/server.key',
                    '--kubelet-client-certificate=/etc/cfc/conf/kubelet-client.crt',
                    '--kubelet-client-key=/etc/cfc/conf/kubelet-client.key',
                    '--client-ca-file=/etc/cfc/conf/ca.crt',
                    '--service-account-key-file=/etc/cfc/conf/server.key',
                    '--authorization-mode=RBAC',
                    '--min-request-timeout=300',
                    '--allow-privileged',
                    '--requestheader-client-ca-file=/etc/cfc/conf/front/front-proxy-ca.pem',
                    '--requestheader-username-headers=X-Remote-User',
                    '--requestheader-group-headers=X-Remote-Group',
                    '--requestheader-allowed-names=mycluster.icp,aggregator',
                    '--requestheader-extra-headers-prefix=X-Remote-Extra-',
                    '--proxy-client-cert-file=/etc/cfc/conf/front/front-proxy-client.pem',
                    '--proxy-client-key-file=/etc/cfc/conf/front/front-proxy-client-key.pem',
                    '--v=2',
                    '--service-cluster-ip-range=10.0.0.1/24',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'apiserver',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/cfc/conf',
                      name: 'data',
                    },
                  ],
                },
                {
                  command: [
                    '/hyperkube',
                    'scheduler',
                    '--master=https://127.0.0.1:8001',
                    '--feature-gates=TaintNodesByCondition=true',
                    '--kubeconfig=/etc/cfc/conf/kube-scheduler-config.yaml',
                    '--policy-config-file=/etc/cfc/conf/scheduler-policy-config.json',
                    '--use-legacy-policy-config=true',
                    '--v=2',
                    '--leader-elect=true',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'scheduler',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/cfc/conf',
                      name: 'data',
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              nodeName: '9.42.80.212',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              terminationGracePeriodSeconds: 30,
              tolerations: [
                {
                  effect: 'NoExecute',
                  operator: 'Exists',
                },
              ],
              volumes: [
                {
                  hostPath: {
                    path: '/etc/cfc/conf',
                    type: '',
                  },
                  name: 'data',
                },
                {
                  hostPath: {
                    path: '/var/lib/icp/audit',
                    type: '',
                  },
                  name: 'audit',
                },
                {
                  hostPath: {
                    path: '/usr/libexec/kubernetes/kubelet-plugins/volume/exec',
                    type: 'DirectoryOrCreate',
                  },
                  name: 'flexvolume-dir',
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:08Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:16Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:08Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://d1d25247d97cee95da110be332e6f97c0ef3422142dc17529d905157ae18e057',
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/hyperkube@sha256:1a75272f64f0844866d4ca78ea9f8ba95b3fafa752f459e4092451d2e2ba45cb',
                  lastState: {
                    terminated: {
                      containerID: 'docker://189ca0f4902c71c2257a220d1f760461138021a49d4ee89853cea5c612af2dab',
                      exitCode: 0,
                      finishedAt: '2018-07-17T16:29:43Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:08:37Z',
                    },
                  },
                  name: 'apiserver',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:48:12Z',
                    },
                  },
                },
                {
                  containerID: 'docker://4b540aba0e3d547c48475b30dbc20c6d22ef5e9199ddd6fc4673a3de7487c9c6',
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/hyperkube@sha256:1a75272f64f0844866d4ca78ea9f8ba95b3fafa752f459e4092451d2e2ba45cb',
                  lastState: {
                    terminated: {
                      containerID: 'docker://2193b6cd43d0354123a0f9ab191d9cafc4beb7b4b79426a92e1bfb4961e51c4c',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:41Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:08:36Z',
                    },
                  },
                  name: 'controller-manager',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:48:11Z',
                    },
                  },
                },
                {
                  containerID: 'docker://e9224ae557b7dfbe249ac68e7537ba0e1bb635c83d7bb3710b5d9ff0361e7f9c',
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/hyperkube@sha256:1a75272f64f0844866d4ca78ea9f8ba95b3fafa752f459e4092451d2e2ba45cb',
                  lastState: {
                    terminated: {
                      containerID: 'docker://21943efa742eecd48ac70b70120747797c61f8a24e9075fc927ab5481ef7b1a4',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:42Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:08:37Z',
                    },
                  },
                  name: 'scheduler',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:48:12Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '9.42.80.212',
              qosClass: 'BestEffort',
              startTime: '2018-07-17T20:48:08Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/config.hash': '60580d451b5a7a396883c431289f6919',
                'kubernetes.io/config.mirror': '60580d451b5a7a396883c431289f6919',
                'kubernetes.io/config.seen': '2018-05-14T16:06:25.164288208-04:00',
                'kubernetes.io/config.source': 'file',
                'kubernetes.io/psp': 'privileged',
                'scheduler.alpha.kubernetes.io/critical-pod': '',
              },
              creationTimestamp: '2018-05-14T20:10:12Z',
              name: 'k8s-proxy-9.42.80.212',
              namespace: 'kube-system',
              resourceVersion: '9380239',
              selfLink: '/api/v1/namespaces/kube-system/pods/k8s-proxy-9.42.80.212',
              uid: 'cef1d6cf-57b2-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    '/hyperkube',
                    'proxy',
                    '--kubeconfig=/var/lib/kubelet/kube-proxy-config',
                    '--hostname-override=9.42.80.212',
                    '--cluster-cidr=10.1.0.0/16',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'proxy',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/lib/kubelet',
                      name: 'kubelet',
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              nodeName: '9.42.80.212',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              terminationGracePeriodSeconds: 30,
              tolerations: [
                {
                  effect: 'NoExecute',
                  operator: 'Exists',
                },
              ],
              volumes: [
                {
                  hostPath: {
                    path: '/var/lib/kubelet',
                    type: '',
                  },
                  name: 'kubelet',
                },
                {
                  hostPath: {
                    path: '/lib/modules',
                    type: '',
                  },
                  name: 'lib-modules',
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:13Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:16Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:13Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://abb391355794f2dcd355024b30c03b40d582e4ee7efca21b68120d3e1036d5e6',
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/hyperkube@sha256:1a75272f64f0844866d4ca78ea9f8ba95b3fafa752f459e4092451d2e2ba45cb',
                  lastState: {
                    terminated: {
                      containerID: 'docker://2cb82541dc10d9932e47121ae7ff6ec29a93ce93fc45ef458f81bf002b128253',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:44Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:06:29Z',
                    },
                  },
                  name: 'proxy',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:48:14Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '9.42.80.212',
              qosClass: 'BestEffort',
              startTime: '2018-07-17T20:48:13Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/config.hash': '084ac59700f325a37af302adcdae1ace',
                'kubernetes.io/config.mirror': '084ac59700f325a37af302adcdae1ace',
                'kubernetes.io/config.seen': '2018-05-14T16:11:09.765124391-04:00',
                'kubernetes.io/config.source': 'file',
                'kubernetes.io/psp': 'privileged',
                'scheduler.alpha.kubernetes.io/critical-pod': '',
              },
              creationTimestamp: '2018-05-14T20:11:12Z',
              name: 'k8s-proxy-9.42.82.119',
              namespace: 'kube-system',
              resourceVersion: '509',
              selfLink: '/api/v1/namespaces/kube-system/pods/k8s-proxy-9.42.82.119',
              uid: 'f314661a-57b2-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    '/hyperkube',
                    'proxy',
                    '--kubeconfig=/var/lib/kubelet/kube-proxy-config',
                    '--hostname-override=9.42.82.119',
                    '--cluster-cidr=10.1.0.0/16',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'proxy',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/lib/kubelet',
                      name: 'kubelet',
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              nodeName: '9.42.82.119',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              terminationGracePeriodSeconds: 30,
              tolerations: [
                {
                  effect: 'NoExecute',
                  operator: 'Exists',
                },
              ],
              volumes: [
                {
                  hostPath: {
                    path: '/var/lib/kubelet',
                    type: '',
                  },
                  name: 'kubelet',
                },
                {
                  hostPath: {
                    path: '/lib/modules',
                    type: '',
                  },
                  name: 'lib-modules',
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:11:12Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:11:13Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:11:12Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://2434c0bb886d0c69b33df5c5fc16dc809079010d506b7d2ff5a463fb4c561469',
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/hyperkube@sha256:1a75272f64f0844866d4ca78ea9f8ba95b3fafa752f459e4092451d2e2ba45cb',
                  lastState: {},
                  name: 'proxy',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:11:13Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.119',
              phase: 'Running',
              podIP: '9.42.82.119',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:11:12Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/config.hash': '7346029dca446c526f6ca8ddc68e4f36',
                'kubernetes.io/config.mirror': '7346029dca446c526f6ca8ddc68e4f36',
                'kubernetes.io/config.seen': '2018-05-14T16:11:10.312149953-04:00',
                'kubernetes.io/config.source': 'file',
                'kubernetes.io/psp': 'privileged',
                'scheduler.alpha.kubernetes.io/critical-pod': '',
              },
              creationTimestamp: '2018-05-14T20:11:13Z',
              name: 'k8s-proxy-9.42.82.171',
              namespace: 'kube-system',
              resourceVersion: '515',
              selfLink: '/api/v1/namespaces/kube-system/pods/k8s-proxy-9.42.82.171',
              uid: 'f36633e9-57b2-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    '/hyperkube',
                    'proxy',
                    '--kubeconfig=/var/lib/kubelet/kube-proxy-config',
                    '--hostname-override=9.42.82.171',
                    '--cluster-cidr=10.1.0.0/16',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'proxy',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/lib/kubelet',
                      name: 'kubelet',
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              nodeName: '9.42.82.171',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              terminationGracePeriodSeconds: 30,
              tolerations: [
                {
                  effect: 'NoExecute',
                  operator: 'Exists',
                },
              ],
              volumes: [
                {
                  hostPath: {
                    path: '/var/lib/kubelet',
                    type: '',
                  },
                  name: 'kubelet',
                },
                {
                  hostPath: {
                    path: '/lib/modules',
                    type: '',
                  },
                  name: 'lib-modules',
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:11:13Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:11:14Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:11:13Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://63c78580ac522ad0381db955afc4fed2530af63ddcbb08faa5097433334af654',
                  image: 'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/hyperkube@sha256:1a75272f64f0844866d4ca78ea9f8ba95b3fafa752f459e4092451d2e2ba45cb',
                  lastState: {},
                  name: 'proxy',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:11:14Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.171',
              phase: 'Running',
              podIP: '9.42.82.171',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:11:13Z',
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
              creationTimestamp: '2018-05-14T20:11:49Z',
              generateName: 'kube-dns-',
              labels: {
                app: 'kube-dns',
                chart: 'kube-dns-1.0.0',
                'controller-revision-hash': '3249198523',
                'pod-template-generation': '1',
                release: 'kube-dns',
              },
              name: 'kube-dns-7shp2',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'kube-dns',
                  uid: '091345a1-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380509',
              selfLink: '/api/v1/namespaces/kube-system/pods/kube-dns-7shp2',
              uid: '091485a8-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    '--domain=cluster.local.',
                    '--dns-port=10053',
                    '--config-dir=/kube-dns-config',
                    '--v=2',
                  ],
                  env: [
                    {
                      name: 'PROMETHEUS_PORT',
                      value: '10055',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/k8s-dns-kube-dns:1.14.4',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 5,
                    httpGet: {
                      path: '/healthcheck/kubedns',
                      port: 10054,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 60,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'kubedns',
                  ports: [
                    {
                      containerPort: 10053,
                      name: 'dns-local',
                      protocol: 'UDP',
                    },
                    {
                      containerPort: 10053,
                      name: 'dns-tcp-local',
                      protocol: 'TCP',
                    },
                    {
                      containerPort: 10055,
                      name: 'metrics',
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/readiness',
                      port: 8081,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 3,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/kube-dns-config',
                      name: 'kube-dns-config',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  args: [
                    '-v=2',
                    '-logtostderr',
                    '-configDir=/etc/k8s/dns/dnsmasq-nanny',
                    '-restartDnsmasq=true',
                    '--',
                    '-k',
                    '--cache-size=1000',
                    '--log-facility=-',
                    '--server=/cluster.local/127.0.0.1#10053',
                    '--server=/in-addr.arpa/127.0.0.1#10053',
                    '--server=/ip6.arpa/127.0.0.1#10053',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/k8s-dns-dnsmasq-nanny:1.14.4',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 5,
                    httpGet: {
                      path: '/healthcheck/dnsmasq',
                      port: 10054,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 60,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'dnsmasq',
                  ports: [
                    {
                      containerPort: 53,
                      name: 'dns',
                      protocol: 'UDP',
                    },
                    {
                      containerPort: 53,
                      name: 'dns-tcp',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/k8s/dns/dnsmasq-nanny',
                      name: 'kube-dns-config',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  args: [
                    '--v=2',
                    '--logtostderr',
                    '--probe=kubedns,127.0.0.1:10053,kubernetes.default.svc.cluster.local,5,A',
                    '--probe=dnsmasq,127.0.0.1:53,kubernetes.default.svc.cluster.local,5,A',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/k8s-dns-sidecar:1.14.4',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 5,
                    httpGet: {
                      path: '/metrics',
                      port: 10054,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 60,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'sidecar',
                  ports: [
                    {
                      containerPort: 10054,
                      name: 'metrics',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'Default',
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                master: 'true',
              },
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
                  configMap: {
                    defaultMode: 420,
                    name: 'kube-dns',
                    optional: true,
                  },
                  name: 'kube-dns-config',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:11:49Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:53Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:11:49Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://1dc14b0fa4ca9ab9473a30bbfc89d12e832b9faf124c08a56a82c76f623217e4',
                  image: 'registry.ng.bluemix.net/mdelder/k8s-dns-dnsmasq-nanny:1.14.4',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/k8s-dns-dnsmasq-nanny@sha256:dcf6aadf0a05c521f31fb2dbe6dc70fb32e3aa1a1a7cf8882450314ee58a0ef1',
                  lastState: {
                    terminated: {
                      containerID: 'docker://5e902c7c65d6b9e2efd70b0d1941334228dc01279f8f9d24443383816cb1ec77',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:50Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:12:42Z',
                    },
                  },
                  name: 'dnsmasq',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:44Z',
                    },
                  },
                },
                {
                  containerID: 'docker://3241bb995ee4a42220ee0245b83a7b21162a347960325e64dc588c0bfab3b5cc',
                  image: 'registry.ng.bluemix.net/mdelder/k8s-dns-kube-dns:1.14.4',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/k8s-dns-kube-dns@sha256:4f7cb0718684264e7cbc768d90395b1ea1d251fc2d8946ce50073d28a694245c',
                  lastState: {
                    terminated: {
                      containerID: 'docker://08ff5b3dd8dc2884c88d897e99bb6052b9bd983e5b556dfa4a36359f6c30410f',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:50Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:12:36Z',
                    },
                  },
                  name: 'kubedns',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:44Z',
                    },
                  },
                },
                {
                  containerID: 'docker://606e699052780d1b7350aed4327e03f03feb3d2e045aa5e432040503f6b1a2b6',
                  image: 'registry.ng.bluemix.net/mdelder/k8s-dns-sidecar:1.14.4',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/k8s-dns-sidecar@sha256:df98b5c99823c97c4f6961cf1db0268166b6a8f8c0f103287d71cbe08c49b29d',
                  lastState: {
                    terminated: {
                      containerID: 'docker://e1083cd5ee5b5ab03fb0c24cf326d60217201c0c5db822b3907a4cab8157c2a6',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:43Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:12:46Z',
                    },
                  },
                  name: 'sidecar',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:45Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.76',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:11:49Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
                productID: 'none',
                productName: 'Elasticsearch',
                productVersion: '5.5.1',
              },
              creationTimestamp: '2018-05-14T20:28:33Z',
              generateName: 'logging-elk-client-5c6987dc4f-',
              labels: {
                app: 'logging-elk-elasticsearch',
                component: 'client',
                'pod-template-hash': '1725438709',
                role: 'client',
              },
              name: 'logging-elk-client-5c6987dc4f-x9lmb',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'logging-elk-client-5c6987dc4f',
                  uid: '5f259e16-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380476',
              selfLink: '/api/v1/namespaces/kube-system/pods/logging-elk-client-5c6987dc4f-x9lmb',
              uid: '5f2a0928-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  image: 'registry.ng.bluemix.net/mdelder/indices-cleaner:0.2',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'indices-cleaner',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/action.yml',
                      name: 'actionfile',
                      subPath: 'action.yml',
                    },
                    {
                      mountPath: '/etc/curator.yml',
                      name: 'curator-config',
                      subPath: 'curator.yml',
                    },
                    {
                      mountPath: '/etc/crontabs/root',
                      name: 'cron',
                      subPath: 'root',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  command: [
                    '/bin/bash',
                    '/scripts/searchguard/entrypoint.sh',
                  ],
                  env: [
                    {
                      name: 'ES_JAVA_OPTS',
                      value: '-Xms512m -Xmx512m',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/elasticsearch:5.5.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'es-client',
                  ports: [
                    {
                      containerPort: 9200,
                      name: 'rest',
                      protocol: 'TCP',
                    },
                    {
                      containerPort: 9300,
                      name: 'internal',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {
                    limits: {
                      memory: '1Gi',
                    },
                    requests: {
                      memory: '1Gi',
                    },
                  },
                  securityContext: {
                    capabilities: {
                      add: [
                        'IPC_LOCK',
                      ],
                    },
                    privileged: false,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/share/elasticsearch/data',
                      name: 'data',
                    },
                    {
                      mountPath: '/usr/share/elasticsearch/config/elasticsearch.yml',
                      name: 'es-config',
                      subPath: 'elasticsearch.yml',
                    },
                    {
                      mountPath: '/usr/share/elasticsearch/config/log4j2.properties',
                      name: 'es-config',
                      subPath: 'log4j2.properties',
                    },
                    {
                      mountPath: '/scripts/searchguard',
                      name: 'entrypoint',
                    },
                    {
                      mountPath: '/usr/share/elasticsearch/plugin-bundles',
                      name: 'plugin-bundle',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
                    '/bin/sh',
                    '-c',
                    "sysctl -w vm.max_map_count=262144 && sed -i '/^vm.max_map_count /d' /etc/sysctl.conf && echo 'vm.max_map_count = 262144' >> /etc/sysctl.conf",
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-initcontainer:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'sysctl',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  emptyDir: {},
                  name: 'data',
                },
                {
                  emptyDir: {},
                  name: 'plugin-bundle',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'client.yml',
                        path: 'elasticsearch.yml',
                      },
                      {
                        key: 'log4j2.properties',
                        path: 'log4j2.properties',
                      },
                    ],
                    name: 'logging-elk-elasticsearch-config',
                  },
                  name: 'es-config',
                },
                {
                  configMap: {
                    defaultMode: 365,
                    name: 'logging-elk-elasticsearch-entrypoint',
                  },
                  name: 'entrypoint',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'action.yml',
                        path: 'action.yml',
                      },
                    ],
                    name: 'logging-elk-elasticsearch-curator-config',
                  },
                  name: 'actionfile',
                },
                {
                  hostPath: {
                    path: '/etc/localtime',
                    type: '',
                  },
                  name: 'localtime',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'config.yml',
                        path: 'curator.yml',
                      },
                    ],
                    name: 'logging-elk-elasticsearch-curator-config',
                  },
                  name: 'curator-config',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'cron',
                        path: 'root',
                      },
                    ],
                    name: 'logging-elk-elasticsearch-curator-config',
                  },
                  name: 'cron',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:30:59Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:21Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://d18f559388c8dc40af718fd707c5db2b7256349c397fd4e1cf31a60596a548d4',
                  image: 'registry.ng.bluemix.net/mdelder/elasticsearch:5.5.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/elasticsearch@sha256:5fe2c4103ac31c1ed32794cc3c67fac6755b1a738779afe3ecbc80df589f3e47',
                  lastState: {
                    terminated: {
                      containerID: 'docker://b5bcd2a2ec715f5f7436bd796cd25f7058c71db96d693dae7e6f1abd31198210',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:50Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:34:26Z',
                    },
                  },
                  name: 'es-client',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:20Z',
                    },
                  },
                },
                {
                  containerID: 'docker://5904a752bec526562606ee8b6241505df839929ba01e130316719f1db8c6ecbe',
                  image: 'registry.ng.bluemix.net/mdelder/indices-cleaner:0.2',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/indices-cleaner@sha256:f74bde2528dadb1606ece2ffa5cedf52ffb5762cec33447e597e82ffd7be9c63',
                  lastState: {
                    terminated: {
                      containerID: 'docker://3102b53ff4bda1ba76612e0b4ed30817fcdfae3199ea385b698eac3e7eb1849f',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:51Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:34:26Z',
                    },
                  },
                  name: 'indices-cleaner',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:20Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://bfe8920430df957f00bb03ea9dbb9c39b36b2aa3fcf4f4d1b5b9cd0f9550fd80',
                  image: 'registry.ng.bluemix.net/mdelder/icp-initcontainer:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-initcontainer@sha256:76a6bb266f348662e5490b6a86043bc79434ad252f90edd6b81a99a56a11b1ec',
                  lastState: {},
                  name: 'sysctl',
                  ready: true,
                  restartCount: 1,
                  state: {
                    terminated: {
                      containerID: 'docker://bfe8920430df957f00bb03ea9dbb9c39b36b2aa3fcf4f4d1b5b9cd0f9550fd80',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:50:15Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:50:15Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.83',
              qosClass: 'Burstable',
              startTime: '2018-05-14T20:28:33Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
                productID: 'none',
                productName: 'Elasticsearch',
                productVersion: '5.5.1',
              },
              creationTimestamp: '2018-05-14T20:28:33Z',
              generateName: 'logging-elk-data-',
              labels: {
                app: 'logging-elk-elasticsearch',
                component: 'data',
                'controller-revision-hash': 'logging-elk-data-5df8cbd5b',
                role: 'data',
                'statefulset.kubernetes.io/pod-name': 'logging-elk-data-0',
              },
              name: 'logging-elk-data-0',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'StatefulSet',
                  name: 'logging-elk-data',
                  uid: '5f2b7deb-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380393',
              selfLink: '/api/v1/namespaces/kube-system/pods/logging-elk-data-0',
              uid: '5f369ac6-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  command: [
                    '/bin/bash',
                    '/scripts/searchguard/entrypoint.sh',
                  ],
                  env: [
                    {
                      name: 'ES_JAVA_OPTS',
                      value: '-Xms1024m -Xmx1024m',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/elasticsearch:5.5.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'es-data',
                  ports: [
                    {
                      containerPort: 9300,
                      name: 'transport',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {
                    limits: {
                      memory: '2048M',
                    },
                    requests: {
                      memory: '2048M',
                    },
                  },
                  securityContext: {
                    capabilities: {
                      add: [
                        'IPC_LOCK',
                      ],
                    },
                    privileged: false,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/share/elasticsearch/data',
                      name: 'data',
                    },
                    {
                      mountPath: '/usr/share/elasticsearch/config/elasticsearch.yml',
                      name: 'config',
                      subPath: 'elasticsearch.yml',
                    },
                    {
                      mountPath: '/scripts/searchguard',
                      name: 'entrypoint',
                    },
                    {
                      mountPath: '/usr/share/elasticsearch/plugin-bundles',
                      name: 'plugin-bundle',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostname: 'logging-elk-data-0',
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              initContainers: [
                {
                  command: [
                    'chmod',
                    '777',
                    '/data-dir',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-initcontainer:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'chmod',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/data-dir',
                      name: 'data',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  command: [
                    '/bin/sh',
                    '-c',
                    "sysctl -w vm.max_map_count=262144 && sed -i '/^vm.max_map_count /d' /etc/sysctl.conf && echo 'vm.max_map_count = 262144' >> /etc/sysctl.conf",
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-initcontainer:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'sysctl',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {
                fsGroup: 1000,
              },
              serviceAccount: 'default',
              serviceAccountName: 'default',
              subdomain: 'elasticsearch-data',
              terminationGracePeriodSeconds: 30,
              tolerations: [
                {
                  effect: 'NoSchedule',
                  key: 'dedicated',
                  operator: 'Exists',
                },
              ],
              volumes: [
                {
                  name: 'data',
                  persistentVolumeClaim: {
                    claimName: 'data-logging-elk-data-0',
                  },
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'data.yml',
                        path: 'elasticsearch.yml',
                      },
                    ],
                    name: 'logging-elk-elasticsearch-config',
                  },
                  name: 'config',
                },
                {
                  configMap: {
                    defaultMode: 365,
                    name: 'logging-elk-elasticsearch-entrypoint',
                  },
                  name: 'entrypoint',
                },
                {
                  emptyDir: {},
                  name: 'plugin-bundle',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:31:03Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:59Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:34Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://f28643e7af03d42dbadaec263feafdb486ffa9f5656dbcccfe6d006e1c481936',
                  image: 'registry.ng.bluemix.net/mdelder/elasticsearch:5.5.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/elasticsearch@sha256:5fe2c4103ac31c1ed32794cc3c67fac6755b1a738779afe3ecbc80df589f3e47',
                  lastState: {
                    terminated: {
                      containerID: 'docker://b685cb75b9d06bafa49a97d4c745fe4eb8209f37d99491e8242adc3d8f0ccb9d',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:51Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:34:27Z',
                    },
                  },
                  name: 'es-data',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:58Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://371b9358ce882f1dbcb892c2df9f0ce8e1a6a7ae3545cc62a6b16defd83b4100',
                  image: 'registry.ng.bluemix.net/mdelder/icp-initcontainer:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-initcontainer@sha256:76a6bb266f348662e5490b6a86043bc79434ad252f90edd6b81a99a56a11b1ec',
                  lastState: {},
                  name: 'chmod',
                  ready: true,
                  restartCount: 1,
                  state: {
                    terminated: {
                      containerID: 'docker://371b9358ce882f1dbcb892c2df9f0ce8e1a6a7ae3545cc62a6b16defd83b4100',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:49:41Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:49:41Z',
                    },
                  },
                },
                {
                  containerID: 'docker://5a06eb2c902998b1407e42d4a20a340382c4c3a48cfb59e389ac322db81fa5e3',
                  image: 'registry.ng.bluemix.net/mdelder/icp-initcontainer:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-initcontainer@sha256:76a6bb266f348662e5490b6a86043bc79434ad252f90edd6b81a99a56a11b1ec',
                  lastState: {},
                  name: 'sysctl',
                  ready: true,
                  restartCount: 0,
                  state: {
                    terminated: {
                      containerID: 'docker://5a06eb2c902998b1407e42d4a20a340382c4c3a48cfb59e389ac322db81fa5e3',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:49:54Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:49:54Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.68',
              qosClass: 'Burstable',
              startTime: '2018-05-14T20:28:34Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:33Z',
              generateName: 'logging-elk-filebeat-ds-',
              labels: {
                app: 'logging-elk-elasticsearch',
                component: 'filebeat-ds',
                'controller-revision-hash': '1831702304',
                'pod-template-generation': '1',
                role: 'filebeat',
              },
              name: 'logging-elk-filebeat-ds-crz7r',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'logging-elk-filebeat-ds',
                  uid: '5f208ae8-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '3574',
              selfLink: '/api/v1/namespaces/kube-system/pods/logging-elk-filebeat-ds-crz7r',
              uid: '5f22f29d-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'NODE_HOSTNAME',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'spec.nodeName',
                        },
                      },
                    },
                    {
                      name: 'POD_IP',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'status.podIP',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/filebeat:5.5.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'filebeat',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/share/filebeat/filebeat.yml',
                      name: 'config',
                      subPath: 'filebeat.yml',
                    },
                    {
                      mountPath: '/usr/share/filebeat/data',
                      name: 'data',
                    },
                    {
                      mountPath: '/var/log/containers',
                      name: 'container-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/log/pods',
                      name: 'pod-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/lib/docker/containers/',
                      name: 'docker-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.82.119',
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
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'filebeat.yml',
                        path: 'filebeat.yml',
                      },
                    ],
                    name: 'logging-elk-filebeat-ds-config',
                  },
                  name: 'config',
                },
                {
                  emptyDir: {},
                  name: 'data',
                },
                {
                  hostPath: {
                    path: '/var/log/containers',
                    type: '',
                  },
                  name: 'container-log',
                },
                {
                  hostPath: {
                    path: '/var/log/pods',
                    type: '',
                  },
                  name: 'pod-log',
                },
                {
                  hostPath: {
                    path: '/var/lib/docker/containers',
                    type: '',
                  },
                  name: 'docker-log',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:34Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://c6c2ffbf5bc928e40241619c6128af76a9ce45b1356244cbc786e150c4b54b49',
                  image: 'registry.ng.bluemix.net/mdelder/filebeat:5.5.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/filebeat@sha256:11866952f63f84345d32df2026c4cc3eea9f3af637f9166478e6b8c689b60458',
                  lastState: {},
                  name: 'filebeat',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:28:34Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.119',
              phase: 'Running',
              podIP: '10.1.70.2',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:33Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:33Z',
              generateName: 'logging-elk-filebeat-ds-',
              labels: {
                app: 'logging-elk-elasticsearch',
                component: 'filebeat-ds',
                'controller-revision-hash': '1831702304',
                'pod-template-generation': '1',
                role: 'filebeat',
              },
              name: 'logging-elk-filebeat-ds-fns8s',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'logging-elk-filebeat-ds',
                  uid: '5f208ae8-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '3558',
              selfLink: '/api/v1/namespaces/kube-system/pods/logging-elk-filebeat-ds-fns8s',
              uid: '5f22e558-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'NODE_HOSTNAME',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'spec.nodeName',
                        },
                      },
                    },
                    {
                      name: 'POD_IP',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'status.podIP',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/filebeat:5.5.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'filebeat',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/share/filebeat/filebeat.yml',
                      name: 'config',
                      subPath: 'filebeat.yml',
                    },
                    {
                      mountPath: '/usr/share/filebeat/data',
                      name: 'data',
                    },
                    {
                      mountPath: '/var/log/containers',
                      name: 'container-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/log/pods',
                      name: 'pod-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/lib/docker/containers/',
                      name: 'docker-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.82.171',
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
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'filebeat.yml',
                        path: 'filebeat.yml',
                      },
                    ],
                    name: 'logging-elk-filebeat-ds-config',
                  },
                  name: 'config',
                },
                {
                  emptyDir: {},
                  name: 'data',
                },
                {
                  hostPath: {
                    path: '/var/log/containers',
                    type: '',
                  },
                  name: 'container-log',
                },
                {
                  hostPath: {
                    path: '/var/log/pods',
                    type: '',
                  },
                  name: 'pod-log',
                },
                {
                  hostPath: {
                    path: '/var/lib/docker/containers',
                    type: '',
                  },
                  name: 'docker-log',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:34Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://e10a87078addd7418b7e72fbd461e5302ef254df143013f584e66ae5dc525f33',
                  image: 'registry.ng.bluemix.net/mdelder/filebeat:5.5.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/filebeat@sha256:11866952f63f84345d32df2026c4cc3eea9f3af637f9166478e6b8c689b60458',
                  lastState: {},
                  name: 'filebeat',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:28:34Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.171',
              phase: 'Running',
              podIP: '10.1.255.66',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:33Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:33Z',
              generateName: 'logging-elk-filebeat-ds-',
              labels: {
                app: 'logging-elk-elasticsearch',
                component: 'filebeat-ds',
                'controller-revision-hash': '1831702304',
                'pod-template-generation': '1',
                role: 'filebeat',
              },
              name: 'logging-elk-filebeat-ds-nrljs',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'logging-elk-filebeat-ds',
                  uid: '5f208ae8-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380331',
              selfLink: '/api/v1/namespaces/kube-system/pods/logging-elk-filebeat-ds-nrljs',
              uid: '5f220d58-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'NODE_HOSTNAME',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'spec.nodeName',
                        },
                      },
                    },
                    {
                      name: 'POD_IP',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'status.podIP',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/filebeat:5.5.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'filebeat',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/share/filebeat/filebeat.yml',
                      name: 'config',
                      subPath: 'filebeat.yml',
                    },
                    {
                      mountPath: '/usr/share/filebeat/data',
                      name: 'data',
                    },
                    {
                      mountPath: '/var/log/containers',
                      name: 'container-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/log/pods',
                      name: 'pod-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/lib/docker/containers/',
                      name: 'docker-log',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
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
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'filebeat.yml',
                        path: 'filebeat.yml',
                      },
                    ],
                    name: 'logging-elk-filebeat-ds-config',
                  },
                  name: 'config',
                },
                {
                  emptyDir: {},
                  name: 'data',
                },
                {
                  hostPath: {
                    path: '/var/log/containers',
                    type: '',
                  },
                  name: 'container-log',
                },
                {
                  hostPath: {
                    path: '/var/log/pods',
                    type: '',
                  },
                  name: 'pod-log',
                },
                {
                  hostPath: {
                    path: '/var/lib/docker/containers',
                    type: '',
                  },
                  name: 'docker-log',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:26Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://489efa2fb25497e1d23aef691d1f98c8f21771b6e47291b4c4bfb7aeaf0804cd',
                  image: 'registry.ng.bluemix.net/mdelder/filebeat:5.5.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/filebeat@sha256:11866952f63f84345d32df2026c4cc3eea9f3af637f9166478e6b8c689b60458',
                  lastState: {
                    terminated: {
                      containerID: 'docker://1e0770f5f4cf0c710e3dddd7fd93d0b8e64c87cc758a269c6187c542596efab2',
                      exitCode: 0,
                      finishedAt: '2018-07-17T16:29:45Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:29:26Z',
                    },
                  },
                  name: 'filebeat',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:25Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.124',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:33Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
                productID: 'none',
                productName: 'Logstash',
                productVersion: '5.5.1',
              },
              creationTimestamp: '2018-05-14T20:28:33Z',
              generateName: 'logging-elk-logstash-667b7c9c5d-',
              labels: {
                app: 'logging-elk-elasticsearch',
                component: 'logstash',
                'pod-template-hash': '2236375718',
                role: 'logstash',
              },
              name: 'logging-elk-logstash-667b7c9c5d-zckh2',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'logging-elk-logstash-667b7c9c5d',
                  uid: '5f2a1107-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380420',
              selfLink: '/api/v1/namespaces/kube-system/pods/logging-elk-logstash-667b7c9c5d-zckh2',
              uid: '5f2c7b88-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  env: [
                    {
                      name: 'LS_JAVA_OPTS',
                      value: '-Xmx512m -Xms512m',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/logstash:5.5.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'logstash',
                  ports: [
                    {
                      containerPort: 5044,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {
                    limits: {
                      memory: '1Gi',
                    },
                    requests: {
                      memory: '1Gi',
                    },
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/share/logstash/pipeline',
                      name: 'pipeline-config',
                    },
                    {
                      mountPath: '/usr/share/logstash/config/logstash.yml',
                      name: 'logstash-config',
                      subPath: 'logstash.yml',
                    },
                    {
                      mountPath: '/usr/share/logstash/data',
                      name: 'data',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'k8s.conf',
                        path: 'k8s.conf',
                      },
                    ],
                    name: 'logging-elk-logstash-config',
                  },
                  name: 'pipeline-config',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'logstash.yml',
                        path: 'logstash.yml',
                      },
                    ],
                    name: 'logging-elk-logstash-config',
                  },
                  name: 'logstash-config',
                },
                {
                  emptyDir: {},
                  name: 'data',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:20Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://8a8b9bbb14099a65a99e4d5cbbe7b4e1be0e14459a2c18abe07d41eb528b110f',
                  image: 'registry.ng.bluemix.net/mdelder/logstash:5.5.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/logstash@sha256:0e299220592157418ab46def8e05000415821c0c0d835debba5d469512b4234b',
                  lastState: {
                    terminated: {
                      containerID: 'docker://c1bd81f85cc3ad361c974cbcdb9aaa4b9ac79682a4324154275b1914902125ce',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:51Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:30:25Z',
                    },
                  },
                  name: 'logstash',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:20Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.121',
              qosClass: 'Burstable',
              startTime: '2018-05-14T20:28:33Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
                productID: 'none',
                productName: 'Elasticsearch',
                productVersion: '5.5.1',
              },
              creationTimestamp: '2018-05-14T20:28:33Z',
              generateName: 'logging-elk-master-bb4c8649-',
              labels: {
                app: 'logging-elk-elasticsearch',
                component: 'master',
                'pod-template-hash': '66074205',
                role: 'master',
              },
              name: 'logging-elk-master-bb4c8649-sz8cm',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'logging-elk-master-bb4c8649',
                  uid: '5f269e9b-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380430',
              selfLink: '/api/v1/namespaces/kube-system/pods/logging-elk-master-bb4c8649-sz8cm',
              uid: '5f2aa667-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  command: [
                    '/bin/bash',
                    '/scripts/searchguard/entrypoint.sh',
                  ],
                  env: [
                    {
                      name: 'ES_JAVA_OPTS',
                      value: '-Xms512m -Xmx512m',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/elasticsearch:5.5.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'es-master',
                  ports: [
                    {
                      containerPort: 9300,
                      name: 'transport',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {
                    limits: {
                      memory: '1Gi',
                    },
                    requests: {
                      memory: '1Gi',
                    },
                  },
                  securityContext: {
                    capabilities: {
                      add: [
                        'IPC_LOCK',
                      ],
                    },
                    privileged: false,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/usr/share/elasticsearch/data',
                      name: 'data',
                    },
                    {
                      mountPath: '/usr/share/elasticsearch/config/elasticsearch.yml',
                      name: 'config',
                      subPath: 'elasticsearch.yml',
                    },
                    {
                      mountPath: '/scripts/searchguard',
                      name: 'entrypoint',
                    },
                    {
                      mountPath: '/usr/share/elasticsearch/plugin-bundles',
                      name: 'plugin-bundle',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
                    '/bin/sh',
                    '-c',
                    "sysctl -w vm.max_map_count=262144 && sed -i '/^vm.max_map_count /d' /etc/sysctl.conf && echo 'vm.max_map_count = 262144' >> /etc/sysctl.conf",
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-initcontainer:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'sysctl',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  emptyDir: {},
                  name: 'data',
                },
                {
                  emptyDir: {},
                  name: 'plugin-bundle',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'master.yml',
                        path: 'elasticsearch.yml',
                      },
                    ],
                    name: 'logging-elk-elasticsearch-config',
                  },
                  name: 'config',
                },
                {
                  configMap: {
                    defaultMode: 365,
                    name: 'logging-elk-elasticsearch-entrypoint',
                  },
                  name: 'entrypoint',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:29:48Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:34Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:33Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://aa0d34a28b590e082ce068c81d2449258b75d5d765f42c12342977bc2c4213c0',
                  image: 'registry.ng.bluemix.net/mdelder/elasticsearch:5.5.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/elasticsearch@sha256:5fe2c4103ac31c1ed32794cc3c67fac6755b1a738779afe3ecbc80df589f3e47',
                  lastState: {
                    terminated: {
                      containerID: 'docker://c958ab171170848f854987b8ce0da1428abb72c024bdf18b0fe541e460f19d86',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:51Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:34:17Z',
                    },
                  },
                  name: 'es-master',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:32Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://20deafd35b7edd6af8684e6eb637dc1f559383d7a32db43c144cd080f164d5ed',
                  image: 'registry.ng.bluemix.net/mdelder/icp-initcontainer:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-initcontainer@sha256:76a6bb266f348662e5490b6a86043bc79434ad252f90edd6b81a99a56a11b1ec',
                  lastState: {},
                  name: 'sysctl',
                  ready: true,
                  restartCount: 1,
                  state: {
                    terminated: {
                      containerID: 'docker://20deafd35b7edd6af8684e6eb637dc1f559383d7a32db43c144cd080f164d5ed',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:50:27Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:50:27Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.82',
              qosClass: 'Burstable',
              startTime: '2018-05-14T20:28:33Z',
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
              creationTimestamp: '2018-05-14T20:14:18Z',
              generateName: 'mariadb-',
              labels: {
                'controller-revision-hash': 'mariadb-65d668ff46',
                'k8s-app': 'mariadb',
                release: 'mariadb',
                'statefulset.kubernetes.io/pod-name': 'mariadb-0',
              },
              name: 'mariadb-0',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'StatefulSet',
                  name: 'mariadb',
                  uid: '61f2bf4c-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380294',
              selfLink: '/api/v1/namespaces/kube-system/pods/mariadb-0',
              uid: '61f5a47f-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    'start.sh',
                    'docker-entrypoint.sh',
                    'mysqld',
                    '--user=mysql',
                  ],
                  env: [
                    {
                      name: 'MYSQL_ROOT_PASSWORD',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'OAUTH2DB_PASSWORD',
                          name: 'platform-mariadb-credentials',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/mariadb:10.2.14',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    exec: {
                      command: [
                        'mysqladmin',
                        'ping',
                        '-uroot',
                        '-p$MARIADB_ROOT_PASSWORD',
                      ],
                    },
                    failureThreshold: 3,
                    initialDelaySeconds: 30,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'mariadb',
                  readinessProbe: {
                    exec: {
                      command: [
                        'mysqladmin',
                        'ping',
                        '-uroot',
                        '-p$MARIADB_ROOT_PASSWORD',
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
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/lib/mysql',
                      name: 'mysqldata',
                    },
                    {
                      mountPath: '/usr/local/bin/start.sh',
                      name: 'mysqlstart',
                      subPath: 'start.sh',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              hostname: 'mariadb-0',
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              subdomain: 'mariadb',
              terminationGracePeriodSeconds: 60,
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
                    path: '/var/lib/mysql',
                    type: '',
                  },
                  name: 'mysqldata',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'mariadb-start.sh',
                        mode: 511,
                        path: 'start.sh',
                      },
                    ],
                    name: 'mariadb-start',
                  },
                  name: 'mysqlstart',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:18Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:19Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:18Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://cd5bb4b963207e65d25edfde4bdca7e68cbcfff1c7d65cfb1ece7556ed64db62',
                  image: 'registry.ng.bluemix.net/mdelder/mariadb:10.2.14',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/mariadb@sha256:fe461b45bb99a655455bdb24bf13ea306702001812aa7feace3dbd699d156e29',
                  lastState: {
                    terminated: {
                      containerID: 'docker://6401f4c71e6b8c7a117848fb551f3ec664163af65eadfe23b45a2b57ec03c6b2',
                      exitCode: 255,
                      finishedAt: '2018-07-17T20:47:54Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:14:56Z',
                    },
                  },
                  name: 'mariadb',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:51Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '9.42.80.212',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:14:18Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:10Z',
              generateName: 'metering-dm-849b4455fd-',
              labels: {
                app: 'metering-dm',
                component: 'meteringsvc',
                'pod-template-hash': '4056001198',
              },
              name: 'metering-dm-849b4455fd-wfkmj',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'metering-dm-849b4455fd',
                  uid: '51d51992-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380851',
              selfLink: '/api/v1/namespaces/kube-system/pods/metering-dm-849b4455fd-wfkmj',
              uid: '51d6c14a-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'HC_DM_IS_ICP',
                      value: 'true',
                    },
                    {
                      name: 'NODE_TLS_REJECT_UNAUTHORIZED',
                      value: '0',
                    },
                    {
                      name: 'ICP_PROXY_IP',
                      value: '9.42.80.212',
                    },
                    {
                      name: 'ICP_API_NODEPORT',
                      value: '31443',
                    },
                    {
                      name: 'HC_MONGO_HOST',
                      value: 'mongodb',
                    },
                    {
                      name: 'HC_MONGO_PORT',
                      value: '27017',
                    },
                    {
                      name: 'HC_MONGO_USER',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'user',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                    {
                      name: 'HC_MONGO_PASS',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'password',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                    {
                      name: 'HC_MONGO_ISSSL',
                      value: 'true',
                    },
                    {
                      name: 'HC_MONGO_SSL_CA',
                      value: '/certs/mongodb-ca/tls.crt',
                    },
                    {
                      name: 'HC_MONGO_SSL_CERT',
                      value: '/certs/mongodb-client/tls.crt',
                    },
                    {
                      name: 'HC_MONGO_SSL_KEY',
                      value: '/certs/mongodb-client/tls.key',
                    },
                    {
                      name: 'HC_DM_ALLOW_TEST',
                      value: 'false',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/livenessProbe',
                      port: 3000,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 305,
                    periodSeconds: 300,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'metering-dm',
                  ports: [
                    {
                      containerPort: 3000,
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/readinessProbe',
                      port: 3000,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 15,
                    periodSeconds: 15,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  resources: {},
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
                      name: 'default-token-4g7tw',
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
                    'node',
                    '/datamanager/lib/metering_config.js',
                    'create',
                  ],
                  env: [
                    {
                      name: 'NODE_TLS_REJECT_UNAUTHORIZED',
                      value: '0',
                    },
                    {
                      name: 'ICP_API_KEY',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'ICP_API_KEY',
                          name: 'icp-serviceid-apikey-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'metering-dm-init',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                management: 'true',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
              ],
              volumes: [
                {
                  name: 'mongodb-ca-cert',
                  secret: {
                    defaultMode: 256,
                    secretName: 'cluster-ca-cert',
                  },
                },
                {
                  name: 'mongodb-client-cert',
                  secret: {
                    defaultMode: 256,
                    secretName: 'cluster-ca-cert',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:53:29Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:53:51Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:10Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://e84481831762ae334baaa9ad69e9b93792cac4e45ae3fef348ae898f54fe8f30',
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-data-manager@sha256:c45463c86c9ab56bc53f94ac45d8f1a3bfac4738268e935787ef252a36bdf0c7',
                  lastState: {
                    terminated: {
                      containerID: 'docker://d9b3e6099ad784ac9be74b0366d37e27d0570e308151aa91afc0a285ce932ca5',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:53Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:29:01Z',
                    },
                  },
                  name: 'metering-dm',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:53:33Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://b70be5fe2d6afbd8bdadafecec1500e72ce920c0c1dee8db5123db63154303ac',
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-data-manager@sha256:c45463c86c9ab56bc53f94ac45d8f1a3bfac4738268e935787ef252a36bdf0c7',
                  lastState: {},
                  name: 'metering-dm-init',
                  ready: true,
                  restartCount: 4,
                  state: {
                    terminated: {
                      containerID: 'docker://b70be5fe2d6afbd8bdadafecec1500e72ce920c0c1dee8db5123db63154303ac',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:53:25Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:53:24Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.120',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:10Z',
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
              creationTimestamp: '2018-05-14T20:28:10Z',
              generateName: 'metering-reader-',
              labels: {
                app: 'metering-reader',
                component: 'meteringsvc',
                'controller-revision-hash': '632985971',
                'pod-template-generation': '1',
              },
              name: 'metering-reader-259m9',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'metering-reader',
                  uid: '51d38183-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9379208',
              selfLink: '/api/v1/namespaces/kube-system/pods/metering-reader-259m9',
              uid: '51dbcd33-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'APIHOST',
                      value: 'https://metering-server:9443',
                    },
                    {
                      name: 'HC_RDR_ICP_SIG',
                      value: 'ICP_SERVICEINSTANCEGUID',
                    },
                    {
                      name: 'MY_NODE_NAME',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'spec.nodeName',
                        },
                      },
                    },
                    {
                      name: 'METERING_SERVICE_ID',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'id',
                          name: 'metering-service-id',
                        },
                      },
                    },
                    {
                      name: 'METERING_SERVICE_BOUND_TO_PREFIX',
                      value: 'crn:v1:icp:private:iam::::serviceid:',
                    },
                    {
                      name: 'METERING_API_KEY_UUID',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'apikey',
                          name: 'metering-service-id',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-reader:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    exec: {
                      command: [
                        '/liveness_check.sh',
                      ],
                    },
                    failureThreshold: 3,
                    initialDelaySeconds: 300,
                    periodSeconds: 300,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'metering-reader',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/docker.sock',
                      name: 'sock',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
                    'node',
                    '/datamanager/lib/metering_config.js',
                    'verify',
                  ],
                  env: [
                    {
                      name: 'NODE_TLS_REJECT_UNAUTHORIZED',
                      value: '0',
                    },
                    {
                      name: 'ICP_API_KEY',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'ICP_API_KEY',
                          name: 'icp-serviceid-apikey-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'metering-reader-init',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.82.171',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
                    path: '/var/run/docker.sock',
                    type: '',
                  },
                  name: 'sock',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:44Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:54Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:10Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://3317855c80c727d6cf1e4b2840310215b0a319be4cb0181c56d3533b72f1a0b7',
                  image: 'registry.ng.bluemix.net/mdelder/metering-reader:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-reader@sha256:1f2c4bb1c66086b5fcb9d84a29c69fe80e20c7e405a24084e763c6efd41846e6',
                  lastState: {
                    terminated: {
                      containerID: 'docker://4f3a78a15ae043d3b264b2524cac94c3d834f305b3f4134a401c4955967f81ad',
                      exitCode: 137,
                      finishedAt: '2018-07-17T17:06:52Z',
                      reason: 'Error',
                      startedAt: '2018-07-03T15:11:29Z',
                    },
                  },
                  name: 'metering-reader',
                  ready: true,
                  restartCount: 5,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:48:54Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.171',
              initContainerStatuses: [
                {
                  containerID: 'docker://d3766a78fcd1012cd329c49988c39d25d631e8a2abb022e3015a62eafc7791a2',
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-data-manager@sha256:14845a3a7ef4366d6f2df3c89fa6bbb6d1e4824773d5d4560fc0af44a948499a',
                  lastState: {},
                  name: 'metering-reader-init',
                  ready: true,
                  restartCount: 2,
                  state: {
                    terminated: {
                      containerID: 'docker://d3766a78fcd1012cd329c49988c39d25d631e8a2abb022e3015a62eafc7791a2',
                      exitCode: 0,
                      finishedAt: '2018-05-14T20:28:44Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:28:43Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.255.65',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:10Z',
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
              creationTimestamp: '2018-05-14T20:28:10Z',
              generateName: 'metering-reader-',
              labels: {
                app: 'metering-reader',
                component: 'meteringsvc',
                'controller-revision-hash': '632985971',
                'pod-template-generation': '1',
              },
              name: 'metering-reader-8dtjg',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'metering-reader',
                  uid: '51d38183-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380788',
              selfLink: '/api/v1/namespaces/kube-system/pods/metering-reader-8dtjg',
              uid: '51d8f329-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'APIHOST',
                      value: 'https://metering-server:9443',
                    },
                    {
                      name: 'HC_RDR_ICP_SIG',
                      value: 'ICP_SERVICEINSTANCEGUID',
                    },
                    {
                      name: 'MY_NODE_NAME',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'spec.nodeName',
                        },
                      },
                    },
                    {
                      name: 'METERING_SERVICE_ID',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'id',
                          name: 'metering-service-id',
                        },
                      },
                    },
                    {
                      name: 'METERING_SERVICE_BOUND_TO_PREFIX',
                      value: 'crn:v1:icp:private:iam::::serviceid:',
                    },
                    {
                      name: 'METERING_API_KEY_UUID',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'apikey',
                          name: 'metering-service-id',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-reader:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    exec: {
                      command: [
                        '/liveness_check.sh',
                      ],
                    },
                    failureThreshold: 3,
                    initialDelaySeconds: 300,
                    periodSeconds: 300,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'metering-reader',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/docker.sock',
                      name: 'sock',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
                    'node',
                    '/datamanager/lib/metering_config.js',
                    'verify',
                  ],
                  env: [
                    {
                      name: 'NODE_TLS_REJECT_UNAUTHORIZED',
                      value: '0',
                    },
                    {
                      name: 'ICP_API_KEY',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'ICP_API_KEY',
                          name: 'icp-serviceid-apikey-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'metering-reader-init',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
                    path: '/var/run/docker.sock',
                    type: '',
                  },
                  name: 'sock',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:53:21Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:53:27Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:10Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://1a501bd7c73b03226e43fc8db6ccf2bd4870be49d9ab5ebbeaaefa84e4a95077',
                  image: 'registry.ng.bluemix.net/mdelder/metering-reader:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-reader@sha256:1f2c4bb1c66086b5fcb9d84a29c69fe80e20c7e405a24084e763c6efd41846e6',
                  lastState: {
                    terminated: {
                      containerID: 'docker://82b71c5f968b2fed4a4600b6a180c8b070b6d74086b1f0d029bf351f7c76a475',
                      exitCode: 255,
                      finishedAt: '2018-07-17T20:47:54Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:31:31Z',
                    },
                  },
                  name: 'metering-reader',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:53:26Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://5c8a179241823f6b40d4dca7cdf4ab47356a9f16212d0fb26e2eb17143889042',
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-data-manager@sha256:c45463c86c9ab56bc53f94ac45d8f1a3bfac4738268e935787ef252a36bdf0c7',
                  lastState: {},
                  name: 'metering-reader-init',
                  ready: true,
                  restartCount: 5,
                  state: {
                    terminated: {
                      containerID: 'docker://5c8a179241823f6b40d4dca7cdf4ab47356a9f16212d0fb26e2eb17143889042',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:53:20Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:53:16Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.93',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:10Z',
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
              creationTimestamp: '2018-05-14T20:28:10Z',
              generateName: 'metering-reader-',
              labels: {
                app: 'metering-reader',
                component: 'meteringsvc',
                'controller-revision-hash': '632985971',
                'pod-template-generation': '1',
              },
              name: 'metering-reader-rhnp7',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'metering-reader',
                  uid: '51d38183-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9379178',
              selfLink: '/api/v1/namespaces/kube-system/pods/metering-reader-rhnp7',
              uid: '51dc071e-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'APIHOST',
                      value: 'https://metering-server:9443',
                    },
                    {
                      name: 'HC_RDR_ICP_SIG',
                      value: 'ICP_SERVICEINSTANCEGUID',
                    },
                    {
                      name: 'MY_NODE_NAME',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'spec.nodeName',
                        },
                      },
                    },
                    {
                      name: 'METERING_SERVICE_ID',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'id',
                          name: 'metering-service-id',
                        },
                      },
                    },
                    {
                      name: 'METERING_SERVICE_BOUND_TO_PREFIX',
                      value: 'crn:v1:icp:private:iam::::serviceid:',
                    },
                    {
                      name: 'METERING_API_KEY_UUID',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'apikey',
                          name: 'metering-service-id',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-reader:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    exec: {
                      command: [
                        '/liveness_check.sh',
                      ],
                    },
                    failureThreshold: 3,
                    initialDelaySeconds: 300,
                    periodSeconds: 300,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'metering-reader',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/docker.sock',
                      name: 'sock',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
                    'node',
                    '/datamanager/lib/metering_config.js',
                    'verify',
                  ],
                  env: [
                    {
                      name: 'NODE_TLS_REJECT_UNAUTHORIZED',
                      value: '0',
                    },
                    {
                      name: 'ICP_API_KEY',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'ICP_API_KEY',
                          name: 'icp-serviceid-apikey-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'metering-reader-init',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.82.119',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
                    path: '/var/run/docker.sock',
                    type: '',
                  },
                  name: 'sock',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:29:08Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:48:53Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:10Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://e6f944dff0cb96e42f1908d133968950b1877898fcfb8b4f98e499d70e568c9c',
                  image: 'registry.ng.bluemix.net/mdelder/metering-reader:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-reader@sha256:1f2c4bb1c66086b5fcb9d84a29c69fe80e20c7e405a24084e763c6efd41846e6',
                  lastState: {
                    terminated: {
                      containerID: 'docker://c3f2bcfd1fdb48369982f1cffdeda5bf61a4e9316bb668e2b48ef4fa0b8147db',
                      exitCode: 137,
                      finishedAt: '2018-07-17T17:03:30Z',
                      reason: 'Error',
                      startedAt: '2018-07-16T13:39:56Z',
                    },
                  },
                  name: 'metering-reader',
                  ready: true,
                  restartCount: 2,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:48:52Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.119',
              initContainerStatuses: [
                {
                  containerID: 'docker://964102f4c3ac7d28d9b22cd7c9b6274e7e27d5e276cd31c14c90227f90228ae2',
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-data-manager@sha256:14845a3a7ef4366d6f2df3c89fa6bbb6d1e4824773d5d4560fc0af44a948499a',
                  lastState: {},
                  name: 'metering-reader-init',
                  ready: true,
                  restartCount: 3,
                  state: {
                    terminated: {
                      containerID: 'docker://964102f4c3ac7d28d9b22cd7c9b6274e7e27d5e276cd31c14c90227f90228ae2',
                      exitCode: 0,
                      finishedAt: '2018-05-14T20:29:07Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:29:07Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.70.1',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:10Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:10Z',
              generateName: 'metering-server-c6894c8cf-',
              labels: {
                app: 'metering-server',
                component: 'meteringsvc',
                'pod-template-hash': '724507479',
              },
              name: 'metering-server-c6894c8cf-dc266',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'metering-server-c6894c8cf',
                  uid: '51d77460-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9381131',
              selfLink: '/api/v1/namespaces/kube-system/pods/metering-server-c6894c8cf-dc266',
              uid: '51d90a6c-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'HC_API_IS_ICP',
                      value: 'true',
                    },
                    {
                      name: 'METERING_SERVICE_ID',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'id',
                          name: 'metering-service-id',
                        },
                      },
                    },
                    {
                      name: 'METERING_SERVICE_BOUND_TO_PREFIX',
                      value: 'crn:v1:icp:private:iam::::serviceid:',
                    },
                    {
                      name: 'METERING_API_KEY_NAME',
                      value: 'metering-api-key',
                    },
                    {
                      name: 'HC_MONGO_ISSSL',
                      value: 'true',
                    },
                    {
                      name: 'HC_MONGO_HOST',
                      value: 'mongodb',
                    },
                    {
                      name: 'HC_MONGO_PORT',
                      value: '27017',
                    },
                    {
                      name: 'HC_MONGO_USER',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'user',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                    {
                      name: 'HC_MONGO_PASS',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'password',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-server:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/api/status/livenessProbe',
                      port: 9443,
                      scheme: 'HTTPS',
                    },
                    initialDelaySeconds: 305,
                    periodSeconds: 300,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'metering-server',
                  ports: [
                    {
                      containerPort: 9443,
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/api/status/readinessProbe',
                      port: 9443,
                      scheme: 'HTTPS',
                    },
                    initialDelaySeconds: 15,
                    periodSeconds: 15,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/opt/metering-certs',
                      name: 'metering-certs',
                    },
                    {
                      mountPath: '/certs/mongodb-ca',
                      name: 'mongodb-ca-cert',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
                    'node',
                    '/datamanager/lib/metering_config.js',
                    'verify',
                  ],
                  env: [
                    {
                      name: 'NODE_TLS_REJECT_UNAUTHORIZED',
                      value: '0',
                    },
                    {
                      name: 'ICP_API_KEY',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'ICP_API_KEY',
                          name: 'icp-serviceid-apikey-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'metering-server-init',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                management: 'true',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
              ],
              volumes: [
                {
                  name: 'metering-certs',
                  secret: {
                    defaultMode: 420,
                    secretName: 'router-certs',
                  },
                },
                {
                  name: 'mongodb-ca-cert',
                  secret: {
                    defaultMode: 256,
                    secretName: 'cluster-ca-cert',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:54:07Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:56:13Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:10Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://fbe72965d140b937e9031151db409c8555b79096176762167321d87a1a0ef654',
                  image: 'registry.ng.bluemix.net/mdelder/metering-server:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-server@sha256:116689146a22287ac477da7a08a9968a98419e4738e53296d3ee0917fcf83f60',
                  lastState: {
                    terminated: {
                      containerID: 'docker://4cb60627bde059f079d260e3b6e942216c7b1ab709c7a77292725cb5ea544f6e',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:51Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:33:20Z',
                    },
                  },
                  name: 'metering-server',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:54:12Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://4c941e760adb5d90279363891101748cd3adca9d6c3df6d1818c8728ddb36dce',
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-data-manager@sha256:c45463c86c9ab56bc53f94ac45d8f1a3bfac4738268e935787ef252a36bdf0c7',
                  lastState: {},
                  name: 'metering-server-init',
                  ready: true,
                  restartCount: 4,
                  state: {
                    terminated: {
                      containerID: 'docker://4c941e760adb5d90279363891101748cd3adca9d6c3df6d1818c8728ddb36dce',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:54:06Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:53:49Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.103',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:10Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:10Z',
              generateName: 'metering-ui-5ffd6769bf-',
              labels: {
                app: 'metering-ui',
                component: 'meteringsvc',
                'pod-template-hash': '1998232569',
              },
              name: 'metering-ui-5ffd6769bf-cxfvj',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'metering-ui-5ffd6769bf',
                  uid: '51d8f91d-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9381247',
              selfLink: '/api/v1/namespaces/kube-system/pods/metering-ui-5ffd6769bf-cxfvj',
              uid: '51dc6eee-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'HC_HCAPI_URI',
                      value: 'https://metering-server:9443',
                    },
                    {
                      name: 'IS_PRIVATECLOUD',
                      value: 'true',
                    },
                    {
                      name: 'NODE_TLS_REJECT_UNAUTHORIZED',
                      value: '0',
                    },
                    {
                      name: 'ICP_DEFAULT_DASHBOARD',
                      value: 'cpi.icp.main',
                    },
                    {
                      name: 'cfcRouterUrl',
                      value: 'https://icp-management-ingress:8443',
                    },
                    {
                      name: 'PLATFORM_IDENTITY_PROVIDER_URL',
                      value: 'http://platform-identity-provider:4300',
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
                      name: 'USE_PRIVATECLOUD_SECURITY',
                      value: 'true',
                    },
                    {
                      name: 'PORT',
                      value: '3130',
                    },
                    {
                      name: 'PROXY_URI',
                      value: 'metering',
                    },
                    {
                      name: 'ICP_PROXY_IP',
                      value: '9.42.80.212',
                    },
                    {
                      name: 'ICP_API_NODEPORT',
                      value: '31443',
                    },
                    {
                      name: 'METERING_SERVICE_ID',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'id',
                          name: 'metering-service-id',
                        },
                      },
                    },
                    {
                      name: 'METERING_SERVICE_BOUND_TO_PREFIX',
                      value: 'crn:v1:icp:private:iam::::serviceid:',
                    },
                    {
                      name: 'METERING_API_KEY_NAME',
                      value: 'metering-api-key',
                    },
                    {
                      name: 'HC_MONGO_HOST',
                      value: 'mongodb',
                    },
                    {
                      name: 'HC_MONGO_PORT',
                      value: '27017',
                    },
                    {
                      name: 'HC_MONGO_USER',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'user',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                    {
                      name: 'HC_MONGO_PASS',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'password',
                          name: 'icp-mongodb-admin',
                        },
                      },
                    },
                    {
                      name: 'HC_MONGO_ISSSL',
                      value: 'true',
                    },
                    {
                      name: 'HC_MONGO_SSL_CA',
                      value: '/certs/mongodb-ca/tls.crt',
                    },
                    {
                      name: 'HC_MONGO_SSL_CERT',
                      value: '/certs/mongodb-client/tls.crt',
                    },
                    {
                      name: 'HC_MONGO_SSL_KEY',
                      value: '/certs/mongodb-client/tls.key',
                    },
                    {
                      name: 'HC_DM_ALLOW_TEST',
                      value: 'false',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-ui:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/unsecure/c2c/status/livenessProbe',
                      port: 3130,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 305,
                    periodSeconds: 300,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'metering-ui',
                  ports: [
                    {
                      containerPort: 3130,
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/unsecure/c2c/status/readinessProbe',
                      port: 3130,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 15,
                    periodSeconds: 15,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  resources: {},
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
                      name: 'default-token-4g7tw',
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
                    'node',
                    '/datamanager/lib/metering_config.js',
                    'verify',
                  ],
                  env: [
                    {
                      name: 'NODE_TLS_REJECT_UNAUTHORIZED',
                      value: '0',
                    },
                    {
                      name: 'ICP_API_KEY',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'ICP_API_KEY',
                          name: 'icp-serviceid-apikey-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'metering-ui-init',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                management: 'true',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
              ],
              volumes: [
                {
                  name: 'mongodb-ca-cert',
                  secret: {
                    defaultMode: 256,
                    secretName: 'cluster-ca-cert',
                  },
                },
                {
                  name: 'mongodb-client-cert',
                  secret: {
                    defaultMode: 256,
                    secretName: 'cluster-ca-cert',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:54:07Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:57:05Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:10Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://f3925dc1a5876839f391865fb37dde41ada3c9b7cc905ae99022e18a757d4916',
                  image: 'registry.ng.bluemix.net/mdelder/metering-ui:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-ui@sha256:28229cc61d8ea29ed45cfe477aa0652b60fb6f7306812f55671923d8e1a38214',
                  lastState: {
                    terminated: {
                      containerID: 'docker://4fa0521e26389a064307bc683f66ed8180e2363add281274a55cd0d5c18c558c',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:51Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:30:57Z',
                    },
                  },
                  name: 'metering-ui',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:54:12Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://c9bf60ffe4b477f5ccbc3a5bb7723bd1c2aec1a29ab3c718e37132e6bb1bb470',
                  image: 'registry.ng.bluemix.net/mdelder/metering-data-manager:1.0.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metering-data-manager@sha256:c45463c86c9ab56bc53f94ac45d8f1a3bfac4738268e935787ef252a36bdf0c7',
                  lastState: {},
                  name: 'metering-ui-init',
                  ready: true,
                  restartCount: 4,
                  state: {
                    terminated: {
                      containerID: 'docker://c9bf60ffe4b477f5ccbc3a5bb7723bd1c2aec1a29ab3c718e37132e6bb1bb470',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:54:06Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:53:49Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.127',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:10Z',
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
              creationTimestamp: '2018-05-14T20:14:24Z',
              generateName: 'metrics-server-7866c46cfc-',
              labels: {
                'k8s-app': 'metrics-server',
                'pod-template-hash': '3422702797',
              },
              name: 'metrics-server-7866c46cfc-j5xdz',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'metrics-server-7866c46cfc',
                  uid: '6531c4a0-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380381',
              selfLink: '/api/v1/namespaces/kube-system/pods/metrics-server-7866c46cfc-j5xdz',
              uid: '65335605-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                podAntiAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: [
                    {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: 'k8s-app',
                            operator: 'In',
                            values: [
                              'metrics-server',
                            ],
                          },
                        ],
                      },
                      topologyKey: 'kubernetes.io/hostname',
                    },
                  ],
                },
              },
              containers: [
                {
                  command: [
                    '/metrics-server',
                    '--source=kubernetes.summary_api:https://kubernetes.default?kubeletHttps=true&kubeletPort=10250&insecure=true',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/metrics-server:v0.2.1',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/healthz',
                      port: 443,
                      scheme: 'HTTPS',
                    },
                    initialDelaySeconds: 180,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 5,
                  },
                  name: 'metrics-server',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                management: 'true',
              },
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
              ],
              volumes: [
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:24Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:15Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:24Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://4ee81c554be499430e614d7a77b8c6a7e84b3608793479e52cd40e3dc3b57319',
                  image: 'registry.ng.bluemix.net/mdelder/metrics-server:v0.2.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/metrics-server@sha256:f4d4d642cc9ca7cc4e4ca7d68afdf5adf62e6f1d01fa02d60310eefb573830af',
                  lastState: {
                    terminated: {
                      containerID: 'docker://c41abc46d7a80487c20dab2f05d06d813f74719ddbecc1c1b69b6f7f21096a92',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:44Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:16:34Z',
                    },
                  },
                  name: 'metrics-server',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:14Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.113',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:14:24Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
                productID: 'none',
                productName: 'collectd-exporter',
                productVersion: '0.3.1',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-exporter-78b7d9c878-',
              labels: {
                app: 'monitoring-exporter',
                chart: 'ibm-icpmonitoring',
                component: 'collectdexporter',
                heritage: 'Tiller',
                'pod-template-hash': '3463857434',
                release: 'monitoring',
              },
              name: 'monitoring-exporter-78b7d9c878-pm8tb',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'monitoring-exporter-78b7d9c878',
                  uid: '5bf2d07c-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380321',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-exporter-78b7d9c878-pm8tb',
              uid: '5bf3fe02-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                              'ppc64le',
                            ],
                          },
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  args: [
                    '-collectd.listen-address=:25826',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/collectd-exporter:0.3.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'collectd-exporter',
                  ports: [
                    {
                      containerPort: 9103,
                      name: 'metrics',
                      protocol: 'TCP',
                    },
                    {
                      containerPort: 25826,
                      name: 'collector',
                      protocol: 'UDP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:03Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://17955a6e24ef07a14ea2bdee2d6c1b6bce5e947a6eb371c40a276026c24e3b59',
                  image: 'registry.ng.bluemix.net/mdelder/collectd-exporter:0.3.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/collectd-exporter@sha256:0cb70dda6500d3e9d43068a693acf8f7b4723922fb419343b80244cc05ac7cea',
                  lastState: {
                    terminated: {
                      containerID: 'docker://95693ed8200add3ea67ccea8f0adfd217d608782d671be7129d804b95b4af535',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:42Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:29:50Z',
                    },
                  },
                  name: 'collectd-exporter',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:02Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.107',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:27Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
                productID: 'none',
                productName: 'grafana',
                productVersion: '4.6.3',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-grafana-7d5b5c4646-',
              labels: {
                app: 'monitoring-grafana',
                chart: 'ibm-icpmonitoring',
                component: 'grafana',
                heritage: 'Tiller',
                'pod-template-hash': '3816170202',
                release: 'monitoring',
              },
              name: 'monitoring-grafana-7d5b5c4646-ch9sq',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'monitoring-grafana-7d5b5c4646',
                  uid: '5bf87475-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380448',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-grafana-7d5b5c4646-ch9sq',
              uid: '5bfb89b9-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                              'ppc64le',
                            ],
                          },
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  command: [
                    '/opt/entry/entrypoint.sh',
                  ],
                  env: [
                    {
                      name: 'GF_SECURITY_ADMIN_USER',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'username',
                          name: 'monitoring-grafana-secret',
                        },
                      },
                    },
                    {
                      name: 'GF_SECURITY_ADMIN_PASSWORD',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'password',
                          name: 'monitoring-grafana-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/grafana:4.6.3',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'grafana',
                  ports: [
                    {
                      containerPort: 3000,
                      name: 'web',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {
                    limits: {
                      cpu: '500m',
                      memory: '512Mi',
                    },
                    requests: {
                      cpu: '100m',
                      memory: '128Mi',
                    },
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/lib/grafana',
                      name: 'grafana-storage',
                    },
                    {
                      mountPath: '/tmp/grafana/config',
                      name: 'config-volume',
                    },
                    {
                      mountPath: '/tmp/grafana/dashboards',
                      name: 'dashboard-volume',
                    },
                    {
                      mountPath: '/opt/entry',
                      name: 'grafana-entry',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  command: [
                    '/opt/ibm/router/entry/entrypoint.sh',
                  ],
                  env: [
                    {
                      name: 'GF_SECURITY_ADMIN_USER',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'username',
                          name: 'monitoring-grafana-secret',
                        },
                      },
                    },
                    {
                      name: 'GF_SECURITY_ADMIN_PASSWORD',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'password',
                          name: 'monitoring-grafana-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-router:2.2.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'router',
                  ports: [
                    {
                      containerPort: 8080,
                      name: 'router',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/opt/ibm/router/conf',
                      name: 'router-config',
                    },
                    {
                      mountPath: '/opt/ibm/router/certs',
                      name: 'monitoring-certs',
                    },
                    {
                      mountPath: '/opt/ibm/router/ca-certs',
                      name: 'monitoring-ca-cert',
                    },
                    {
                      mountPath: '/opt/ibm/router/entry',
                      name: 'router-entry',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  emptyDir: {},
                  name: 'grafana-storage',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'monitoring-grafana',
                  },
                  name: 'config-volume',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'monitoring-grafana-dashboards',
                  },
                  name: 'dashboard-volume',
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'monitoring-grafana-entry-config',
                  },
                  name: 'grafana-entry',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'monitoring-grafana-router-nginx-config',
                  },
                  name: 'router-config',
                },
                {
                  name: 'monitoring-certs',
                  secret: {
                    defaultMode: 420,
                    secretName: 'monitoring-monitoring-certs',
                  },
                },
                {
                  name: 'monitoring-ca-cert',
                  secret: {
                    defaultMode: 420,
                    secretName: 'monitoring-monitoring-ca-cert',
                  },
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'monitoring-monitoring-router-entry-config',
                  },
                  name: 'router-entry',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:26Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://8e3dc47965ea800437bfef77497fef01ff142daeea4076caaf07eb8eda3f3d8a',
                  image: 'registry.ng.bluemix.net/mdelder/grafana:4.6.3',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/grafana@sha256:bbeda64e65f7eb0e3b3002cf073334b7cffadd1b8768e0724139b940fe524e23',
                  lastState: {
                    terminated: {
                      containerID: 'docker://e31c50bea6c2aa2a4ab98d4642ee3a27c4e27802b0deb8190c2467433a1b1e1c',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:51Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:32:05Z',
                    },
                  },
                  name: 'grafana',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:23Z',
                    },
                  },
                },
                {
                  containerID: 'docker://9cfe375b4ef573fd4737792746799bf3bce2219049901f9b3a5adcccc1ea66bc',
                  image: 'registry.ng.bluemix.net/mdelder/icp-router:2.2.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-router@sha256:8635871aab4744df7f28b3fbd9fad63448ba464740213b7bfa742e59d7b6c931',
                  lastState: {
                    terminated: {
                      containerID: 'docker://32ece2032b357f6691c23cf3aec04ef210a0c48741d84dc766404afbe6636aa2',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:50Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:34:31Z',
                    },
                  },
                  name: 'router',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:26Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.71',
              qosClass: 'Burstable',
              startTime: '2018-05-14T20:28:27Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-grafana-ds-',
              labels: {
                app: 'monitoring-grafana',
                component: 'setds',
                'controller-uid': '5bfdbe4e-57b5-11e8-92fb-005056a08eb1',
                'job-name': 'monitoring-grafana-ds',
                release: 'monitoring',
              },
              name: 'monitoring-grafana-ds-qrpfq',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'batch/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'Job',
                  name: 'monitoring-grafana-ds',
                  uid: '5bfdbe4e-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '4874',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-grafana-ds-qrpfq',
              uid: '5c008e5b-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                              'ppc64le',
                            ],
                          },
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  command: [
                    '/opt/entry/entrypoint.sh',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/curl:3.6',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'grafana-ds',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/opt/entry',
                      name: 'grafana-ds-entry',
                    },
                    {
                      mountPath: '/opt/ibm/monitoring/certs',
                      name: 'monitoring-client-certs',
                    },
                    {
                      mountPath: '/opt/ibm/monitoring/ca-certs',
                      name: 'monitoring-ca-cert',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              restartPolicy: 'OnFailure',
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
              ],
              volumes: [
                {
                  name: 'monitoring-client-certs',
                  secret: {
                    defaultMode: 420,
                    secretName: 'monitoring-monitoring-client-certs',
                  },
                },
                {
                  name: 'monitoring-ca-cert',
                  secret: {
                    defaultMode: 420,
                    secretName: 'monitoring-monitoring-ca-cert',
                  },
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'monitoring-grafana-ds-entry-config',
                  },
                  name: 'grafana-ds-entry',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  reason: 'PodCompleted',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:35:35Z',
                  reason: 'PodCompleted',
                  status: 'False',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://2b1ce44bf8b2561610bb65c154a2a358ce4326d25e84ce8c1e52411cddcd2d3e',
                  image: 'registry.ng.bluemix.net/mdelder/curl:3.6',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/curl@sha256:5457570216e92c1340ff5b34e91ca06fa5726e2ee3421d7d9b711c93a8a8f827',
                  lastState: {
                    terminated: {
                      containerID: 'docker://d8d710ce2a412682877804c4bef48ca5a00e7d911d5c67029b2ae890b6149f13',
                      exitCode: 7,
                      finishedAt: '2018-05-14T20:35:33Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:33:25Z',
                    },
                  },
                  name: 'grafana-ds',
                  ready: false,
                  restartCount: 1,
                  state: {
                    terminated: {
                      containerID: 'docker://2b1ce44bf8b2561610bb65c154a2a358ce4326d25e84ce8c1e52411cddcd2d3e',
                      exitCode: 0,
                      finishedAt: '2018-05-14T20:35:34Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:35:34Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Succeeded',
              podIP: '10.1.112.107',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:27Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
                productID: 'none',
                productName: 'prometheus',
                productVersion: '2.0.0',
              },
              creationTimestamp: '2018-07-05T15:47:25Z',
              generateName: 'monitoring-prometheus-774897bdcb-',
              labels: {
                app: 'monitoring-prometheus',
                chart: 'ibm-icpmonitoring',
                component: 'prometheus',
                heritage: 'Tiller',
                'pod-template-hash': '3304536876',
                release: 'monitoring',
              },
              name: 'monitoring-prometheus-774897bdcb-qp2cx',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'monitoring-prometheus-774897bdcb',
                  uid: 'b6a6fa08-806a-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380372',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-prometheus-774897bdcb-qp2cx',
              uid: 'b6ab140e-806a-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                              'ppc64le',
                            ],
                          },
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  args: [
                    '--volume-dir=/etc/config',
                    '--volume-dir=/etc/alert-rules',
                    '--webhook-url=http://localhost:9090/-/reload',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/configmap-reload:v0.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'configmap-reload',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/config',
                      name: 'config-volume',
                      readOnly: true,
                    },
                    {
                      mountPath: '/etc/alert-rules',
                      name: 'rules-volume',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  args: [
                    '--config.file=/etc/config/prometheus.yml',
                    '--web.enable-lifecycle',
                    '--web.enable-admin-api',
                    '--storage.tsdb.path=/var/lib/prometheus/data',
                    '--storage.tsdb.retention=24h',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/prometheus:v2.3.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'prometheus',
                  ports: [
                    {
                      containerPort: 9090,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {
                    limits: {
                      cpu: '500m',
                      memory: '512Mi',
                    },
                    requests: {
                      cpu: '100m',
                      memory: '128Mi',
                    },
                  },
                  securityContext: {
                    runAsUser: 0,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/config',
                      name: 'config-volume',
                    },
                    {
                      mountPath: '/etc/alert-rules',
                      name: 'rules-volume',
                    },
                    {
                      mountPath: '/var/lib/prometheus/data',
                      name: 'storage-volume',
                    },
                    {
                      mountPath: '/etc/etcd',
                      name: 'etcd-certs',
                    },
                    {
                      mountPath: '/opt/ibm/monitoring/certs',
                      name: 'monitoring-client-certs',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  command: [
                    '/opt/ibm/router/entry/entrypoint.sh',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-router:2.2.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'router',
                  ports: [
                    {
                      containerPort: 8080,
                      name: 'router',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/opt/ibm/router/conf',
                      name: 'router-config',
                    },
                    {
                      mountPath: '/opt/ibm/router/certs',
                      name: 'monitoring-certs',
                    },
                    {
                      mountPath: '/opt/ibm/router/ca-certs',
                      name: 'monitoring-ca-cert',
                    },
                    {
                      mountPath: '/opt/ibm/router/entry',
                      name: 'router-entry',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'monitoring-prometheus',
                  },
                  name: 'config-volume',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'monitoring-prometheus-alertrules',
                  },
                  name: 'rules-volume',
                },
                {
                  name: 'etcd-certs',
                  secret: {
                    defaultMode: 420,
                    secretName: 'etcd-secret',
                  },
                },
                {
                  emptyDir: {},
                  name: 'storage-volume',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'monitoring-prometheus-router-nginx-config',
                  },
                  name: 'router-config',
                },
                {
                  name: 'monitoring-certs',
                  secret: {
                    defaultMode: 420,
                    secretName: 'monitoring-monitoring-certs',
                  },
                },
                {
                  name: 'monitoring-ca-cert',
                  secret: {
                    defaultMode: 420,
                    secretName: 'monitoring-monitoring-ca-cert',
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
                    defaultMode: 484,
                    name: 'monitoring-monitoring-router-entry-config',
                  },
                  name: 'router-entry',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-05T15:47:26Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:23Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-05T15:47:25Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://27b1357f9ef16921c4bdb6c6cb05fd0d492b9e5acfd0b9a874dd55115627fe69',
                  image: 'registry.ng.bluemix.net/mdelder/configmap-reload:v0.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/configmap-reload@sha256:1106ad2549963db66ca4622fca79e802b777d297e18a369cc096ca97160a686a',
                  lastState: {
                    terminated: {
                      containerID: 'docker://faa8762538c092714a3e5b74f8f7941c782fa6e115dedc38f3abde91b915ef46',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:39Z',
                      reason: 'Error',
                      startedAt: '2018-07-05T15:47:57Z',
                    },
                  },
                  name: 'configmap-reload',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:21Z',
                    },
                  },
                },
                {
                  containerID: 'docker://e0be93c122307c6e4cac60f263fcd967378fcd6b637fa10b1881a6845878cc23',
                  image: 'registry.ng.bluemix.net/mdelder/prometheus:v2.3.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/prometheus@sha256:0283ae2509e1ccc71830edf382713cc3906aa55ca9418c50911854223829bf0b',
                  lastState: {
                    terminated: {
                      containerID: 'docker://dde5921bc2a5f1bf7cf577dbfd1537cad54bd96d1ad44155ac403d428197f53f',
                      exitCode: 0,
                      finishedAt: '2018-07-17T16:29:43Z',
                      reason: 'Completed',
                      startedAt: '2018-07-05T15:48:07Z',
                    },
                  },
                  name: 'prometheus',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:21Z',
                    },
                  },
                },
                {
                  containerID: 'docker://229d1aca1b91aad746037028be6588250890d9cb113ffae99398c7dd68401cf7',
                  image: 'registry.ng.bluemix.net/mdelder/icp-router:2.2.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-router@sha256:8635871aab4744df7f28b3fbd9fad63448ba464740213b7bfa742e59d7b6c931',
                  lastState: {
                    terminated: {
                      containerID: 'docker://7ea298b30794df0bf52740c08d07e9a8c061d354aaf7ce76f70450df27485e42',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:49Z',
                      reason: 'Error',
                      startedAt: '2018-07-05T15:48:08Z',
                    },
                  },
                  name: 'router',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:22Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.122',
              qosClass: 'Burstable',
              startTime: '2018-07-05T15:47:26Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
                productID: 'none',
                productName: 'alertmanager',
                productVersion: '0.13.0',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-prometheus-alertmanager-64678f5664-',
              labels: {
                app: 'monitoring-prometheus-alertmanager',
                chart: 'ibm-icpmonitoring',
                component: 'alertmanager',
                heritage: 'Tiller',
                'pod-template-hash': '2023491220',
                release: 'monitoring',
              },
              name: 'monitoring-prometheus-alertmanager-64678f5664-htbr7',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'monitoring-prometheus-alertmanager-64678f5664',
                  uid: '5beeb232-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380306',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-prometheus-alertmanager-64678f5664-htbr7',
              uid: '5bf067a4-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                              'ppc64le',
                            ],
                          },
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  args: [
                    '--volume-dir=/etc/config',
                    '--webhook-url=http://localhost:9093/-/reload',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/configmap-reload:v0.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'configmap-reload',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/config',
                      name: 'config-volume',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  args: [
                    '--config.file=/etc/config/alertmanager.yml',
                    '--storage.path=/var/lib/alertmanager/data',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/alertmanager:v0.13.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'alertmanager',
                  ports: [
                    {
                      containerPort: 9093,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {
                    limits: {
                      cpu: '200m',
                      memory: '256Mi',
                    },
                    requests: {
                      cpu: '10m',
                      memory: '64Mi',
                    },
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/config',
                      name: 'config-volume',
                    },
                    {
                      mountPath: '/var/lib/alertmanager/data',
                      name: 'storage-volume',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
                {
                  command: [
                    '/opt/ibm/router/entry/entrypoint.sh',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-router:2.2.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'router',
                  ports: [
                    {
                      containerPort: 8080,
                      name: 'router',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/opt/ibm/router/conf',
                      name: 'router-config',
                    },
                    {
                      mountPath: '/opt/ibm/router/certs',
                      name: 'monitoring-certs',
                    },
                    {
                      mountPath: '/opt/ibm/router/ca-certs',
                      name: 'monitoring-ca-cert',
                    },
                    {
                      mountPath: '/opt/ibm/router/entry',
                      name: 'router-entry',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'monitoring-prometheus-alertmanager',
                  },
                  name: 'config-volume',
                },
                {
                  emptyDir: {},
                  name: 'storage-volume',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'monitoring-prometheus-alertmanager-router-nginx-config',
                  },
                  name: 'router-config',
                },
                {
                  name: 'monitoring-certs',
                  secret: {
                    defaultMode: 420,
                    secretName: 'monitoring-monitoring-certs',
                  },
                },
                {
                  name: 'monitoring-ca-cert',
                  secret: {
                    defaultMode: 420,
                    secretName: 'monitoring-monitoring-ca-cert',
                  },
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'monitoring-monitoring-router-entry-config',
                  },
                  name: 'router-entry',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:15Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://cd62e175b49e62203ab19c73cd509e3cc3f3bd0b4cf1ddf16aea0d4d9ae2561c',
                  image: 'registry.ng.bluemix.net/mdelder/alertmanager:v0.13.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/alertmanager@sha256:51d0ecd411f3ef725235d30a9e4db7a04234dc65f4fef1dda4a9e88fbdecf2ce',
                  lastState: {
                    terminated: {
                      containerID: 'docker://182d9b13185649c198427f1d5026ee3119697a5b033fa525d619a1c68e499ba0',
                      exitCode: 0,
                      finishedAt: '2018-07-17T16:29:44Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:33:44Z',
                    },
                  },
                  name: 'alertmanager',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:14Z',
                    },
                  },
                },
                {
                  containerID: 'docker://1b4026771be62eab3639ae1d00ab0c3c9ec7f5f78893870be1a6e94c6c19a9c3',
                  image: 'registry.ng.bluemix.net/mdelder/configmap-reload:v0.1',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/configmap-reload@sha256:1106ad2549963db66ca4622fca79e802b777d297e18a369cc096ca97160a686a',
                  lastState: {
                    terminated: {
                      containerID: 'docker://7da5cac408eaaed2d1145082b9c05363eb6dc5c5118863388b45eb6d927f5e32',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:41Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:29:45Z',
                    },
                  },
                  name: 'configmap-reload',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:13Z',
                    },
                  },
                },
                {
                  containerID: 'docker://d127109ea039ff2be949978e89e4a6770359d6787ae235a99554f910399e2aec',
                  image: 'registry.ng.bluemix.net/mdelder/icp-router:2.2.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-router@sha256:8635871aab4744df7f28b3fbd9fad63448ba464740213b7bfa742e59d7b6c931',
                  lastState: {
                    terminated: {
                      containerID: 'docker://0d08f7d679533d194d977c864def4c8d6050d14fe43b5bbc6621275c48c724c3',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:50Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:35:02Z',
                    },
                  },
                  name: 'router',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:14Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.70',
              qosClass: 'Burstable',
              startTime: '2018-05-14T20:28:27Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
                productID: 'none',
                productName: 'elasticsearch-exporter',
                productVersion: '1.0.2',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-prometheus-elasticsearchexporter-785fcf75b4-',
              labels: {
                app: 'monitoring-prometheus',
                chart: 'ibm-icpmonitoring',
                component: 'elasticsearchexporter',
                heritage: 'Tiller',
                'pod-template-hash': '3419793160',
                release: 'monitoring',
              },
              name: 'monitoring-prometheus-elasticsearchexporter-785fcf75b4-57jgr',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'monitoring-prometheus-elasticsearchexporter-785fcf75b4',
                  uid: '5bf7644a-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380316',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-prometheus-elasticsearchexporter-785fcf75b4-57jgr',
              uid: '5bf8b49e-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                              'ppc64le',
                            ],
                          },
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  args: [
                    '-es.uri=http://elasticsearch:9200',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/elasticsearch-exporter:1.0.2',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'elk-exporter',
                  ports: [
                    {
                      containerPort: 9108,
                      name: 'metrics',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:06Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://11d47468e277cda35c404087ff3faedf1da0e9a432dc7f7ec92d557f488c5d44',
                  image: 'registry.ng.bluemix.net/mdelder/elasticsearch-exporter:1.0.2',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/elasticsearch-exporter@sha256:ee6bf2895482e5a0ab3b9f27af8b40f1545bb9b4119012c3e2d656abed882e8b',
                  lastState: {
                    terminated: {
                      containerID: 'docker://3798d1c962ae48d3b8ab89ab38c7a2533eb563d74644cb3f98f1700407128485',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:44Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:33:23Z',
                    },
                  },
                  name: 'elk-exporter',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:06Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.88',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:27Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
                productID: 'none',
                productName: 'kube-state-metrics',
                productVersion: 'v1.2.0',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-prometheus-kubestatemetrics-77b7c64cfd-',
              labels: {
                app: 'monitoring-prometheus',
                chart: 'ibm-icpmonitoring',
                component: 'kubestatemetrics',
                heritage: 'Tiller',
                'pod-template-hash': '3363720798',
                release: 'monitoring',
              },
              name: 'monitoring-prometheus-kubestatemetrics-77b7c64cfd-pvj8l',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'monitoring-prometheus-kubestatemetrics-77b7c64cfd',
                  uid: '5bfb0a7d-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380414',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-prometheus-kubestatemetrics-77b7c64cfd-pvj8l',
              uid: '5c007fe3-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                              'ppc64le',
                            ],
                          },
                          {
                            key: 'management',
                            operator: 'In',
                            values: [
                              'true',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  image: 'registry.ng.bluemix.net/mdelder/kube-state-metrics:v1.2.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'kubestatemetrics',
                  ports: [
                    {
                      containerPort: 8080,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
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
              ],
              volumes: [
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:28Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:25Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://610015d8c74cc8a294ad530ca6a6ff0ec8b31e31a6278a75f5d452d603116290',
                  image: 'registry.ng.bluemix.net/mdelder/kube-state-metrics:v1.2.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/kube-state-metrics@sha256:75b37eeef2642ca802c41a3b4a2f0d62a9605daa5fcc56f2102291cb4c65f06b',
                  lastState: {
                    terminated: {
                      containerID: 'docker://6db7937a5135abbf424e97e425230744ba14ed158bbaaa4167278f699467f9d6',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:42Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:32:21Z',
                    },
                  },
                  name: 'kubestatemetrics',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:24Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.73',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:28Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
                productID: 'none',
                productName: 'node-exporter',
                productVersion: 'v0.15.2',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-prometheus-nodeexporter-',
              labels: {
                app: 'monitoring-prometheus',
                component: 'nodeexporter',
                'controller-revision-hash': '1814474747',
                'pod-template-generation': '1',
                release: 'monitoring',
              },
              name: 'monitoring-prometheus-nodeexporter-6xbh7',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'monitoring-prometheus-nodeexporter',
                  uid: '5bec7e2f-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '3361',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-prometheus-nodeexporter-6xbh7',
              uid: '5bfbb106-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    '--path.procfs=/host/proc',
                    '--path.sysfs=/host/sys',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/node-exporter:v0.15.2',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'nodeexporter',
                  ports: [
                    {
                      containerPort: 9100,
                      hostPort: 9100,
                      name: 'metrics',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/host/proc',
                      name: 'proc',
                      readOnly: true,
                    },
                    {
                      mountPath: '/host/sys',
                      name: 'sys',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              hostPID: true,
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              nodeName: '9.42.82.119',
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
                    path: '/proc',
                    type: '',
                  },
                  name: 'proc',
                },
                {
                  hostPath: {
                    path: '/sys',
                    type: '',
                  },
                  name: 'sys',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:28Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://029dcf7de67d3a611b73f46a05a43086433991cc9db106548420175d9108bed5',
                  image: 'registry.ng.bluemix.net/mdelder/node-exporter:v0.15.2',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/node-exporter@sha256:3f2f30b6d5df4eeaf627871a778ef54b1f92d9009788404193acb5a9403324a7',
                  lastState: {},
                  name: 'nodeexporter',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:28:28Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.119',
              phase: 'Running',
              podIP: '9.42.82.119',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:27Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
                productID: 'none',
                productName: 'node-exporter',
                productVersion: 'v0.15.2',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-prometheus-nodeexporter-',
              labels: {
                app: 'monitoring-prometheus',
                component: 'nodeexporter',
                'controller-revision-hash': '1814474747',
                'pod-template-generation': '1',
                release: 'monitoring',
              },
              name: 'monitoring-prometheus-nodeexporter-9l89c',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'monitoring-prometheus-nodeexporter',
                  uid: '5bec7e2f-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380499',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-prometheus-nodeexporter-9l89c',
              uid: '5bf789f1-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    '--path.procfs=/host/proc',
                    '--path.sysfs=/host/sys',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/node-exporter:v0.15.2',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'nodeexporter',
                  ports: [
                    {
                      containerPort: 9100,
                      hostPort: 9100,
                      name: 'metrics',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/host/proc',
                      name: 'proc',
                      readOnly: true,
                    },
                    {
                      mountPath: '/host/sys',
                      name: 'sys',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              hostPID: true,
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              nodeName: '9.42.80.212',
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
                    path: '/proc',
                    type: '',
                  },
                  name: 'proc',
                },
                {
                  hostPath: {
                    path: '/sys',
                    type: '',
                  },
                  name: 'sys',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:35Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://7f07f3f592b24ae8a30be721849f0e608a5e8705861829e391ad24de10c99c7a',
                  image: 'registry.ng.bluemix.net/mdelder/node-exporter:v0.15.2',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/node-exporter@sha256:3f2f30b6d5df4eeaf627871a778ef54b1f92d9009788404193acb5a9403324a7',
                  lastState: {
                    terminated: {
                      containerID: 'docker://eac20d3dbb596a22014cf98cc62d9606c82619afccb1383122b28d2d3150a133',
                      exitCode: 143,
                      finishedAt: '2018-07-17T16:29:44Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:32:16Z',
                    },
                  },
                  name: 'nodeexporter',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:50:34Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '9.42.80.212',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:27Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
                productID: 'none',
                productName: 'node-exporter',
                productVersion: 'v0.15.2',
              },
              creationTimestamp: '2018-05-14T20:28:27Z',
              generateName: 'monitoring-prometheus-nodeexporter-',
              labels: {
                app: 'monitoring-prometheus',
                component: 'nodeexporter',
                'controller-revision-hash': '1814474747',
                'pod-template-generation': '1',
                release: 'monitoring',
              },
              name: 'monitoring-prometheus-nodeexporter-gx82v',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'monitoring-prometheus-nodeexporter',
                  uid: '5bec7e2f-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '3371',
              selfLink: '/api/v1/namespaces/kube-system/pods/monitoring-prometheus-nodeexporter-gx82v',
              uid: '5bfb72a6-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    '--path.procfs=/host/proc',
                    '--path.sysfs=/host/sys',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/node-exporter:v0.15.2',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'nodeexporter',
                  ports: [
                    {
                      containerPort: 9100,
                      hostPort: 9100,
                      name: 'metrics',
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/host/proc',
                      name: 'proc',
                      readOnly: true,
                    },
                    {
                      mountPath: '/host/sys',
                      name: 'sys',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostNetwork: true,
              hostPID: true,
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              nodeName: '9.42.82.171',
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
                    path: '/proc',
                    type: '',
                  },
                  name: 'proc',
                },
                {
                  hostPath: {
                    path: '/sys',
                    type: '',
                  },
                  name: 'sys',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:29Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:27Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://6d7a0ee7f6660f3499c4abbb3601f5f9c697837e9fa7915d13d170bf1f890402',
                  image: 'registry.ng.bluemix.net/mdelder/node-exporter:v0.15.2',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/node-exporter@sha256:3f2f30b6d5df4eeaf627871a778ef54b1f92d9009788404193acb5a9403324a7',
                  lastState: {},
                  name: 'nodeexporter',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:28:28Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.171',
              phase: 'Running',
              podIP: '9.42.82.171',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:27Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
              },
              creationTimestamp: '2018-05-14T20:14:22Z',
              generateName: 'nginx-ingress-controller-',
              labels: {
                app: 'nginx-ingress-controller',
                component: 'nginx-ingress-controller',
                'controller-revision-hash': '1733604829',
                'pod-template-generation': '1',
                release: 'nginx-ingress',
              },
              name: 'nginx-ingress-controller-nbrk9',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'nginx-ingress-controller',
                  uid: '64438d7f-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380298',
              selfLink: '/api/v1/namespaces/kube-system/pods/nginx-ingress-controller-nbrk9',
              uid: '6445ae95-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    '/nginx-ingress-controller',
                    '--default-backend-service=$(POD_NAMESPACE)/default-backend',
                    '--configmap=$(POD_NAMESPACE)/nginx-ingress-controller',
                    '--report-node-internal-ip-address=true',
                    '--annotations-prefix=ingress.kubernetes.io',
                    '--enable-dynamic-configuration=true',
                    '--enable-ssl-passthrough=true',
                    '--publish-status-address=9.42.80.212',
                  ],
                  env: [
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
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/nginx-ingress-controller:0.12.0',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/healthz',
                      port: 10254,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 10,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  name: 'nginx-ingress',
                  ports: [
                    {
                      containerPort: 80,
                      hostPort: 80,
                      name: 'http',
                      protocol: 'TCP',
                    },
                    {
                      containerPort: 443,
                      hostPort: 443,
                      name: 'https',
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/healthz',
                      port: 10254,
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
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
                    'sysctl -w net.core.somaxconn=32768; sysctl -w net.ipv4.ip_local_port_range="32768 65535"',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/nginx-ingress-controller:0.12.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'sysctl',
                  resources: {},
                  securityContext: {
                    privileged: true,
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                proxy: 'true',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:16:24Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:52Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:22Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://4d4f90fee8f4e8687915491672e850c6ecb6ed8ac85dbebaa577b29a9c144d6a',
                  image: 'registry.ng.bluemix.net/mdelder/nginx-ingress-controller:0.12.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/nginx-ingress-controller@sha256:087add343f1aca8124920c44388a101ea705fae41a77b0e67c9b0ccbc34f4c0c',
                  lastState: {
                    terminated: {
                      containerID: 'docker://bb3b7afb58c6425346e6107a68e42a99dff16b06a01c6a238a87d0f612299efd',
                      exitCode: 137,
                      finishedAt: '2018-07-17T16:29:50Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:16:25Z',
                    },
                  },
                  name: 'nginx-ingress',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:35Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              initContainerStatuses: [
                {
                  containerID: 'docker://4a90610e6fe5c516921fce66d578ba8d74829a1a42cbf6c27d89ae6d089393f2',
                  image: 'registry.ng.bluemix.net/mdelder/nginx-ingress-controller:0.12.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/nginx-ingress-controller@sha256:087add343f1aca8124920c44388a101ea705fae41a77b0e67c9b0ccbc34f4c0c',
                  lastState: {},
                  name: 'sysctl',
                  ready: true,
                  restartCount: 1,
                  state: {
                    terminated: {
                      containerID: 'docker://4a90610e6fe5c516921fce66d578ba8d74829a1a42cbf6c27d89ae6d089393f2',
                      exitCode: 0,
                      finishedAt: '2018-07-17T20:49:16Z',
                      reason: 'Completed',
                      startedAt: '2018-07-17T20:49:15Z',
                    },
                  },
                },
              ],
              phase: 'Running',
              podIP: '10.1.112.116',
              qosClass: 'Burstable',
              startTime: '2018-05-14T20:14:22Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:16:35Z',
              generateName: 'oidc-client-registration-',
              labels: {
                'controller-uid': 'b33cc197-57b3-11e8-92fb-005056a08eb1',
                'job-name': 'oidc-client-registration',
              },
              name: 'oidc-client-registration-sl4wr',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'batch/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'Job',
                  name: 'oidc-client-registration',
                  uid: 'b33cc197-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '2599',
              selfLink: '/api/v1/namespaces/kube-system/pods/oidc-client-registration-sl4wr',
              uid: 'b33db187-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    '/scripts/register-client.sh',
                  ],
                  env: [
                    {
                      name: 'WLP_CLIENT_REGISTRATION_SECRET',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'OAUTH2_CLIENT_REGISTRATION_SECRET',
                          name: 'platform-oidc-credentials',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-platform-auth:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'oidc-client-registration',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/scripts',
                      name: 'registration-script',
                    },
                    {
                      mountPath: '/jsons',
                      name: 'registration-json',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
              restartPolicy: 'OnFailure',
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
              ],
              volumes: [
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'registration-script',
                  },
                  name: 'registration-script',
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'registration-json',
                  },
                  name: 'registration-json',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:16:35Z',
                  reason: 'PodCompleted',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:25:07Z',
                  reason: 'PodCompleted',
                  status: 'False',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:16:35Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://4086e2aa3fd70eda3344298f59e1cd91f2024b0c36cc75c032b12aad63bd9be6',
                  image: 'registry.ng.bluemix.net/mdelder/icp-platform-auth:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-platform-auth@sha256:8b6bc39bd4ceb1d68e11a4ee3de9bbec5f95db90c33cd241ae625a63639d8535',
                  lastState: {},
                  name: 'oidc-client-registration',
                  ready: false,
                  restartCount: 0,
                  state: {
                    terminated: {
                      containerID: 'docker://4086e2aa3fd70eda3344298f59e1cd91f2024b0c36cc75c032b12aad63bd9be6',
                      exitCode: 0,
                      finishedAt: '2018-05-14T20:25:06Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:18:41Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Succeeded',
              podIP: '10.1.112.76',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:16:35Z',
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
              creationTimestamp: '2018-06-06T15:28:25Z',
              generateName: 'platform-api-',
              labels: {
                component: 'platform-api',
                'controller-revision-hash': '2289563530',
                'k8s-app': 'platform-api',
                'pod-template-generation': '1',
                release: 'platform-api',
              },
              name: 'platform-api-bsdrw',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'platform-api',
                  uid: '5e24e903-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380325',
              selfLink: '/api/v1/namespaces/kube-system/pods/platform-api-bsdrw',
              uid: '411b431a-699e-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'REGION',
                      value: 'region',
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
                      name: 'ETCD_AUTH',
                      value: 'true',
                    },
                    {
                      name: 'ETCD_CACERT_PATH',
                      value: '/etc/etcd/ca.pem',
                    },
                    {
                      name: 'ETCD_CERT_PATH',
                      value: '/etc/etcd/client.pem',
                    },
                    {
                      name: 'ETCD_KEY_PATH',
                      value: '/etc/etcd/client-key.pem',
                    },
                    {
                      name: 'ETCD_SECRET',
                      value: 'secret',
                    },
                    {
                      name: 'ETCD_HEADER_TIMEOUT',
                      value: '10s',
                    },
                    {
                      name: 'IAM_URL',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'IDENTITY_PROVIDER_URL',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'IAM_EXTERNAL_URL',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'CLUSTER_EXTERNAL_URL',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'KUBERNETES_API_EXTERNAL_URL',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'KUBERNETES_API_EXTERNAL_URL',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'KUBERNETES_API_URL',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'KUBERNETES_API_URL',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'CLUSTER_DATACENTER',
                      value: 'default',
                    },
                    {
                      name: 'CLUSTER_NAME',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'CLUSTER_NAME',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'CLUSTER_IP',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'CLUSTER_IP',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'CLUSTER_URL',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'CLUSTER_URL',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'OIDC_URL',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'OIDC_URL',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'CLUSTER_SSH_KEY',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'CLUSTER_SSH_KEY',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'CLUSTER_CONFIG_YAML',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'CLUSTER_CONFIG_YAML',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'CLUSTER_INCEPTION_IMAGE',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'CLUSTER_INCEPTION_IMAGE',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'CLUSTER_CA_CERT',
                      value: '/etc/kube/ca.crt',
                    },
                    {
                      name: 'CLUSTER_ADMIN_CERT',
                      value: '/etc/kube/client.crt',
                    },
                    {
                      name: 'CLUSTER_ADMIN_KEY',
                      value: '/etc/kube/client.key',
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
                      name: 'CONTEXT_ROOT',
                      value: '/api',
                    },
                    {
                      name: 'IDENTITY_MGMT_URL',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'IDENTITY_MGMT_URL',
                          name: 'platform-api',
                        },
                      },
                    },
                    {
                      name: 'ACCT_NAME',
                      valueFrom: {
                        configMapKeyRef: {
                          key: 'ACCT_NAME',
                          name: 'platform-api',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-platform-api:2.2.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'platform-api',
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/v1/config',
                      port: 6969,
                      scheme: 'HTTP',
                    },
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  resources: {
                    limits: {
                      cpu: '100m',
                      memory: '128Mi',
                    },
                    requests: {
                      cpu: '100m',
                      memory: '128Mi',
                    },
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/etcd',
                      name: 'etcd-certs',
                    },
                    {
                      mountPath: '/etc/kube',
                      name: 'kube-certs',
                    },
                    {
                      mountPath: '/etc/cluster',
                      name: 'cluster-config-files',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                master: 'true',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
                  name: 'etcd-certs',
                  secret: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'etcd-ca',
                        path: 'ca.pem',
                      },
                      {
                        key: 'etcd-cert',
                        path: 'client.pem',
                      },
                      {
                        key: 'etcd-key',
                        path: 'client-key.pem',
                      },
                    ],
                    secretName: 'etcd-secret',
                  },
                },
                {
                  name: 'kube-certs',
                  secret: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'ca.crt',
                        path: 'ca.crt',
                      },
                      {
                        key: 'client.crt',
                        path: 'client.crt',
                      },
                      {
                        key: 'client.key',
                        path: 'client.key',
                      },
                    ],
                    secretName: 'platform-kube-secrets',
                  },
                },
                {
                  name: 'cluster-config-files',
                  secret: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'config.yaml',
                        path: 'config.yaml',
                      },
                      {
                        key: 'cfc-certs.tgz',
                        path: 'cfc-certs.tgz',
                      },
                      {
                        key: 'cfc-keys.tgz',
                        path: 'cfc-keys.tgz',
                      },
                      {
                        key: 'ssh_key',
                        path: 'ssh_key',
                      },
                    ],
                    secretName: 'platform-config-secrets',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-06-06T15:28:25Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:57Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-06-06T15:28:25Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://0ee4e9749b75433280452fc90c5d9067e3d996ecfdcec82373e8b1176779c3f5',
                  image: 'registry.ng.bluemix.net/mdelder/icp-platform-api:2.2.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-platform-api@sha256:51b73664f52c9a9abbae8a4f9396a8605e04ed51ad31a005251775cf8096a425',
                  lastState: {
                    terminated: {
                      containerID: 'docker://432a98a15fd92862d3ac979ac7c6218ae1a901efd693ab1db888cb9c4b9af015',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:42Z',
                      reason: 'Error',
                      startedAt: '2018-06-06T15:28:27Z',
                    },
                  },
                  name: 'platform-api',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:41Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.125',
              qosClass: 'Guaranteed',
              startTime: '2018-06-06T15:28:25Z',
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
              creationTimestamp: '2018-05-14T20:28:31Z',
              generateName: 'platform-deploy-',
              labels: {
                app: 'platform-deploy',
                component: 'platform-deploy',
                'controller-revision-hash': '4207819759',
                'pod-template-generation': '1',
                release: 'platform-api',
              },
              name: 'platform-deploy-tctpb',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'platform-deploy',
                  uid: '5e259470-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380341',
              selfLink: '/api/v1/namespaces/kube-system/pods/platform-deploy-tctpb',
              uid: '5e285e47-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'REGION',
                      value: 'region',
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
                      name: 'ETCD_AUTH',
                      value: 'true',
                    },
                    {
                      name: 'ETCD_CACERT_PATH',
                      value: '/etc/etcd/ca.pem',
                    },
                    {
                      name: 'ETCD_CERT_PATH',
                      value: '/etc/etcd/client.pem',
                    },
                    {
                      name: 'ETCD_KEY_PATH',
                      value: '/etc/etcd/client-key.pem',
                    },
                    {
                      name: 'ETCD_SECRET',
                      value: 'secret',
                    },
                    {
                      name: 'ETCD_HEADER_TIMEOUT',
                      value: '10s',
                    },
                    {
                      name: 'LOG_LEVEL',
                      value: 'info',
                    },
                    {
                      name: 'ENGINE_LOG_LEVEL',
                      value: 'info',
                    },
                    {
                      name: 'TERRAFORM_LOG_LEVEL',
                      value: 'info',
                    },
                    {
                      name: 'KUBE_LOG_LEVEL',
                      value: 'info',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/icp-platform-deploy:2.2.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'platform-deploy',
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/health',
                      port: 4242,
                      scheme: 'HTTP',
                    },
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  resources: {
                    limits: {
                      cpu: '100m',
                      memory: '128Mi',
                    },
                    requests: {
                      cpu: '100m',
                      memory: '128Mi',
                    },
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/etcd',
                      name: 'etcd-certs',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                master: 'true',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
                  name: 'etcd-certs',
                  secret: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'etcd-ca',
                        path: 'ca.pem',
                      },
                      {
                        key: 'etcd-cert',
                        path: 'client.pem',
                      },
                      {
                        key: 'etcd-key',
                        path: 'client-key.pem',
                      },
                    ],
                    secretName: 'etcd-secret',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:31Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:07Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:31Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://1c2433a41fe955e83e4fe224740fe518fcede507791ece584d4129c69bf1a8ea',
                  image: 'registry.ng.bluemix.net/mdelder/icp-platform-deploy:2.2.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/icp-platform-deploy@sha256:acf3a18f60836481c59d51cc7a1b72028f202cd09a29f4a1eee8d478aae87242',
                  lastState: {
                    terminated: {
                      containerID: 'docker://802d66a0a1949f3add7c77c5d4f5d476aa24da4c1afcf7ae70a5fa5fa3a9d49d',
                      exitCode: 0,
                      finishedAt: '2018-07-17T16:29:44Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:28:57Z',
                    },
                  },
                  name: 'platform-deploy',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:55Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.90',
              qosClass: 'Guaranteed',
              startTime: '2018-05-14T20:28:31Z',
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
              creationTimestamp: '2018-07-26T22:25:56Z',
              generateName: 'platform-ui-',
              labels: {
                'controller-revision-hash': '305267721',
                'k8s-app': 'platform-ui',
                'pod-template-generation': '3',
              },
              name: 'platform-ui-hcsmg',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'platform-ui',
                  uid: 'd2669180-9120-11e8-80c1-005056a08eb1',
                },
              ],
              resourceVersion: '10702771',
              selfLink: '/api/v1/namespaces/kube-system/pods/platform-ui-hcsmg',
              uid: 'dda72d4e-9122-11e8-80c1-005056a08eb1',
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
                      name: 'PLATFORM_IDENTITY_PROVIDER_URL',
                      value: 'http://platform-identity-provider:4300',
                    },
                    {
                      name: 'ICP_VERSION',
                      value: '2.1.0.3-rc1',
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
                  ],
                  image: 'registry.ng.bluemix.net/icp-integration/icp-platform-ui-amd64:2.1.0.3-hcm',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/livenessProbe',
                      port: 3000,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 30,
                    periodSeconds: 30,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  name: 'platform-ui',
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/readinessProbe',
                      port: 3000,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 5,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/config',
                      name: 'log4js',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                master: 'true',
              },
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 60,
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
                  configMap: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'log4js.json',
                        path: 'log4js.json',
                      },
                    ],
                    name: 'platform-ui-log4js',
                  },
                  name: 'log4js',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-26T22:25:56Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-26T22:26:16Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-26T22:25:56Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://12f10f5cd077e266954024c19b7086d413dcfd4e4db7a8633d1c2b96370b9bf9',
                  image: 'registry.ng.bluemix.net/icp-integration/icp-platform-ui-amd64:2.1.0.3-hcm',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/icp-integration/icp-platform-ui-amd64@sha256:fbb0e3125920aba84ac34934fa78fab8f693b715ff9938a5753f026010ff4009',
                  lastState: {},
                  name: 'platform-ui',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-07-26T22:25:58Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.92',
              qosClass: 'BestEffort',
              startTime: '2018-07-26T22:25:56Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
              },
              creationTimestamp: '2018-05-14T20:28:38Z',
              generateName: 'rescheduler-',
              labels: {
                app: 'rescheduler',
                'controller-revision-hash': '315844542',
                'pod-template-generation': '1',
              },
              name: 'rescheduler-vfvbp',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'rescheduler',
                  uid: '6206db06-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380482',
              selfLink: '/api/v1/namespaces/kube-system/pods/rescheduler-vfvbp',
              uid: '620a22f5-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    '--running-in-cluster=false',
                    '--listen-address=127.0.0.1:9235',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/rescheduler:v0.5.2',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'rescheduler',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                master: 'true',
              },
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
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:38Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:51Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:38Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://bbaf0374becf6f630674807f4a46fd58cdc408157c3a185974d813ee91358435',
                  image: 'registry.ng.bluemix.net/mdelder/rescheduler:v0.5.2',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/rescheduler@sha256:9bb729c6c42f64ce2cd9a0456e06d8637c6a9c991e7b8e21cf449606d4e3a02f',
                  lastState: {
                    terminated: {
                      containerID: 'docker://d57617a568997dc82b83b4ab8540983868e5ce3142321c29884725e5c8630c84',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:42Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:33:36Z',
                    },
                  },
                  name: 'rescheduler',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:49Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '9.42.80.212',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:38Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:39Z',
              generateName: 'security-onboarding-',
              labels: {
                'controller-uid': '63029a77-57b5-11e8-92fb-005056a08eb1',
                'job-name': 'security-onboarding',
              },
              name: 'security-onboarding-h8lkk',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'batch/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'Job',
                  name: 'security-onboarding',
                  uid: '63029a77-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '4010',
              selfLink: '/api/v1/namespaces/kube-system/pods/security-onboarding-h8lkk',
              uid: '63032fca-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    'python',
                    '/app/scripts/onboard-script.py',
                  ],
                  env: [
                    {
                      name: 'ICP_API_KEY',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'ICP_API_KEY',
                          name: 'icp-serviceid-apikey-secret',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/iam-policy-decision:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'security-onboarding',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/app/scripts',
                      name: 'onboard-script',
                    },
                    {
                      mountPath: '/app/elasticsearch',
                      name: 'elasticsearch-json',
                    },
                    {
                      mountPath: '/app/monitoring',
                      name: 'monitoring-json',
                    },
                    {
                      mountPath: '/app/helmapi',
                      name: 'helmapi-json',
                    },
                    {
                      mountPath: '/app/tillerservice',
                      name: 'tillerservice-json',
                    },
                    {
                      mountPath: '/app/tiller_serviceid_policies',
                      name: 'tiller-serviceid-policies',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
              restartPolicy: 'OnFailure',
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
              ],
              volumes: [
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'onboard-script',
                  },
                  name: 'onboard-script',
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'elasticsearch-json',
                  },
                  name: 'elasticsearch-json',
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'monitoring-json',
                  },
                  name: 'monitoring-json',
                },
                {
                  configMap: {
                    defaultMode: 420,
                    name: 'helmapi-json',
                  },
                  name: 'helmapi-json',
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'tillerservice-json',
                  },
                  name: 'tillerservice-json',
                },
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'tiller-serviceid-policies',
                  },
                  name: 'tiller-serviceid-policies',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:39Z',
                  reason: 'PodCompleted',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:29:14Z',
                  reason: 'PodCompleted',
                  status: 'False',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:39Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://87bcb6bdc0805c71bbd4bab0ab9db522a8c63b791fe7fec2839b3dac479a3ebe',
                  image: 'registry.ng.bluemix.net/mdelder/iam-policy-decision:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/iam-policy-decision@sha256:1ed3d709b4d9ad77330242e27dba063548ad109a4f2bbfa73bbffccff12497f9',
                  lastState: {},
                  name: 'security-onboarding',
                  ready: false,
                  restartCount: 0,
                  state: {
                    terminated: {
                      containerID: 'docker://87bcb6bdc0805c71bbd4bab0ab9db522a8c63b791fe7fec2839b3dac479a3ebe',
                      exitCode: 0,
                      finishedAt: '2018-05-14T20:29:11Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:28:59Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Succeeded',
              podIP: '10.1.112.101',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:39Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:14:21Z',
              generateName: 'service-catalog-apiserver-',
              labels: {
                app: 'service-catalog-apiserver',
                chart: 'service-catalog-0.0.10',
                'controller-revision-hash': '4286350800',
                heritage: 'Tiller',
                'pod-template-generation': '1',
                release: 'service-catalog',
                releaseRevision: '1',
              },
              name: 'service-catalog-apiserver-tgb4x',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'service-catalog-apiserver',
                  uid: '6357fdc2-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380490',
              selfLink: '/api/v1/namespaces/kube-system/pods/service-catalog-apiserver-tgb4x',
              uid: '635b405d-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    'apiserver',
                    '--admission-control',
                    'KubernetesNamespaceLifecycle,DefaultServicePlan,ServiceBindingsLifecycle,ServicePlanChangeValidator,BrokerAuthSarCheck',
                    '--secure-port',
                    '8443',
                    '--storage-type',
                    'etcd',
                    '--etcd-servers',
                    'https://9.42.80.212:4001',
                    '--etcd-cafile',
                    '/calico-secrets/etcd/ca.pem',
                    '--etcd-certfile',
                    '/calico-secrets/etcd/client.pem',
                    '--etcd-keyfile',
                    '/calico-secrets/etcd/client-key.pem',
                    '-v',
                    '4',
                    '--feature-gates',
                    'OriginatingIdentity=true',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/service-catalog-service-catalog:v0.1.11-icp',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 9,
                    httpGet: {
                      path: '/healthz',
                      port: 8443,
                      scheme: 'HTTPS',
                    },
                    initialDelaySeconds: 30,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 90,
                  },
                  name: 'apiserver',
                  ports: [
                    {
                      containerPort: 8443,
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    failureThreshold: 9,
                    httpGet: {
                      path: '/healthz',
                      port: 8443,
                      scheme: 'HTTPS',
                    },
                    initialDelaySeconds: 30,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 90,
                  },
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/kubernetes-service-catalog',
                      name: 'apiserver-cert',
                      readOnly: true,
                    },
                    {
                      mountPath: '/calico-secrets',
                      name: 'etcd-certs',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
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
                  name: 'apiserver-cert',
                  secret: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'tls.crt',
                        path: 'apiserver.crt',
                      },
                      {
                        key: 'tls.key',
                        path: 'apiserver.key',
                      },
                    ],
                    secretName: 'service-catalog-apiserver-cert',
                  },
                },
                {
                  emptyDir: {},
                  name: 'etcd-data-dir',
                },
                {
                  name: 'etcd-certs',
                  secret: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'etcd-ca',
                        path: 'etcd/ca.pem',
                      },
                      {
                        key: 'etcd-cert',
                        path: 'etcd/client.pem',
                      },
                      {
                        key: 'etcd-key',
                        path: 'etcd/client-key.pem',
                      },
                    ],
                    secretName: 'etcd-secret',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:21Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:46Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:21Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://782f94ac1f302ec1f491bce806d3d4b96f5110ffdb6c9d7343fad2d80ae41531',
                  image: 'registry.ng.bluemix.net/mdelder/service-catalog-service-catalog:v0.1.11-icp',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/service-catalog-service-catalog@sha256:af1b2af3cac4a1a946cd5dbe8fa9781c1f8edcf02115948e9e0374c12f9aecb3',
                  lastState: {
                    terminated: {
                      containerID: 'docker://84ec87d4cdc67d2589832d6ef96de83e8fc1d733ae66d59c511b4d99e3421f98',
                      exitCode: 0,
                      finishedAt: '2018-07-17T16:29:43Z',
                      reason: 'Completed',
                      startedAt: '2018-05-14T20:15:50Z',
                    },
                  },
                  name: 'apiserver',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:14Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.115',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:14:21Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
                'prometheus.io/scrape': 'false',
              },
              creationTimestamp: '2018-05-14T20:14:21Z',
              generateName: 'service-catalog-controller-manager-8f97db9f6-',
              labels: {
                app: 'service-catalog-controller-manager',
                chart: 'service-catalog-0.0.10',
                heritage: 'Tiller',
                'pod-template-hash': '495386592',
                release: 'service-catalog',
              },
              name: 'service-catalog-controller-manager-8f97db9f6-bv6w5',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'service-catalog-controller-manager-8f97db9f6',
                  uid: '635b2310-57b3-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380588',
              selfLink: '/api/v1/namespaces/kube-system/pods/service-catalog-controller-manager-8f97db9f6-bv6w5',
              uid: '635d2d52-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    'controller-manager',
                    '--port',
                    '8080',
                    '--leader-elect=false',
                    '-v',
                    '4',
                    '--resync-interval',
                    '5m',
                    '--broker-relist-interval',
                    '15m',
                    '--feature-gates',
                    'OriginatingIdentity=true',
                  ],
                  env: [
                    {
                      name: 'K8S_NAMESPACE',
                      valueFrom: {
                        fieldRef: {
                          apiVersion: 'v1',
                          fieldPath: 'metadata.namespace',
                        },
                      },
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/service-catalog-service-catalog:v0.1.11-icp',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'controller-manager',
                  ports: [
                    {
                      containerPort: 8080,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/service-catalog-ssl',
                      name: 'apiserver-cert',
                      readOnly: true,
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                proxy: 'true',
              },
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
              ],
              volumes: [
                {
                  name: 'apiserver-cert',
                  secret: {
                    defaultMode: 420,
                    items: [
                      {
                        key: 'tls.crt',
                        path: 'apiserver.crt',
                      },
                    ],
                    secretName: 'service-catalog-apiserver-cert',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:21Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:52:09Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:14:21Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://fbf338042a1ce0c9875522ef6a95414c32e36c2c888541cca1d8d4b46ca56931',
                  image: 'registry.ng.bluemix.net/mdelder/service-catalog-service-catalog:v0.1.11-icp',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/service-catalog-service-catalog@sha256:af1b2af3cac4a1a946cd5dbe8fa9781c1f8edcf02115948e9e0374c12f9aecb3',
                  lastState: {
                    terminated: {
                      containerID: 'docker://6afbc1cdcae979133213df151cf193e170ff78b47505f3ff50caa7484e902540',
                      exitCode: 255,
                      finishedAt: '2018-07-17T20:51:22Z',
                      reason: 'Error',
                      startedAt: '2018-07-17T20:51:19Z',
                    },
                  },
                  name: 'controller-manager',
                  ready: true,
                  restartCount: 4,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:52:08Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.79',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:14:21Z',
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
              creationTimestamp: '2018-05-14T20:12:13Z',
              generateName: 'tiller-deploy-7b6cb5f9b7-',
              labels: {
                app: 'helm',
                name: 'tiller',
                'pod-template-hash': '3627619563',
              },
              name: 'tiller-deploy-7b6cb5f9b7-xb57f',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'tiller-deploy-7b6cb5f9b7',
                  uid: 'f8fcc988-57b2-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380397',
              selfLink: '/api/v1/namespaces/kube-system/pods/tiller-deploy-7b6cb5f9b7-xb57f',
              uid: '17822938-57b3-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  env: [
                    {
                      name: 'IAM_HOST',
                      value: 'platform-identity-management',
                    },
                    {
                      name: 'IAM_PORT',
                      value: '4500',
                    },
                    {
                      name: 'TILLER_HISTORY_MAX',
                      value: '5',
                    },
                    {
                      name: 'TILLER_NAMESPACE',
                      value: 'kube-system',
                    },
                    {
                      name: 'TILLER_TLS_CERTS',
                      value: '/etc/certs',
                    },
                    {
                      name: 'TILLER_TLS_VERIFY',
                      value: '1',
                    },
                    {
                      name: 'TILLER_TLS_ENABLE',
                      value: '1',
                    },
                    {
                      name: 'default_admin_user',
                      value: 'admin',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/tiller:v2.7.3-icp',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/liveness',
                      port: 44135,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  name: 'tiller',
                  readinessProbe: {
                    failureThreshold: 3,
                    httpGet: {
                      path: '/readiness',
                      port: 44135,
                      scheme: 'HTTP',
                    },
                    initialDelaySeconds: 1,
                    periodSeconds: 10,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/etc/certs',
                      name: 'tiller-certs',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirstWithHostNet',
              hostNetwork: true,
              imagePullSecrets: [
                {
                  name: 'infra-registry-key',
                },
              ],
              nodeName: '9.42.80.212',
              nodeSelector: {
                master: 'true',
              },
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
              ],
              volumes: [
                {
                  name: 'tiller-certs',
                  secret: {
                    defaultMode: 420,
                    secretName: 'tiller-secret',
                  },
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:12:45Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:50:18Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:12:45Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://b2300deb0e9b8bf90427f16500ae26a5a4e2ae3d66bd82e7fd217313312eb3ac',
                  image: 'registry.ng.bluemix.net/mdelder/tiller:v2.7.3-icp',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/tiller@sha256:f03a307c71f7b297ea07c8fa419eac3de43ce8a6d9fd1591b7deddbf13aec79f',
                  lastState: {
                    terminated: {
                      containerID: 'docker://b5bf4b66c779644f2499d5a62c686b6be2342e39e01b65c039faa30b914a2918',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:44Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:12:45Z',
                    },
                  },
                  name: 'tiller',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:56Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '9.42.80.212',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:12:45Z',
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
              creationTimestamp: '2018-05-14T20:28:29Z',
              generateName: 'unified-router-',
              labels: {
                'controller-revision-hash': '1407076274',
                'k8s-app': 'unified-router',
                'pod-template-generation': '1',
              },
              name: 'unified-router-2ml74',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'DaemonSet',
                  name: 'unified-router',
                  uid: '5d3d9533-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9380503',
              selfLink: '/api/v1/namespaces/kube-system/pods/unified-router-2ml74',
              uid: '5d3ec9c8-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  args: [
                    '/unified-router',
                    '--registry-host=127.0.0.1:9090',
                    '--enable-helm-precheck=false',
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/unified-router:2.2.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'unified-router',
                  ports: [
                    {
                      containerPort: 9090,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                master: 'true',
              },
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
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:30Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:49:44Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:30Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://cf3fdc6b1e8ada0524f639de213f29e3b58524c3e031e32efbf3d4b05f67a871',
                  image: 'registry.ng.bluemix.net/mdelder/unified-router:2.2.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/unified-router@sha256:d2d40536739fdd5edc086120b74bf9dbe3e911bd56240d4ce4d0cae466f5688c',
                  lastState: {
                    terminated: {
                      containerID: 'docker://8a50b646881632403ff83e840c5dc9411ba785ca071dcdb9f3d44ff304a1e1a0',
                      exitCode: 2,
                      finishedAt: '2018-07-17T16:29:43Z',
                      reason: 'Error',
                      startedAt: '2018-05-14T20:29:03Z',
                    },
                  },
                  name: 'unified-router',
                  ready: true,
                  restartCount: 1,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:49:43Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.74',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:30Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:28:39Z',
              generateName: 'update-secrets-',
              labels: {
                'controller-uid': '630361dd-57b5-11e8-92fb-005056a08eb1',
                'job-name': 'update-secrets',
              },
              name: 'update-secrets-qjbw2',
              namespace: 'kube-system',
              ownerReferences: [
                {
                  apiVersion: 'batch/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'Job',
                  name: 'update-secrets',
                  uid: '630361dd-57b5-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '9381448',
              selfLink: '/api/v1/namespaces/kube-system/pods/update-secrets-qjbw2',
              uid: '6304560b-57b5-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  command: [
                    'python',
                    '/app/scripts/secret-script.py',
                  ],
                  env: [
                    {
                      name: 'ICP_API_KEY',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'ICP_API_KEY',
                          name: 'icp-serviceid-apikey-secret',
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
                      name: 'IDENTITY_PROVIDER_URL',
                      value: 'http://platform-identity-provider:4300',
                    },
                    {
                      name: 'IAM_TOKEN_SERVICE_URL',
                      value: 'https://iam-token-service:10443',
                    },
                  ],
                  image: 'registry.ng.bluemix.net/mdelder/iam-policy-decision:1.0.0',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'update-secrets',
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/app/scripts',
                      name: 'secret-script',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-4g7tw',
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
              nodeName: '9.42.80.212',
              nodeSelector: {
                role: 'master',
              },
              restartPolicy: 'OnFailure',
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
              ],
              volumes: [
                {
                  configMap: {
                    defaultMode: 484,
                    name: 'secret-script',
                  },
                  name: 'secret-script',
                },
                {
                  name: 'default-token-4g7tw',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-4g7tw',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:39Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-07-17T20:59:01Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:28:39Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://7cb915bbc41ad28911a3cb50b212117ff6dcc8199d7fbda583f9b5c25e6e8a3b',
                  image: 'registry.ng.bluemix.net/mdelder/iam-policy-decision:1.0.0',
                  imageID: 'docker-pullable://registry.ng.bluemix.net/mdelder/iam-policy-decision@sha256:1ed3d709b4d9ad77330242e27dba063548ad109a4f2bbfa73bbffccff12497f9',
                  lastState: {
                    terminated: {
                      containerID: 'docker://44a1e244d1e42167cdfacafcd36bb6d89480f7e8661b7af2bfd6c9017cab1af9',
                      exitCode: 1,
                      finishedAt: '2018-07-17T20:57:32Z',
                      reason: 'Error',
                      startedAt: '2018-07-17T20:55:31Z',
                    },
                  },
                  name: 'update-secrets',
                  ready: true,
                  restartCount: 5,
                  state: {
                    running: {
                      startedAt: '2018-07-17T20:59:01Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.80.212',
              phase: 'Running',
              podIP: '10.1.112.86',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:28:39Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'privileged',
              },
              creationTimestamp: '2018-05-14T20:43:29Z',
              generateName: 'db2-stock-trader-ibm-db2oltp-dev-5b77c44d4-',
              labels: {
                app: 'db2-stock-trader-ibm-db2oltp-dev',
                'pod-template-hash': '163370080',
              },
              name: 'db2-stock-trader-ibm-db2oltp-dev-5b77c44d4-qfbcr',
              namespace: 'stocktrader',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'db2-stock-trader-ibm-db2oltp-dev-5b77c44d4',
                  uid: '75a7120e-57b7-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '6497',
              selfLink: '/api/v1/namespaces/stocktrader/pods/db2-stock-trader-ibm-db2oltp-dev-5b77c44d4-qfbcr',
              uid: '75aa23e1-57b7-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  env: [
                    {
                      name: 'LICENSE',
                      value: 'accept',
                    },
                    {
                      name: 'DB2INSTANCE',
                      value: 'db2inst1',
                    },
                    {
                      name: 'DB2INST1_PASSWORD',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'password',
                          name: 'db2-stock-trader-ibm-db2oltp-dev',
                        },
                      },
                    },
                    {
                      name: 'DBNAME',
                      value: 'trader',
                    },
                    {
                      name: 'BLU',
                      value: 'false',
                    },
                    {
                      name: 'ENABLE_ORACLE_COMPATIBILITY',
                      value: 'false',
                    },
                    {
                      name: 'UPDATEAVAIL',
                      value: 'NO',
                    },
                    {
                      name: 'TO_CREATE_SAMPLEDB',
                      value: 'false',
                    },
                    {
                      name: 'IS_OSXFS',
                      value: 'false',
                    },
                    {
                      name: 'REPODB',
                      value: 'false',
                    },
                  ],
                  image: 'store/ibmcorp/db2_developer_c:11.1.2.2b-x86_64',
                  imagePullPolicy: 'IfNotPresent',
                  livenessProbe: {
                    exec: {
                      command: [
                        'sh',
                        '-c',
                        '/database/config/$DB2INSTANCE/sqllib/bin/db2gcf -s',
                      ],
                    },
                    failureThreshold: 3,
                    initialDelaySeconds: 400,
                    periodSeconds: 90,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  name: 'db2-stock-trader-ibm-db2oltp-dev',
                  ports: [
                    {
                      containerPort: 50000,
                      protocol: 'TCP',
                    },
                    {
                      containerPort: 55000,
                      protocol: 'TCP',
                    },
                  ],
                  readinessProbe: {
                    exec: {
                      command: [
                        'sh',
                        '-c',
                        '/database/config/$DB2INSTANCE/sqllib/bin/db2gcf -s',
                      ],
                    },
                    failureThreshold: 20,
                    initialDelaySeconds: 60,
                    periodSeconds: 30,
                    successThreshold: 1,
                    timeoutSeconds: 1,
                  },
                  resources: {
                    limits: {
                      cpu: '4',
                      memory: '16Gi',
                    },
                    requests: {
                      cpu: '2',
                      memory: '2Gi',
                    },
                  },
                  securityContext: {
                    capabilities: {
                      add: [
                        'SYS_RESOURCE',
                        'IPC_OWNER',
                        'SYS_NICE',
                      ],
                    },
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/database',
                      name: 'db2-stock-trader-ibm-db2oltp-dev-db2-stock-trader-pvc',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-9hbmx',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              imagePullSecrets: [
                {
                  name: 'db2key',
                },
              ],
              nodeName: '9.42.82.119',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 30,
              volumes: [
                {
                  name: 'db2-stock-trader-ibm-db2oltp-dev-db2-stock-trader-pvc',
                  persistentVolumeClaim: {
                    claimName: 'db2-stock-trader-ibm-db2oltp-dev-db2-stock-trader-pvc',
                  },
                },
                {
                  name: 'default-token-9hbmx',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-9hbmx',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:43:29Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:45:34Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:43:29Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://7914ac26566908e0d9770082d0dbe546bdc034e9a0fa5e8a0eb4d7d2914ebfb6',
                  image: 'store/ibmcorp/db2_developer_c:11.1.2.2b-x86_64',
                  imageID: 'docker-pullable://store/ibmcorp/db2_developer_c@sha256:f1e796e818850cda866988aed4c28ad7e2f5451a57c40c9aa1d123f8535244f5',
                  lastState: {},
                  name: 'db2-stock-trader-ibm-db2oltp-dev',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:43:31Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.119',
              phase: 'Running',
              podIP: '10.1.70.6',
              qosClass: 'Burstable',
              startTime: '2018-05-14T20:43:29Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:44:19Z',
              generateName: 'mq-stock-trader-ibm-mq-',
              labels: {
                QM_IDENTIFIER: 'mq-stock-trader',
                app: 'mq-stock-trader-ibm-mq',
                chart: 'ibm-mqadvanced-server-dev-1.1.0',
                'controller-revision-hash': 'mq-stock-trader-ibm-mq-8bf98ccdf',
                heritage: 'Tiller',
                release: 'mq-stock-trader',
                'statefulset.kubernetes.io/pod-name': 'mq-stock-trader-ibm-mq-0',
              },
              name: 'mq-stock-trader-ibm-mq-0',
              namespace: 'stocktrader',
              ownerReferences: [
                {
                  apiVersion: 'apps/v1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'StatefulSet',
                  name: 'mq-stock-trader-ibm-mq',
                  uid: '76af3033-57b7-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '6369',
              selfLink: '/api/v1/namespaces/stocktrader/pods/mq-stock-trader-ibm-mq-0',
              uid: '936028de-57b7-11e8-92fb-005056a08eb1',
            },
            spec: {
              affinity: {
                nodeAffinity: {
                  requiredDuringSchedulingIgnoredDuringExecution: {
                    nodeSelectorTerms: [
                      {
                        matchExpressions: [
                          {
                            key: 'beta.kubernetes.io/arch',
                            operator: 'In',
                            values: [
                              'amd64',
                            ],
                          },
                          {
                            key: 'beta.kubernetes.io/os',
                            operator: 'In',
                            values: [
                              'linux',
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
              containers: [
                {
                  env: [
                    {
                      name: 'LICENSE',
                      value: 'accept',
                    },
                    {
                      name: 'MQ_QMGR_NAME',
                      value: 'trader',
                    },
                    {
                      name: 'MQ_ADMIN_PASSWORD',
                      valueFrom: {
                        secretKeyRef: {
                          key: 'adminPassword',
                          name: 'mq-stock-trader-ibm-mq',
                        },
                      },
                    },
                  ],
                  image: 'ycao/mq:9.0.1',
                  imagePullPolicy: 'IfNotPresent',
                  name: 'qmgr',
                  ports: [
                    {
                      containerPort: 9157,
                      protocol: 'TCP',
                    },
                    {
                      containerPort: 1414,
                      protocol: 'TCP',
                    },
                    {
                      containerPort: 9443,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {
                    limits: {
                      cpu: '500m',
                      memory: '512Mi',
                    },
                    requests: {
                      cpu: '500m',
                      memory: '512Mi',
                    },
                  },
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/mnt/mqm',
                      name: 'mq-stock-trader-ibm-mq-mq-stock-trader-pvc',
                    },
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-9hbmx',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              hostname: 'mq-stock-trader-ibm-mq-0',
              nodeName: '9.42.82.119',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              subdomain: 'mq-stock-trader',
              terminationGracePeriodSeconds: 30,
              volumes: [
                {
                  name: 'mq-stock-trader-ibm-mq-mq-stock-trader-pvc',
                  persistentVolumeClaim: {
                    claimName: 'mq-stock-trader-ibm-mq-mq-stock-trader-pvc-mq-stock-trader-ibm-mq-0',
                  },
                },
                {
                  name: 'default-token-9hbmx',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-9hbmx',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:44:19Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:44:22Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:44:19Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://84e1926eeed7b19da4e0de055ae6f22d6ee11692d035ae43c8d32c21da835097',
                  image: 'ycao/mq:9.0.1',
                  imageID: 'docker-pullable://ycao/mq@sha256:0f81fff2e07b220b7af6fa6a9ca58012fcd33d98886fefeea6bba7dfb3d08c83',
                  lastState: {},
                  name: 'qmgr',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:44:21Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.119',
              phase: 'Running',
              podIP: '10.1.70.8',
              qosClass: 'Guaranteed',
              startTime: '2018-05-14T20:44:19Z',
            },
          },
          {
            apiVersion: 'v1',
            kind: 'Pod',
            metadata: {
              annotations: {
                'kubernetes.io/psp': 'default',
              },
              creationTimestamp: '2018-05-14T20:43:07Z',
              generateName: 'redis-stock-trader-7cdb6ffdcf-',
              labels: {
                app: 'redis-stock-trader',
                'pod-template-hash': '3786299879',
              },
              name: 'redis-stock-trader-7cdb6ffdcf-248nn',
              namespace: 'stocktrader',
              ownerReferences: [
                {
                  apiVersion: 'extensions/v1beta1',
                  blockOwnerDeletion: true,
                  controller: true,
                  kind: 'ReplicaSet',
                  name: 'redis-stock-trader-7cdb6ffdcf',
                  uid: '682e08fe-57b7-11e8-92fb-005056a08eb1',
                },
              ],
              resourceVersion: '6141',
              selfLink: '/api/v1/namespaces/stocktrader/pods/redis-stock-trader-7cdb6ffdcf-248nn',
              uid: '68325a90-57b7-11e8-92fb-005056a08eb1',
            },
            spec: {
              containers: [
                {
                  image: 'redis:latest',
                  imagePullPolicy: 'Always',
                  name: 'redis-stock-trader',
                  ports: [
                    {
                      containerPort: 6379,
                      protocol: 'TCP',
                    },
                  ],
                  resources: {},
                  terminationMessagePath: '/dev/termination-log',
                  terminationMessagePolicy: 'File',
                  volumeMounts: [
                    {
                      mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
                      name: 'default-token-9hbmx',
                      readOnly: true,
                    },
                  ],
                },
              ],
              dnsPolicy: 'ClusterFirst',
              nodeName: '9.42.82.171',
              restartPolicy: 'Always',
              schedulerName: 'default-scheduler',
              securityContext: {},
              serviceAccount: 'default',
              serviceAccountName: 'default',
              terminationGracePeriodSeconds: 30,
              volumes: [
                {
                  name: 'default-token-9hbmx',
                  secret: {
                    defaultMode: 420,
                    secretName: 'default-token-9hbmx',
                  },
                },
              ],
            },
            status: {
              conditions: [
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:43:07Z',
                  status: 'True',
                  type: 'Initialized',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:43:10Z',
                  status: 'True',
                  type: 'Ready',
                },
                {
                  lastProbeTime: null,
                  lastTransitionTime: '2018-05-14T20:43:07Z',
                  status: 'True',
                  type: 'PodScheduled',
                },
              ],
              containerStatuses: [
                {
                  containerID: 'docker://ba06ba25338dc90b0b50c6c6540b0427d45ad2de41fe345b8e2ba834006c4555',
                  image: 'redis:latest',
                  imageID: 'docker-pullable://redis@sha256:4aed8ea5a5fc4cf05c8d5341b4ae4a4f7c0f9301082a74f6f9a5f321140e0cd3',
                  lastState: {},
                  name: 'redis-stock-trader',
                  ready: true,
                  restartCount: 0,
                  state: {
                    running: {
                      startedAt: '2018-05-14T20:43:09Z',
                    },
                  },
                },
              ],
              hostIP: '9.42.82.171',
              phase: 'Running',
              podIP: '10.1.255.76',
              qosClass: 'BestEffort',
              startTime: '2018-05-14T20:43:07Z',
            },
          },
        ],
        kind: 'PodList',
        metadata: {
          resourceVersion: '10817841',
          selfLink: '/api/v1/pods',
        },
      },
    },
  },
},
};

export default mockResponse;

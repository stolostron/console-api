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
      name: 'nodes-1234914623',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/nodes-1234914623',
      uid: '2376f8da-b121-11e8-bd43-b69970856045',
      resourceVersion: '15450',
      creationTimestamp: '2018-09-05T15:34:12Z',
      labels: {
        name: 'getnodes',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'nodes',
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
      name: 'nodes-1234914623',
      namespace: 'default',
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/nodes-1234914623',
      uid: '6d3a8cb6-b121-11e8-bd43-b69970856045',
      resourceVersion: '15474',
      creationTimestamp: '2018-09-05T15:36:15Z',
      labels: {
        name: 'getnodes',
      },
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      scope: {
        resource: 'nodes',
      },
    },
    status: {
      conditions: [
        {
          type: 'Completed',
          lastUpdateTime: '2018-09-05T15:36:16Z',
        },
      ],
      results: {
        'hub-cluster': {
          apiVersion: 'v1',
          items: [
            {
              apiVersion: 'v1',
              kind: 'Node',
              metadata: {
                annotations: {
                  'node.alpha.kubernetes.io/ttl': '0',
                  'volumes.kubernetes.io/controller-managed-attach-detach': 'true',
                },
                creationTimestamp: '2018-08-18T15:52:43Z',
                labels: {
                  'beta.kubernetes.io/arch': 'amd64',
                  'beta.kubernetes.io/os': 'linux',
                  'kubernetes.io/hostname': '9.37.137.174',
                  'node-role.kubernetes.io/worker': 'true',
                },
                name: '9.37.137.174',
                resourceVersion: '3939376',
                selfLink: '/api/v1/nodes/9.37.137.174',
                uid: 'beb1f1e6-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {},
              status: {
                addresses: [
                  {
                    address: '9.37.137.174',
                    type: 'InternalIP',
                  },
                  {
                    address: '9.37.137.174',
                    type: 'Hostname',
                  },
                ],
                allocatable: {
                  cpu: '4',
                  'ephemeral-storage': '185856800870',
                  'hugepages-2Mi': '0',
                  memory: '8072468Ki',
                  pods: '40',
                },
                capacity: {
                  cpu: '4',
                  'ephemeral-storage': '201667536Ki',
                  'hugepages-2Mi': '0',
                  memory: '8174868Ki',
                  pods: '40',
                },
                conditions: [
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:06Z',
                    lastTransitionTime: '2018-08-18T15:52:43Z',
                    message: 'kubelet has sufficient disk space available',
                    reason: 'KubeletHasSufficientDisk',
                    status: 'False',
                    type: 'OutOfDisk',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:06Z',
                    lastTransitionTime: '2018-08-18T15:52:43Z',
                    message: 'kubelet has sufficient memory available',
                    reason: 'KubeletHasSufficientMemory',
                    status: 'False',
                    type: 'MemoryPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:06Z',
                    lastTransitionTime: '2018-08-18T15:52:43Z',
                    message: 'kubelet has no disk pressure',
                    reason: 'KubeletHasNoDiskPressure',
                    status: 'False',
                    type: 'DiskPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:06Z',
                    lastTransitionTime: '2018-08-18T15:52:43Z',
                    message: 'kubelet has sufficient PID available',
                    reason: 'KubeletHasSufficientPID',
                    status: 'False',
                    type: 'PIDPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:06Z',
                    lastTransitionTime: '2018-08-18T15:53:48Z',
                    message: 'kubelet is posting ready status. AppArmor enabled',
                    reason: 'KubeletReady',
                    status: 'True',
                    type: 'Ready',
                  },
                ],
                config: {},
                daemonEndpoints: {
                  kubeletEndpoint: {
                    Port: 10250,
                  },
                },
                images: [
                  {
                    names: [
                      'ibmcom/ace@sha256:64e29015a9baa1078231348447fe59a56efae3255495fa1dfb1f8685648b9597',
                      'ibmcom/ace:11.0.0.0',
                    ],
                    sizeBytes: 1067636085,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/hyperkube@sha256:1a75272f64f0844866d4ca78ea9f8ba95b3fafa752f459e4092451d2e2ba45cb',
                      'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                    ],
                    sizeBytes: 683782255,
                  },
                  {
                    names: [
                      'ibmcom/mongodb@sha256:e9e6d153d05c2500922d1c159fdf11303e3cc4d0eda66fbea5d832883f383d87',
                      'ibmcom/mongodb:3.6.0',
                    ],
                    sizeBytes: 664053479,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/hyperkube@sha256:af41d0acf265ac11e8b76947d5c05fa6a0f273ff2b04ccf8c9f6357d7814c127',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/hyperkube:v1.11.1-ee',
                    ],
                    sizeBytes: 625360968,
                  },
                  {
                    names: [
                      'ibmstocktrader/tradr@sha256:2a5ce1d0a8344bceb9a1df16a6c8be7190db03abef0d96e8fb3ab24455af6277',
                      'ibmstocktrader/tradr:classic',
                    ],
                    sizeBytes: 598697600,
                  },
                  {
                    names: [
                      'ibmcom/cfc-jenkins-master@sha256:91ba4b8b82ba5b0468e09eadd72cc7670b12b0208619eb7bb36f8b1e60bcc22f',
                      'ibmcom/cfc-jenkins-master:2.19.4-1.1',
                    ],
                    sizeBytes: 542275076,
                  },
                  {
                    names: [
                      'sidneywibm/weave-etl@sha256:b4f26a753ee660a2070838167d5f9ecf29b5091bb425f24181fe1851ef6a11c8',
                      'sidneywibm/weave-etl:latest',
                    ],
                    sizeBytes: 498170128,
                  },
                  {
                    names: [
                      'ibmstocktrader/messaging@sha256:bd5563a2a015fa5bad7549bca2cf06798fe66e0570032b2332567b3bbb545d39',
                      'ibmstocktrader/messaging:latest',
                    ],
                    sizeBytes: 457114668,
                  },
                  {
                    names: [
                      'sidneywibm/mcm-ui@sha256:2391f66beec3417c38f01272e2f8475d048478b8fb57821b385de81101e29783',
                      'sidneywibm/mcm-ui:latest',
                    ],
                    sizeBytes: 447269465,
                  },
                  {
                    names: [
                      'ibmstocktrader/portfolio@sha256:fae2ae98c7e7ce6e978b2ef388c17893c40aee3599e956352835072f6abd27b8',
                      'ibmstocktrader/portfolio:classic',
                    ],
                    sizeBytes: 417089968,
                  },
                  {
                    names: [
                      'ibmstocktrader/stock-quote@sha256:0908537161bb3086d00ac9f1a33fcef2d3bab90f8baf5ecbaf9203c1d7e66182',
                      'ibmstocktrader/stock-quote:latest',
                    ],
                    sizeBytes: 413720987,
                  },
                  {
                    names: [
                      'ibmstocktrader/notification-twitter@sha256:586413e6d476dcd2d8de96582fa51756d2226a62aeb32750036b23ce0940bf67',
                      'ibmstocktrader/notification-twitter:latest',
                    ],
                    sizeBytes: 413406415,
                  },
                  {
                    names: [
                      'ibmstocktrader/trader@sha256:899198c388b5bb3572407c964d3377e5839b0430d12d269c4b7b18026c01cdba',
                      'ibmstocktrader/trader:classic',
                    ],
                    sizeBytes: 413308793,
                  },
                  {
                    names: [
                      'bitnami/mongodb@sha256:d96109dd874c9649ca5828edbd6615d993cd6ec3f4d25a63985859aba9e19fae',
                      'bitnami/mongodb:3.6.4',
                    ],
                    sizeBytes: 399667011,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/mcm-mongodb-amd64@sha256:11ad2417f1b65b568a2659fcf760a3c5643b2efdc909eb1ac60b35d55519ef6d',
                      'registry.ng.bluemix.net/icp-integration/mcm-mongodb@sha256:dc6f7cfedc2a8465f79f2a8ac1a9cc159a5c8456a36bf4578f26c6cb329dbd5e',
                      'registry.ng.bluemix.net/icp-integration/mcm-mongodb-amd64:latest',
                      'registry.ng.bluemix.net/icp-integration/mcm-mongodb:latest',
                    ],
                    sizeBytes: 379374718,
                  },
                  {
                    names: [
                      'ibmstocktrader/loyalty-level@sha256:0e6da6b2e2f202a169d7c1686ffbede503d6590a8463362d7620bd655e202eec',
                      'ibmstocktrader/loyalty-level:latest',
                    ],
                    sizeBytes: 378532455,
                  },
                  {
                    names: [
                      'sidneywibm/mcm-ui@sha256:b4a375abee72cf58e3bff5b883511a71d1b683031ec2ecb79a0b9b3f7db4f9e6',
                    ],
                    sizeBytes: 343995977,
                  },
                  {
                    names: [
                      'istio/grafana@sha256:3fcde7ceb67adf9cef9ede06d3aaa3dfa07645c199c2a0bb0997a4d59001bd8f',
                      'istio/grafana:0.8.0',
                    ],
                    sizeBytes: 301333209,
                  },
                  {
                    names: [
                      'istio/proxyv2@sha256:1930f0603321b1917b2249c576ecb4141aaceeaae5fcc0760b6a88dc88daea3e',
                      'istio/proxyv2:0.8.0',
                    ],
                    sizeBytes: 291396889,
                  },
                  {
                    names: [
                      'istio/pilot@sha256:c9203d3d56aff27e12d43fb3882608fac49f56e6205cb12962cb8f04c1f29b44',
                      'istio/pilot:0.8.0',
                    ],
                    sizeBytes: 286001287,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/calico-node@sha256:e6bb59686ef001986344ccd6f2a3bb9dce9b71f445939f51b0c523dce73a4b01',
                      'registry.ng.bluemix.net/mdelder/calico-node:v3.0.4',
                    ],
                    sizeBytes: 277607194,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/filebeat@sha256:11866952f63f84345d32df2026c4cc3eea9f3af637f9166478e6b8c689b60458',
                      'registry.ng.bluemix.net/mdelder/filebeat:5.5.1',
                    ],
                    sizeBytes: 271299604,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/fluentd@sha256:78202eba44723660b3b12597fb79487cd6a00612721f84d6373ea66c8121e5e2',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/fluentd:latest',
                    ],
                    sizeBytes: 263074524,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-node@sha256:284b7823a38d58a79605b35eb508976b3302ef87d0b51ff274540b67536b8be5',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    ],
                    sizeBytes: 248202699,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcm-amd64@sha256:9f327a3fbed9bcfcb86ae4cedb6f7ca31cca72f30af82a7f49decbaf2641b1c7',
                    ],
                    sizeBytes: 233465131,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/hcm-amd64@sha256:5851dc49c61d4a3ad6e1e381be53890de98f0abc6fef032d0a0ec9eb9ec67890',
                      'registry.ng.bluemix.net/mdelder/hcm-amd64:latest',
                    ],
                    sizeBytes: 233465131,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcm-amd64@sha256:3bce0230df357d1328261276065d20a4720c2923a5353d730b18431e765de05a',
                      'registry.ng.bluemix.net/icp-integration/hcm-amd64:latest',
                    ],
                    sizeBytes: 233465131,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/hcm-amd64@sha256:f1cfd9621306ec57914cedf52b3e74d8d247a124d23061005349251f722cd360',
                    ],
                    sizeBytes: 233198361,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/metering-reader@sha256:1f2c4bb1c66086b5fcb9d84a29c69fe80e20c7e405a24084e763c6efd41846e6',
                      'registry.ng.bluemix.net/mdelder/metering-reader:1.0.3',
                    ],
                    sizeBytes: 217727628,
                  },
                  {
                    names: [
                      'xubinzheng12/icp-mcm-ui-amd64@sha256:01e3c37ae26c6a9d893a678fff49439972c2a4f4aff79f266630afd6683f226f',
                      'xubinzheng12/icp-mcm-ui-amd64:latest',
                    ],
                    sizeBytes: 199485837,
                  },
                  {
                    names: [
                      'neo4j@sha256:e8395fdcfee2af2b6ca3da3998be2bbceacbd1025f5cabb36319c8823ca42232',
                      'neo4j:latest',
                    ],
                    sizeBytes: 189290335,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64@sha256:a1a0238fc87e747b825f6dc36f16e5b700c96afc8491cf767a4236f28daaf24a',
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64:38d52ca',
                    ],
                    sizeBytes: 183791610,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui@sha256:766c95079668dd67ea7fdefa572ad8189009270dbe993470024fb1f15a6261df',
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui:latest',
                    ],
                    sizeBytes: 182749935,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui@sha256:97994a4f7a1da1d7d226ab0316b0d410afd8c8cba0aba47563b7b4521be51004',
                    ],
                    sizeBytes: 182738960,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui@sha256:d966df07ac0392745d4cd81fd301bf8cf80daae777c21da535581e1988d1ae98',
                    ],
                    sizeBytes: 182685124,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64@sha256:0bb825eb94f12133308e7b8ced3b18d1f299a442dbabcebe35b605c8ed10b50f',
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64:latest',
                    ],
                    sizeBytes: 182268279,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64@sha256:0c6859417f693a8c21c54c433b011bfd2b935a1bfd10e99669356d0bffbcddaa',
                    ],
                    sizeBytes: 182201284,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcmv2-amd64@sha256:3f9b5ddd998a11e725643085a398ad58b29820c33e63a72970b5fe059a169ae3',
                    ],
                    sizeBytes: 174514853,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcmv2-amd64@sha256:29b5fde6a907e5c4d1c78aa2358e1537d9757889c82245f1e564fc148bc06f67',
                    ],
                    sizeBytes: 174514853,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcmv2-amd64@sha256:3e37897c90a9d0b9a5fbc9b8aaff84c4af00f63a508f05f2f41b11fbb1887b16',
                    ],
                    sizeBytes: 174514853,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcmv2-amd64@sha256:190066f8539cdae75c4af20daa280e86bc929011d8685b9fb61262ef0b0dc2c9',
                    ],
                    sizeBytes: 174514853,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcmv2@sha256:e63cada8847bf383f023f52a1600176fa1493cbdcc4d626a53f9e77923f41913',
                      'registry.ng.bluemix.net/icp-integration/hcmv2:latest',
                    ],
                    sizeBytes: 171696933,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcmv2-amd64@sha256:7774c980fb7ee152bef8fd744d9ac70139d86c21ff7739fd84532da3b7c6c9c8',
                    ],
                    sizeBytes: 171680549,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcmv2@sha256:068fddf789f9feef3c1263492989801a2e82539867348a2b19b69cbd55fb08dd',
                    ],
                    sizeBytes: 171680549,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcmv2-amd64@sha256:70f575c677fa233e5a17dc5a5c5e763df6d8c7d1835f50e2354825e938490e5f',
                      'registry.ng.bluemix.net/icp-integration/hcmv2-amd64:latest',
                    ],
                    sizeBytes: 171680549,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/icp-mcm-ui-amd64@sha256:4dfe922b456861814219da452371edb7f737eb55559176392da4ed333fe06064',
                    ],
                    sizeBytes: 163093854,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/icp-mcm-ui-amd64@sha256:c762e43b23575a2e75be156d6e38a5161b9c999fff82823e46f4576e4506493b',
                    ],
                    sizeBytes: 163091857,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64@sha256:5f519cebf657fada4fc859436b0a5146fe143355895289af4da27bb088bb8f80',
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64:v1',
                    ],
                    sizeBytes: 158965038,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/icp-mcm-ui-amd64@sha256:8e3f58a3a4a5dab37ce2e765f90d9574515ded3250acad624e0f684b268a4289',
                      'registry.ng.bluemix.net/mdelder/icp-mcm-ui-amd64:latest',
                    ],
                    sizeBytes: 158938154,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/icp-mcm-ui-amd64@sha256:54cc42a8808ee85195df0efa0615ad64e74cc5bcdcdb7e2458999bff229c6da8',
                    ],
                    sizeBytes: 158933025,
                  },
                ],
                nodeInfo: {
                  architecture: 'amd64',
                  bootID: 'ff5a8b87-5642-41d7-926c-f44ffa51b52d',
                  containerRuntimeVersion: 'docker://17.9.0',
                  kernelVersion: '4.4.0-134-generic',
                  kubeProxyVersion: 'v1.11.1+icp-ee',
                  kubeletVersion: 'v1.11.1+icp-ee',
                  machineID: '5f903c20998c5cfed3e9488e571a4fbb',
                  operatingSystem: 'linux',
                  osImage: 'Ubuntu 16.04.4 LTS',
                  systemUUID: '42202B5E-81BD-4473-C3AA-CDE8C060519A',
                },
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Node',
              metadata: {
                annotations: {
                  'node.alpha.kubernetes.io/ttl': '0',
                  'volumes.kubernetes.io/controller-managed-attach-detach': 'true',
                },
                creationTimestamp: '2018-08-18T15:52:44Z',
                labels: {
                  'beta.kubernetes.io/arch': 'amd64',
                  'beta.kubernetes.io/os': 'linux',
                  'kubernetes.io/hostname': '9.37.137.92',
                  'node-role.kubernetes.io/worker': 'true',
                },
                name: '9.37.137.92',
                resourceVersion: '3939383',
                selfLink: '/api/v1/nodes/9.37.137.92',
                uid: 'beb9ff97-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {},
              status: {
                addresses: [
                  {
                    address: '9.37.137.92',
                    type: 'InternalIP',
                  },
                  {
                    address: '9.37.137.92',
                    type: 'Hostname',
                  },
                ],
                allocatable: {
                  cpu: '4',
                  'ephemeral-storage': '185856800870',
                  'hugepages-2Mi': '0',
                  memory: '8072468Ki',
                  pods: '40',
                },
                capacity: {
                  cpu: '4',
                  'ephemeral-storage': '201667536Ki',
                  'hugepages-2Mi': '0',
                  memory: '8174868Ki',
                  pods: '40',
                },
                conditions: [
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:07Z',
                    lastTransitionTime: '2018-08-18T15:52:44Z',
                    message: 'kubelet has sufficient disk space available',
                    reason: 'KubeletHasSufficientDisk',
                    status: 'False',
                    type: 'OutOfDisk',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:07Z',
                    lastTransitionTime: '2018-08-18T15:52:44Z',
                    message: 'kubelet has sufficient memory available',
                    reason: 'KubeletHasSufficientMemory',
                    status: 'False',
                    type: 'MemoryPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:07Z',
                    lastTransitionTime: '2018-08-18T15:52:44Z',
                    message: 'kubelet has no disk pressure',
                    reason: 'KubeletHasNoDiskPressure',
                    status: 'False',
                    type: 'DiskPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:07Z',
                    lastTransitionTime: '2018-08-18T15:52:44Z',
                    message: 'kubelet has sufficient PID available',
                    reason: 'KubeletHasSufficientPID',
                    status: 'False',
                    type: 'PIDPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:07Z',
                    lastTransitionTime: '2018-08-18T15:53:48Z',
                    message: 'kubelet is posting ready status. AppArmor enabled',
                    reason: 'KubeletReady',
                    status: 'True',
                    type: 'Ready',
                  },
                ],
                config: {},
                daemonEndpoints: {
                  kubeletEndpoint: {
                    Port: 10250,
                  },
                },
                images: [
                  {
                    names: [
                      'ibmcom/ace@sha256:64e29015a9baa1078231348447fe59a56efae3255495fa1dfb1f8685648b9597',
                      'ibmcom/ace:11.0.0.0',
                    ],
                    sizeBytes: 1067636085,
                  },
                  {
                    names: [
                      'quay.io/coreos/hyperkube@sha256:699fc03fccb1c4662fee9d996cf30106aea55a6f594d16c1504cc7334dadcee4',
                      'quay.io/coreos/hyperkube:v1.7.6_coreos.0',
                    ],
                    sizeBytes: 699456364,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/hyperkube@sha256:1a75272f64f0844866d4ca78ea9f8ba95b3fafa752f459e4092451d2e2ba45cb',
                      'registry.ng.bluemix.net/mdelder/hyperkube:v1.10.0-ee',
                    ],
                    sizeBytes: 683782255,
                  },
                  {
                    names: [
                      'ibmcom/mongodb@sha256:e9e6d153d05c2500922d1c159fdf11303e3cc4d0eda66fbea5d832883f383d87',
                      'ibmcom/mongodb:3.6.0',
                    ],
                    sizeBytes: 664053479,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/hyperkube@sha256:af41d0acf265ac11e8b76947d5c05fa6a0f273ff2b04ccf8c9f6357d7814c127',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/hyperkube:v1.11.1-ee',
                    ],
                    sizeBytes: 625360968,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/cassandra@sha256:abc608bc070b13ea27df4d7f3e570e00513af9ab0fe9cb8976d5cd463378c142',
                      'registry.ng.bluemix.net/mdelder/cassandra@sha256:abc608bc070b13ea27df4d7f3e570e00513af9ab0fe9cb8976d5cd463378c142',
                      'registry.ng.bluemix.net/icp-integration/cassandra:HDM_201805181928',
                      'registry.ng.bluemix.net/mdelder/cassandra:HDM_201805181928',
                    ],
                    sizeBytes: 581809907,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/nasm-topology-service@sha256:dbce69650705f4377674a39e8593d6ff4dd4c36227b55b97466a2795d8b5c4e9',
                      'registry.ng.bluemix.net/mdelder/nasm-topology-service@sha256:dbce69650705f4377674a39e8593d6ff4dd4c36227b55b97466a2795d8b5c4e9',
                      'registry.ng.bluemix.net/icp-integration/nasm-topology-service:1.1.18.960',
                      'registry.ng.bluemix.net/mdelder/nasm-topology-service:1.1.18.960',
                    ],
                    sizeBytes: 506198499,
                  },
                  {
                    names: [
                      'sidneywibm/mcm-ui@sha256:2391f66beec3417c38f01272e2f8475d048478b8fb57821b385de81101e29783',
                      'sidneywibm/mcm-ui:latest',
                    ],
                    sizeBytes: 447269465,
                  },
                  {
                    names: [
                      'mongo@sha256:c49de5bdfefe50bed224be006dabb32e113ee3f4ad3e3d2ff46cacc2d2390b98',
                      'mongo:latest',
                    ],
                    sizeBytes: 379080163,
                  },
                  {
                    names: [
                      'sidneywibm/mcm-ui@sha256:b4a375abee72cf58e3bff5b883511a71d1b683031ec2ecb79a0b9b3f7db4f9e6',
                    ],
                    sizeBytes: 343995977,
                  },
                  {
                    names: [
                      'istio/grafana@sha256:3fcde7ceb67adf9cef9ede06d3aaa3dfa07645c199c2a0bb0997a4d59001bd8f',
                      'istio/grafana:0.8.0',
                    ],
                    sizeBytes: 301333209,
                  },
                  {
                    names: [
                      'istio/proxyv2@sha256:1930f0603321b1917b2249c576ecb4141aaceeaae5fcc0760b6a88dc88daea3e',
                      'istio/proxyv2:0.8.0',
                    ],
                    sizeBytes: 291396889,
                  },
                  {
                    names: [
                      'sidneywibm/mcm-ui@sha256:8567a56b2c80e4f47e9f023dfca44888796faedc14e229362ec963b66b9faab0',
                    ],
                    sizeBytes: 280184145,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/calico-node@sha256:e6bb59686ef001986344ccd6f2a3bb9dce9b71f445939f51b0c523dce73a4b01',
                      'registry.ng.bluemix.net/mdelder/calico-node:v3.0.4',
                    ],
                    sizeBytes: 277607194,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/filebeat@sha256:11866952f63f84345d32df2026c4cc3eea9f3af637f9166478e6b8c689b60458',
                      'registry.ng.bluemix.net/mdelder/filebeat:5.5.1',
                    ],
                    sizeBytes: 271299604,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/fluentd@sha256:78202eba44723660b3b12597fb79487cd6a00612721f84d6373ea66c8121e5e2',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/fluentd:latest',
                    ],
                    sizeBytes: 263074524,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-node@sha256:284b7823a38d58a79605b35eb508976b3302ef87d0b51ff274540b67536b8be5',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    ],
                    sizeBytes: 248202699,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcm-amd64@sha256:3bce0230df357d1328261276065d20a4720c2923a5353d730b18431e765de05a',
                      'registry.ng.bluemix.net/icp-integration/hcm-amd64:latest',
                    ],
                    sizeBytes: 233465131,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/hcm-amd64@sha256:f1cfd9621306ec57914cedf52b3e74d8d247a124d23061005349251f722cd360',
                      'registry.ng.bluemix.net/mdelder/hcm-amd64:latest',
                    ],
                    sizeBytes: 233198361,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/metering-reader@sha256:1f2c4bb1c66086b5fcb9d84a29c69fe80e20c7e405a24084e763c6efd41846e6',
                      'registry.ng.bluemix.net/mdelder/metering-reader:1.0.3',
                    ],
                    sizeBytes: 217727628,
                  },
                  {
                    names: [
                      'aerospike/aerospike-server@sha256:9fcf5f40b33116362a8980435ba845f017f56257c1400574e826da213a4accf7',
                      'aerospike/aerospike-server:3.14.1.2',
                    ],
                    sizeBytes: 198694131,
                  },
                  {
                    names: [
                      'ycao/icp-mcm-ui-amd64@sha256:0311668ae7e17dab58b71d97d4e756e997c4c3c8faf31c6e5843a3a2660f6980',
                    ],
                    sizeBytes: 194334536,
                  },
                  {
                    names: [
                      'ycao/icp-mcm-ui-amd64@sha256:d6d8bd49b904e6d67aef66b4b2590e669437067d9ef358030206a03353ee6000',
                    ],
                    sizeBytes: 189869268,
                  },
                  {
                    names: [
                      'ycao/icp-mcm-ui-amd64@sha256:b45868bee98bdd72e81b2606c8726f4db3133e4614880eee129ddfa8b25e5221',
                    ],
                    sizeBytes: 184818263,
                  },
                  {
                    names: [
                      'ycao/icp-mcm-ui-amd64@sha256:ffb8df15150f6fe3b90f434df4ec19a561415054e0e02050066dbbf9d2f0532e',
                      'ycao/icp-mcm-ui-amd64:latest',
                    ],
                    sizeBytes: 184253051,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui@sha256:97994a4f7a1da1d7d226ab0316b0d410afd8c8cba0aba47563b7b4521be51004',
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui:latest',
                    ],
                    sizeBytes: 182738960,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui@sha256:d966df07ac0392745d4cd81fd301bf8cf80daae777c21da535581e1988d1ae98',
                    ],
                    sizeBytes: 182685124,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64@sha256:6dcd34d77d3310887d7b328109e95e96633d87e0378c49c43c4a1bc1e9fc8997',
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64:latest',
                    ],
                    sizeBytes: 182609223,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64@sha256:2b67e24e30923e6470781363e507d59a51e8551c4a511939d4e4aff29c0922e9',
                    ],
                    sizeBytes: 182503366,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64@sha256:ec79c203153eda5d2f0ad635c573e6eb0eab802e6b46754b567938562681371a',
                    ],
                    sizeBytes: 182335348,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-amd64@sha256:b7d039a814c1b06991683beca171cb8997015ef5fd634944b3d16ce2b800c436',
                    ],
                    sizeBytes: 158965083,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/hcm-weave-etl-amd64@sha256:07fd67faf0eadfc4b85e38f3a136ac0afa441660f9f21e7b67064a82afcd1e04',
                      'registry.ng.bluemix.net/icp-integration/hcm-weave-etl-amd64:latest',
                    ],
                    sizeBytes: 140989631,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/hcm-weave-etl-amd64@sha256:6e3ddddc20be96a6ccbdf88408d28f29e2f4e3f48ff562803899e823ef5601f4',
                      'registry.ng.bluemix.net/mdelder/hcm-weave-etl-amd64:latest',
                    ],
                    sizeBytes: 140924102,
                  },
                  {
                    names: [
                      'quay.io/coreos/etcd-operator@sha256:db563baa8194fcfe39d1df744ed70024b0f1f9e9b55b5923c2f3a413c44dc6b8',
                      'quay.io/coreos/etcd-operator:v0.9.0',
                    ],
                    sizeBytes: 136710352,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/nvidia-device-plugin@sha256:d10d32c8da9e2a84d1b24c119860c182a2f4012920ae95ca2b568183c8fecc28',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/nvidia-device-plugin:1.0',
                    ],
                    sizeBytes: 131957096,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/metering-data-manager@sha256:b7090dbc413337c0cd2202e11268e5a78d66f463bce1cd0762dacfcff4ae4720',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/metering-data-manager:latest',
                    ],
                    sizeBytes: 121836595,
                  },
                  {
                    names: [
                      'prom/prometheus@sha256:0283ae2509e1ccc71830edf382713cc3906aa55ca9418c50911854223829bf0b',
                      'prom/prometheus:latest',
                    ],
                    sizeBytes: 118818909,
                  },
                  {
                    names: [
                      'istio/proxy_init@sha256:b0b288ee8270e054442abdd413da9395e2af39fed1792b85ec157700ef2c192f',
                      'istio/proxy_init:0.8.0',
                    ],
                    sizeBytes: 116918844,
                  },
                  {
                    names: [
                      'sidneywibm/mcm-uiapi@sha256:aac3e99ae7d6bf8436f294c25e02446021c4c8340e9bf2d184b9cb38c0549c65',
                      'sidneywibm/mcm-uiapi:latest',
                    ],
                    sizeBytes: 113623001,
                  },
                  {
                    names: [
                      'bitnami/redis@sha256:ef1b70c199555a64e935e9875c68e29713b5786ab54f675934121d06a34350cf',
                      'bitnami/redis:4.0.8-r1',
                    ],
                    sizeBytes: 113070435,
                  },
                  {
                    names: [
                      'sidneywibm/mcm-uiapi@sha256:5dc05135e16efc2ced395f26479edc20c901d42896f82bd55ad8fc51bd5b3ade',
                    ],
                    sizeBytes: 111526751,
                  },
                  {
                    names: [
                      'sidneywibm/mcm-uiapi@sha256:59e63cc4ad1b057553fde8d6ef2cec6b9259aa0cfeaaf8beacd1df21f8237fbf',
                    ],
                    sizeBytes: 111526035,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api@sha256:b9d8905ca43996fec515e7e9d9e8406c5ab21f00f2473b3bb51c19c974841c25',
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api:latest',
                    ],
                    sizeBytes: 104427685,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api-amd64@sha256:295b974ee0c53dcdfccbca79bef1efd62c7c537cee8484af2a3345cedf2db92c',
                    ],
                    sizeBytes: 104426823,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api-amd64@sha256:45d109365b5d0fa8ef3536c6f7f88f3e159cee8a5e32149c692182b26f2c552e',
                    ],
                    sizeBytes: 104426663,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api-amd64@sha256:24aa4d9e355ba3315ae2dd50a00a4d5622111e330b2cd9394d101c276af9b174',
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api-amd64:latest',
                    ],
                    sizeBytes: 104426518,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api@sha256:7a8d90fdf36b5abf91afde17e346a155376972af0030f2b8fa3a6febdee6059b',
                    ],
                    sizeBytes: 104426422,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api-amd64@sha256:a7ec1b86ab4f20d342bf0f6ce40130f33cec0cb186dbb49949da3e3f2ec52f02',
                    ],
                    sizeBytes: 104403736,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api-amd64@sha256:fbb69a6f973e468fea35bb468a09123fcf0eef8d94ff8b286408eea28f349992',
                    ],
                    sizeBytes: 104391370,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-mcm-ui-api-amd64@sha256:cddbe08f0fe6e1f73e29366053fee32d5ad2ad51876af5d6f57bcd1f72ec095e',
                    ],
                    sizeBytes: 103392115,
                  },
                ],
                nodeInfo: {
                  architecture: 'amd64',
                  bootID: 'd8f392c5-e1cb-4e30-8c91-33233bf21857',
                  containerRuntimeVersion: 'docker://17.9.0',
                  kernelVersion: '4.4.0-134-generic',
                  kubeProxyVersion: 'v1.11.1+icp-ee',
                  kubeletVersion: 'v1.11.1+icp-ee',
                  machineID: '5f903c20998c5cfed3e9488e571a4fbb',
                  operatingSystem: 'linux',
                  osImage: 'Ubuntu 16.04.4 LTS',
                  systemUUID: '4220F84B-2C1B-4A3A-85DA-1AE01AFB7558',
                },
              },
            },
            {
              apiVersion: 'v1',
              kind: 'Node',
              metadata: {
                annotations: {
                  'node.alpha.kubernetes.io/ttl': '0',
                  'volumes.kubernetes.io/controller-managed-attach-detach': 'true',
                },
                creationTimestamp: '2018-08-18T15:50:24Z',
                labels: {
                  'beta.kubernetes.io/arch': 'amd64',
                  'beta.kubernetes.io/os': 'linux',
                  etcd: 'true',
                  'kubernetes.io/hostname': '9.42.23.230',
                  management: 'true',
                  master: 'true',
                  'node-role.kubernetes.io/etcd': 'true',
                  'node-role.kubernetes.io/management': 'true',
                  'node-role.kubernetes.io/master': 'true',
                  'node-role.kubernetes.io/proxy': 'true',
                  proxy: 'true',
                  role: 'master',
                },
                name: '9.42.23.230',
                resourceVersion: '3939413',
                selfLink: '/api/v1/nodes/9.42.23.230',
                uid: '6bd82787-a2fe-11e8-8a50-005056a0d11b',
              },
              spec: {
                taints: [
                  {
                    effect: 'NoSchedule',
                    key: 'dedicated',
                    value: 'proxy',
                  },
                ],
              },
              status: {
                addresses: [
                  {
                    address: '9.42.23.230',
                    type: 'InternalIP',
                  },
                  {
                    address: '9.42.23.230',
                    type: 'Hostname',
                  },
                ],
                allocatable: {
                  cpu: '8',
                  'ephemeral-storage': '201565136Ki',
                  'hugepages-1Gi': '0',
                  'hugepages-2Mi': '0',
                  memory: '16329404Ki',
                  pods: '80',
                },
                capacity: {
                  cpu: '8',
                  'ephemeral-storage': '201667536Ki',
                  'hugepages-1Gi': '0',
                  'hugepages-2Mi': '0',
                  memory: '16431804Ki',
                  pods: '80',
                },
                conditions: [
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:14Z',
                    lastTransitionTime: '2018-08-18T15:50:24Z',
                    message: 'kubelet has sufficient disk space available',
                    reason: 'KubeletHasSufficientDisk',
                    status: 'False',
                    type: 'OutOfDisk',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:14Z',
                    lastTransitionTime: '2018-08-18T15:50:24Z',
                    message: 'kubelet has sufficient memory available',
                    reason: 'KubeletHasSufficientMemory',
                    status: 'False',
                    type: 'MemoryPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:14Z',
                    lastTransitionTime: '2018-08-23T09:15:02Z',
                    message: 'kubelet has disk pressure',
                    reason: 'KubeletHasDiskPressure',
                    status: 'True',
                    type: 'DiskPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:14Z',
                    lastTransitionTime: '2018-08-18T15:50:24Z',
                    message: 'kubelet has sufficient PID available',
                    reason: 'KubeletHasSufficientPID',
                    status: 'False',
                    type: 'PIDPressure',
                  },
                  {
                    lastHeartbeatTime: '2018-09-05T15:36:14Z',
                    lastTransitionTime: '2018-08-18T15:53:45Z',
                    message: 'kubelet is posting ready status. AppArmor enabled',
                    reason: 'KubeletReady',
                    status: 'True',
                    type: 'Ready',
                  },
                ],
                config: {},
                daemonEndpoints: {
                  kubeletEndpoint: {
                    Port: 10250,
                  },
                },
                images: [
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-platform-auth@sha256:80c45aa6622414f6f1e6ce70f91a31866206bf3f3ab0ec381cdc94760b053afb',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-platform-auth:latest',
                    ],
                    sizeBytes: 1027982284,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/iam-token-service@sha256:99ad42b79892b944f3f7cfc03e6e358859eb8141e47174e5eb58f57c585b6e94',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/iam-token-service:latest',
                    ],
                    sizeBytes: 1020060844,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-inception@sha256:5def88182f3402bb64a5ee978cb85005ff724b55c67700af0482a992f3258e9d',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-inception:latest',
                    ],
                    sizeBytes: 738410806,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/iam-policy-administration@sha256:78688702a1bf006d6124af8e23259461cb910d19a6fc16cf14947980c8e1bea8',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/iam-policy-administration:latest',
                    ],
                    sizeBytes: 713412769,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/icp-inception@sha256:4b4d2bb3b04b98c07ebe56fc713fdb60b17c629ba9982dccb789197cc7615129',
                      'registry.ng.bluemix.net/mdelder/icp-inception:2.1.0.3-rc1',
                    ],
                    sizeBytes: 640635896,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/hyperkube@sha256:af41d0acf265ac11e8b76947d5c05fa6a0f273ff2b04ccf8c9f6357d7814c127',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/hyperkube:v1.11.1-ee',
                    ],
                    sizeBytes: 625360968,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-platform-api@sha256:434baceb922084d6b98fd097eb4c95b5cd30757c738e1ffb12970efaee35152c',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-platform-api:latest',
                    ],
                    sizeBytes: 601136564,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/iam-policy-decision@sha256:120e9056131a9f8e5c63bdb839432739f2bf90653b931dcadde3146a2ad2967a',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/iam-policy-decision:latest',
                    ],
                    sizeBytes: 561570578,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/mariadb@sha256:7ae15760bc26d232feefcd6b085bc5abc765b144c079e7b95ad48a0055c720b7',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/mariadb:10.2.14',
                    ],
                    sizeBytes: 445733061,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/mdelder/icp-helm-api@sha256:49764fdcb13e9fa658a14e8d9caeafc91b1893972a30ff2be22f4ae205765a2f',
                      'registry.ng.bluemix.net/mdelder/icp-helm-api:1.0.0',
                    ],
                    sizeBytes: 431361470,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/metering-ui@sha256:07b78b936c6de5607251e8d6724a1d0346e1857d23b0f40a142911a711bde5ce',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/metering-ui:latest',
                    ],
                    sizeBytes: 385091881,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-mongodb@sha256:a305ae8bc309898d86bf60aee968846db3602f77b25924640d5f08a2389ee99d',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-mongodb:latest',
                    ],
                    sizeBytes: 379353410,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-platform-ui@sha256:b7050b6080978c47e846891619f7d80bd29be424e185e96ec06edaea54be6117',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-platform-ui:latest',
                    ],
                    sizeBytes: 361686937,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/nginx-ingress-controller@sha256:63b48dd3ba635aa65409f7d6a319e293697810c1b9e885e6255bebf36a2506ab',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/nginx-ingress-controller:0.16.2',
                    ],
                    sizeBytes: 361632894,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-identity-manager@sha256:95b0a7db314200186ffb060540c7f0b50b9986fe221260644d877661b897c987',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-identity-manager:latest',
                    ],
                    sizeBytes: 269418178,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/fluentd@sha256:78202eba44723660b3b12597fb79487cd6a00612721f84d6373ea66c8121e5e2',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/fluentd:latest',
                    ],
                    sizeBytes: 263074524,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-node@sha256:284b7823a38d58a79605b35eb508976b3302ef87d0b51ff274540b67536b8be5',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-node:v3.1.3',
                    ],
                    sizeBytes: 248202699,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/grafana@sha256:dc3566257a0c716caedfb33127d8ee385290c1dda006bebfb75c376d56b30c88',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/grafana:5.2.0',
                    ],
                    sizeBytes: 245297582,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-audit-service@sha256:8bd160a67d3fc9ea6d80f4fdcb535c007479a224afc7941a2ee4c1217ffb7130',
                    ],
                    sizeBytes: 236831824,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-audit-service@sha256:c5ffd3a80bb1e6382b1b080ee0bd8228eef81f95a8645ed88e2af8f822c1ec74',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-audit-service:latest',
                    ],
                    sizeBytes: 236831717,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-identity-provider@sha256:4596276c9865b743c75a8213e6afa9d27ea6e7ece5570ecd80b8c19c875cad3c',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-identity-provider:latest',
                    ],
                    sizeBytes: 223635697,
                  },
                  {
                    names: [
                      'ycao/icp-platform-ui-amd64@sha256:12e2ec77c29e5f3e42c98b5029af682e012ee218fd98001a531e8c803782b537',
                      'registry.ng.bluemix.net/mdelder/icp-platform-ui-amd64@sha256:12e2ec77c29e5f3e42c98b5029af682e012ee218fd98001a531e8c803782b537',
                      'ycao/icp-platform-ui-amd64:latest',
                    ],
                    sizeBytes: 195651858,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-platform-deploy@sha256:56967a581ce6503981da69a429c13f10cf41e504ea9fb3fae00d71991cf9fa05',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-platform-deploy:latest',
                    ],
                    sizeBytes: 140448414,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-helm-api@sha256:edec9fabcc7a7c0036e5a01eb4a74881abe2de89d7eab72f1af36e999bed0a01',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-helm-api:latest',
                    ],
                    sizeBytes: 140382349,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/nvidia-device-plugin@sha256:d10d32c8da9e2a84d1b24c119860c182a2f4012920ae95ca2b568183c8fecc28',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/nvidia-device-plugin:1.0',
                    ],
                    sizeBytes: 131957096,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/metering-data-manager@sha256:b7090dbc413337c0cd2202e11268e5a78d66f463bce1cd0762dacfcff4ae4720',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/metering-data-manager:latest',
                    ],
                    sizeBytes: 121836595,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-management-ingress@sha256:5eed3f651381d88d053598c6712f9799a75b6be67edf64ec28f998ba91f40a11',
                      'registry.ng.bluemix.net/mdelder/icp-management-ingress@sha256:011ce3956aa9c3e304f03145631407b53eed17a20c02fb1c85edcf1d8e9cb6fa',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-management-ingress:2.2.1',
                      'registry.ng.bluemix.net/mdelder/icp-management-ingress:2.2.0',
                    ],
                    sizeBytes: 74427848,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/heapster@sha256:9fb15b54720e1ee1522b946c35d3c30ef027666ddaa74f563668568ecb8ab77f',
                      'registry.ng.bluemix.net/mdelder/heapster@sha256:3f09bf1a06d40a65b16cf2de708d35072b5991d1d99433a83ab9056c429ec982',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/heapster:v1.4.0',
                      'registry.ng.bluemix.net/mdelder/heapster:v1.4.0',
                    ],
                    sizeBytes: 73395475,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-cni@sha256:0b4eb34f955f35f8d1b182267f7ae9e2be83ca6fe1b1ade63116125feb8d07b9',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-cni:v3.1.3',
                    ],
                    sizeBytes: 68849270,
                  },
                  {
                    names: [
                      'registry.ng.bluemix.net/icp-integration/icp-weave-scope@sha256:1c3255960c59d382613ef7ba876df79f708280b2b00b0aac7bc3545ee89d903f',
                      'registry.ng.bluemix.net/icp-integration/icp-weave-scope:latest',
                    ],
                    sizeBytes: 68559349,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/tiller@sha256:e0ace1f8e62fce2329e9ade315e483ad3240c7384afa0ad5878f96d9a8521e04',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/tiller:v2.9.1-icp',
                    ],
                    sizeBytes: 60063986,
                  },
                  {
                    names: [
                      'mycluster.icp:8500/kube-system/mcm-klusterlet-amd64@sha256:912416c624c5d9fef12a5a0f78ccc5643d5e13a742111356de4a5035d18434fd',
                      'registry.ng.bluemix.net/icp-integration/mcm-klusterlet-amd64:0.0.1-ac36eb1',
                    ],
                    sizeBytes: 58356720,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-kube-controllers@sha256:0517bb47bc0f1f79695cbb244a033f00f45613cd9d4df3b49cab384cecdab63c',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/calico-kube-controllers:v3.1.3',
                    ],
                    sizeBytes: 54985151,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/k8s-prometheus-adapter@sha256:836b00cb9848b3843a957d6bdde1bb0827ab47195a1faf3c553a692342e2abfa',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/k8s-prometheus-adapter:v0.2.1',
                    ],
                    sizeBytes: 52134773,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-cert-manager-controller@sha256:1df7fd78a0a2b73c12c11a65ff75dd3191c3733bbec9d0e8131634a969b19291',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-cert-manager-controller:0.3.0',
                    ],
                    sizeBytes: 51824801,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/unified-router@sha256:4cbaae5103bb0cc547874d7c268818c085ce347b06f27d226048f06ad926ce82',
                      'registry.ng.bluemix.net/mdelder/unified-router@sha256:d2d40536739fdd5edc086120b74bf9dbe3e911bd56240d4ce4d0cae466f5688c',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/unified-router:2.2.0',
                      'registry.ng.bluemix.net/mdelder/unified-router:2.2.0',
                    ],
                    sizeBytes: 48739310,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/coredns@sha256:ab8aec91742937058f6b307efbd411ba8b49c5392a757431b00fda4bdd4fa588',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/coredns:1.1.3',
                    ],
                    sizeBytes: 45587362,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/service-catalog-service-catalog@sha256:f9afa14edf6263868caea1a40b4df3ae03eb90f0318b73de3505ffc8316d4915',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/service-catalog-service-catalog:v0.1.26-icp',
                    ],
                    sizeBytes: 42868920,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/metrics-server@sha256:220c0ed3451cb95e4b2f72dd5dc8d9d39d9f529722e5b29d8286373ce27b117e',
                      'registry.ng.bluemix.net/mdelder/metrics-server@sha256:f4d4d642cc9ca7cc4e4ca7d68afdf5adf62e6f1d01fa02d60310eefb573830af',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/metrics-server:v0.2.1',
                      'registry.ng.bluemix.net/mdelder/metrics-server:v0.2.1',
                    ],
                    sizeBytes: 42541759,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/ibmcloud-image-enforcement@sha256:bb1aef5d62ff20e0eab07da0341b8377c7b617d402f7f1799a62883be70a0e81',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/ibmcloud-image-enforcement:0.2.0',
                    ],
                    sizeBytes: 40040099,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/etcd@sha256:eef4e8dde97cc2f02a4fcafa7e15a9e0a4ab55c203e758f9ccf735fae06a0f1e',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/etcd:v3.2.18',
                    ],
                    sizeBytes: 37232444,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/alertmanager@sha256:55c0d339205048ba46522ac3495bfcf9848669d39ea71b950bf6da86fc2d4f1b',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/alertmanager:v0.15.0',
                    ],
                    sizeBytes: 36095602,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/kube-state-metrics@sha256:5b1c49bf1e47ea731db9b162115e847278de9a0c4ce390f96b22e8b373880cc9',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/kube-state-metrics:v1.3.0',
                    ],
                    sizeBytes: 35646776,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-secret-watcher@sha256:d87f6ac5bbe4fb314fbb5da82e72f518d5db1cc3dd8055f1eb662d5a2ee1058c',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-secret-watcher:latest',
                    ],
                    sizeBytes: 33967521,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/registry@sha256:feb40d14cd33e646b9985e2d6754ed66616fedb840226c4d917ef53d616dcd6c',
                      'registry.ng.bluemix.net/mdelder/registry@sha256:1de51579c6fa8db2957e77f024bd330d6a698a5ea868ea9bdb52431b8166482d',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/registry:2.6.2',
                      'registry.ng.bluemix.net/mdelder/registry:2.6.2',
                    ],
                    sizeBytes: 33281203,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-helm-rudder@sha256:21c9ed4f96db88465ebafc1342ab031bf6df7ed9e29ce5c5d52b9c35af8ddbb0',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-helm-rudder:latest',
                    ],
                    sizeBytes: 28943198,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-image-manager@sha256:641a85eda6db2a6916b5c148198faa4aefa5908b066a61b543d33e1841e8de0e',
                      'registry.ng.bluemix.net/mdelder/icp-image-manager@sha256:376efb561200186fc6a0390d934a05f7eac1c9199c0506607da5b9fe51b26200',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-image-manager:2.2.2',
                      'registry.ng.bluemix.net/mdelder/icp-image-manager:2.2.2',
                    ],
                    sizeBytes: 25606758,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/node-exporter@sha256:55302581333c43d540db0e144cf9e7735423117a733cdec27716d87254221086',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/node-exporter:v0.16.0',
                    ],
                    sizeBytes: 22915749,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/configmap-reload@sha256:befec9f23d2a9da86a298d448cc9140f56a457362a7d9eecddba192db1ab489e',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/configmap-reload:v0.2.2',
                    ],
                    sizeBytes: 22381476,
                  },
                  {
                    names: [
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-mongodb-install@sha256:9a52135768e697b0ae8f1862abddf9724067eef62e2378f78d9619dccb67f2c3',
                      'mock-private-edge-docker.test.ibm.com/ibmcom-amd64/icp-mongodb-install:latest',
                    ],
                    sizeBytes: 15655450,
                  },
                ],
                nodeInfo: {
                  architecture: 'amd64',
                  bootID: '40769e7a-8284-41f1-a160-381584e4fab7',
                  containerRuntimeVersion: 'docker://17.9.0',
                  kernelVersion: '4.4.0-134-generic',
                  kubeProxyVersion: 'v1.11.1+icp-ee',
                  kubeletVersion: 'v1.11.1+icp-ee',
                  machineID: '5f903c20998c5cfed3e9488e571a4fbb',
                  operatingSystem: 'linux',
                  osImage: 'Ubuntu 16.04.4 LTS',
                  systemUUID: '4220CDE6-F100-757C-3182-6FE791459DA5',
                },
              },
            },
          ],
          kind: 'NodeList',
          metadata: {
            resourceVersion: '3939417',
            selfLink: '/api/v1/nodes',
          },
        },
      },
    },
  },
};

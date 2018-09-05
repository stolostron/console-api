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
    kind: 'Work',
    apiVersion: 'mcm.ibm.com/v1alpha1',
    metadata: {
      name: 'test-weave-scope',
      namespace: 'mycluster',
      selfLink:
        '/apis/mcm.ibm.com/v1alpha1/namespaces/mycluster/works/test-weave-scope',
      uid: 'f4fd078d-b12f-11e8-bd43-b69970856045',
      resourceVersion: '15827',
      creationTimestamp: '2018-09-05T17:20:16Z',
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      cluster: {
        name: 'mycluster',
      },
      type: 'Deployer',
      scope: {},
      helm: {
        chartURL: 'https://kubernetes-charts.storage.googleapis.com/weave-scope-0.9.2.tgz',
        namespace: 'default',
        values: 'Z2xvYmFsOgogIGltYWdlOgogICAgdGFnOiAxLjYuNQogICAgcmVwb3NpdG9yeTogd2VhdmV3b3Jrcy9zY29wZQogICAgcHVsbFBvbGljeTogSWZOb3RQcmVzZW50CiAgc2VydmljZToKICAgIHBvcnQ6IDgwCiAgICB0eXBlOiBDbHVzdGVySVAKc2VsZWN0ZWROYW1lc3BhY2U6IGRlZmF1bHQKc2VsZWN0ZWRSZWxlYXNlTmFtZTogd2VhdmUtdGVzdAp3ZWF2ZS1zY29wZS1hZ2VudDoKICBlbmFibGVkOiB0cnVlCiAgcHJvYmVUb2tlbjogJycKICByYmFjOgogICAgY3JlYXRlOiB0cnVlCiAgZG9ja2VyQnJpZGdlOiBkb2NrZXIwCiAgc2NvcGVGcm9udGVuZEFkZHI6ICcnCiAgc2VydmljZUFjY291bnQ6CiAgICBjcmVhdGU6IHRydWUKd2VhdmUtc2NvcGUtZnJvbnRlbmQ6CiAgZW5hYmxlZDogdHJ1ZQo=',
      },
    },
    status: {
      type: 'Completed',
      LastUpdateTime: '2018-09-05T17:20:18Z',
      result: {
        metadata: {
          name: 'md-test-weave-scope',
          creationTimestamp: null,
        },
        spec: {
          description: 'A Helm chart for the Weave Scope cluster visualizer.',
          firstDeployed: '2018-09-05T17:20:17Z',
          lastDeployed: '2018-09-05T17:20:17Z',
          chartName: 'weave-scope',
          chartVersion: '0.9.2',
          namespace: 'default',
          version: 1,
          status: 'DEPLOYED',
        },
      },
    },
  },
};

export default mockResponse;

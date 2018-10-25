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
      name: 'test-acs-engine',
      namespace: 'mycluster',
      selfLink:
        '/apis/mcm.ibm.com/v1alpha1/namespaces/mycluster/works/test-acs-engine',
      uid: 'f6ce4c2b-d86e-11e8-864c-c62518accb59',
      resourceVersion: '63510',
      creationTimestamp: '2018-10-25T15:59:33Z',
      annotations: {
        'mcm.ibm.com/user-group': 'c3lzdGVtOmF1dGhlbnRpY2F0ZWQ=',
        'mcm.ibm.com/user-identity': 'aHR0cHM6Ly9teWNsdXN0ZXIuaWNwOjk0NDMvb2lkYy9lbmRwb2ludC9PUCNhZG1pbg==',
      },
    },
    spec: {
      cluster: {
        name: 'hub-cluster',
      },
      type: 'Deployer',
      scope: {},
      helm: {
        chartURL: 'https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.2.0.tgz',
        namespace: 'kube-system',
        values: 'YWZmaW5pdHk6IHt9CnJlc291cmNlczoge30KaW1hZ2U6CiAgdGFnOiAyLjEuMQogIHJlcG9zaXRvcnk6IHdidWNod2FsdGVyL2t1YmVybmV0ZXMtYWNzLWVuZ2luZS1hdXRvc2NhbGVyCiAgcHVsbFBvbGljeTogSWZOb3RQcmVzZW50CnRvbGVyYXRpb25zOiBbXQpyZXBsaWNhQ291bnQ6IDEKbm9kZVNlbGVjdG9yOiB7fQpwb2RBbm5vdGF0aW9uczoge30Kc2VsZWN0ZWROYW1lc3BhY2U6IGt1YmUtc3lzdGVtCnNlbGVjdGVkUmVsZWFzZU5hbWU6IHNlbGVuaXVtLWFjcy0xNTQwNDc2NTU5MDkyCmRlcGxveW1lbnRBbm5vdGF0aW9uczoge30KYWNzZW5naW5lY2x1c3RlcjoKICBhenVyZXNwYXBwaWQ6ICcnCiAgY2Fwcml2YXRla2V5OiAnJwogIHJlc291cmNlZ3JvdXA6ICcnCiAgYXp1cmVzcHNlY3JldDogJycKICBhenVyZXNwdGVuYW50aWQ6ICcnCiAgY2xpZW50cHJpdmF0ZWtleTogJycKICBrdWJlY29uZmlncHJpdmF0ZWtleTogJycK',
      },
    },
    status: {
      type: 'Completed',
      LastUpdateTime: '2018-09-05T17:20:18Z',
      result: {
        metadata: {
          name: 'md-test-acs-engine',
          creationTimestamp: null,
        },
        spec: {
          description: 'A Helm chart for the acs engine autoscaler.',
          firstDeployed: '2018-09-05T17:20:17Z',
          lastDeployed: '2018-09-05T17:20:17Z',
          chartName: 'acs-engine-autoscaler',
          chartVersion: '2.2.0',
          namespace: 'kube-system',
          version: 1,
          status: 'DEPLOYED',
        },
      },
    },
  },
};

export default mockResponse;

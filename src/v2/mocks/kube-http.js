/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* eslint-disable global-require */

export default function createMockHttp() {
  const state = {
    apps: require('./AppList'),
    clustersByNamespace: {
      default: require('./ClusterByNS').default,
      kubeSystem: require('./ClusterByNS').kubeSystem,
    },
    clusterstatusesByNamespace: {
      default: require('./ClusterStatusListByNS.js').default,
      kubeSystem: require('./ClusterStatusListByNS.js').kubeSystem,
    },
    clusters: require('./ClusterList').default,
    clusterStatus: require('./ClusterStatusList').default,
    repos: require('./ReposList').default,
    repoMutations: require('./RepoMutationsList').default,
    relMutations: require('./RelMutationList').default,
    pods: require('./PodList'),
    pvs: require('./PVsList'),
    nodes: require('./NodeList'),
    namespace: require('./NamespaceList'),
    release: require('./RelsList'),
    policies: require('./PolicyList'),
    compliances: require('./ComplianceList'),
  };

  return async function MockLib(params) {
    if (params.json) {
      switch (true) {
        case params.json.metadata.name.includes('pods'):
          return state.pods.mockResourceView;
        case params.json.metadata.name.includes('nodes'):
          return state.nodes.mockResourceView;
        case params.json.metadata.name.includes('namespace'):
          return state.namespace.mockResourceView;
        case params.json.metadata.name.includes('releases'):
          return state.release.mockResourceView;
        case params.json.metadata.name.includes('persistentvolumes'):
          return state.pvs.mockPVsResourceView;
        case params.json.metadata.name.includes('persistentvolumeclaim'):
          return state.pvs.mockPVsClaimResourceView;
        case params.url.includes('default/helmrepos'):
          return state.repoMutations;
        case params.json.metadata.name.includes('test-weave-scope'):
          return state.relMutations;
        case params.url.includes('policies'):
          return state.policies.mockCreatePolicy;
        case params.url.includes('compliances'):
          return state.compliances.mockCreateCompliance;
        case params.url.includes('applications'):
          return state.apps.mockCreateAppResponse;
        default:
          return state.pods;
      }
    }

    switch (true) {
      case params.url.includes('applications/app02'):
        return state.apps.mockSingleAppResponse;
      case params.url.includes('applications/testapp'):
        return state.apps.mockDeleteAppResponse;
      case params.url.includes('applications'):
        return state.apps.mockAppsResponse;
      case params.url.includes('namespaces/default/clusterstatuses'):
        return state.clusterstatusesByNamespace.default;
      case params.url.includes('namespaces/kube-system/clusterstatuses'):
        return state.clusterstatusesByNamespace.kubeSystem;
      case params.url.includes('clusterstatuses'):
        return state.clusterStatus;
      case params.url.includes('namespaces/default/clusters'):
        return state.clustersByNamespace.default;
      case params.url.includes('namespaces/kube-system/clusters'):
        return state.clustersByNamespace.kubeSystem;
      case params.url.includes('deployables'):
        return state.apps.mockDeployablesResponse;
      case params.url.includes('default/helmrepos'):
        return state.repoMutations;
      case params.url.includes('helmrepos'):
        return state.repos;
      case params.url.includes('resourceviews/pods'):
        return state.pods.mockResponse;
      case params.url.includes('resourceviews/persistentvolumes'):
        return state.pvs.mockPVsResponse;
      case params.url.includes('resourceviews/persistentvolumeclaims'):
        return state.pvs.mockPVsClaimResponse;
      case params.url.includes('resourceviews/nodes'):
        return state.nodes.mockResponse;
      case params.url.includes('resourceviews/namespace'):
        return state.namespace.mockResponse;
      case params.url.includes('resourceviews/release'):
        return state.release.mockResponse;
      case params.url.includes('default/policies/test-policy'):
        return state.policies.mockDeleteResponse;
      case params.url.includes('placementpolicies'):
        return state.apps.mockPlacementPoliciesResponse;
      case params.url.includes('policies/policy-xz-1'):
        return state.policies.mockSinglePolicyResponse;
      case params.url.includes('policies'):
        return state.policies.mockPolicyListResponse;
      case params.url.includes('compliances/compliance-xz'):
        return state.compliances.mockDeleteResponse;
      case params.url.includes('compliances'):
        return state.compliances.mockComplianceListResponse;
      default:
        return state.clusters;
    }
  };
}

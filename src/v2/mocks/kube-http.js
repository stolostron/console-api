/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* eslint-disable global-require */

import lru from 'lru-cache';

const cache = lru({
  max: 1000,
  maxAge: 1000 * 60, // 1 min
});

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
    userQuery: require('./UserQuery'),
    userAccess: require('./UserAccess').default,
    apiList: {
      mockResponse: require('./APIList').mockResponse,
      apiPath: require('./APIList').apiPath,
    },
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
    resourceViews: require('./ResourceView'),
    logs: require('./Logs'),
    genericResourceList: require('./GenericResourceList'),
    platformApi: require('./PlatformApi'),
    userInfo: require('./UserInfo'),
  };

  return async function MockLib(params) {
    if (params.json) {
      if (params.json.userQueries) {
        if (cache.get('savedUserQuery')) {
          cache.set('savedUserQuery', false);
          return state.userQuery.unitResponse;
        }
        cache.set('savedUserQuery', true);
        return state.userQuery.seleniumResponse;
      }
      if (params.json.userinfo) {
        return state.userInfo;
      }
      switch (true) {
        case params.json.kind.includes('SelfSubjectAccessReview'):
          return state.userAccess;
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
        case params.json.metadata.name.includes('policy'):
          return state.policies.mockPolicyListResponse;
        case params.json.metadata.name.includes('persistentvolumeclaim'):
          return state.pvs.mockPVsClaimResourceView;
        case params.url.includes('default/helmrepos'):
          return state.repoMutations;
        case params.json.metadata.name.includes('test-acs-engine'):
          return state.relMutations;
        case params.url.includes('policies'):
          return state.policies.mockCreatePolicy;
        case params.url.includes('compliances'):
          return state.compliances.mockCreateCompliance;
        case params.url.includes('applications'):
          return state.apps.mockCreateAppResponse;
        case params.url.includes('default/work'):
          return state.genericResourceList.mockedUpdateWorkResponse;
        case params.url.includes('/api/v1/clusters') && params.url.includes('/imports'):
          return state.platformApi.getAutomatedImportStatusResponse;
        default:
          return state.pods;
      }
    }
    switch (true) {
      case params.url.includes('applications/gbapp-gbapp'):
        return state.apps.mockSingleAppResponse;
      case params.url.includes('applications/testapp'):
        return state.apps.mockDeleteAppResponse;
      case params.url.includes('default/applications'):
        return state.apps.mockAppsResponse;
      case params.url.includes('kube-system/application'):
        return { body: { items: [] } };
      case params.url.endsWith('/placementbindings/gbapp-gbapp'):
        return state.apps.gbappPB;
      case params.url.endsWith('/placementbindings/gbapp-gbapp-redismaster'):
        return state.apps.gbappRedisMasterPB;
      case params.url.includes('default/placementbindings'):
        return state.policies.mockPlacementBindingResponse;
      case params.url.includes('/placementbindings'):
        return state.apps.mockAppPlacementBindings;
      case params.url.includes('/applicationrelationships'):
        return state.apps.mockAppRelationships;
      case params.url.includes('kube-system/works?labelSelector=deployable+in+%28'):
        return { body: { items: [] } };
      case params.url.includes('works?labelSelector=deployable+in+%28'):
        return state.apps.mockApplicationWorks;
      case params.url.endsWith('default/clusters/cluster1'):
        return state.logs.mockClusterResponse;
      case params.url.endsWith('kube-system/clusters/cluster1'):
        return { body: { items: [] } };
      case params.url.endsWith('clusterstatuses/cluster1/log/kube-system/mcm-ibm-mcm-prod-mcmui-67f7f87d9d-5zr2b/hcm-ui?tailLines=1000'):
        return state.logs.mockLogsResponse;
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
      case params.url.includes('kube-system/deployables'):
        return { body: { items: [] } };
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
      case params.url.includes('kube-system/placementpolicies'):
        return state.policies.mockPlacementPolicyResponse;
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
      case params.url.includes('resourceviews?fieldSelector'):
        return state.resourceViews.mockWorksetPollComplete;
      case params.url.includes('clusters'):
        return state.clusters;
      case params.url.includes('api/v1/userpreferences'):
        return cache.get('savedUserQuery')
          ? state.userQuery.seleniumResponse
          : state.userQuery.unitResponse;
      case params.url.includes('apis/mcm.ibm.com/v1alpha1'):
        return state.apiList.apiPath;
      case params.url.includes('/api/v1/namespaces/kube-system/pods/monitoring-prometheus-nodeexporter-n6h9b'):
        return state.genericResourceList.getResourceMock;
      case params.url.includes('/api/v1/namespaces/multicluster-endpoint'):
        return state.genericResourceList.updateResourceLocalMock;
      case params.url.includes('test-path-to-update-work'):
        return state.genericResourceList.mockedUpdatePollResponse;
      case params.url.includes('/api/v1/clusters'):
        return state.platformApi.createClusterResourceResponse;
      case params.url.includes('api/v1/cloudproviders'):
        return state.platformApi.getCloudProvidersResponse;
      case params.url.includes('api/v1/cloudconnections/iks/ericabrtest4/clusters'):
        return state.platformApi.getClusterCreationResponse;
      default:
        return state.apiList.mockResponse;
    }
  };
}

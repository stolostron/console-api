/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
/* eslint-disable global-require */

import _ from 'lodash';
import { CONNECTION_LABEL_SELECTOR } from '../models/connection';

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
    clusterImageSets: require('./ClusterImageSets').default,
    userAccess: require('./UserAccess').default,
    apiList: {
      mockResponse: require('./APIList').mockResponse,
      apiPath: require('./APIList').apiPath,
    },
    clusterStatus: require('./ClusterStatusList').default,
    clusterVersions: require('./ClusterVersionsList'),
    repos: require('./ReposList').default,
    repoMutations: require('./RepoMutationsList').default,
    relMutations: require('./RelMutationList').default,
    pods: require('./PodList'),
    pvs: require('./PVsList'),
    machinePoolsByNamespace: {
      default: require('./MachinePoolsByNS').default,
      kubeSystem: require('./MachinePoolsByNS').kubeSystem,
    },
    nodes: require('./NodeList'),
    namespace: require('./NamespaceList'),
    release: require('./RelsList'),
    policies: require('./PolicyList'),
    compliances: require('./ComplianceList'),
    resourceViews: require('./ResourceView'),
    logs: require('./Logs'),
    genericResourceList: require('./GenericResourceList'),
    clusterImport: require('./ClusterImport'),
    connectionApi: require('./ConnectionApi'),
    bareMetalAssets: require('./BareMetalAssetList').default,
  };

  return async function MockLib(params) {
    if (params.method === 'DELETE') {
      switch (true) {
        case params.url.includes('namespaces/kube-system/clusters/hub-cluster'):
          return { body: { kind: 'Status', code: '401' } };
        case params.url.includes('/apis/hive.openshift.io/v1/namespaces/kube-system/machinepools/new-cluster-worker'):
          return { body: { kind: 'Status', status: 'Not Acceptable', code: '406' } };
        case params.url.includes('/apis/hive.openshift.io/v1/namespaces/default/machinepools/managed-cluster-worker'):
          return { body: { kind: 'Status', status: 'Success' } };
        default:
          return { body: '204' };
      }
    }
    if (params.json) {
      switch (true) {
        case _.includes(_.get(params.json, 'kind'), 'SelfSubjectAccessReview'):
          return state.userAccess;
        case _.includes(_.get(params.json, 'metadata.name'), 'pods'):
          return state.pods.mockResourceView;
        case _.includes(_.get(params.json, 'metadata.name'), 'nodes'):
          return state.nodes.mockResourceView;
        case _.includes(_.get(params.json, 'metadata.name'), 'namespace'):
          return state.namespace.mockResourceView;
        case _.includes(_.get(params.json, 'metadata.name'), 'releases'):
          return state.release.mockResourceView;
        case _.includes(_.get(params.json, 'metadata.name'), 'persistentvolumes'):
          return state.pvs.mockPVsResourceView;
        case _.includes(_.get(params.json, 'metadata.name'), 'policy'):
          return state.policies.mockPolicyListResponse;
        case _.includes(_.get(params.json, 'metadata.name'), 'persistentvolumeclaim'):
          return state.pvs.mockPVsClaimResourceView;
        case _.includes(_.get(params.json, 'metadata.name'), 'clusterversions'):
          return state.clusterVersions.mockClusterVersionsResourceView;
        case _.includes(_.get(params.json, 'metadata.name'), 'test-acs-engine'):
          return state.relMutations;
        case params.url.includes('default/helmrepos'):
          return state.repoMutations;
        case params.url.includes('policies'):
          return state.policies.mockCreatePolicy;
        case params.url.includes('compliances'):
          return state.compliances.mockCreateCompliance;
        case params.url.includes('applications'):
          return state.apps.mockCreateAppResponse;
        case params.url.includes('default/work'):
          return state.genericResourceList.mockedUpdateWorkResponse;
        case params.url.includes('/api/v1/namespaces/default/secrets') && _.get(params.json, 'metadata.name') === 'new-aws':
          return state.connectionApi.createCloudConnection;
        case params.url.includes('/api/v1/namespaces/hive/secrets') && _.get(params.json, 'metadata.name') === 'google':
          return state.connectionApi.createCloudConnectionError;
        case params.url.includes('/api/v1/namespaces') && _.get(params.json, 'metadata.name') === 'foo':
          return state.clusterImport.getNamespaceCreationResponse;
        case params.url.includes('/apis/project.openshift.io/v1/projectrequests') && _.get(params.json, 'metadata.name') === 'foo':
          return state.clusterImport.getNamespaceCreationResponse;
        case params.url.includes('/apis/agent.open-cluster-management.io/v1beta1/namespaces/foo/klusterletconfigs'):
          return state.clusterImport.getKlusterletConfigsResponse;
        case params.url.includes('/apis/clusterregistry.k8s.io/v1alpha1/namespaces/foo/clusters'):
          return state.clusterImport.getClusterResponse;
        default:
          return state.pods;
      }
    }
    switch (true) {
      case params.url.includes('/api/v1/namespaces/default/secrets/aws') && _.get(params.body, 'metadata.name') === 'aws':
        return state.connectionApi.editCloudConnection;
      case params.url.includes('/api/v1/namespaces/hive/secrets/google') && _.get(params.body, 'metadata.name') === 'google':
        return state.connectionApi.editCloudConnectionError;
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
      case params.url.includes('namespaces/kube-system/clusters/hub-cluster'):
        return { body: state.clustersByNamespace.kubeSystem.body.items[0] };
      case params.url.includes('namespaces/kube-system/clusters/new-cluster'):
        return { body: state.clustersByNamespace.kubeSystem.body.items[1] };
      case params.url.includes('namespaces/default/clusters/managed-cluster'):
        return { body: state.clustersByNamespace.default.body.items[0] };
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
      case params.url.includes('resourceviews/clusterversions'):
        return state.clusterVersions.mockClusterVersionsResponse;
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
      case params.url.includes('apis/mcm.ibm.com/v1alpha1'):
        return state.apiList.apiPath;
      case params.url.includes('/api/v1/namespaces/kube-system/pods/monitoring-prometheus-nodeexporter-n6h9b'):
        return state.genericResourceList.getResourceMock;
      case params.url.includes('/api/v1/namespaces/klusterlet'):
        return state.genericResourceList.updateResourceLocalMock;
      case params.url.includes('test-path-to-update-work'):
        return state.genericResourceList.mockedUpdatePollResponse;
      case params.url.includes(`secrets?${CONNECTION_LABEL_SELECTOR}`):
        return state.connectionApi.getCloudConnectionSecrets;
      case params.url.includes('v1alpha1/baremetalassets'):
        return state.bareMetalAssets;
      case params.url.includes('/api/v1/namespaces/foo/secrets/foo-import'):
        return state.clusterImport.getImportYamlSecret;
      case params.url.includes('/apis/hive.openshift.io/v1/clusterimagesets'):
        return state.clusterImageSets;
      case params.url.includes('/apis/hive.openshift.io/v1/namespaces/default/machinepools'):
        return state.machinePoolsByNamespace.default;
      case params.url.includes('/apis/hive.openshift.io/v1/namespaces/kube-system/machinepools'):
        return state.machinePoolsByNamespace.kubeSystem;
      default:
        return state.apiList.mockResponse;
    }
  };
}

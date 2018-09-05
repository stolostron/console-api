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
    clusters: require('./ClusterList').default,
    clusterStatus: require('./ClusterStatusList').default,
    repos: require('./ReposList').default,
    repoMutations: require('./RepoMutationsList').default,
    relMutations: require('./RelMutationList').default,
    pods: require('./PodList'),
    nodes: require('./NodeList'),
    namespace: require('./NamespaceList'),
    release: require('./RelsList'),
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
        case params.url.includes('default/helmrepos'):
          return state.repoMutations;
        case params.json.metadata.name.includes('test-weave-scope'):
          return state.relMutations;
        default:
          return state.pods;
      }
    }

    switch (true) {
      case params.url.includes('clusterstatuses'):
        return state.clusterStatus;
      case params.url.includes('cluster'):
        return state.clusters;
      case params.url.includes('default/helmrepos'):
        return state.repoMutations;
      case params.url.includes('helmrepos'):
        return state.repos;
      case params.url.includes('resourceviews/pods'):
        return state.pods.mockResponse;
      case params.url.includes('resourceviews/nodes'):
        return state.nodes.mockResponse;
      case params.url.includes('resourceviews/namespace'):
        return state.namespace.mockResponse;
      case params.url.includes('resourceviews/release'):
        return state.release.mockResponse;
      default:
        return state.clusters;
    }
  };
}

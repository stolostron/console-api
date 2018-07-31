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
    repos: require('./ReposList').default,
  };

  return async function MockLib(params) {
    switch (true) {
      case params.url.includes('cluster'):
        return state.clusters;
      case params.url.includes('helmrepos'):
        return state.repos;
      default:
        return state.clusters;
    }
  };
}

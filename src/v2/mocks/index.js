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
  };

  return async function MockLib() {
    // TODO: add switch case for different routes/behavior
    return state.clusters;
  };
}

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import * as hcmClient from './lib/hcm-client';

export const clusters = (obj, args, req) => hcmClient.getClusters(req);
export const repos = (obj, args, req) => hcmClient.getRepos(req);
export const pods = (obj, args, req) => hcmClient.getWork(req, 'pods');
export const nodes = (obj, args, req) => hcmClient.getWork(req, 'nodes', {
  Work: { Namespaces: '', Status: '', Labels: '' },
});
export const pvs = (obj, args, req) => hcmClient.getWork(req, 'pvs');
export const namespaces = (obj, args, req) => hcmClient.getWork(req, 'namespaces', {
  Work: { Namespaces: '', Status: 'all', Labels: '' },
});
export const releases = (obj, args, req) => hcmClient.getWork(req, 'helmrels');

export const charts = async (obj, args, req) => {
  const helmRepos = await hcmClient.getRepos(req);
  const catalog = await Promise.all(helmRepos.map(repo => hcmClient.search(req, 'repo', repo.Name)));

  const helmCharts = _.flatten(catalog.map(chart => Object.values(chart)));
  return _.sortBy(helmCharts, chart => `${chart.RepoName}/${chart.Name}`);
};

export { getTopology, deleteHelmRelease, installHelmChart, setRepo, deleteHelmRepository } from './lib/hcm-client';

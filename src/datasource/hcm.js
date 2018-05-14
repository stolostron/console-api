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

export const clusters = () => hcmClient.getClusters();
export const repos = () => hcmClient.getRepos();
export const pods = () => hcmClient.getWork('pods');
export const nodes = () => hcmClient.getWork('nodes', {
  Work: { Namespaces: '', Status: '', Labels: '' },
});
export const pvs = () => hcmClient.getWork('pvs');
export const namespaces = () => hcmClient.getWork('namespaces', {
  Work: { Namespaces: '', Status: 'all', Labels: '' },
});
export const releases = () => hcmClient.getWork('helmrels');

export const charts = async () => {
  const helmRepos = await hcmClient.getRepos();
  const catalog = await Promise.all(helmRepos.map(repo => hcmClient.search('repo', repo.Name)));

  const helmCharts = _.flatten(catalog.map(chart => Object.values(chart)));
  return _.sortBy(helmCharts, chart => `${chart.RepoName}/${chart.Name}`);
};

export { installHelmChart, setRepo } from './lib/hcm-client';

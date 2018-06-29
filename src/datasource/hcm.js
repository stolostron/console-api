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
import { transformFilters } from '../schema/modules/filter-type';

export const clusters = async (obj, args, { hcmConnector, req }) => {
  const response = await hcmConnector.processRequest(
    req,
    '/api/v1alpha1/clusters',
    transformFilters(args),
  );
  return response ? Object.values(response) : [];
};

export const repos = async (obj, args, { hcmConnector, req }) => {
  const response = await hcmConnector.processRequest(
    req,
    '/api/v1alpha1/repos/*',
    { json: { Resource: 'repo', Operation: 'get' } },
  );
  return response ? Object.values(response) : [];
};

export const applications = async (obj, args, { hcmConnector, req }) => {
  const response = await hcmConnector.processRequest(
    req,
    '/api/v1alpha1/applications',
    { json: { Action: { Names: '*' } } },
  );
  return response ? Object.values(response) : [];
};

export const pods = (obj, args, { req }) => hcmClient.getWork(req, 'pods', { DstClusters: transformFilters(args) });
export const nodes = (obj, args, { req }) => hcmClient.getWork(req, 'nodes', {
  Work: { Namespaces: '', Status: '', Labels: '' },
});
export const pvs = (obj, args, { req }) => hcmClient.getWork(req, 'pvs');
export const namespaces = (obj, args, { req }) => hcmClient.getWork(req, 'namespaces', {
  Work: { Namespaces: '', Status: 'all', Labels: '' },
});
export const releases = (obj, args, { req }) => hcmClient.getWork(req, 'helmrels', {
  Work: { Namespaces: '', Status: ['DEPLOYED', 'FAILED'], Labels: '' }, DstClusters: transformFilters(args),
});

export const charts = async (obj, args, { req }) => {
  const helmRepos = await hcmClient.getRepos(req);
  const catalog = await Promise.all(helmRepos.map(repo => hcmClient.search(req, 'repo', repo.Name)));

  const helmCharts = _.flatten(catalog.map(chart => Object.values(chart)));
  return _.sortBy(helmCharts, chart => `${chart.RepoName}/${chart.Name}`);
};

export {
  createDashboard,
  deleteApplication,
  deleteHelmRelease,
  deleteHelmRepository,
  deployApplication,
  getTopology,
  installHelmChart,
  registerApplication,
  setRepo,
  undeployApplication,
} from './lib/hcm-client';

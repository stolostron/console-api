/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import request from './request';
import config from '../../../config';
import getToken from './util';
import { GenericError } from './errors';

const hcmUrl = config.get('hcmUrl');

const HCM_POLL_INTERVAL = config.get('hcmPollInterval') || 200;
const HCM_POLL_TIMEOUT = config.get('hcmPollTimeout') || 10000;

export const timeout = ms => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('Request Timed Out')), ms);
});

const mergeOpts = (defaultOpts, ...overrides) => Object.assign({}, defaultOpts, ...overrides);

const workDefaults = {
  SrcClusters: { Names: null, Labels: null, Status: null },
  DstClusters: { Names: ['*'], Labels: null, Status: ['healthy'] },
  ClientID: '',
  Dryrun: false,
  Completed: false,
  UUID: '',
  Operation: 'get',
  Work: { Namespaces: '', Status: 'healthy', Labels: '' },
  Timestamp: new Date(),
  NextRequest: null,
  FinishedRequest: null,
  Description: '',
};

const getWorkOptions = mergeOpts.bind(null, workDefaults);

const transformResource = (clusterName, resource, resourceName) => ({
  ...resource,
  name: resourceName,
  cluster: clusterName,
});

const transform = (clusterName, resources) =>
  _.reduce(
    resources,
    (transformed, resource, resourceName) => {
      transformed.push(transformResource(clusterName, resource, resourceName));
      return transformed;
    },
    [],
  );

const clustersToItems = clusterData =>
  _.reduce(
    clusterData,
    (accum, { Results: resources }, clusterName) => {
      // Transform all resources for the cluster
      if (resources.code) {
        accum.push(resources);
      } else {
        transform(clusterName, resources).forEach(resource => accum.push(resource));
      }

      return accum;
    },
    [],
  );

export async function getClusters(req) {
  const options = {
    url: `${hcmUrl}/api/v1alpha1/clusters`,
    headers: {
      Authorization: await getToken(req),
    },
    json: {},
    method: 'GET',
  };
  const result = await request(options).then(res => res.body);
  if (result.Error) {
    throw new GenericError({ data: result.Error });
  }
  if (result.RetString) {
    const clustersJSON = JSON.parse(result.RetString).Result;
    return clustersJSON ? Object.values(clustersJSON) : [];
  }
  return [];
}

export async function getRepos(req) {
  const options = {
    url: `${hcmUrl}/api/v1alpha1/repo/*`,
    headers: {
      Authorization: await getToken(req),
    },
    json: {
      Resource: 'repo',
      Operation: 'get',
    },
    method: 'GET',
  };
  const result = await request(options).then(res => res.body);
  const reposJSON = JSON.parse(result.RetString).Result;
  return reposJSON ? Object.values(reposJSON) : [];
}

export async function pollWork(req, httpOptions) {
  const result = await request(httpOptions).then(res => res.body);
  if (result.Error) {
    throw new GenericError({ data: result.Error });
  }
  const workID = result.RetString;

  let intervalID;
  const timeoutPromise = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearInterval(intervalID);
      clearTimeout(id);
      reject(new Error('Manager request timed out'));
    }, HCM_POLL_TIMEOUT);
  });

  const poll = new Promise(async (resolve) => {
    const pollOptions = {
      url: `${hcmUrl}/api/v1alpha1/work/${workID}`,
      headers: {
        Authorization: await getToken(req),
      },
      method: 'GET',
    };
    intervalID = setInterval(async () => {
      const workResult = await request(pollOptions)
        .then(res => res.body);
      const hcmBody = JSON.parse(workResult.RetString);
      if (hcmBody.Result.Completed) {
        clearInterval(intervalID);
        clearTimeout(timeoutPromise);
        const items = clustersToItems(hcmBody.Result.Results);
        resolve(items);
      }
    }, HCM_POLL_INTERVAL);
  });

  return Promise.race([timeoutPromise, poll]);
}

export async function getWork(req, type, opts) {
  const options = {
    url: `${hcmUrl}/api/v1alpha1/work`,
    headers: {
      Authorization: await getToken(req),
    },
    method: 'POST',
    json: getWorkOptions({ Resource: type }, opts),
  };
  // TODO: Allow users to pass a query string to filter the results
  // 04/06/18 10:48:55 sidney.wijngaarde1@ibm.com
  return pollWork(req, options);
}

export function installHelmChart(req, {
  RepoName, ChartName, DstClusters, Version, ReleaseName, Namespace, URL, Values,
}, opts) {
  const httpOptions = {
    url: `${hcmUrl}/api/v1alpha1/work`,
    method: 'POST',
    json: getWorkOptions({
      Resource: 'helmrels',
      Operation: 'install',
      DstClusters,
      Work: {
        ChartName: `${RepoName}/${ChartName}`,
        Namespace,
        ReleaseName,
        URL,
        Values,
        Version,
      },
    }, opts),
  };

  return pollWork(req, httpOptions);
}

export function deleteHelmRelease(req, {
  ChartName, DstClusters, Names, Namespaces, RepoName, Version,
}, opts) {
  const httpOptions = {
    url: `${hcmUrl}/api/v1alpha1/work`,
    method: 'POST',
    json: getWorkOptions({
      Resource: 'helmrels',
      Operation: 'delete',
      DstClusters,
      Work: {
        ChartName: RepoName && ChartName && `${RepoName}/${ChartName}`,
        Names,
        Namespaces,
        Version,
      },
    }, opts),
  };

  return pollWork(req, httpOptions);
}

export async function setRepo(req, { Name, URL }) {
  const httpOptions = {
    url: `${hcmUrl}/api/v1alpha1/repo`,
    headers: {
      Authorization: await getToken(req),
    },
    method: 'POST',
    json: getWorkOptions({
      Resource: 'repo',
      Operation: 'set',
      Action: { Name, URL },
    }),
  };
  const result = await request(httpOptions).then(res => res.body);
  return JSON.parse(result.RetString).Result;
}

export async function search(req, type, name, opts = {}) {
  const options = {
    url: `${hcmUrl}/api/v1alpha1/${type}/${name}`,
    headers: {
      Authorization: await getToken(req),
    },
    json: mergeOpts(
      {
        Names: ['*'],
        Labels: null,
        Status: ['healthy'],
        User: '',
        Resource: 'repo',
        Operation: 'search',
        ID: name,
        Action: {
          Name: name,
          URL: '',
        },
      },
      opts,
    ),
    method: 'GET',
  };

  return Promise.race([request(options)
    .then(res => JSON.parse(res.body.RetString).Result), timeout(HCM_POLL_TIMEOUT)]);
}

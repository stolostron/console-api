/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import request from 'requestretry';
import _ from 'lodash';
import config from '../../../config';

const hcmUrl = config.get('hcmUrl');

const HCM_POLL_INTERVAL = config.get('hcmPollInterval') || 200;
const HCM_POLL_TIMEOUT = config.get('hcmPollTimeout') || 10000;

const mergeOpts = (defaultOpts, ...overrides) => Object.assign({}, defaultOpts, ...overrides);

const getOptions = (...overrides) => {
  const defaults = {
    SrcClusters: {
      Names: null,
      Labels: null,
      Status: null,
    },
    DstClusters: {
      Names: ['*'],
      Labels: null,
      Status: ['healthy'],
    },
    ClientID: '',
    UUID: '',
    Operation: 'get',
    Work: {
      Names: '',
      Namespaces: '',
      Status: '',
      Labels: '',
      Image: '',
    },
    Timestamp: new Date(),
    NextRequest: null,
  };

  return Object.assign({}, defaults, ...overrides);
};

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
      transform(clusterName, resources).forEach(resource => accum.push(resource));

      return accum;
    },
    [],
  );

export async function getClusters() {
  const options = {
    url: `${hcmUrl}/api/v1alpha1/clusters`,
    json: {},
    method: 'GET',
  };
  const result = await request(options).then(res => res.body);
  const clustersJSON = JSON.parse(result.RetString).Result;
  return Object.values(clustersJSON);
}

export async function getWork(type) {
  const options = {
    url: `${hcmUrl}/api/v1alpha1/work`,
    method: 'POST',
  };
  // TODO: Allow users to pass a query string to filter the results
  // 04/06/18 10:48:55 sidney.wijngaarde1@ibm.com
  options.json = getOptions({ Resource: type });
  const result = await request(options).then(res => res.body);
  const workID = result.RetString;
  let intervalID;
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearInterval(intervalID);
      clearTimeout(id);
      reject(new Error('Manager request timed out'));
    }, HCM_POLL_TIMEOUT);
  });
  const poll = new Promise((resolve, reject) => {
    const pollOptions = {
      url: `${hcmUrl}/api/v1alpha1/work/${workID}`,
      method: 'GET',
    };
    intervalID = setInterval(async () => {
      const workResult = await request(pollOptions)
        .then(res => res.body)
        .catch(e => reject(e));
      const hcmBody = JSON.parse(JSON.parse(workResult).RetString);
      if (hcmBody.Result.Completed) {
        clearInterval(intervalID);
        clearTimeout(timeout);
        const items = clustersToItems(hcmBody.Result.Results);
        resolve(items);
      }
    }, HCM_POLL_INTERVAL);
  });

  return Promise.race([timeout, poll])
    .then(res => res)
    .catch(e => console.error(e));
}

export async function search(type, name, opts = {}) {
  const options = {
    url: `${hcmUrl}/api/v1alpha1/${type}/${name}`,
    json: mergeOpts(
      {
        Names: ['*'],
        Labels: null,
        Status: ['healthy'],
        User: '',
        Resource: 'repo',
        Operation: 'search',
        ID: 'default',
        Action: {
          Name: 'default',
          URL: '',
        },
      },
      opts,
    ),
    method: 'GET',
  };

  const result = await request(options).then(res => res.body);
  const charts = JSON.parse(result.RetString).Result;
  return Object.values(charts);
}

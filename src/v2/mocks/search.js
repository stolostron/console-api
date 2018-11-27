/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import casual from 'casual';

const resourceTemplate = {
  cluster: id => ({
    kind: 'cluster',
    name: `mock-cluster${id > 0 ? `-${id}` : ''}`,
    namespace: 'mock-mcm-cluster',
    status: casual.random_element(['ok']),
    endpoint: '',
    nodes: casual.integer(1, 32),
    cpu: `${casual.integer(0, 100)}%`,
    memory: `${casual.integer(0, 100)}%`,
    storage: `${casual.integer(0, 100)}%`,
  }),
  node: (id = 0) => ({
    kind: 'node',
    name: `mock-1.1.1.${id}`,
    cpus: casual.integer(1, 32),
    role: casual.random_element(['master', 'worker', 'management', 'proxy, management, master']),
  }),
  pod: id => ({
    kind: 'pod',
    name: `mock-cluster${id > 0 ? `-${id}` : ''}`,
    namespace: 'kube-system',
    restarts: casual.integer(0, 100),
    creationTimestamp: '2018-09-27 16:52:20 -0400 EDT',
    status: casual.random_element(['Failed', 'Pending', 'Running', 'Succeeded']),
    hostIP: casual.ip,
    podIP: casual.ip,
  }),
};

// export function repeat(map, count) {
//   return new Array(count).fill(0).map(map);
// }

export const mockSearchResult = {
  /**
   * Mock search results.
   *
   * Pass the kind and amount of objects to mock.
   * For example, to mock a search that returns 2 clusters and 5 pods:
   *    { cluster: 2, pod:5 }
   */
  mock: (args) => {
    const headers = new Set();
    const mockResult = [];
    // Get headers
    Object.keys(args).forEach((kind) => {
      Object.keys(resourceTemplate[kind]).forEach(h => headers.add(h));
    });
    const baseResult = {};
    headers.forEach((header) => { baseResult[header] = 'NULL'; });

    // Get items
    Object.keys(args).forEach((kind) => {
      for (let i = 0; i < args[kind]; i += 1) {
        const mockItem = { ...baseResult, ...resourceTemplate[kind](i) };
        mockResult.push(mockItem);
      }
    });

    return {
      headers,
      items: mockResult,
      relatedResources: [
        {
          kind: 'application',
          count: casual.integer(1, 5),
        },
        {
          kind: 'cluster',
          count: casual.integer(1, 5),
        },
        {
          kind: 'deployment',
          count: casual.integer(1, 20),
        },
        {
          kind: 'pod',
          count: casual.integer(1, 1500),
        },
      ],
    };
  },
};

export default mockSearchResult;

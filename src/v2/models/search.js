/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import mockSearch from '../mocks/search';
import logger from '../lib/logger';

/* eslint-disable class-methods-use-this */
export default class SearchModel {
  async multiSearch({ input }) {
    return Promise.all(input.map(i => this.search(i)));
  }

  async search({
    keywords = [''],
    filters = [],
    relation,
    count = false,
  }) {
    logger.info('Search keywords: ', keywords);
    logger.info('Search filters:', filters);
    logger.info('Search relation:', relation);

    logger.warn('Search: Returning mocked results!');

    const result = {
      // contains "items" and "headers"
      ...mockSearch.mock({ cluster: 2, node: 3, pod: 23 }),
      related: mockSearch.mock({ cluster: 1 }).relatedResources,
    };

    if (count) {
      result.items = result.items.length;
    }

    return result;
  }

  async searchComplete({ property }) {
    logger.warn('SearchComplete: Returning mocked results!');
    const mockNames = ['cluster-name-1', 'cluster-name-2', 'pod-name-1', 'node-name-1', 'abc', 'def', 'ghi'];

    if (property) {
      return mockNames.filter(r => r.indexOf(property) === 0);
    }

    return mockNames;
  }

  async searchSchema() {
    logger.warn('SearchSchema: Returning mocked results!');
    return {
      allKinds: [
        'application',
        'cluster',
        'deployable',
        'deployment',
        'namespace',
        'node',
        'placementpolicy',
        'pod',
        'replicaset',
      ],
      allFields: [
        'name',
        'namespace',
        'status',
        'cpu',
        'memory',
        'storage',
        'hostIP',
        'podIP',
        'restarts',
      ],
      resourceSchema: {
        cluster: {
          fields: ['name', 'namespace', 'status', 'nodes', 'cpu', 'memory', 'storage'],
        },
        deployable: {
          fields: ['name', 'namespace'],
        },
        deployment: {
          fields: ['name', 'namespace'],
        },
        namespace: {
          fields: ['name'],
        },
        node: {
          fields: ['name', 'status', 'cpu', 'memory', 'storage'],
        },
        placementpolicy: {
          fields: ['name', 'namespace'],
        },
        pod: {
          fields: [
            'name',
            'namespace',
            'status',
            'podIP',
            'hostIP',
            'creationTimestamp',
            'restarts',
          ],
        },
        replicaset: {
          fields: ['name', 'namespace'],
        },
      },
    };
  }
}

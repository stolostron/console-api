/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import casual from 'casual';
import mockSearch from '../mocks/search';
import logger from '../lib/logger';

/* eslint-disable class-methods-use-this */
export default class SearchModel {
  async multiSearch({ input }) {
    return input.map((i) => {
      logger.info('Search keywords: ', i.keywords);
      logger.info('Search filters:', i.filters);
      logger.info('Search relation:', i.relation);

      logger.warn('!!! Search Returning mocked results !!!');
      return i;
    });
  }

  async resolveSearch() {
    logger.warn('Resolving search count. RETURNING MOCK RESULTS.');
    return mockSearch.mock({ cluster: 2, node: 3, pod: 23 });
  }

  async resolveSearchCount() {
    logger.warn('Resolving search query. RETURNING MOCK RESULTS.');
    return casual.integer(0, 1100);
  }

  async resolveRelated() {
    logger.warn('Resolving search related resources query. RETURNING MOCK RESULTS.');
    return mockSearch.mock({ cluster: 1 }).relatedResources;
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

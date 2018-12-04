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
  async search({ keywords = [''], filters = [] }) {
    logger.info('Search keywords: ', keywords);
    logger.info('Search filters:', filters);

    logger.warn('Search: Returning mocked results!');
    return mockSearch.mock({
      cluster: 2,
      node: 3,
      pod: 23,
    });
  }

  async searchComplete({ field, matchText }) {
    logger.warn('SearchComplete: Returning mocked results!');
    const mockNames = ['cluster-name-1', 'cluster-name-2', 'pod-name-1', 'node-name-1'];
    const mockOther = ['abc', 'def', 'ghi'];
    if (field === 'name') {
      return matchText === '' ? mockNames : mockNames.filter(r => r.indexOf(matchText) === 0);
    }
    if (field === 'namespace') {
      return matchText === '' ? mockOther : mockOther.filter(r => r.indexOf(matchText) === 0);
    }
    if (field === 'status') {
      return matchText === '' ? mockOther : mockOther.filter(r => r.indexOf(matchText) === 0);
    }
    return [];
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
          fields: ['name', 'namespace', 'status', 'podIP', 'hostIP', 'creationTimestamp', 'restarts'],
        },
        replicaset: {
          fields: ['name', 'namespace'],
        },
      },
    };
  }
}

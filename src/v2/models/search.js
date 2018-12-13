/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import logger from '../lib/logger';
import { isRequired } from '../lib/utils';

/* eslint-disable class-methods-use-this */
export default class SearchModel {
  constructor({ searchConnector = isRequired('searchConnector') }) {
    this.searchConnector = searchConnector;
  }

  async multiSearch({ input }) {
    return input.map((i) => {
      logger.info('Running search with input:\n\t', i);

      return i;
    });
  }

  async resolveSearch(parent) {
    return this.searchConnector.runSearchQuery(parent.filters);
  }

  async resolveSearchCount(parent) {
    return this.searchConnector.runSearchQueryCountOnly(parent.filters);
  }

  async resolveSearchComplete({ property }) {
    return this.searchConnector.getAllValues(property);
  }

  async resolveRelated() {
    logger.warn('TODO: Resolving search related resources query. RETURNING MOCK RESULTS.');
    return [
      {
        kind: 'cluster',
        count: 5,
      },
      {
        kind: 'application',
        count: 3,
      },
    ];
  }


  async searchSchema() {
    return {
      allProperties: await this.searchConnector.getAllProperties(),
      allFields: await this.searchConnector.getAllProperties(), // TODO: Deprecated, remove
    };
  }
}

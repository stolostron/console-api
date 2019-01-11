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

export default class SearchModel {
  constructor({ searchConnector = isRequired('searchConnector') }) {
    this.searchConnector = searchConnector;
  }

  async getUpdatedTimestamp() {
    return this.searchConnector.getLastUpdatedTimestamp();
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

  /* eslint-disable class-methods-use-this */
  async resolveRelatedResources() {
    logger.warn('Ignoring related resources query. This feature is not implemented yet.');
    return [];
  //   return [
  //     {
  //       kind: 'cluster',
  //       count: 5,
  //     },
  //     {
  //       kind: 'application',
  //       count: 3,
  //     },
  //   ];
  }

  async searchSchema() {
    return {
      allProperties: await this.searchConnector.getAllProperties(),
    };
  }
}

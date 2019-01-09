/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import gremlin from 'gremlin';
import config from '../../../config';
import logger from '../lib/logger';

// TODO: Need a better solution to handle this connection error, using this ugly
//      workaround for now because the gremlin client doesn't expose the websocket connection.
process.on('uncaughtException', (e) => {
  const gremlinEndpoint = config.get('gremlinEndpoint');
  if (e.errno === 'ECONNREFUSED' && gremlinEndpoint.indexOf(e.port) > -1) {
    logger.error(`Error initializing connection to Gremlin server at: ${gremlinEndpoint}. Search queries won't work.`);
  } else {
    throw e;
  }
});

function formatResult(result) {
  const resultObjects = [];
  result.forEach((resource) => {
    const resourceObj = {};
    resource.forEach((value, key) => {
      resourceObj[key] = value.length === 1 ? value[0] : value;
    });
    resultObjects.push(resourceObj);
  });
  return resultObjects;
}
export default class SearchConnector {
  constructor({
    gremlinEndpoint = config.get('gremlinEndpoint'),
  } = {}) {
    this.gremlinEndpoint = gremlinEndpoint;

    this.remoteConnection = new gremlin.driver.DriverRemoteConnection(this.gremlinEndpoint);
    this.graph = new gremlin.structure.Graph();
    this.g = this.graph.traversal().withRemote(this.remoteConnection);

    this.gremlinClient = new gremlin.driver.Client(gremlinEndpoint, {});
    this.gremlinClient.open();
    this.gremlinClient.submit('graph = TinkerGraph.open()');
  }

  async runSearchQuery(searchProperties) {
    logger.debug('Running search', searchProperties);
    await this.gremlinClient.submit(`graph.variables().set('lastActivityTimestamp', ['${Date.now()}'])`);

    const v = this.g.V();
    searchProperties.forEach(searchProp => v.has(searchProp.property, searchProp.values[0]));
    return v.valueMap().toList().then(result => formatResult(result));
  }

  async runSearchQueryCountOnly(searchProperties) {
    logger.debug('Running search (count only)', searchProperties);

    const v = this.g.V();
    searchProperties.forEach(searchProp => v.has(searchProp.property, searchProp.values[0]));
    return v.count().next().then(result => result.value);
  }

  async getAllProperties() {
    // TODO: Maybe there's a more efficient query.
    const properties = await this.g.V().properties().dedup().toList();
    const values = new Set();
    properties.forEach((prop) => {
      values.add(prop.label);
    });

    return [...values].filter(item => item.charAt(0) !== '_');
  }

  async getAllValues(property) {
    logger.debug('Getting all values for property:', property);

    // TODO: Need to use a more efficient query.
    const resultValues = [];
    await this.g.V().valueMap(property).dedup().toList()
      .then((result) => {
        result.forEach((valueMap) => {
          const values = valueMap.get(property) || [];
          values.forEach(value => resultValues.push(value));
        });
      });

    return resultValues;
  }
}

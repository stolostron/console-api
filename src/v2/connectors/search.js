/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import gremlin from 'gremlin';
import config from '../../../config';
import logger from '../lib/logger';
import requestLib from '../lib/request';
import { isRequired } from '../lib/utils';
import getGremlinCredentials from './gremlinConnectionHelper';

const { P } = gremlin.process;

// TODO: Need a better solution to handle this connection error, using this ugly
//      workaround for now because the gremlin client doesn't expose the websocket connection.
process.on('uncaughtException', (e) => {
  const gremlinEndpoint = config.get('gremlinEndpoint');
  if (e.errno === 'ECONNREFUSED' && gremlinEndpoint.indexOf(e.port) > -1) {
    logger.error(`Error initializing connection to Gremlin server at: ${gremlinEndpoint}. Search queries won't work.`);
    gremlinConnection = undefined; // eslint-disable-line no-use-before-define
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

function getForbiddenKindsForRole(role) {
  switch (role.toLowerCase()) {
    case 'viewer':
    case 'editor':
      return ['compliance', 'policy', 'node', 'placementpolicy', 'placementbinding', 'persistentvolume', 'persistentvolumeclaim', 'secret'];
    case 'operator':
      return ['node', 'persistentvolume', 'persistentvolumeclaim', 'secret'];
    case 'administrator':
    case 'clusteradministrator':
      return [];
    default:
      return ['compliance', 'policy', 'node', 'placementpolicy', 'placementbinding', 'persistentvolume', 'persistentvolumeclaim', 'secret'];
  }
}

let gremlinConnection;
const initializeGremlinConnection = () => new Promise(async (resolve, reject) => {
  const { gremlinEndpoint, connOpts } = getGremlinCredentials();

  try {
    const gremlinClient = new gremlin.driver.Client(gremlinEndpoint, connOpts);
    await gremlinClient.open();
    await gremlinClient.submit('graph = TinkerGraph.open()');

    const remoteConnection = new gremlin.driver.DriverRemoteConnection(gremlinEndpoint, connOpts);
    const graph = new gremlin.structure.Graph();
    const g = graph.traversal().withRemote(remoteConnection);
    await g.V().limit(1).toList(); // Send request to force authentication.
    logger.info(`Initialized connection to gremlin server at: ${gremlinEndpoint}`);

    resolve({ gremlinClient, remoteConnection, g });
  } catch (e) {
    logger.error('Error initializing connection to gremlin server.', e);
    reject(e);
  }
});
const getValidatedConnection = () => new Promise(async (resolve, reject) => {
  try {
    if (gremlinConnection === undefined) {
      logger.info('Initializing new gremlin connection.');
      gremlinConnection = initializeGremlinConnection();
    }

    let connection = await Promise.race([gremlinConnection, new Promise(r => setTimeout(r, 5000))]);
    if (connection === undefined) {
      logger.error('Timed out waiting for connection to gremlin server.');
      reject(new Error('Timed out waiting for connection to gremlin server.'));
    }
    // eslint-disable-next-line no-underscore-dangle
    if (connection.gremlinClient._connection._ws._finalized ||
      connection.remoteConnection._ws._finalized) { // eslint-disable-line no-underscore-dangle
      logger.info('Gremlin server connection was finalized. Initializing new connection.');
      gremlinConnection = initializeGremlinConnection();
      connection = await gremlinConnection;
    }
    resolve(connection);
  } catch (e) {
    logger.info('Error validating gremlin connection.', e);
    reject(e);
  }
});

export default class SearchConnector {
  constructor({
    httpLib = requestLib,
    rbac = isRequired('rbac'),
    req = isRequired('req'),
  } = {}) {
    this.rbac = rbac;
    this.http = httpLib;
    this.req = req;
  }

  async getUserRole(req) {
    const iamToken = _.get(req, "cookies['cfc-access-token-cookie']") || config.get('cfc-access-token-cookie');
    const defaults = {
      url: `${config.get('cfcRouterUrl')}/idmgmt/identity/api/v1/users/${req.user.name}/getHighestRole`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${iamToken}`,
      },
    };
    return this.http(defaults).then((res) => {
      this.role = res.body;
    });
  }

  async initialize() {
    if (!this.initializePromise) {
      this.initializePromise = new Promise(async (resolve) => {
        if (gremlinConnection === undefined) {
          gremlinConnection = initializeGremlinConnection();
        }
        const [connection] = await Promise.all([
          getValidatedConnection(), this.getUserRole(this.req)]);
        this.gremlinClient = connection.gremlinClient;
        this.remoteConnection = connection.remoteConnection;
        this.g = connection.g;
        resolve();
      });
    }
    return this.initializePromise;
  }


  async getLastUpdatedTimestamp() {
    await this.initialize();
    try {
      const lastUpdated = await this.gremlinClient.submit("graph.variables().get('lastUpdatedTimestamp').get()");
      return lastUpdated.traversers[0];
    } catch (e) {
      return 0;
    }
  }

  async runSearchQuery(searchProperties) {
    logger.debug('Running search', searchProperties);
    await this.initialize();
    this.gremlinClient.submit(`graph.variables().set('lastActivityTimestamp', ['${Date.now()}'])`);

    const v = this.g.V().has('_rbac', P.within(this.rbac)).has('kind', P.without(getForbiddenKindsForRole(this.role)));
    searchProperties.forEach(searchProp => v.has(searchProp.property, P.within(searchProp.values)));

    return v.valueMap().toList().then(result => formatResult(result));
  }

  async runSearchQueryCountOnly(searchProperties) {
    logger.debug('Running search (count only)', searchProperties);
    await this.initialize();

    const v = this.g.V().has('_rbac', P.within(this.rbac)).has('kind', P.without(getForbiddenKindsForRole(this.role)));
    searchProperties.forEach(searchProp => v.has(searchProp.property, P.within(searchProp.values)));

    return v.count().next().then(result => result.value);
  }

  async getAllProperties() {
    // TODO: Maybe there's a more efficient query.
    await this.initialize();

    const v = this.g.V().has('_rbac', P.within(this.rbac)).has('kind', P.without(getForbiddenKindsForRole(this.role)));
    const properties = await v.properties().dedup().toList();

    const values = new Set(['kind', 'name', 'namespace', 'status']); // Add these first so they show at the top.
    properties.forEach(({ label }) => {
      if (label.charAt(0) !== '_') {
        values.add(label);
      }
    });

    return [...values];
  }

  async getAllValues(property, propFilters = []) {
    logger.debug('Getting all values for property:', property);
    await this.initialize();
    // TODO: Need to use a more efficient query.
    const resultValues = [];
    const v = this.g.V().has('_rbac', P.within(this.rbac)).has('kind', P.without(getForbiddenKindsForRole(this.role)));
    propFilters.forEach(propFilter => v.has(propFilter.property, P.within(propFilter.values)));

    await v.valueMap(property).dedup().toList()
      .then((result) => {
        result.forEach((valueMap) => {
          const values = valueMap.get(property) || [];
          values.forEach(value => resultValues.push(value));
        });
      });

    return resultValues;
  }


  async findRelationships({ countOnly, kind, filters }) {
    await this.initialize();

    const v = this.g.V().has('_rbac', P.within(this.rbac)).has('kind', P.without(getForbiddenKindsForRole(this.role)));
    filters.forEach(searchProp => v.has(searchProp.property, P.within(searchProp.values)));
    v.out(kind).dedup();

    if (countOnly) {
      return v.count().next().then(result => result.value);
    }

    return v.valueMap().toList()
      .then(result => formatResult(result));
  }
}

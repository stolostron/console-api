/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import { RedisGraph } from 'redisgraph.js';
import config from '../../../config';
import logger from '../lib/logger';
import requestLib from '../lib/request';
import { isRequired } from '../lib/utils';

let lastActivityReported = 0;

// FIXME: Is there a more efficient way?
function formatResult(results) {
  const startTime = Date.now();
  const resultList = [];
  while (results.hasNext()) {
    const resultItem = {};
    const record = results.next();
    record.keys().forEach((key) => {
      if (record.get(key) !== 'NULL') {
        resultItem[key.substr(key.indexOf('.') + 1)] = record.get(key);
      }
    });
    resultList.push(resultItem);
  }

  if (Date.now() - startTime > 100) {
    logger.warn(`Search formatResult() took ${Date.now() - startTime} ms. Result set size: ${results.length}`);
  }
  return resultList;
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

function getFilterString(filters) {
  const filterStrings = [];
  filters.forEach((filter) => {
    // Use OR for filters with multiple values.
    filterStrings.push(`(${filter.values.map(value => `n.${filter.property} = '${value}'`).join(' OR ')})`);
  });
  const resultString = filterStrings.join(' AND ');
  return resultString;
}


export default class RedisGraphConnector {
  constructor({
    httpLib = requestLib,
    rbac = isRequired('rbac'),
    req = isRequired('req'),
  } = {}) {
    this.rbac = rbac;
    this.http = httpLib;
    this.req = req;

    this.status = new RedisGraph('status'); // Used to track lastUpdated and lastActivity. // TODO: use plain Redis
    this.g = new RedisGraph('mcm-search');
    this.initialize().then(() => logger.debug('Redisgraph initialization complete.'));
  }

  async initialize() {
    try {
      const status = await this.status.query('MATCH (status:status) RETURN status');
      if (!status.hasNext()) {
        logger.info('Status db existed but was empty. Adding status record.');
        this.status.query(`CREATE (status:status {lastUpdatedTimestamp: 0, lastActivityTimestamp: ${Date.now()}})`);
      }
    } catch (e) {
      logger.info('Status db did not exist. Initializing.');
      await this.status.query(`CREATE (status:status {lastUpdatedTimestamp: 0, lastActivityTimestamp: ${Date.now()}})`);
    }
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


  async getRbacString(objAliases = ['n']) {
    await this.getUserRole(this.req); // TODO: should execute in initialize(); should cache result.

    const namespaceStrings = [];
    const roleStrings = [];

    objAliases.forEach((alias) => {
      this.rbac.forEach(namespace => namespaceStrings.push(`${alias}._rbac = '${namespace}'`));
      getForbiddenKindsForRole(this.role).forEach(forbiddenKind => roleStrings.push(`${alias}.kind != '${forbiddenKind}'`));
    });

    const rbacFilter = (roleStrings.length > 0) ?
      `((${namespaceStrings.join(' OR ')}) AND ${roleStrings.join(' OR ')})`
      : `(${namespaceStrings.join(' OR ')})`;

    return rbacFilter;
  }

  setLastActivityTimestamp() {
    // Skip is avtivity was reported within the last second.
    if (Date.now() > (lastActivityReported + 1000)) {
      lastActivityReported = Date.now();
      this.status.query(`MATCH (s:status) SET s.lastActivityTimestamp = '${Date.now()}'`);
    }
  }

  async getLastUpdatedTimestamp() {
    const res = await this.status.query('MATCH (s:status) RETURN s.lastUpdatedTimestamp');
    const t = res.next();
    if (t === undefined) {
      await this.status.query(`MATCH (s:status) SET s.lastUpdatedTimestamp = '${Date.now()}'`);
      return 0;
    }

    return t.getString('s.lastUpdatedTimestamp');
  }


  async runSearchQuery(filters) {
    // logger.info('runSearchQuery()', filters);

    const result = await this.g.query(`MATCH (n) WHERE ${getFilterString(filters)} AND (${await this.getRbacString()}) RETURN n`);
    this.setLastActivityTimestamp();
    return formatResult(result);
  }

  async runSearchQueryCountOnly(filters) {
    // logger.info('runSearchQueryCountOnly()', filters);

    const result = await this.g.query(`MATCH (n) WHERE ${getFilterString(filters)} AND (${await this.getRbacString()}) RETURN count(n)`);
    this.setLastActivityTimestamp();
    if (result.hasNext() === true) {
      return result.next().get('count(n)');
    }
    return 0;
  }

  async getAllProperties() {
    // logger.info('Getting all properties');
    const result = await this.g.query(`MATCH (n) WHERE ${await this.getRbacString()} RETURN n LIMIT 1`);
    this.setLastActivityTimestamp();

    const values = new Set(['kind', 'name', 'namespace', 'status']); // Add these first so they show at the top.
    result._header.forEach((property) => {
      const label = property.substr(property.indexOf('.') + 1);
      if (label.charAt(0) !== '_' && label.indexOf('label__') === -1) {
        values.add(label);
      }
    });

    return [...values];
  }

  async getAllValues(property, filters = []) {
    // logger.info('Getting all values for property:', property, filters);

    if (property === '') {
      logger.warn('getAllValues() called with empty value. Most likely this was an unecessary API call.');
      return Promise.resolve([]);
    }
    const result = filters.length > 0 ?
      await this.g.query(`MATCH (n) WHERE ${getFilterString(filters)} AND (${await this.getRbacString()}) RETURN DISTINCT n.${property}`)
      :
      await this.g.query(`MATCH (n) WHERE ${await this.getRbacString()} RETURN DISTINCT n.${property}`);

    const valuesList = [];
    result._results.forEach((record) => {
      if (record.values()[0] !== 'NULL') {
        valuesList.push(record.values()[0]);
      }
    });

    return valuesList;
  }


  async findRelationships({ filters = [] } = {}) {
    // logger.info('findRelationships()', filters);

    const result = await this.g.query(`MATCH (n)-[]->(r) WHERE ${getFilterString(filters)} AND (${await this.getRbacString()}) RETURN DISTINCT r`);
    return formatResult(result);
  }
}

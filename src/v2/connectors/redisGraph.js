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
import redis from 'redis';
import { RedisGraph } from 'redisgraph.js';
import moment from 'moment';
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
      if (record.get(key) !== null) {
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

export function getForbiddenKindsForRole(role) {
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

const isNumber = value => !Number.isNaN(value * 1);
// TODO: Zack L - Need to come back to this once number values with units are normalized
// const isNumWithChars = (value) => {
//   if (!isNumber(value) && !Number.isNaN(parseInt(value, 10))) {
// eslint-disable-next-line
//     return ['Ei', 'Pi', 'Ti', 'Gi', 'Mi', 'Ki'].findIndex(unit => unit === value.substring(value.length - 2, value.length)) > -1;
//   }
//   return false;
// };
const isDate = value => !isNumber(value) && moment(value, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid();
const isDateFilter = value => ['hour', 'day', 'week', 'month', 'year'].indexOf(value) > -1;
// const isVersion = property.toLowerCase().includes('version');

export function getOperator(value) {
  const match = value.match(/^<=|^>=|^!=|^!|^<|^>|^=]/);
  let operator = (match && match[0]) || '=';
  if (operator === '!') {
    operator = '!=';
  }
  return operator;
}

export function getDateFilter(value) {
  const currentTime = Date.now();
  switch (true) {
    case value === 'hour':
      return `> '${new Date(currentTime - 3600000).toISOString()}'`;
    case value === 'day':
      return `> '${new Date(currentTime - 86400000).toISOString()}'`;
    case value === 'week':
      return `> '${new Date(currentTime - 604800000).toISOString()}'`;
    case value === 'month':
      return `> '${new Date(currentTime - 2629743000).toISOString()}'`;
    case value === 'year':
      return `> '${new Date(currentTime - 31556926000).toISOString()}'`;
    default:
      // default to month
      return `> '${new Date(currentTime - 2629743000).toISOString()}'`;
  }
}

export function getFilterString(filters) {
  const filterStrings = [];
  filters.forEach((filter) => {
    // Use OR for filters with multiple values.
    filterStrings.push(`(${filter.values.map((value) => {
      const operatorRemoved = value.replace(/^<=|^>=|^!=|^!|^<|^>|^=]/, '');
      if (isNumber(operatorRemoved)) { //  || isNumWithChars(operatorRemoved)
        return `n.${filter.property} ${getOperator(value)} ${operatorRemoved}`;
      } else if (isDateFilter(value)) {
        return `n.${filter.property} ${getDateFilter(value)}`;
      }
      return `n.${filter.property} ${getOperator(value)} '${operatorRemoved}'`;
    }).join(' OR ')})`);
  });
  const resultString = filterStrings.join(' AND ');
  return resultString;
}

let redisClient;
let redisReady = false;
function getRedisClient() {
  if (redisClient) {
    return redisClient;
  }

  if (config.get('redisPassword') === '') {
    logger.warn('Starting redis client without authentication. redisPassword was not provided in config.');
    redisClient = redis.createClient(config.get('redisEndpoint'));
  } else {
    redisClient = redis.createClient(config.get('redisEndpoint'), { password: config.get('redisPassword') });
  }

  // If we encounter an error we'll quit the client, the next request will attempt to reconnect.
  redisClient.on('error', (error) => {
    logger.info('Error with Redis connection: ', error);
    redisReady = false;
    redisClient = undefined;
  });

  // Initialization can happen asynchronously.
  redisClient.get('lastUpdatedTimestamp', (err, reply) => {
    if (err) {
      logger.error('Error initializing Redis client.');
      return;
    }
    if (reply == null) {
      logger.info('Status db did not exist. Initializing it.');
      redisClient.set('lastUpdatedTimestamp', 0);
      redisClient.set('lastActivityTimestamp', 0);
    }
    redisReady = true;
  });
  return redisClient;
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

    this.redisClient = getRedisClient();
    this.redisReady = redisReady;
    this.g = new RedisGraph('icp-search', this.redisClient);
  }

  isServiceAvailable() {
    return this.redisReady;
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
      this.redisClient.set('lastActivityTimestamp', Date.now());
    }
  }

  async getLastUpdatedTimestamp() {
    return new Promise((resolve) => {
      this.redisClient.get('lastUpdatedTimestamp', (err, reply) => {
        if (reply == null) {
          this.redisClient.set('lastUpdatedTimestamp', 0);
          resolve(0);
        } else {
          resolve(reply);
        }
      });
    });
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

    let valuesList = [];
    result._results.forEach((record) => {
      if (record.values()[0] !== 'NULL' && record.values()[0] !== null) {
        valuesList.push(record.values()[0]);
      }
    });

    if (isDate(valuesList[0])) {
      return ['isDate'];
    } else if (isNumber(valuesList[0])) { //  || isNumWithChars(valuesList[0]))
      valuesList = valuesList.filter(res => (isNumber(res) || (!isNumber(res))) && res !== ''); //  && isNumWithChars(res)
      valuesList.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      if (valuesList.length > 1) {
        return ['isNumber', valuesList[0], valuesList[valuesList.length - 1]];
      } else if (valuesList.length === 1) {
        return ['isNumber', valuesList[0]];
      }
    }
    return valuesList;
  }


  async findRelationships({ filters = [] } = {}) {
    // logger.info('findRelationships()', filters);

    const result = await this.g.query(`MATCH (n)-[]->(r) WHERE ${getFilterString(filters)} AND (${await this.getRbacString()}) RETURN DISTINCT r`);
    return formatResult(result);
  }
}

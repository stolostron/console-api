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
import fs from 'fs';
import redis from 'redis';
import lru from 'lru-cache';
import { RedisGraph } from 'redisgraph.js';
import moment from 'moment';
import config from '../../../config';
import logger from '../lib/logger';
import requestLib from '../lib/request';
import { isRequired } from '../lib/utils';

let lastActivityReported = 0;
let isOpenshift = null;
const cache = lru({
  max: 1000,
  maxAge: 1000 * 60, // 1 min
});

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
  } else if (config.get('redisSSLEndpoint') === '') {
    logger.info('Starting Redis client using endpoint: ', config.get('redisEndpoint'));
    redisClient = redis.createClient(config.get('redisEndpoint'), { password: config.get('redisPassword') });
  } else {
    logger.info('Starting Redis client using SSL endpoint: ', config.get('redisSSLEndpoint'));
    const redisUrl = config.get('redisSSLEndpoint');
    const redisInfo = redisUrl.split(':');
    const redisHost = redisInfo[0];
    const redisPort = redisInfo[1];
    const redisCert = fs.readFileSync(process.env.redisCert || './rediscert/redis.crt', 'utf8');
    redisClient = redis.createClient(redisPort, redisHost, { auth_pass: config.get('redisPassword'), tls: { servername: redisHost, ca: [redisCert] } });
    redisClient.ping((error, result) => {
      if (error) logger.error('Error with Redis SSL connection: ', error);
      else {
        logger.info('Redis SSL connection respone : ', result);
        if (result === 'PONG') redisReady = true;
      }
    });
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

  async checkIfOpenShiftPlatform(req) {
    const defaults = {
      url: `${config.get('cfcRouterUrl')}/kubernetes/apis/authorization.openshift.io/v1`,
      method: 'GET',
      headers: {
        Authorization: req.kubeToken,
      },
    };

    const res = await this.http(defaults);
    if (res.statusCode === 200) {
      const selfReview = res.body.resources.filter(r => r.kind === 'SelfSubjectRulesReview');
      logger.info('SelfSubjectRulesReview:', selfReview);
      if (selfReview.length > 0) {
        logger.info('Found API "authorization.openshift.io/v1" so assuming that we are running in OpenShift');
        isOpenshift = true;
        return;
      }
    }
    isOpenshift = false;
  }

  async getUserAccess(req, namespace) {
    const defaults = {
      url: `${config.get('cfcRouterUrl')}/kubernetes/apis/authorization.${!isOpenshift ? 'k8s' : 'openshift'}.io/v1/${!isOpenshift ? '' : `namespaces/${namespace}/`}selfsubjectrulesreviews`,
      method: 'POST',
      headers: {
        Authorization: req.kubeToken,
      },
      json: {
        apiVersion: `authorization.${!isOpenshift ? 'k8s' : 'openshift'}.io/v1`,
        kind: 'SelfSubjectRulesReview',
        spec: {
          namespace,
        },
      },
    };
    return this.http(defaults).then((res) => {
      let userResources = [];
      if (res.body && res.body.status) {
        const results = isOpenshift ? res.body.status.rules : res.body.status.resourceRules;
        results.forEach((item) => {
          if (item.verbs.includes('*') && item.resources.includes('*')) {
            // if user has access to everything then add just an *
            userResources = userResources.concat(['*']);
          } else if (item.verbs.includes('get') && item.resources.length > 0) { // TODO need to include access for 'patch' and 'delete'
            // RBAC string is defined as "namespace_apigroup_kind"
            const resources = [];
            const ns = (namespace === '' || namespace === undefined) ? 'null_' : `${namespace}_`;
            const apiGroup = (item.apiGroups[0] === '' || item.apiGroups[0] === undefined) ? 'null_' : `${item.apiGroups[0]}_`;
            item.resources.forEach((resource) => {
              resources.push(`'${ns + apiGroup + resource}'`);
            });
            userResources = userResources.concat(resources);
          }
          return null;
        });
      }
      return userResources;
    });
  }

  async getRbacString() {
    const objAliases = ['n'];
    const userAccessKey = this.req.user.name;
    const userAccessCache = cache.get(userAccessKey);
    let data = null;
    if (userAccessCache !== undefined) {
      data = userAccessCache;
    } else if (this.rbac.length > 0) {
      if (isOpenshift === null) {
        await this.checkIfOpenShiftPlatform(this.req);
      }
      data = await Promise.all(this.rbac.map(namespace =>
        this.getUserAccess(this.req, namespace)));
      data = await _.flatten(data).map(item => `${objAliases[0]}._rbac = ${item}`);
      cache.set(userAccessKey, data);
    } else {
      return '';
    }

    if (data.includes(`${objAliases[0]}._rbac = *`)) {
      return '';
    }
    const rbacFilter = `(${data.join(' OR ')})`;
    return rbacFilter;
  }

  async createWhereClause(filters) {
    const rbac = await this.getRbacString();
    const filterString = getFilterString(filters);
    if (rbac !== '') {
      if (filterString !== '') {
        return `WHERE ${rbac} AND ${filterString}`;
      }
      return `WHERE ${rbac}`;
    } else if (filterString !== '') {
      return `WHERE ${filterString}`;
    }
    return '';
  }

  setLastActivityTimestamp() {
    // Skip if avtivity was reported within the last second.
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

    const result = await this.g.query(`MATCH (n) ${await this.createWhereClause(filters)} RETURN n`);
    this.setLastActivityTimestamp();
    return formatResult(result);
  }

  async runSearchQueryCountOnly(filters) {
    // logger.info('runSearchQueryCountOnly()', filters);

    const result = await this.g.query(`MATCH (n) ${await this.createWhereClause(filters)} RETURN count(n)`);
    this.setLastActivityTimestamp();
    if (result.hasNext() === true) {
      return result.next().get('count(n)');
    }
    return 0;
  }

  async getAllProperties() {
    // logger.info('Getting all properties');
    const result = await this.g.query(`MATCH (n) ${await this.createWhereClause([])} RETURN n LIMIT 1`);
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
    const result = filters.length > 0
      ? await this.g.query(`MATCH (n) ${await this.createWhereClause(filters)} RETURN DISTINCT n.${property} ORDER BY n.${property} ASC`)
      : await this.g.query(`MATCH (n) ${await this.createWhereClause([])} RETURN DISTINCT n.${property} ORDER BY n.${property} ASC`);

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

    const result = await this.g.query(`MATCH (n)-[]->(r) ${await this.createWhereClause(filters)} RETURN DISTINCT r`);
    return formatResult(result);
  }
}

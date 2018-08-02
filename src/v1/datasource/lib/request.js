/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
import log4js from 'log4js';

const logger = log4js.getLogger('server');

const log4jsConfig = process.env.LOG4JS_CONFIG ? JSON.parse(process.env.LOG4JS_CONFIG) : undefined;
log4js.configure(log4jsConfig || 'config/log4js.json');

const requestLib = require('requestretry').defaults({ json: true, maxAttempts: 1, strictSSL: false });

export default (...args) => {
  const [options] = args;
  logger.debug('-->', options.json && options.json.Resource ? options.json.Resource : options.url);

  return requestLib(...args);
};
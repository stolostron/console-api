/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import moment from 'moment';
import queryString from 'querystring';
import KubeModel from './kube';
import config from '../../../config';
import logger from '../lib/logger';

export default class CemModel extends KubeModel {
  async getIncidents(args) {
    const cemsid = _.get(args.req, "cookies['cem.sid']");
    const cemxsrfToken = _.get(args.req, "cookies['cem.xsrf']");
    const userAgent = 'test'; // TODO put actual value
    const startTime = moment().subtract(20, 'days').format('YYYY-MM-DDTHH:mm:ssZ');
    // for getting cem incidents list
    const opts = {
      url: `${config.get('cfcRouterUrl')}/cemui/api/resources/v1/incidentQueries?start_time=${startTime}`,
      headers: {
        'X-CEM-XSRF': `${cemxsrfToken}`,
        Cookie: `cem.sid=${cemsid}`,
        'User-Agent': `${userAgent}`,
      },
    };

    const postBody = {
      incident: {
        operator: 'and',
        value: [
          {
            attribute: 'state',
            operator: 'contains',
            value: ['unassigned', 'inprogress'],
          },
          {
            attribute: 'correlationDetails.application',
          },
        ],
      },
    };
    const response = await this.kubeConnector.post('', postBody, opts, true);

    if (response.code || response.message) {
      logger.error(`CEM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return response || [];
  }

  async getIncidentsForApplication(args) {
    const icpToken = _.get(args.req, "cookies['cfc-access-token-cookie']");
    const subscriptionId = args.req.user.userAccount && args.req.user.userAccount.activeAccountId;
    const { name } = args;
    const startTime = moment().subtract(20, 'days').format('YYYY-MM-DDTHH:mm:ssZ');
    const params = {
      starttime: `${startTime}`,
      event_filter_1: `resource.application == '${name}'`,
    };
    const qString = queryString.stringify(params);
    const opts = {
      url: `${config.get('cfcRouterUrl')}/cem/api/incidentquery/v1?${qString}`,
      headers: {
        Authorization: `bearer origin:icp:${icpToken}`,
        'X-Subscription-ID': `${subscriptionId}`,
      },
    };
    const response = await this.kubeConnector.get('', opts, true);

    if (response.code || response.message) {
      // don't throw error, send empty response
      logger.error(`CEM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return response || [];
  }
}

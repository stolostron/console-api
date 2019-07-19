/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import KubeModel from './kube';
import config from '../../../config';

export default class CemModel extends KubeModel {
  async getIncidents(args) {
    const cemsid = _.get(args.req, "cookies['cem.sid']");
    const cemxsrfToken = _.get(args.req, "cookies['cem.xsrf']");
    const userAgent = 'test'; // TODO put actual value
    // for getting cem incidents list
    const opts = {
      url: `${config.get('cfcRouterUrl')}/cemui/api/resources/v1/incidents`,
      headers: {
        'X-CEM-XSRF': `${cemxsrfToken}`,
        Cookie: `cem.sid=${cemsid}`,
        'User-Agent': `${userAgent}`,
      },
    };
    const response = await this.kubeConnector.get('', opts, true);

    if (response.code || response.message) {
      throw new Error(`CEM ERROR ${response.code} - ${response.message}`);
    }
    return response || [];
  }
}

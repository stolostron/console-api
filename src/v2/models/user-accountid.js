/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import KubeModel from './kube';
import config from '../../../config';

export default class AccountIdModel extends KubeModel {
  async getAccountId(args) {
    const user = _.get(args.req, 'user');
    const accessToken = _.get(args.req, "cookies['cfc-access-token-cookie']");
    const opts = {
      url: `${config.get('cfcRouterUrl')}/idmgmt/identity/api/v1/users/${user.name}`,
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    };

    const response = await this.kubeConnector.get('', opts, true);
    if (response.code || response.message) {
      throw new Error(`ERROR ${response.code} - ${response.message}`);
    }
    return response || [];
  }
}

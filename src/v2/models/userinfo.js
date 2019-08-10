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

export default class UserInfoModel extends KubeModel {
  async getUserInfo(args) {
    const { req: { user } } = args;
    console.log(`user id${user.name}`);
    const iamToken = _.get(args.req, "cookies['cfc-access-token-cookie']") || config.get('cfc-access-token-cookie');
    // for getting queries list
    const opts = {
      url: `${config.get('cfcRouterUrl')}/idmgmt/identity/api/v1/users/${user.name}`,
      headers: {
        Authorization: `Bearer ${iamToken}`,
      },
    };
    const response = await this.kubeConnector.get('', opts, true);
    if (response.code || response.message) {
      throw new Error(`HCM ERROR ${response.code} - ${response.message}`);
    }
    return response || [];
  }
}

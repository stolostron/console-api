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

export default class QueryModel extends KubeModel {
  async getQueries(args) {
    const { req: { user } } = args;
    const iamToken = _.get(args.req, "cookies['cfc-access-token-cookie']") || config.get('cfc-access-token-cookie');
    // for getting queries list
    const opts = {
      url: `${config.get('cfcRouterUrl')}/idmgmt/identity/api/v1/userpreferences/preferenceId_${user.name}`,
      headers: {
        Authorization: `Bearer ${iamToken}`,
      },
    };
    const response = await this.kubeConnector.get('', opts, true);
    if (response.code || response.message) {
      throw new Error(`HCM ERROR ${response.code} - ${response.message}`);
    }
    return response.userQueries || [];
  }

  async saveQuery(args) {
    const { req: { user }, resource } = args;
    const iamToken = _.get(args.req, "cookies['cfc-access-token-cookie']") || config.get('cfc-access-token-cookie');
    const opts = {
      url: `${config.get('cfcRouterUrl')}/idmgmt/identity/api/v1/userpreferences/preferenceId_${user.name || ''}`,
      headers: {
        Authorization: `Bearer ${iamToken}`,
      },
    };
    const response = await this.kubeConnector.get('', opts, true);
    if (response.code || response.message) {
      throw new Error(`HCM ERROR ${response.code} - ${response.message}`);
    }
    const queries = response.userQueries || [];
    // check Id and Name for backwards compatibility
    const target = queries.find(query => query.id === resource.id) ||
     queries.find(query => query.name === resource.name);
    if (target) { // this is an edit
      target.name = resource.name;
      target.description = resource.description;
      target.id = resource.id || Date.now().toString(); // Queries before 3.2.1, didn't have IDs.
      if (resource.searchText !== '') target.searchText = resource.searchText;
      opts.json = {
        ...response, userQueries: queries,
      };
    } else {
      opts.json = {
        ...response, userQueries: [...queries, resource],
      };
    }
    return this.kubeConnector.put('', opts);
  }

  async deleteQuery(args) {
    const { req: { user }, resource } = args;
    const iamToken = _.get(args.req, "cookies['cfc-access-token-cookie']") || config.get('cfc-access-token-cookie');
    const opts = {
      url: `${config.get('cfcRouterUrl')}/idmgmt/identity/api/v1/userpreferences/preferenceId_${user.name || ''}`,
      headers: {
        Authorization: `Bearer ${iamToken}`,
      },
    };
    const response = await this.kubeConnector.get('', opts, true);
    if (response.code || response.message) {
      throw new Error(`HCM ERROR ${response.code} - ${response.message}`);
    }
    const queries = response.userQueries || [];
    opts.json = {
      ...response, userQueries: queries.filter(object => object.name !== resource.name),
    };
    return this.kubeConnector.put('', opts);
  }
}

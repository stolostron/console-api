/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import { clusters, releases } from '../../datasource/hcm';

export const typeDef = `
  type TableRow {
    status: String
    link: String
    resourceName: String
    percentage: Int
  }

  type DashboardItem {
    name: String
    healthy: Int
    critical: Int
    warning: Int
    table: [TableRow]
    error: String
  }
`;

const sortTable = table => _.sortBy(table, [(row) => {
  switch (row.status) {
    case 'critical':
      return 1;

    case 'warning':
      return 2;

    default:
      return 3;
  }
}]);

const sortCards = dashboardCards => _.sortBy(dashboardCards, [(card) => {
  switch (true) {
    case card.critical > 0:
      return -card.critical * 100;

    case card.warning > 0:
      return -card.warning * 1;

    default:
      return 0;
  }
}]);

const transformCluster = cluster => ({
  status: cluster.Status === 'failed' ? 'critical' : cluster.Status,
  link: cluster.Labels.clusterip,
  percentage: cluster.Percentage || 0,
  resourceName: cluster.ClusterName,
});

const transformRelease = release => ({
  status: release.Status === 'DEPLOYED' ? 'healthy' : 'critical',
  resourceName: release.name,
  link: '', // TODO: save cluster ip's and generate links - 06/06/18 13:12:48 sidney.wijngaarde1@ibm.com
  percentage: 0,
});

const getDashboardCard = async ({
  name, query, req, transform, statusField,
}) => {
  try {
    const rawData = await query(null, null, req);

    const cardData = rawData.reduce((accum, curr) => {
      const status = _.get(curr, statusField, 'Status').toLowerCase();

      switch (status) {
        case 'failed':
          accum.critical += 1;
          break;

        case 'healthy':
        case 'deployed':
          accum.healthy += 1;
          break;

        default:
          accum.critical += 1;
      }

      accum.table.push(transform(curr));
      return accum;
    }, {
      name, healthy: 0, critical: 0, warning: 0, table: [], error: null,
    });

    cardData.table = sortTable(cardData.table).slice(0, 5);
    return cardData;
  } catch (error) {
    return { error };
  }
};

export const dashboardResolver = {
  Query: {
    dashboard: async (root, args, req) => {
      const dashboardCards = await Promise.all([
        getDashboardCard({
          name: 'clusters',
          transform: transformCluster,
          statusField: 'Status',
          query: clusters,
          req,
        }),
        getDashboardCard({
          name: 'helm releases',
          transform: transformRelease,
          statusField: 'Status',
          query: releases,
          req,
        }),
      ]);

      return sortCards(dashboardCards);
    },
  },
};

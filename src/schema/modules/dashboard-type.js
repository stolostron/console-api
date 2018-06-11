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

const genericStatus = (resource) => {
  switch (resource.Status.toLowerCase()) {
    case 'failed':
      return 'critical';

    // TODO: Return warning status - 06/11/18 09:35:53 sidney.wijngaarde1@ibm.com

    case 'healthy':
    case 'deployed':
      return 'healthy';

    default:
      return 'critical';
  }
};

const percentageStatus = field => (resource) => {
  const percent = resource[field];
  if (!percent) {
    return 'critical';
  }

  switch (true) {
    case percent > 90:
      return 'critical';

    case percent > 75:
      return 'warning';

    default:
      return 'healthy';
  }
};

function getDashboardCard({
  name, rawData, transform, status = genericStatus,
}) {
  const cardData = rawData.reduce((accum, curr) => {
    const stat = status(curr);

    accum[stat] += 1;

    accum.table.push(transform(curr, stat));
    return accum;
  }, {
    name, healthy: 0, critical: 0, warning: 0, table: [], error: null,
  });

  cardData.table = sortTable(cardData.table).slice(0, 5);
  return cardData;
}

async function getDashboardCards({ query, req, cards }) {
  try {
    const rawData = await query(null, null, req);
    return cards.map(card => getDashboardCard({ rawData, ...card }));
  } catch (error) {
    return cards.map(() => ({ error }));
  }
}

const transformCluster = (cluster, status) => ({
  link: cluster.Labels.clusterip,
  percentage: cluster.Percentage || 0,
  resourceName: cluster.ClusterName,
  status,
});

const transformRelease = (release, status) => ({
  link: '', // TODO: save cluster ip's and generate links - 06/06/18 13:12:48 sidney.wijngaarde1@ibm.com
  percentage: 0,
  resourceName: release.name,
  status,
});

const transformPercentage = field => (cluster, status) => ({
  link: cluster.Labels.clusterip,
  percentage: Math.round(cluster[field]),
  resourceName: cluster.ClusterName,
  status,
});

export const dashboardResolver = {
  Query: {
    dashboard: async (root, args, req) => {
      const dashboardCards = await Promise.all([
        getDashboardCards({
          cards: [
            {
              name: 'clusters',
              transform: transformCluster,
            },
            {
              name: 'cpu',
              transform: transformPercentage('CPURequestsFraction'),
              status: percentageStatus('CPURequestsFraction'),
            },
            {
              name: 'memory',
              transform: transformPercentage('MemoryRequestsFraction'),
              status: percentageStatus('MemoryRequestsFraction'),
            },
            {
              name: 'storage',
              transform: transformPercentage('StorageUsageFraction'),
              status: percentageStatus('StorageUsageFraction'),
            },
          ],
          query: clusters,
          req,
        }),
        getDashboardCards({
          cards: [
            { name: 'helm releases', transform: transformRelease },
          ],
          query: releases,
          req,
        }),
      ]);

      return sortCards(_.flatten(dashboardCards));
    },
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import { clusters, releases, pods } from '../../datasource/hcm';

export const typeDef = `
  type TableRow {
    status: String
    link: String
    resourceName: String
    percentage: Int
  }

  type DashboardCardItem {
    name: String
    healthy: Int
    critical: Int
    warning: Int
    table: [TableRow]
    error: String
  } 
  
  type DashboardChartItem {
    name: String
    # return something looks like [ [[value1, value2, value3], title1] , [[valueA, valueB, valueC], title2] ]
    # issue created against Carbon: https://github.com/carbon-design-system/carbon-addons-data-viz-react/issues/112
    data: [[String]]
    error: String
  }
  
  type DashboardData {
    cardItems: [DashboardCardItem]
    pieChartItems: [DashboardChartItem]
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
  if (resource.Status) {
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
  } else if (resource.State != null) {
    return resource.State ? 'healthy' : 'critical';
  } else {
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

function getDashboardPieChart({
  name, rawData, transform, status = genericStatus,
}) {
  const chartData = rawData.reduce((accum, curr) => {
    const stat = status(curr);
    accum.data = (transform(curr, stat, accum.data));
    return accum;
  }, {
    data: {},
  });
  const result = [];
  // dirty code for supporting Carbon data schema
  // issue created against Carbon: https://github.com/carbon-design-system/carbon-addons-data-viz-react/issues/112
  // update this part once Carbon fixed the issue
  Object.keys(chartData.data).forEach((key) => {
    const tempResult = [];
    tempResult.push(key);
    tempResult.push(chartData.data[key].toString());
    result.push(tempResult);
  });
  return { name, data: result };
}

async function getDashboardItems({
  query, req, cards = [], pieCharts = [],
}) {
  try {
    const rawData = await query(null, null, req);
    const cardsMap = cards.map(card => getDashboardCard({ rawData, ...card }));
    const pieChartsItems = pieCharts.map(chart => getDashboardPieChart({ rawData, ...chart }));
    return {
      cardsMap,
      pieChartsItems,
    };
  } catch (error) {
    return cards.map(() => ({ error }));
  }
}

const transformTotalCluster = (curr, status, currentData) => {
  const currentMap = currentData;
  if (Object.prototype.hasOwnProperty.call(currentMap, status)) {
    currentMap[status] += 1;
  } else {
    currentMap[status] = 1;
  }
  return currentMap;
};

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

const transformPod = (pod, status) => ({
  link: '',
  percentage: 0,
  resourceName: pod.name,
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
      const dashboardItems = await Promise.all([
        getDashboardItems({
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
          pieCharts: [
            {
              name: 'totalClusterHealth',
              transform: transformTotalCluster,
            },
          ],
          query: clusters,
          req,
        }),
        getDashboardItems({
          cards: [
            { name: 'helm releases', transform: transformRelease },
          ],
          query: releases,
          req,
        }),
        getDashboardItems({
          cards: [
            { name: 'pods', transform: transformPod },
          ],
          query: pods,
          req,
        }),
      ]);
      let allCards = [];
      let pieChartItems = [];
      dashboardItems.forEach((result) => {
        allCards = [...result.cardsMap, ...allCards];
        pieChartItems = [...result.pieChartsItems, ...pieChartItems];
      });
      return {
        cardItems: sortCards(_.flatten(allCards)),
        pieChartItems,
      };
    },
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
import _ from 'lodash';
import { GenericError } from '../../v2/lib/errors';
import config from '../../../config';

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
  if (resource.status) {
    switch (resource.status.toLowerCase()) {
      case 'failed':
        return 'critical';
      // TODO: Return warning status - 06/11/18 09:35:53 sidney.wijngaarde1@ibm.com
      case 'pending':
        return 'warning';
      case 'ok':
      case 'running':
      case 'succeeded':
      case 'healthy':
      case 'deployed':
        return 'healthy';
      default:
        return 'critical';
    }
  } else if (resource.state != null) {
    return resource.state ? 'healthy' : 'critical';
  } else {
    return 'critical';
  }
};

const percentageStatus = field => (resource) => {
  const percent = resource[field];
  if (!percent && percent !== 0) {
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
  name, statusData, clusterData, transform, status = genericStatus,
}) {
  const cardData = statusData.reduce((accum, curr, idx) => {
    let stat = '';
    if (name === 'clusters') {
      stat = status(clusterData[idx]);
    } else {
      stat = status(statusData[idx]);
    }
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
  name, statusData, clusterData, transform, status = genericStatus,
}) {
  const chartData = statusData.reduce((accum, curr, idx) => {
    const stat = status(clusterData[idx]);
    accum.data = (transform(curr, stat, accum.data));
    return accum;
  }, {
    data: { healthy: 0, warning: 0, critical: 0 },
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

const timeout = time => new Promise((resolve, reject) => {
  setTimeout(reject, time, new GenericError({ data: { error: 'Request timed out' } }));
});

async function getDashboardItems({
  statusQuery, clusterQuery, cards = [], pieCharts = [],
}) {
  try {
    const statusData = await Promise.race([statusQuery(), timeout(config.get('hcmPollTimeout'))]);
    if (statusData.code || statusData.message) {
      return new GenericError({ data: { error: 'An error occured while getting status data' } });
    }
    const clusterData = await Promise.race([clusterQuery(), timeout(config.get('hcmPollTimeout'))]);
    const cardsMap = cards.map(card => getDashboardCard({
      statusData,
      clusterData,
      ...card,
    }));
    const pieChartsItems = pieCharts.map(chart => getDashboardPieChart({
      statusData,
      clusterData,
      ...chart,
    }));
    return {
      cardsMap,
      pieChartsItems,
    };
  } catch (error) {
    return {
      cardsMap: cards.map(({ name }) => ({ name, error })),
      pieChartsItems: pieCharts.map(({ name }) => ({ name, error })),
    };
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
  link: cluster.ip,
  resourceName: cluster.name,
  status,
});

const transformPercentage = field => (cluster, status) => ({
  link: cluster.ip,
  percentage: Math.round(cluster[field]),
  resourceName: cluster.name,
  status,
});

const transformRelease = (release, status) => ({
  link: '',
  resourceName: release.name,
  status,
});

const transformPod = (pod, status) => ({
  link: '',
  resourceName: pod.name,
  status,
});

export const resolver = {
  Query: {
    dashboard: async (root, args, { clusterModel, helmModel, resourceViewModel }) => {
      const dashboardItems = await Promise.all([
        getDashboardItems({
          cards: [
            {
              name: 'clusters',
              transform: transformCluster,
            },
            {
              name: 'cpu',
              transform: transformPercentage('cpuUtilization'),
              status: percentageStatus('cpuUtilization'),
            },
            {
              name: 'memory',
              transform: transformPercentage('memoryUtilization'),
              status: percentageStatus('memoryUtilization'),
            },
            {
              name: 'storage',
              transform: transformPercentage('storageUtilization'),
              status: percentageStatus('storageUtilization'),
            },
          ],
          pieCharts: [
            {
              name: 'totalClusterHealth',
              transform: transformTotalCluster,
            },
          ],
          statusQuery: () => clusterModel.getClusterStatus(args),
          clusterQuery: () => clusterModel.getClusters(args),
        }),
        getDashboardItems({
          cards: [
            { name: 'helm releases', transform: transformRelease },
          ],
          statusQuery: () => helmModel.getReleases(args),
          clusterQuery: () => clusterModel.getClusters(args),
        }),
        getDashboardItems({
          cards: [
            { name: 'pods', transform: transformPod },
          ],
          statusQuery: () => resourceViewModel.getPods(args),
          clusterQuery: () => clusterModel.getClusters(args),
        }),
      ]);
      let allCards = [];
      let pieChartItems = [];
      if (dashboardItems && dashboardItems.length > 0) {
        dashboardItems.forEach((result) => {
          if (result.cardsMap && result.cardsMap.length > 0) {
            allCards = [...result.cardsMap, ...allCards];
          }
          if (result.pieChartsItems && result.pieChartsItems.length > 0) {
            pieChartItems = [...result.pieChartsItems, ...pieChartItems];
          }
        });
      }
      return {
        cardItems: sortCards(_.flatten(allCards)),
        pieChartItems,
      };
    },
  },
};

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
type DashboardCardItem {
  name: String
  type: String
  healthy: Int
  critical: Int
  warning: Int
  error: String
}
type DashboardData {
  cardItems: [DashboardCardItem]
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

const genericStatus = (resource) => {
  if (resource.status) {
    switch (resource.status.toLowerCase()) {
      case 'failed':
      case 'offline':
      case 'unbound':
        return 'critical';
      // TODO: Return warning status - 06/11/18 09:35:53 sidney.wijngaarde1@ibm.com
      case 'available':
      case 'pending':
      case 'deleting':
        return 'warning';
      case 'ok':
      case 'ready':
      case 'running':
      case 'succeeded':
      case 'healthy':
      case 'deployed':
      case 'bound':
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
    case percent >= 75:
      return 'warning';
    default:
      return 'healthy';
  }
};

function getDashboardCard({
  name, statusData, clusterData, transform, status = genericStatus, type,
}) {
  const cardData = statusData.reduce((accum, curr, idx) => {
    let stat = '';
    if (name === 'clusters') {
      stat = status(clusterData[idx]);
    } else {
      stat = status(statusData[idx]);
    }
    accum[stat] += 1;
    accum.table.push(transform(curr, stat, clusterData));
    return accum;
  }, {
    name, healthy: 0, critical: 0, warning: 0, table: [], error: null, type,
  });
  cardData.table = sortTable(cardData.table).slice(0, 5);
  return cardData;
}

const timeout = time => new Promise((resolve, reject) => {
  setTimeout(reject, time, new GenericError({ data: { error: 'Request timed out' } }));
});

async function getDashboardItems({
  statusQuery, clusterQuery, cards = [],
}) {
  try {
    let clusterData = [];
    const statusData = await Promise.race([statusQuery(), timeout(config.get('hcmPollTimeout'))]);
    if (statusData.code || statusData.message) {
      return new GenericError({ data: { error: 'An error occured while getting status data' } });
    }
    if (clusterQuery) {
      clusterData = await Promise.race([clusterQuery(), timeout(config.get('hcmPollTimeout'))]);
    }
    const cardsMap = cards.map(card => getDashboardCard({
      statusData,
      clusterData,
      ...card,
    }));
    return {
      cardsMap,
    };
  } catch (error) {
    return {
      cardsMap: cards.map(({ name }) => ({ name, error })),
    };
  }
}

const transformCluster = (cluster, status) => ({
  clusterIP: cluster.ip,
  resourceName: cluster.metadata.name,
  status,
});

const transformPercentage = field => (cluster, status) => ({
  clusterIP: cluster.ip,
  percentage: Math.round(cluster[field]),
  resourceName: cluster.metadata.name,
  status,
});

const transformRelease = (release, status, clusterData) => ({
  resourceName: release.name,
  namespace: release.namespace,
  status,
  clusterIP: _.get(clusterData.find(item => item.metadata.name === release.cluster), 'clusterip'),
});

const transformPod = (pod, status) => ({
  clusterIP: '',
  resourceName: pod.metadata.name,
  status,
});

export const resolver = {
  Query: {
    dashboard: async (root, args, {
      clusterModel, helmModel, resourceViewModel, req,
    }) => {
      const dashboardItems = await Promise.all([
        getDashboardItems({
          cards: [
            { name: 'pvs', transform: transformPod, type: 'storage' },
          ],
          statusQuery: () => resourceViewModel.fetchResources({ type: 'persistentvolumes' }),
        }),
        getDashboardItems({
          cards: [
            { name: 'pods', transform: transformPod, type: 'pods' },
          ],
          statusQuery: () => resourceViewModel.fetchResources({ type: 'pods' }),
        }),
        getDashboardItems({
          cards: [
            { name: 'helm releases', transform: transformRelease, type: 'releases' },
          ],
          statusQuery: () => helmModel.getReleases(args),
        }),
        getDashboardItems({
          cards: [
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
            {
              name: 'clusters',
              transform: transformCluster,
              type: 'clusters',
            },
          ],
          clusterQuery: () => clusterModel.getAllClusters({ user: req.user }),
          statusQuery: () => clusterModel.getClusterStatus({ user: req.user }),
        }),
      ]);
      let allCards = [];
      if (dashboardItems && dashboardItems.length > 0) {
        dashboardItems.forEach((result) => {
          if (result.cardsMap && result.cardsMap.length > 0) {
            allCards = [...result.cardsMap, ...allCards];
          }
        });
      }
      return {
        cardItems: _.flatten(allCards),
      };
    },
  },
};

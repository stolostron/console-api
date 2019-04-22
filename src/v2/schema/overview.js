/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import generateDemoData from './overviewDemo';

export const typeDef = `
type Overview {
  clusters: [ClusterOverview]
  applications: [ApplicationOverview]
  pods: [PodOverview]
  compliances: [ComplianceOverview]
  timestamp: String
}

type ClusterOverview implements K8sObject {
  metadata: Metadata
  capacity: ClusterCapacity
  usage: ClusterUsage
  consoleURL: String
  status: String
}

type ClusterCapacity {
  cpu: String
  memory: String
  nodes: Int
  storage: String
}

type ClusterUsage {
  cpu: String
  memory: String
  pods: Int
  storage: String
}

type ApplicationOverview implements K8sObject {
  metadata: Metadata
  raw: JSON
  selector: JSON
}

type ComplianceOverview implements K8sObject {
  metadata: Metadata
  raw: JSON
}

type PodOverview implements K8sObject {
  metadata: Metadata
  cluster: Cluster
  hostIP: String
  podIP: String
  restarts: Int
  startedAt: String
  status: String
}
`;

export const resolver = {
  Query: {
    overview: async (root, { demoMode }, {
      clusterModel, applicationModel, complianceModel, resourceViewModel,
    }) => {
      if (!demoMode) {
        let clusters = await clusterModel.getAllClusters();
        clusters = clusters.map(({
          metadata, status, capacity, usage, consoleURL,
        }) => {
          const { name, namespace, labels } = metadata;
          return {
            metadata: {
              name,
              namespace,
              labels,
            },
            consoleURL,
            status,
            capacity,
            usage,
          };
        });

        // number and what clusters
        let applications = await applicationModel.getApplicationOverview();
        applications = applications.map(({ metadata: { name } }) => ({
          metadata: {
            name,
          },
        }));

        // number, what cluster and status
        let pods = await resourceViewModel.fetchResources({ type: 'pods' });
        pods = pods.map(({ metadata, cluster, status }) => {
          const { name, namespace } = metadata;
          return {
            metadata: {
              name,
              namespace,
            },
            status,
            cluster,
          };
        });

        // policy compliances
        let compliances = await complianceModel.getCompliances();
        compliances = compliances.map(({ raw: { status: { status } } }) => ({
          raw: {
            status: {
              status,
            },
          },
        }));

        // what time these values were fetched
        // also forces apollo query to continially update the component even if nothing else changed
        const timestamp = new Date().toString();

        return {
          clusters, applications, compliances, pods, timestamp,
        };
      }
      return generateDemoData();
    },
  },
};

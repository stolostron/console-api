/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { transformFilters } from './filter-type';

export const typeDef = `
type Cluster {
  AgentEndpoint: String
  CPURequestsFraction: Float
  ClusterEndpoint: String
  ClusterName: String
  Conflict: Boolean
  Labels: JSON
  MemoryRequestsFraction: Float
  ProxyEndpoint: String
  Status: String
  StorageUsageFraction: Float
  TotalCpus: Int
  TotalDeployments: Int
  TotalMemory: String
  TotalNodes: Int
  TotalPods: Int
  TotalServices: Int
  TotalStorage: String
}
`;

export const clusterResolver = {
  Query: {
    clusters: async (root, args = { filter: {} }, { hcmConnector, req }) => {
      const response = await hcmConnector.processRequest(req, '/api/v1alpha1/clusters', transformFilters(args));
      return response ? Object.values(response) : [];
    },
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { clusters } from '../../datasource/hcm';

export const typeDef = `
type Cluster {
  AgentEndpoint: String
  ClusterEndpoint: String
  ClusterName: String
  Conflict: Boolean
  Labels: JSON
  ProxyEndpoint: String
  Status: String
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
    clusters,
  },
};

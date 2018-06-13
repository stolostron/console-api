/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { createDashboard, applications } from '../../datasource/hcm';

export const typeDef = `
# HCM Application
type Application {
  Name: String
  Annotations: JSON
  Labels: JSON
  Components: [AppNode]
  Dependencies: [AppNode]
  # URL to Grafana Dashboard.
  Dashboard: String
}

# HCM Application Node (AppNode)
type AppNode {
  Name: String
  Cluster: String
  Kind: String
  Status: String
}
`;

export const applicationResolver = {
  Query: {
    applications,
  },
  Mutation: {
    createDashboard: (root, { appName }, req) => createDashboard(req, appName),
  },
};

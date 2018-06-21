/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import {
  applications,
  createDashboard,
  deleteApplication,
  deployApplication,
  undeployApplication,
  registerApplication,
} from '../../datasource/hcm';

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
  Status: String
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
    deleteApplication: (root, { appName }, req) => deleteApplication(req, appName),
    deployApplication: (root, { appName }, req) => deployApplication(req, appName),
    undeployApplication: (root, { appName }, req) => undeployApplication(req, appName),
    registerApplication: (root, { yaml }, req) => registerApplication(req, yaml),
  },
};

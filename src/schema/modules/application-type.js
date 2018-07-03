/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

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
    applications: async (root, args, { req, hcmConnector }) => {
      const result = await hcmConnector.processRequest(req, '/api/v1alpha1/applications', { Action: { Names: '*' } });
      return result ? Object.values(result) : [];
    },
  },
  Mutation: {
    createDashboard: async (root, { appName }, { req, hcmConnector }) => {
      const result = await hcmConnector.processRequest(req, '/api/v1alpha1/applications', {
        Resource: 'applications',
        Operation: 'describe',
        Action: {
          Names: appName,
        },
      }, { method: 'PUT' });
      return result;
    },
    deleteApplication: async (root, { appName }, { req, hcmConnector }) => {
      const result = await hcmConnector.processRequest(req, '/api/v1alpha1/applications', {
        Resource: 'applications',
        Operation: 'delete',
        Action: {
          Names: appName,
        },
      }, { method: 'PUT' });
      return result;
    },
    deployApplication: async (root, { appName }, { req, hcmConnector }) => {
      const result = await hcmConnector.getWork(req, 'applications', {
        method: 'POST',
        json: {
          Operation: 'deploy',
          Work: {
            Names: appName,
          },
        },
      });
      return result;
    },
    undeployApplication: async (root, { appName }, { req, hcmConnector }) => {
      const result = await hcmConnector.getWork(req, 'applications', {
        method: 'POST',
        json: {
          Operation: 'undeploy',
          Work: {
            Names: appName,
          },
        },
      });
      return result;
    },
    registerApplication: async (root, { yaml }, { req, hcmConnector }) => {
      const result = await hcmConnector.processRequest(req, '/api/v1alpha1/applications', {
        Resource: 'applications',
        Operation: 'register',
        Action: {
          Content: yaml,
        },
      }, { method: 'PUT' });
      return result;
    },
  },
};

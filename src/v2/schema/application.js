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
  name: String
  annotations: JSON
  labels: JSON
  components: [AppNode]
  dependencies: [AppNode]
  # URL to Grafana Dashboard.
  dashboard: String
  status: String
}

# HCM Application Node (AppNode)
type AppNode {
  name: String
  cluster: String
  kind: String
  status: String
}
`;

export const resolver = {
  Query: {
    applications: (root, args, { kubeModel }) => kubeModel.getApplications(args),
  },
};

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
  annotations: JSON
  components: [AppService]
  # URL to Grafana Dashboard.
  dashboard: String
  dependencies: [AppService]
  labels: JSON
  name: String
  relationships: [AppRelationship]
  status: String
}

type AppRelationship {
  source: String!
  destination: String!
  type: String
}

# HCM Application Service (AppService)
type AppService {
  cluster: String
  name: String
  status: String
}
`;

export const resolver = {
  Query: {
    applications: (root, args, { kubeModel }) => kubeModel.getApplications(args.name),
  },
};

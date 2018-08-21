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
  details: ApplicationDetails
  deployables: [Deployable]
  placementPolicies: [PlacementPolicy]
  selector: JSON
}

type ApplicationDetails {
  annotations: JSON
  creationTimestamp: String
  # URL to Grafana Dashboard
  dashboard: String
  labels: JSON
  name: String
  namespace: String
  resourceVersion: String
  selfLink: String
  status: String
  uid: String
}

type Deployable {
  dependencies: [DeployableDependency]
  deployer: HelmDeployer
  name: String
}

type PlacementPolicy {
  annotations: JSON
  clusterSelector: JSON
  name: String
  namespace: String
  replicas: Int
  resourceSelector: JSON
}

type DeployableDependency {
  kind: String
  name: String
}

type HelmDeployer {
  chartName: String
  namespace: String
  repository: String
  version: String
}

`;

/* eslint-disable max-len */
export const resolver = {
  Query: {
    applications: (root, args, { applicationModel }) => applicationModel.getApplications(args.name, args.namespace),
    deployables: (root, args, { applicationModel }) => applicationModel.getDeployables(args.selector),
    placementPolicies: (root, args, { applicationModel }) => applicationModel.getPlacementPolicies(args.selector),
  },
  Application: {
    deployables: (root, args, { applicationModel }) => applicationModel.getDeployables(root.selector),
    placementPolicies: (root, args, { applicationModel }) => applicationModel.getPlacementPolicies(root.selector),
  },
  Mutation: {
    createApplication: (root, args, { applicationModel }) => applicationModel.createApplication(args.resources),
    deleteApplication: (root, args, { applicationModel }) => applicationModel.deleteApplication(args.namespace, args.name),
  },
};

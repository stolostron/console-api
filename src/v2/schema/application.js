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
type Application implements K8sObject {
  # URL to Grafana Dashboard
  dashboard: String
  deployables: [Deployable]
  metadata: Metadata
  placementPolicies: [PlacementPolicy]
  # The object's yaml definition in JSON format.
  raw: JSON
  selector: JSON
}

type Deployable implements K8sObject {
  dependencies: [DeployableDependency]
  deployer: HelmDeployer
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
}

type PlacementPolicy implements K8sObject {
  clusterSelector: JSON
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
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

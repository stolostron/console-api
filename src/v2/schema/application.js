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
  metadata: Metadata
  # URL to Grafana Dashboard
  dashboard: String
  details: ApplicationDetails @deprecated(reason: "Use metadata or dashboard fields.")
  deployables: [Deployable]
  placementPolicies: [PlacementPolicy]
  selector: JSON
}

type ApplicationDetails {
  annotations: JSON @deprecated(reason: "Use metadata.annotations field.")
  creationTimestamp: String @deprecated(reason: "Use metadata.creationTimestamp field.")
  # URL to Grafana Dashboard
  dashboard: String @deprecated(reason: "Use dashboard field in application.")
  labels: JSON @deprecated(reason: "Use metadata.labels field.")
  name: String @deprecated(reason: "Use metadata.name field.")
  namespace: String @deprecated(reason: "Use metadata.namespace field.")
  resourceVersion: String @deprecated(reason: "Use metadata.resourceVersion field.")
  selfLink: String @deprecated(reason: "Use metadata.selfLink field.")
  status: String @deprecated(reason: "Use metadata.status field.")
  uid: String @deprecated(reason: "Use metadata.uid field.")
}

type Deployable implements K8sObject {
  metadata: Metadata
  dependencies: [DeployableDependency]
  deployer: HelmDeployer
  name: String @deprecated(reason: "Use metadata.name field.")
}

type PlacementPolicy implements K8sObject {
  metadata: Metadata
  clusterSelector: JSON
  replicas: Int
  resourceSelector: JSON
  annotations: JSON @deprecated(reason: "Use metadata.annotations field.")
  name: String @deprecated(reason: "Use metadata.name field.")
  namespace: String @deprecated(reason: "Use metadata.namespace field.")
}

type DeployableDependency implements K8sObject {
  metadata: Metadata
  kind: String
  name: String @deprecated(reason: "Use metadata.annotations field.")
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

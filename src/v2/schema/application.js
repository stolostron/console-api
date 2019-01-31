/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
# MCM Application
type Application implements K8sObject {
  applicationRelationships: [ApplicationRelationship]
  applicationWorks: [ApplicationWorks]
  # URL to Grafana Dashboard
  dashboard: String
  deployables: [Deployable]
  metadata: Metadata
  placementBindings: [PlacementBinding]
  placementPolicies: [PlacementPolicy]
  # The object's yaml definition in JSON format.
  raw: JSON
  selector: JSON
}

type ApplicationWorks implements K8sObject {
  metadata: Metadata
  release: String
  cluster: String
  status: String
  reason: String
  result: WorkResult
}

type ApplicationRelationship implements K8sObject {
  destination: DeployableDependency
  metadata: Metadata
  source: DeployableDependency
  type: String
  # The object's yaml definition in JSON format.
  raw: JSON
}

type Deployable implements K8sObject {
  dependencies: [DeployableDependency]
  deployer: Deployer
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
}

type PlacementPolicy implements K8sObject {
  clusterLabels: JSON
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
  clusterReplicas: Int
  resourceSelector: JSON
  status: JSON
}

type PlacementBinding implements K8sObject {
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
  placementRef: Subject
  subjects: [Subject]
}

type Subject {
  apiGroup: String
  kind: String
  name: String
}

type DeployableDependency {
  kind: String
  name: String
}

type WorkResult {
  # When a chart is used.
  chartURL: String
  namespace: String
  chartName: String
  chartVersion: String

  # When k8 objects are selected.
  kubeKind: String
  kubeName: String
  kubeCluster: String

  description: String
  firstDeployed: String
  lastDeployed: String
  status: String
  version: String
}

type Deployer {
  # When a chart is used.
  chartName: String
  namespace: String
  repository: String
  version: String
  chartURL: String

  # When k8 objects are selected.
  kubeKind: String
  kubeName: String

}

`;

/* eslint-disable max-len */
export const resolver = {
  Query: {
    applications: (root, args, { applicationModel }) => applicationModel.getApplications(args.name, args.namespace),
    // deployables: (root, args, { applicationModel }) => applicationModel.getDeployables(args.selector),
    // placementPolicies: (root, args, { applicationModel }) => applicationModel.getPlacementPolicies(args.selector),
  },
  Application: {
    applicationRelationships: (parent, args, { applicationModel }) =>
      applicationModel.getApplicationRelationships({ matchNames: parent.applicationRelationshipNames }),
    applicationWorks: (parent, args, { applicationModel }) =>
      applicationModel.getApplicationWorks({ deployableNames: parent.deployableNames, placementBindingNames: parent.placementBindingNames }),
    deployables: (parent, args, { applicationModel }) =>
      applicationModel.getDeployables({ matchNames: parent.deployableNames }),
    placementBindings: (parent, args, { applicationModel }) =>
      applicationModel.getPlacementBindings({ matchNames: parent.placementBindingNames }),
    placementPolicies: (parent, args, { applicationModel }) =>
      applicationModel.getPlacementPolicies({ matchNames: parent.placementPolicyNames }),
  },
  Mutation: {
    createApplication: (root, args, { applicationModel }) => applicationModel.createApplication(args.resources),
    deleteApplication: (root, args, { applicationModel }) => applicationModel.deleteApplication(args.path, args.resources),
  },
};

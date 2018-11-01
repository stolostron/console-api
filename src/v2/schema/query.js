/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

// eslint-disable-next-line
export const typeDef = `
type Query {
  applications(name: String, namespace: String): [Application]
  charts: [HelmChart]
  clusters: [Cluster]
  dashboard: DashboardData
  deployables (selector: JSON): [Deployable]
  namespaces: [Namespace]
  nodes: [Node]
  pods: [Pod]
  pvs: [PVs]
  pvsClaims: [PVsClaims]
  releases: [HelmRel]
  repos: [HelmRepo]

  # Policies and Compliances
  policies(name: String, namespace: String): [Policy]
  compliances(name: String, namespace: String): [Compliance]
  placementPolicies (selector: JSON): [PlacementPolicy]

  # Topology
  filters: Filters
  labels: [Label]
  resourceTypes: [String]
  topology(filter: Filter): Topology
}

type Mutation {
  # Creates an Application.
  # Requires a resource of kind "Application".
  # Other supported kinds are: ConfigMap, Deployable, DeployableOverride, and PlacementPolicy
  createApplication(resources: [JSON]): JSON

  # Creates a Kubernetes Policy
  createPolicy(resources: [JSON]): JSON

  # Delete Kubernetes Policy
  deletePolicy(namespace: String, name: String!): String

  # Creates Kubernetes Compliance
  createCompliance(resources: [JSON]): JSON

  # Update Kubernetes resources
  updateResource(resourceType: String!, namespace: String!, name: String!, body: JSON, selfLink: String): JSON
  
  # Update Kubernetes resources labels
  updateResourceLabels(resourceType: String!, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON
  
  # Delete Kubernetes Compliance
  deleteCompliance(namespace: String, name: String!): String

  # NOTE: This only deletes the top level Application object. Related objects like Deployable,
  # PlacementPolicy, ConfigMap, or DeployableOverride aren't deleted yet.
  deleteApplication(namespace: String, name: String!): String

  # Delete helm release on specific cluster
  # deleteHelmRelease(input: DeleteHelmReleaseInput): [HelmChartResponse]

  deleteHelmRepository(input: HelmRepoInput): HelmRepo
  installHelmChart(input: InstallHelmChartInput): [HelmChartResponse]
  setHelmRepo(input: HelmRepoInput): HelmRepo
}

# Common fields for all Kubernetes objects
interface K8sObject {
  metadata: Metadata
}

# Common fields in all Kubernetes metadata objects.
type Metadata {
  annotations: JSON
  creationTimestamp: String
  labels: JSON
  name: String
  namespace: String
  resourceVersion: String
  selfLink: String
  status: String
  uid: String
}
`;

export const resolver = {
  K8sObject: {
    __resolveType() {
      return null;
    },
  },
};

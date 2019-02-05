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
  overview(demoMode: Boolean): Overview
  namespaces: [Namespace]
  nodes: [Node]
  pods: [Pod]
  pvs: [PVs]
  pvsClaims: [PVsClaims]
  releases: [HelmRel]
  releasesFromSearch: [HelmRel]
  repos: [HelmRepo]
  logs(containerName: String!, podName: String!, podNamespace: String!, clusterName: String!): String

  search(input: [SearchInput]): [SearchResult]

  # Get all values for the given property. If a query is passed, then results will be filtered to only those matching the query.
  searchComplete(property: String!, query: SearchInput): [String]
  searchSchema: JSON
  userQueries: [userQuery]


  # Policies and Compliances
  policies(name: String, clusterName: String): [Policy]
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

  # Save a user query
  saveQuery(resource: JSON): JSON

  # Delete a user query
  deleteQuery(resource: JSON): JSON

  # Delete Kubernetes Policy
  deletePolicy(namespace: String, name: String!): String

  # Creates Kubernetes Compliance
  createCompliance(resources: [JSON]): JSON

  # Creates Kubernetes Resources
  createResources(resources: [JSON]): JSON

  # Update Kubernetes resources
  updateResource(resourceType: String!, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON

  # Update Kubernetes resources labels
  updateResourceLabels(resourceType: String!, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON

  # Delete Kubernetes Compliance
  deleteCompliance(namespace: String, name: String!, resources: JSON): String

  # NOTE: This deletes the top level Application object and any child resources the user has selected.
  # Child resources include Deployables, PlacementPolicies, ConfigMaps, ApplicationRelationships and DeployableOverrides.
  deleteApplication(path: String!, resources: JSON): String

  # Delete helm release on specific cluster
  deleteHelm(name: String!, namespace: String!, cluster: String!): JSON

  deleteHelmRepository(input: HelmRepoInput): HelmRepo
  installHelmChart(input: InstallHelmChartInput): [HelmChartResponse]
  setHelmRepo(input: HelmRepoInput): HelmRepo

  # Delete Kubernetes pod on managed cluster
  deletePod(name: String!, namespace: String!, cluster: String!): JSON
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

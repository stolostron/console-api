/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

// eslint-disable-next-line
export const typeDef = `
type Query {
  applications(name: String, namespace: String): [Application]
  channels(name: String, namespace: String): [Channel]  
  charts: [HelmChart] @deprecated(reason: "No longer in use. Will remove this query in 4.1")
  cluster(name: String, namespace: String): [Cluster]
  clusters: [Cluster]
  getResource(kind: String, name: String, namespace: String, cluster: String, selfLink: String): JSON
  overview(demoMode: Boolean): Overview
  namespaces: [Namespace] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  nodes: [Node] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  pod(name: String, namespace: String, clusterName: String): [Pod]
  pods: [Pod] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  pvs: [PVs] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  pvsClaims: [PVsClaims] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  releases: [HelmRel] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  release(name: String, namespace: String, clusterName: String): [HelmRel]
  releasesFromSearch: [HelmRel] @deprecated(reason: "Moved to search-api service in 4.1")
  repos: [HelmRepo] @deprecated(reason: "No longer in use. Will remove this query in 4.1")
  logs(containerName: String!, podName: String!, podNamespace: String!, clusterName: String!): String
  userAccess(resource: String!, action: String!, namespace: String, apiGroup: String): JSON
  # Generic call to update resources on both local and remote clusters
  updateResource(selfLink: String, namespace: String, kind: String, name: String, body: JSON, cluster: String): JSON

  search(input: [SearchInput]): [SearchResult] @deprecated(reason: "Moved to search-api service in 4.1")

  # Get all values for the given property. If a query is passed, then results will be filtered to only those matching the query.
  searchComplete(property: String!, query: SearchInput): [String] @deprecated(reason: "Moved to search-api service in 4.1")
  searchSchema: JSON @deprecated(reason: "Moved to search-api service in 4.1")
  userQueries: [userQuery]


  # Policies and Compliances
  policies(name: String, namespace: String, clusterName: String): [Policy]
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

  createChannel(resources: [JSON]): JSON

  # Creates a Kubernetes Policy
  createPolicy(resources: [JSON]): JSON

  # Save a user query
  saveQuery(resource: JSON): JSON

  # Delete a user query
  deleteQuery(resource: JSON): JSON

  # Creates Kubernetes Compliance
  createCompliance(resources: [JSON]): JSON

  # Creates Kubernetes Resources
  createResources(resources: [JSON], clusterInfo: JSON): JSON

  # Update Kubernetes resources
  updateResource(resourceType: String!, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON

  # Update Kubernetes resources labels
  updateResourceLabels(resourceType: String!, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON

  # Delete helm release on specific cluster
  deleteHelm(name: String!, namespace: String!, cluster: String!): JSON

  installHelmChart(input: InstallHelmChartInput): [HelmChartResponse]
  setHelmRepo(input: HelmRepoInput): HelmRepo @deprecated(reason: "No longer in use. Will remove this mutation in 4.1")

  # Delete resource via selfLink
  deleteResource(selfLink: String, name: String, namespace: String, cluster: String, kind: String, childResources: JSON): JSON
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

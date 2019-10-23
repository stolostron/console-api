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
# Multicloud Manager Queries
type Query {
  # Get application resources.
  applications(name: String, namespace: String): [Application]

  # Get all channel resources. Optionally, specify name and namespace to filter results.
  channels(name: String, namespace: String): [Channel]

  # Get a cluster resource.
  cluster(name: String, namespace: String): [Cluster]

  # List all managed clusters.
  clusters: [Cluster]

  # Get Nodes and node info
  nodes: [Node] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  node(namespace: String, name: String): [Node]
  
  # Account id for user.
  accountId: AccountId

  # Get Compliance/Policy info
  compliances(name: String, namespace: String): [Compliance] @deprecated(reason: "Compliances are deprecated from MCM. Use policies instead.")

  # Security findings
  occurrences: [Occurrence]

  # Get Cluster incidents.
  incidents(accountId: String, cluster: String): [cemIncident]
  
  # List all cloud connections and providers
  connections: [Connection]
  providers: [Provider]

  # Get any kubernetes resource from any managed cluster.
  getResource(kind: String, name: String, namespace: String, cluster: String, selfLink: String): JSON

  # Retrieves logs for the given container.
  logs(containerName: String!, podName: String!, podNamespace: String!, clusterName: String!): String

  # Resolves the data needed to render the overview page.
  overview(demoMode: Boolean): Overview

  # Get placement policies.
  placementPolicies (selector: JSON): [PlacementPolicy]

  # Get placement rules.
  placementrules (name: String, namespace: String): [PlacementRule]

  # Get policies.
  policies(name: String, namespace: String, clusterName: String): [Policy]

  # Get all subscription resources. Optionally, specify name and namespace to filter results.
  subscriptions(name: String, namespace: String): [Subscription]

  # Update any Kubernetes resources on both local and managed clusters.
  # FIXME: This must be moved to mutations, query operations should not change any data.
  updateResource(selfLink: String, namespace: String, kind: String, name: String, body: JSON, cluster: String): JSON

  # Resolves if the current user is authorized to access a given resource.
  userAccess(resource: String!, action: String!, namespace: String, apiGroup: String): JSON

  # Get logged in user information
  userInfo: userInfo

  # Get cloud event manager queries .
  cemIncidents: [cemIncident]

  # Get cloud event manager queries .
  cemIncidentsForApplication(name: String!, namespace: String): [cemIncident]

  # Used for Topology.
  filters: Filters

  # Used for Topology.
  labels: [Label]

  # Used for Topology.
  resourceTypes: [String]

  # Gets data for the topology diagram.
  topology(filter: TopologyFilter): Topology

  getAutomatedImportStatus(namespace: String, name: String): JSON

  getImportYamlTemplate: JSON

  # DEPRECATED QUERIES
  charts: [HelmChart] @deprecated(reason: "No longer in use. Will remove this query in 4.1")
  namespaces: [Namespace] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  pod(name: String, namespace: String, clusterName: String): [Pod] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  pods: [Pod] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  pvs: [PVs] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  pvsClaims: [PVsClaims] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  releases: [HelmRel] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  release(name: String, namespace: String, clusterName: String): [HelmRel] @deprecated(reason: "Use search, search has been moved to search-api. Will remove this query in 4.1")
  releasesFromSearch: [HelmRel] @deprecated(reason: "Moved to search-api service in 4.1")
  repos: [HelmRepo] @deprecated(reason: "No longer in use. Will remove this query in 4.1")
}

# Multicloud Manager Mutations
type Mutation {
  # Creates an Application.
  # Requires a resource of kind "Application".
  # Other supported kinds are: ConfigMap, Deployable, DeployableOverride, and PlacementPolicy
  createApplication(resources: [JSON]): JSON

  # Creates a channel resource.
  createChannel(resources: [JSON]): JSON

  # Creates a Kubernetes Policy.
  createPolicy(resources: [JSON]): JSON

  # Creates a subscription resource.
  createSubscription(resources: [JSON]): JSON

  # Creates a placement rule resource.
  createPlacementRule(resources: [JSON]): JSON

  # Creates Kubernetes resources in any cluster.
  createResources(resources: [JSON], clusterInfo: JSON): JSON

  # Creates a cloud connection
  createCloudConnection(body: JSON) : JSON

  # Delete a cloud connection
  deleteCloudConnection(namespace: String!, name: String!) : JSON

  # Edit a cloud connection
  editCloudConnection(body: JSON, namespace: String!, name: String!) : JSON

  # Updates Kubernetes resources in any managed cluster.
  updateResource(resourceType: String!, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON

  # Updates the labels of a Kubernetes resource.
  updateResourceLabels(resourceType: String!, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON

  # Delete helm release on specific cluster. Used by catalog.
  deleteHelm(name: String!, namespace: String!, cluster: String!): JSON

  # Delete any Kubernetes resource via selfLink
  deleteResource(selfLink: String, name: String, namespace: String, cluster: String, kind: String, childResources: JSON): JSON

  # Create remote cluster
  createCluster(namespace: String!, cluster: JSON!) : JSON
  createClusterResource(body: String): JSON

  automatedImport(namespace: String, name: String, body: JSON): JSON

  deleteCluster(namespace: String, cluster: String): JSON
  updateClusterResource(namespace: String, name: String, body: String): JSON

  # DEPRECATED MUTATIONS
  createCompliance(resources: [JSON]): JSON  @deprecated(reason: "Compliances are deprecated from MCM. Use policies instead.")
  installHelmChart(input: InstallHelmChartInput): [HelmChartResponse] @deprecated(reason: "No longer in use. Will remove this mutation in 4.1")
  setHelmRepo(input: HelmRepoInput): HelmRepo @deprecated(reason: "No longer in use. Will remove this mutation in 4.1")
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

#fields for all API objects
interface ConnectionObject {
  metadata: ConnectionMetadata
}

 #Common fields for all API objects
type ConnectionMetadata {
  name: String
  namespace: String
  provider: String
  name_namespace: String
}
`;

export const resolver = {
  K8sObject: {
    __resolveType() {
      return null;
    },
  },
  ConnectionObject: {
    __resolveType() {
      return null;
    },
  },
};

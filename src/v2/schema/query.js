/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import { gql } from 'apollo-server-express';

// eslint-disable-next-line
export const typeDef = gql`
# Multicloud Manager Queries
type Query {
  # Get application resources.
  application(name: String, namespace: String): Application

  # Get ArgoApp Route URL
  argoAppRouteURL(cluster: String!, namespace: String): [String]

  # Get all channel resources. Optionally, specify name and namespace to filter results.
  channels(name: String, namespace: String): [Channel]

  # Get all branches for a Git channel
  gitChannelBranches(gitUrl: String!, namespace: String, secretRef: String, user: String, accessToken: String): [String]

  # Get all paths for a Git channel
  gitChannelPaths(gitUrl: String!, branch: String!, path: String, namespace: String, secretRef: String, user: String, accessToken: String): [String]

  # Get any kubernetes resource from any managed cluster.
  getResource(apiVersion: String, kind: String, name: String, namespace: String, cluster: String, selfLink: String, updateInterval: Int, deleteAfterUse: Boolean): JSON

  # Retrieves logs for the given container.
  logs(containerName: String!, podName: String!, podNamespace: String!, clusterName: String!): String

  # Resolves the data needed to render the overview page.
  overview(demoMode: Boolean): Overview

  # Get placement policies.
  placementPolicies (selector: JSON): [PlacementPolicy]

  # Get placement rules.
  placementrules (name: String, namespace: String): [PlacementRule]

  # Get secrets
  secrets(namespace: String): [Secret]

  # Get all subscription resources. Optionally, specify name and namespace to filter results.
  subscriptions(name: String, namespace: String): [Subscription]

  # Get all subscriptions that apply to a given cluster
  subscriptionsForCluster(clusterName: String!, clusterNamespace: String!): [Subscription]

  # Update any Kubernetes resources on both local and managed clusters.
  # FIXME: This must be moved to mutations, query operations should not change any data.
  updateResource(selfLink: String, namespace: String, kind: String, name: String, body: JSON, cluster: String): JSON

  # Resolves if the current user is authorized to access a given resource.
  userAccess(resource: String, kind: String, action: String!, namespace: String, apiGroup: String, name: String, version: String): JSON

  # Resolves if the current user is authorized to access a given resource.
  userAccessAnyNamespaces(resource: String!, action: String!, apiGroup: String, name: String, version: String): JSON

  # Get cloud event manager queries .
  applicationNamespaces(namespace: String): [ApplicationNamespace]

  # Used for Topology.
  filters: Filters

  # Used for Topology.
  labels: [Label]

  # Used for Topology.
  resourceTypes: [String]

  # Gets data for the topology diagram.
  topology(filter: TopologyFilter): Topology
}

# Multicloud Manager Mutations
type Mutation {
  # Creates an Application.
  createApplication(application: [JSON]!): JSON

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
  updateResource(resourceType: String!, apiVersion: String, kind:String, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON

  # Updates the labels of a Kubernetes resource.
  updateResourceLabels(resourceType: String!, apiVersion:String, kind:String, namespace: String!, name: String!, body: JSON, selfLink: String, resourcePath: String): JSON

  # Updates an Application.
  updateApplication(application: [JSON]!): JSON

  # Delete helm release on specific cluster. Used by catalog.
  deleteHelm(name: String!, namespace: String!, cluster: String!): JSON

  # Delete any Kubernetes resource via selfLink
  deleteResource(selfLink: String, apiVersion: String, name: String, namespace: String, cluster: String, kind: String, childResources: JSON): JSON

  # Delete a ManagedClusterView resource
  deleteManagedClusterView(managedClusterNamespace: String, managedClusterViewName: String): JSON
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
    // eslint-disable-next-line no-underscore-dangle
    __resolveType() {
      return null;
    },
  },
};

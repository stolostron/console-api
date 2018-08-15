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
  applications(name: String): [Application]
  charts: [HelmChart]
  clusters: [Cluster]
  dashboard: DashboardData
  deployables (selector: JSON): [Deployable]
  namespaces: [Namespace]
  nodes: [Node]
  pods: [Pod]
  repos: [HelmRepo]
  placementPolicies (selector: JSON): [PlacementPolicy]
  policies: [Policy]

  # Topology
  filters: Filters
  labels: [Label]
  resourceTypes: [String]
  topology(filter: Filter): Topology
}

type Mutation {
  deleteHelmRepository(input: HelmRepoInput): HelmRepo
  setHelmRepo(input: HelmRepoInput): HelmRepo
}
`;

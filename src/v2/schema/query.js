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
  charts: [HelmChart]
  clusters: [Cluster]
  namespaces: [Namespace]
  nodes: [Node]
  pods: [Pod]
  repos: [HelmRepo]
}

type Mutation {
  deleteHelmRepository(input: HelmRepoInput): HelmRepo
  setHelmRepo(input: HelmRepoInput): HelmRepo
}
`;

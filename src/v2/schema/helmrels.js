/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type HelmRel {
  chartName: String
  chartVersion: String
  namespace: String
  status: String
  version: Int
  name: String
  cluster: String
  lastDeployed: String
}

input DeleteHelmReleaseInput {
  cluster: String!
  name: String!
}
`;

export const resolver = {
  Query: {
    releases: (root, args, { helmModel }) => helmModel.getReleases(args),
  },
  // Mutation: {
  //   deleteHelmRelease: (root, { input }, { helmModel }) => helmModel.deleteRelease(input),
  // },
};

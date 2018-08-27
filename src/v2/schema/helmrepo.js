/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
input HelmRepoInput {
  Name: String!
  URL: String
}

type HelmRepo {
  Name: String
  URL: String
}
`;

export const resolver = {
  Query: {
    repos: async (root, args, { helmModel }) => helmModel.getRepos(args),
  },
  Mutation: {
    setHelmRepo: (root, { input }, { helmModel }) => helmModel.setRepo(input),
    deleteHelmRepository: (root, { input }, { helmModel }) => helmModel.deleteRepo(input),
  },
};

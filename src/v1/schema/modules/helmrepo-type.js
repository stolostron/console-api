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
  Name: String
  URL: String
}

type HelmRepo {
  Name: String
  URL: String
}

input DeleteHelmRepositoryInput {
  Name: String!
  URL: String
}
`;

export const helmRepoResolver = {
  Query: {
    repos: async (root, args, { req, hcmConnector }) => {
      const response = await hcmConnector.processRequest(req, '/api/v1alpha1/repo/*', { Resource: 'repo', Operation: 'get' });
      return response ? Object.values(response) : [];
    },
  },
  Mutation: {
    setHelmRepo: (root, { input }, { req, hcmConnector }) => {
      const response = hcmConnector.processRequest(req, '/api/v1alpha1/repo', {
        Resource: 'repo',
        Operation: 'set',
        Action: input,
      }, { method: 'POST' });
      return response;
    },
    deleteHelmRepository: (root, { input }, { req, hcmConnector }) => {
      const response = hcmConnector.processRequest(req, `/api/v1alpha1/repo/${input.Name}`, {
        Resource: 'repo',
        Operation: 'delete',
        Action: input,
      }, { method: 'DELETE' });
      return response;
    },
  },
};

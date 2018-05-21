/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { setRepo, repos } from '../../datasource/hcm';

export const typeDef = `
input HelmRepoInput {
  Name: String
  URL: String
}

type HelmRepo {
  Name: String
  URL: String
}
`;

export const helmRepoResolver = {
  Query: {
    repos,
  },
  Mutation: {
    setHelmRepo: (root, { input }, req) => setRepo(req, input),
  },
};

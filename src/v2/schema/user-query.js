/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type userQuery {
  name: String
  description: String
  searchText: String
}
`;

export const resolver = {
  Query: {
    userQueries: (parent, args, { queryModel, req }) =>
      queryModel.getQueries({ ...args, req }),
  },
  Mutation: {
    saveQuery: (root, args, { queryModel, req }) => queryModel.saveQuery({ ...args, req }),
    deleteQuery: (root, args, { queryModel, req }) => queryModel.deleteQuery({ ...args, req }),
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type AccountId {
  userId: String
  lastLogin: String
  activeAccountId: String
  activeAccountName: String
}
`;

export const resolver = {
  Query: {
    accountId: (parent, args, { accountModel, req }) =>
      accountModel.getAccountId({ req }),
  },
};

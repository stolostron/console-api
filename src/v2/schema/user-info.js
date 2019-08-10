/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type userInfo {
  userId: String
  lastlogin: String
  activeAccountId: String
  activeAccountName: String
}
`;

export const resolver = {
  Query: {
    userInfo: (parent, args, { userInfoModel, req }) =>
      userInfoModel.getUserInfo({ ...args, req }),
  },
};

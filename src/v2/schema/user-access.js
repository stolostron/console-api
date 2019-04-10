/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type userAccess {
  resource: String
  action: String
}
`;

export const resolver = {
  Query: {
    userAccess: (parent, args, { genericModel }) =>
      genericModel.userAccess({ resource: args.resource, action: args.action }),
  },
};

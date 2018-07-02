/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Namespace {
  name: String
  cluster: String
  Status: String
}
`;

export const namespaceResolver = {
  Query: {
    namespaces: (obj, args, { req, hcmConnector }) => hcmConnector.getWork(req, 'namespaces', {
      json: {
        Work: { Status: 'all' },
      },
    }),
  },
};

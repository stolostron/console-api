/* eslint-disable max-len */
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Connection implements ConnectionObject {
  metadata: ConnectionMetadata
  statusCode: Int
  errorMsg: String
}

type ConnectionDetail {
  name: String
  namespace: String
  provider: String
  metadata: JSON
}
`;

export const resolver = {
  Query: {
    connections: (parent, args, { connectionModel, req }) =>
      connectionModel.getConnections({ user: req.user }),
    connectionDetails: (parent, args, { connectionModel, req }) =>
      connectionModel.getConnectionDetails({ user: req.user }),
  },
  Mutation: {
    createCloudConnection: (parent, args, { connectionModel }) =>
      connectionModel.createConnection(args),
    deleteCloudConnection: (parent, args, { connectionModel }) =>
      connectionModel.deleteConnection(args),
    editCloudConnection: (parent, args, { connectionModel }) =>
      connectionModel.editConnection(args),
  },
};


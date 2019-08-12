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
type Provider {
  name: String
  longname: String
  configMetadata: String
  configValues: String
  clusterMetadata: String
  clusterValues: String
  statusCode: Int
}
`;

export const resolver = {
  Query: {
    connections: (parent, args, { connectionsModel, req }) =>
      connectionsModel.getConnections({ user: req.user }),
    providers: (parent, args, { connectionsModel }) =>
      connectionsModel.getProviders(),
  },
  Mutation: {
    createCloudConnection: (parent, args, { connectionsModel }) =>
      connectionsModel.createConnection(args),
    deleteCloudConnection: (parent, args, { connectionsModel }) =>
      connectionsModel.deleteConnection(args),
    editCloudConnection: (parent, args, { connectionsModel }) =>
      connectionsModel.editConnection(args),
  },
};

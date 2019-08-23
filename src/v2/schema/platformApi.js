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
    getAutomatedImportStatus: (parent, args, { platformApiModel }) => platformApiModel.getAutomatedImportStatus(args),
    connections: (parent, args, { platformApiModel, req }) =>
      platformApiModel.getConnections({ user: req.user }),
    providers: (parent, args, { platformApiModel }) =>
      platformApiModel.getProviders(),
  },
  Mutation: {
    createClusterResource: (parent, args, { platformApiModel }) => platformApiModel.createClusterResource(args),
    createCluster: (parent, args, { platformApiModel }) => platformApiModel.createCluster(args),
    automatedImport: (parent, args, { platformApiModel }) => platformApiModel.automatedImport(args),
    deleteCluster: (parent, args, { platformApiModel }) => platformApiModel.deleteCluster(args),
    updateClusterResource: (parent, args, { platformApiModel }) => platformApiModel.updateClusterResource(args),
    createCloudConnection: (parent, args, { platformApiModel }) =>
      platformApiModel.createConnection(args),
    deleteCloudConnection: (parent, args, { platformApiModel }) =>
      platformApiModel.deleteConnection(args),
    editCloudConnection: (parent, args, { platformApiModel }) =>
      platformApiModel.editConnection(args),
  },
};

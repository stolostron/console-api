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

type Orchestration {
  name: String
  longname: String
  categoryName: String
  categoryLongname: String
  type: String
  configMetadata: String
  configValues: String
  clusterMetadata: String
  clusterValues: String
  statusCode: Int
}
`;

export const resolver = {
  Query: {
    getAutomatedImportStatus: (parent, args, { rcmApiModel }) => rcmApiModel.getAutomatedImportStatus(args),
    connections: (parent, args, { rcmApiModel, req }) =>
      rcmApiModel.getConnections({ user: req.user }),
    connectionDetails: (parent, args, { rcmApiModel, req }) =>
      rcmApiModel.getConnectionDetails({ user: req.user }),
    orchestrations: (parent, args, { rcmApiModel }) =>
      rcmApiModel.getOrchestrations(),
  },
  Mutation: {
    createClusterResource: (parent, args, { rcmApiModel }) => rcmApiModel.createClusterResource(args),
    createCluster: (parent, args, { rcmApiModel }) => rcmApiModel.createCluster(args),
    previewCluster: (parent, args, { rcmApiModel }) => rcmApiModel.previewCluster(args),
    automatedImport: (parent, args, { rcmApiModel }) => rcmApiModel.automatedImport(args),
    deleteCluster: (parent, args, { rcmApiModel }) => rcmApiModel.deleteCluster(args),
    updateClusterResource: (parent, args, { rcmApiModel }) => rcmApiModel.updateClusterResource(args),
    createCloudConnection: (parent, args, { rcmApiModel }) =>
      rcmApiModel.createConnection(args),
    deleteCloudConnection: (parent, args, { rcmApiModel }) =>
      rcmApiModel.deleteConnection(args),
    editCloudConnection: (parent, args, { rcmApiModel }) =>
      rcmApiModel.editConnection(args),
  },
};


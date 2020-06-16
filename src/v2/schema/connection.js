/* eslint-disable max-len */
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
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
    connections: (parent, args, { connectionModel }) => connectionModel.getConnections(),
    connectionDetails: (parent, args, { connectionModel }) => connectionModel.getConnectionDetails(args),
  },
  Mutation: {
    createCloudConnection: (parent, args, { connectionModel }) => connectionModel.createConnection(args),
    deleteCloudConnection: (parent, args, { connectionModel }) => connectionModel.deleteConnection(args),
    editCloudConnection: (parent, args, { connectionModel }) => connectionModel.editConnection(args),
  },
};

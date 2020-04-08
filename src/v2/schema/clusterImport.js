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

export const typeDef = `
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
    getImportYamlTemplate: (parent, args, { clusterImportModel }) => clusterImportModel.getImportYamlTemplate(),
  },
  Mutation: {
    createClusterResource: (parent, args, { clusterImportModel }) => clusterImportModel.createClusterResource(args),
  },
};


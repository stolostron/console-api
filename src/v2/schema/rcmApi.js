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
    getImportYamlTemplate: (parent, args, { rcmApiModel }) => rcmApiModel.getImportYamlTemplate(),
    // orchestrations: (parent, args, { rcmApiModel }) =>
    //   rcmApiModel.getOrchestrations(),
  },
  Mutation: {
    createClusterResource: (parent, args, { rcmApiModel }) => rcmApiModel.createClusterResource(args),
    // createCluster: (parent, args, { rcmApiModel }) => rcmApiModel.createCluster(args),
    // previewCluster: (parent, args, { rcmApiModel }) => rcmApiModel.previewCluster(args),
    // automatedImport: (parent, args, { rcmApiModel }) => rcmApiModel.automatedImport(args),
    deleteCluster: (parent, args, { rcmApiModel }) => rcmApiModel.deleteCluster(args),
    // updateClusterResource: (parent, args, { rcmApiModel }) => rcmApiModel.updateClusterResource(args),
  },
};


/* eslint-disable max-len */
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = '';

export const resolver = {
  Query: {
    getAutomatedImportStatus: (parent, args, { platformApiModel }) => platformApiModel.getAutomatedImportStatus(args),
  },
  Mutation: {
    createClusterResource: (parent, args, { platformApiModel }) => platformApiModel.createClusterResource(args),
    automatedImport: (parent, args, { platformApiModel }) => platformApiModel.automatedImport(args),
  },
};

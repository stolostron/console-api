/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
`;

export const resolver = {
  Query: {
    getResource: (parent, args, { genericModel }) =>
      genericModel.getResource(args.kind, args.name, args.namespace, args.cluster, args.apiGroup),
  },
  Mutation: {
    // patch cluster labels
    updateResourceLabels: (parent, args, { genericModel }) =>
      genericModel.patchResource(args),
    updateResource: (parent, args, { genericModel }) => {
      if (args.resourcePath) {
        return genericModel.patchResource(args);
      }
      return genericModel.putResource(args);
    },
    createResources: (parent, args, { genericModel }) => genericModel.createResources(args),
  },
};

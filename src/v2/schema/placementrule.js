/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `

#PlacementRule
type PlacementRule implements K8sObject {
  namespace: String
  metadata: Metadata
  raw: JSON
}

`;

/* eslint-disable max-len */
export const resolver = {
  Query: {
    placementrules: (root, args, { placementRuleModel }) => placementRuleModel.getPlacementRules(args.name, args.namespace),
  },
  Mutation: {
    createPlacementRule: (root, args, { placementRuleModel }) => placementRuleModel.createPlacementRule(args.resources),
  },

};

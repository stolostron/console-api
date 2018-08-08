/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Policy {
  name: String
  namespace: String
  # Possible values are: compliant, notcompliant, invalid
  status: String
}
`;

export const resolver = {
  Query: {
    policies: (root, args, { kubeModel }) => kubeModel.getPolicies(args),
  },
};

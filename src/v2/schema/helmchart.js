/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type HelmChart {
  repoName: String
  name: String
  version: String
  urls: [String]
}
`;

export const resolver = {
  Query: {
    charts: async (root, args, { kubeModel }) => kubeModel.getCharts(args),
  },
};

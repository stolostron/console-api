/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type HelmRel {
  chartName: String
  chartVersion: String
  namespace: String
  status: String
  version: Int
  name: String
  cluster: Cluster
  lastDeployed: String
}
`;

export const resolver = {
  Query: {
    release: (root, args, { helmModel }) =>
      helmModel.getRelease(args.name, args.namespace, args.clusterName),
    releases: (root, args, { helmModel, req }) => helmModel.getReleases({ user: req.user }),
  },
  HelmRel: {
    cluster: (parent, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, name: parent.cluster, user: req.user }),
  },
  Mutation: {
    deleteHelm: (root, args, { genericModel }) => genericModel.resourceAction('helm', 'Delete', args.name, args.namespace, args.cluster),
  },
};

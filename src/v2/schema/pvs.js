/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
  type PVs implements K8sObject {
    accessModes: [String]
    capacity: String
    claim: String
    # ClaimRef includes name and namespace
    claimRef: JSON
    cluster: Cluster
    metadata: Metadata
    reclaimPolicy: String
    status: String
    # Type can be either LocalVolume or Hostpath
    type: String
  }

  type PVsClaims implements K8sObject {
    accessModes: [String]
    cluster: Cluster
    metadata: Metadata
    persistentVolume: String
    requests: String
    status: String
  }
`;

export const resolver = {
  Query: {
    pvs: (root, args, { resourceViewModel }) => resourceViewModel.fetchResources({ type: 'persistentvolumes' }),
    pvsClaims: (root, args, { resourceViewModel }) => resourceViewModel.fetchResources({ type: 'persistentvolumeclaims' }),
  },
  PVs: {
    cluster: async (parent, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, name: parent.cluster, user: req.user }),
  },
  PVsClaims: {
    cluster: async (parent, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, name: parent.cluster, user: req.user }),
  },
};

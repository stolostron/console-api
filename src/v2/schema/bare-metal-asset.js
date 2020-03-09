/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2020. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
export const typeDef = `
type BmcType {
  address: String
  credentialsName: String
}

type BmcClusterDeploymentType {
  name: String
  namespace: String
}

type BareMetalAsset implements K8sObject {
  metadata: Metadata
  bmc: BmcType
  bootMACAddress: String
  clusterDeployment: BmcClusterDeploymentType
  hardwareProfile: String
  role: String
}
`;

export const resolver = {
  Query: {
    bareMetalAssets: (root, args, { bareMetalAssetModel }) =>
      bareMetalAssetModel.getBareMetalAssets({ ...args }),
    bareMetalAsset: (root, args, { bareMetalAssetModel }) =>
      bareMetalAssetModel.getSingleBareMetalAsset({ ...args }),
  },
  Mutation: {
    // TODO
    // createBareMetalAsset: (parent, args, { bareMetalAssetModel }) =>
    //  bareMetalAssetModel.createBareMetalAsset(args),
  },

};


/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * (c) Copyright Red Hat, Inc. All Rights Reserved.
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

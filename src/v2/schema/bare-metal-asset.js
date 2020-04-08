
/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
export const typeDef = `
type BmcType {
  address: String
  credentialsName: String
  username: String
  password: String
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
  status: String
}

type BareMetalAssetSubresources {
  namespaces: [String],
  bareMetalAsset: [BareMetalAsset]
}
`;

export const resolver = {
  Query: {
    bareMetalAssets: (root, args, { bareMetalAssetModel }) =>
      bareMetalAssetModel.getBareMetalAssets({ ...args }),
    bareMetalAsset: (root, args, { bareMetalAssetModel }) =>
      bareMetalAssetModel.getSingleBareMetalAsset({ ...args }),
    bareMetalAssetSubresources: (root, args, { bareMetalAssetModel }) =>
      bareMetalAssetModel.getBareMetalAssetSubresources({ ...args }),
  },
  Mutation: {
    createBareMetalAsset: (parent, args, { bareMetalAssetModel }) =>
      bareMetalAssetModel.createBareMetalAsset(args),
    updateBareMetalAsset: (parent, args, { bareMetalAssetModel }) =>
      bareMetalAssetModel.updateBareMetalAsset(args),
    deleteBareMetalAssets: (parent, args, { bareMetalAssetModel }) =>
      bareMetalAssetModel.deleteBareMetalAssets(args),
  },

};

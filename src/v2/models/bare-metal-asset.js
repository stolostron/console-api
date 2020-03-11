/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * (c) Copyright Red Hat, Inc. All Rights Reserved.
 ****************************************************************************** */
import KubeModel from './kube';

function transform(bareMetalAssets) {
  const { spec } = bareMetalAssets;

  return {
    metadata: bareMetalAssets.metadata,
    ...spec,
  };
}

export default class BareMetalAssetModel extends KubeModel {
  async getSingleBareMetalAsset(args = {}) {
    const { name, namespace } = args;
    const [bareMetalAsset] = await Promise.all([
      this.kubeConnector.get(`/apis/midas.io/v1alpha1/namespaces/${namespace}/baremetalassets/${name}`),
      // TODO: do we need secrets?
    ]);
    if (bareMetalAsset.metadata !== undefined) {
      return [transform(bareMetalAsset)];
    }
    return [];
  }

  async getBareMetalAssets(args = {}) {
    const { name } = args;
    const allBareMetalAssets = await this.getAllBareMetalAssets(args);
    if (name) {
      return allBareMetalAssets.find(bma => bma.metadata.name === name);
    }
    return allBareMetalAssets;
  }

  async getAllBareMetalAssets() {
    const [bareMetalAssets] = await Promise.all([
      this.kubeConnector.get('/apis/midas.io/v1alpha1/baremetalassets'),
      // TODO: do we need secrets?
    ]);
    if (bareMetalAssets.items !== undefined) {
      return bareMetalAssets.items.map(transform);
    }
    return [];
  }
}

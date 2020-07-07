/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import _ from 'lodash';
import { gql } from 'apollo-server-express';

export const typeDef = gql`
type Cluster implements K8sObject {
  availableVersions: [String]
  clusterip: String
  consoleURL: String
  desiredVersion: String
  distributionVersion: String
  isHive: Boolean
  isManaged: Boolean
  metadata: Metadata
  nodes: Int
  serverAddress: String
  status: String
  k8sVersion: String
  upgradeFailed: Boolean
  adminKubeconfigSecret: String
  adminPasswordSecret: String
  installConfigSecret: String
}

type ClusterImageSet {
  name: String
  releaseImage: String
  channel: String
  visible: String
  platformAws: String
  platformGcp: String
  platformAzure: String
  platformBmc: String
  platformVmware: String
  imagecontentsourceUrl: String
  imagecontentsourceMirrorUrl: String
}
`;

export const resolver = {
  Query: {
    cluster: (parent, args, { clusterModel }) => clusterModel.getSingleCluster(args),
    clusters: (parent, args, { clusterModel }) => clusterModel.getClusters(args),
    clusterImageSets: (parent, args, { clusterModel }) => clusterModel.getClusterImageSets(),
  },
  Mutation: {
    createCluster: async (parent, args, { clusterModel, bareMetalAssetModel }) => {
      // if creating a bare metal cluster, make sure all hosts have user/password
      const map = _.keyBy(args.cluster, 'kind');
      const hosts = _.get(map, 'ClusterDeployment.spec.platform.baremetal.hosts');
      if (hosts) {
        await bareMetalAssetModel.syncBMAs(hosts);
      }

      // create the cluster
      const results = await clusterModel.createCluster(args);

      // if this was a successful bare metal deployment,
      // update the bma's with what cluster now owns them
      const { errors } = results;
      if (errors.length === 0 && hosts) {
        const clusterName = _.get(map, 'ClusterDeployment.metadata.name');
        await bareMetalAssetModel.attachBMAs(hosts, clusterName, errors);
      }
      return results;
    },
    detachCluster: (parent, args, { clusterModel }) => clusterModel.detachCluster(args),
  },
};

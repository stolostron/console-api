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
import ClusterModel from '../models/cluster';

export const typeDef = `
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
  # Returns % of memory used.
  totalMemory: String
  # Returns % of storage used.
  totalStorage: String
  # Returns % of CPU used.
  totalCPU: String
  klusterletVersion: String
  k8sVersion: String
  upgradeFailed: Boolean
  adminKubeconfigSecret: String
  adminPasswordSecret: String
  installConfigSecret: String
}

type ClusterImageSet {
  name: String
  releaseImage: String
}


`;


export const resolver = {
  Query: {
    cluster: (parent, args, { clusterModel, req }) =>
      clusterModel.getSingleCluster({ ...args, user: req.user }),
    clusters: (parent, args, { clusterModel, req }) =>
      clusterModel.getClusters({ ...args, user: req.user }),
    clusterImageSets: (parent, args, { clusterModel, req }) =>
      clusterModel.getClusterImageSets({ ...args, user: req.user }),
  },
  Cluster: {
    status: (parent, args, { clusterModel }) => clusterModel.getStatus(parent),
    totalCPU: parent => ClusterModel.resolveUsage('cpu', parent.rawStatus),
    totalMemory: parent => ClusterModel.resolveUsage('memory', parent.rawStatus),
    totalStorage: parent => ClusterModel.resolveUsage('storage', parent.rawStatus),
  },
  Mutation: {
    createCluster: async (parent, args, { clusterModel, bareMetalAssetModel }) => {
      const results = await clusterModel.createCluster(args);

      // if this was a successful bare metal deployment,
      // update the bma's with what cluster grabbed them
      const { errors } = results;
      if (errors.length === 0) {
        const map = _.keyBy(args.cluster, 'kind');
        const hosts = _.get(map, 'ClusterDeployment.spec.platform.baremetal.hosts');
        if (hosts) {
          const clusterName = _.get(map, 'ClusterDeployment.metadata.name');
          await bareMetalAssetModel.attachBMAs(hosts, clusterName, errors);
        }
      }
      return results;
    },
    detachCluster: (parent, args, { clusterModel }) => clusterModel.detachCluster(args),
  },
};

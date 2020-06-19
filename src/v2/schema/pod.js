/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type Pod implements K8sObject {
    cluster: Cluster
    containers: [Container]
    hostIP: String
    images: [String]
    metadata: Metadata
    owners: [Owner]
    podIP: String
    restarts: Int
    startedAt: String
    status: String
  }

  type Owner {
    controller: Boolean
    kind: String
    name: String
    uid: String
  }

  type Container {
    image: String
    imagePullPolicy: String
    name: String
  }
`;

function resolveImages({ containers }) {
  if (containers) {
    return Object.keys(containers).map((key) => containers[key].image);
  }
  return [];
}

export const resolver = {
  Query: {
    pod: (parent, args, { resourceViewModel }) => resourceViewModel.fetchResource('pods', args.clusterName, args.name, args.namespace),
    pods: (parent, args, { resourceViewModel }) => resourceViewModel.fetchResources({ type: 'pods' }),
    logs: (root, args, { genericModel }) => genericModel.getLogs(args.containerName, args.podName, args.podNamespace, args.clusterName),
  },
  Pod: {
    images: (parent) => resolveImages(parent),
  },
};

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

#Subscription
type Subscription implements K8sObject {
  namespace: String
  # special use for Namespace Channel, if this is defined, skip the channel and source field
  sourceNamespace: String
  # special use for HelmRepo Channel, if this is defined, skip channel field
  source: String
  # NamespacedName to define channel in hub
  channel: String
  # To define specific name for package, optional for mcm because we have packageFilter
  package: String
  packageFilter: JSON
  packageOverrides: JSON
  placement: JSON
  metadata: Metadata
  raw: JSON
}

`;

/* eslint-disable max-len */
export const resolver = {
  Query: {
    subscriptions: (root, args, { subscriptionModel }) => subscriptionModel.getSubscriptions(args.name, args.namespace),
    subscriptionsForCluster: (root, args, { subscriptionModel }) => subscriptionModel.getSubscriptionsForCluster(args.clusterName, args.clusterNamespace),
  },
  Mutation: {
    createSubscription: (root, args, { subscriptionModel }) => subscriptionModel.createSubscription(args.resources),
  },
};

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
type Application implements K8sObject {
  metadata: Metadata
  name: String
  namespace: String
  app: JSON
  subscriptions: [JSON]
}

type ApplicationNamespace {
  metadata: Metadata
  raw: JSON
}

type PlacementPolicy implements K8sObject {
  clusterLabels: JSON
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
  clusterReplicas: Int
  resourceSelector: JSON
  status: JSON
}

type PlacementBinding implements K8sObject {
  metadata: Metadata
  # The object's yaml definition in JSON format.
  raw: JSON
  placementRef: Subject
  subjects: [Subject]
}

type Subject {
  apiGroup: String
  kind: String
  name: String
}


`;

/* eslint-disable max-len */
export const resolver = {
  Query: {
    application: (root, args, { applicationModel }) => applicationModel.getApplication(args.name, args.namespace, null, true),
    applicationNamespaces: (parent, args, { applicationModel }) => applicationModel.getApplicationNamespace(args.namespace),  
  },
  Mutation: {
    createApplication: (root, args, { applicationModel }) => applicationModel.createApplication(args),
  },
};

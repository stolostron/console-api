/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import { gql } from 'apollo-server-express';
import getApplicationElements from './applicationHelper';

export const typeDef = gql`
type Resource {
  cluster: String
  clusterName: String
  labels: [Label]
  name: String
  namespace: String
  relationships: [Relationship]
  topology: String
  type: String
  specs: JSON
  uid: String
  id: String
}

type Relationship {
  type: String
  to: Resource
  from: Resource
  specs: JSON
}

type Topology {
  resources: [Resource]
  relationships: [Relationship]
}

type Label {
  name: String
  value: String
}

input LabelInput {
  name: String
  value: String
}

input TopologyFilter {
  application: [JSON]
  cluster: [JSON]
  policy: [JSON]
  namespace: [String]
  type: [String]
}

`;

export const resolver = {
  Query: {
    // first pass--get the main topology
    topology: async (root, { filter }, { clusterModel, applicationModel }) => {
      let resources = [];
      let relationships = [];
      const { name, namespace, channel, apiVersion, cluster } = filter.application[0];
      const application = await applicationModel.getApplication(name, namespace, channel, undefined, apiVersion, cluster);
      if (application) {
        ({ resources, relationships } = await getApplicationElements(application, clusterModel, cluster));
      }
      return { resources, relationships };
    },
  },

};

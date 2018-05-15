/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { label, resource, relationship, type } from '../../datasource/mongodb';

export const typeDef = `
type Resource {
    cluster: String
    labels: [Label]
    name: String
    namespace: String
    relationships: [Relationship]
    topology: String
    type: String
    uid: String
}

type Relationship {
  type: String
  to: Resource
  from: Resource
}

type Topology {
  resources: [Resource]
  relationships: [Relationship]
}

input LabelInput {
  name: String
  value: String
}

input Filter {
  cluster: [String]
  label: [LabelInput]
  namespace: [String]
  type: [String]
}
`;


export const topologyResolver = {
  Query: {
    resource: async (root, args) => {
      const result = await resource(args);
      return result[0];
    },
    resources: async (root, args = {}) => resource(args),
    relationships: async () => relationship({}),
    topology: async (root, args) => {
      const resources = await resource(args);

      const resourceFilter = {
        $and: [
          { to: { $in: resources } },
          { from: { $in: resources } },
        ],
      };

      const relationships = await relationship(resourceFilter);

      return { resources, relationships };
    },

    labels: async () => label(),
    resourceTypes: async () => type(),
  },
  Resource: {
    relationships: async res => relationship({ from: res.uid }),
  },
};

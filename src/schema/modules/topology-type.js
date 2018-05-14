/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { resource, relationship } from '../../datasource/mongodb';

export const typeDef = `
type Resource {
    cluster: String
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

input Filter {
  cluster: [String]
  label: [String]
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
    resources: async (root, args = {}) => {
      const query = {};
      if (args.filter) {
        Object.keys(args.filter).forEach((filterType) => {
          query[filterType] = { $in: args.filter[filterType] };
        });
      }
      return resource(query);
    },
    relationships: async () => relationship({}),
    topology: async (root, args) => {
      const query = {};
      if (args.filter) {
        Object.keys(args.filter).forEach((filterType) => {
          query[filterType] = { $in: args.filter[filterType] };
        });
      }
      const resources = await resource(query);

      const resourceFilter = {
        $and: [
          { to: { $in: resources } },
          { from: { $in: resources } },
        ],
      };

      const relationships = await relationship(resourceFilter);

      return { resources, relationships };
    },

    // TODO: Jorge: Infer resourceTypes from current topology.
    resourceTypes: () => ['cluster', 'container', 'daemonset', 'deployment', 'host', 'internet', 'pod', 'service', 'statefulset'],
  },
  Resource: {
    relationships: async res => relationship({ from: res.uid }),
  },
};

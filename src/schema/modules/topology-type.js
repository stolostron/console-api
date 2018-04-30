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
`;

export const topologyResolver = {
  Query: {
    resource: async (root, args) => {
      const result = await resource(args);
      return result[0];
    },
    resources: async () => resource({}),
    relationships: async () => relationship({}),
  },
  Resource: {
    relationships: async res => relationship({ from: res.uid }),
  },
};

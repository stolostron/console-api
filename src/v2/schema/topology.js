/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

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
    id: String
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

type Label {
  name: String
  value: String
}

input LabelInput {
  name: String
  value: String
}
`;

export const resolver = {
  Query: {
    // labels filter in topology view
    labels: async (root, args, { mongoModel }) => mongoModel.label(),

    // types filter in topology view
    resourceTypes: async (root, args, { mongoModel }) => mongoModel.type(),

    // objects in topology view
    topology: async (root, args, { mongoModel, clusterModel }) => {
      const clusters = await clusterModel.getClusters();
      const resources = await mongoModel.resource({
        ...args,
        clusters: clusters.filter(c => !!c.metadata).map(c => c.metadata.name),
      });
      const resourceUids = new Set(resources.map(res => res.uid));
      const relationships = resources.reduce((accum, res) => {
        if (res.relationships && res.relationships.length) {
          res.relationships.forEach((outgoing) => {
            if (resourceUids.has(outgoing.uid)) {
              accum.push({ type: 'calls', from: res, to: outgoing });
            }
          });
        }

        return accum;
      }, []);
      return { resources, relationships };
    },
  },
};

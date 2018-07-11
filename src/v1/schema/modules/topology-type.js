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

type HCMTopoNode {
  Name: String
  Labels: JSON
  Properties: JSON
  NodeKind: String
  PodSelector: String
}

type HCMTopoRel {
  RelName: String
  SrcNode: HCMTopoNode
  DstNode: HCMTopoNode
  Type: String
  Properties: JSON
}

type HCMTopology {
  Nodes: [HCMTopoNode]
  Rels: [HCMTopoRel]
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

export const topologyResolver = {
  Query: {
    resource: async (root, args, { mongoConnector }) => {
      const result = await mongoConnector.resource(args);
      return result[0];
    },
    resources: async (root, args = {}, { mongoConnector }) => mongoConnector.resource(args),
    relationships: async (root, args, { mongoConnector }) => {
      const resources = await mongoConnector.resource({});
      return resources.reduce((accum, res) => {
        if (res.relationships && res.relationships.length) {
          res.relationships.forEach((outgoing) => {
            accum.push({ type: 'calls', from: res, to: outgoing });
          });
        }

        return accum;
      }, []);
    },
    topology: async (root, args, { mongoConnector }) => {
      const resources = await mongoConnector.resource(args);

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

    hcmTopology: async (root, args, { req, hcmConnector }) => {
      const result = await hcmConnector.processRequest(req, '/api/v1alpha1/topology', {
        SortBy: '',
        TargetNum: -1,
        User: '',
        Resource: 'topology',
        Operation: 'get',
        ID: '',
        ManagerOnly: true,
        Action: {
          Names: '*',
          Namespaces: '',
          NodeKind: 'ApplicationService',
          UpdateDashboard: false,
          Dryrun: false,
          TargetTemplate: false,
        },
      });

      return result ? Object.values(result) : [];
    },
    labels: async (root, args, { mongoConnector }) => mongoConnector.label(),
    resourceTypes: async (root, args, { mongoConnector }) => mongoConnector.type(),
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import getApplicationElements from './applicationHelper';

export const typeDef = `
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

type TopologyDetails {
  pods: [JSON]
}

input TopologyDetailsFilter {
  clusterNames: [String]
}
`;

export const resolver = {
  Query: {
    // first pass--get the main topology
    topology: async (root, { filter }, { clusterModel, applicationModel }) => {
      let resources = [];
      let relationships = [];
      const { name, namespace, channel } = filter.application[0];
      const application = await applicationModel.getApplication(name, namespace, channel);
      if (application) {
        ({ resources, relationships } =
          await getApplicationElements(application, clusterModel));
      }
      return { resources, relationships };
    },

    // second pass--get topology details
    topologyDetails: async (root, data, { resourceViewModel }) => {
      //      resourceViewModel.fetchResource('pods', args.clusterName, args.name, args.namespace),
      let pods = await resourceViewModel.fetchResources({ type: 'pods' });
      pods = pods.map((pod) => {
        const {
          metadata, cluster, containers: cntrs, status, hostIP, podIP, restarts, startedAt,
        } = pod;
        const {
          name, namespace, creationTimestamp, labels,
        } = metadata;
        const containers = cntrs.map(({ name: n, image }) => ({
          name: n,
          image,
        }));
        return {
          name,
          namespace,
          status,
          cluster,
          containers,
          creationTimestamp,
          labels,
          hostIP,
          podIP,
          restarts,
          startedAt,
        };
      });
      return { pods };
    },
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Filters {
  clusterLabels: [FilterItem]
  clusterNames: [FilterItem]
}

type FilterItem {
  name: String
  id: String
  type: String
  key: String
  value: String
}


input FilterItemInput {
  type: String
  key: String
  value: String
}

input Filter {
  # used by topology
  cluster: [String]
  label: [LabelInput]
  namespace: [String]
  type: [String]

  # used by cluster/pods/healm releases
  # combined with cluster labels and cluster names
  resourceFilter: [FilterItemInput]
}
`;

export const resolver = {
  Query: {
    filters: (root, args, { kubeModel }) => kubeModel.getFilters(args),
  },
};

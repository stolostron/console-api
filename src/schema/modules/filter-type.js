/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { clusters } from '../../datasource/hcm';


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

export const transformFilters = (input) => {
  // may need to change for api-v2
  let clusterFilter = {};
  if (input && input.filter && input.filter) {
    const { resourceFilter = [] } = input.filter;
    const clusterName = [];
    const labelFilters = {};
    resourceFilter.forEach((label) => {
      const { key, value, type } = label;
      switch (type) {
        case 'clusterName':
          clusterName.push(value);
          break;
        case 'clusterLabel':
          labelFilters[key] = value;
          break;
        default:
          break;
      }
    });
    clusterFilter = {
      Labels: labelFilters, Names: clusterName,
    };
  }
  return clusterFilter;
};


export const filtersResolver = {
  Query: {
    filters: async (root, args, req) => {
      let clusterLabels = [];
      let clusterNames = [];
      const result = await clusters(null, null, req);
      result.forEach((element) => {
        if (element.Labels) {
          Object.entries(element.Labels).forEach(([key, value]) => {
            const name = `${key}=${value}`;
            if (!clusterLabels.find(n => n.name === name)) {
              clusterLabels = [...new Set([...clusterLabels, {
                id: name, name, type: 'clusterLabel', key, value,
              }])];
            }
          });
        }
        if (element.ClusterName) {
          clusterNames = [...clusterNames,
            {
              id: element.ClusterName,
              name: `cluster=${element.ClusterName}`,
              type: 'clusterName',
              value: element.ClusterName,
            }];
        }
      });
      return { clusterNames, clusterLabels };
    },
  },
};

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */


export const typeDef = `
  input SearchFilter {
    filter: String!
    value: String!
  }

  type SearchResult {
    items: JSON
    relatedResources: [SearchRelatedResult]
  }

  type SearchRelatedResult {
    kind: String!
    count: Int
  }
`;

export const resolver = {
  Query: {
    search: (parent, { keywords, filters }, { searchModel }) =>
      searchModel.search({ keywords, filters }),
    searchComplete: (parent, { field, matchText }, { searchModel }) =>
      searchModel.searchComplete({ field, matchText }),
    searchSchema: (parent, args, { searchModel }) => searchModel.searchSchema(),
  },
};

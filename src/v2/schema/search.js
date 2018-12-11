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
    values: [String]
  }

  input SearchRelatedInput {
    kind: String!
    count: Int
  }

  type SearchRelatedResult {
    kind: String!
    count: Int
  }

  input SearchInput {
    keywords: [String]
    filters: [SearchFilter]
    relationship: [SearchRelatedInput]
    count: Boolean
  }

  type SearchResult {
    items: JSON
    headers: [String]
    related: [SearchRelatedResult]
  }
`;

export const resolver = {
  Query: {
    search: (parent, args, { searchModel }) => searchModel.multiSearch(args),
    searchComplete: (parent, { field, property }, { searchModel }) =>
      searchModel.searchComplete({ field, property }),
    searchSchema: (parent, args, { searchModel }) => searchModel.searchSchema(),
  },
};

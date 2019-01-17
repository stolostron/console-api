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
    property: String!
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
  }

  type SearchResult {
    count: Int
    items: JSON
    # FUTURE: This isn't fully implemented yet.
    related: [SearchRelatedResult]
    # Time when the backend data was last updated.
    updatedTimestamp: Float
  }
`;

export const resolver = {
  Query: {
    search: (parent, { input }) => input,
    searchComplete: (parent, { property, query }, { searchModel }) =>
      searchModel.resolveSearchComplete({ property, filters: query.filters }),
    searchSchema: (parent, args, { searchModel }) => searchModel.searchSchema(),
  },
  SearchResult: {
    count: (parent, args, { searchModel }) => searchModel.resolveSearchCount(parent),
    items: (parent, args, { searchModel }) => searchModel.resolveSearch(parent),
    updatedTimestamp: (parent, args, { searchModel }) => searchModel.getUpdatedTimestamp(),
    related: (parent, args, { searchModel }) => searchModel.resolveRelatedResources(parent),
  },
};

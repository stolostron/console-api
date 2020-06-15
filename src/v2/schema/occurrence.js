/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
type Occurrence {
  name: String
  noteName: String
  updateTime: String
  createTime: String
  shortDescription: String
  context: JSON
  reportedBy: JSON
  finding: JSON
  securityClassification: JSON
}
`;

export const resolver = {
  Query: {
    occurrences: (/* root, args, { sfModel, req } */) =>
      [], // sfModel.getOccurrences({ ...args, req }),
  },
};

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
type userAccessAllNamespaces {
  resource: String
  action: String
}
`;

export const resolver = {
  Query: {
    userAccessAllNamespaces: (parent, args, { genericModel }) => genericModel.userAccessAllNamespaces(args),
  },
};

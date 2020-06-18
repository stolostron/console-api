/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import { gql } from 'apollo-server-express';

export const typeDef = gql`
type Namespace implements K8sObject {
  cluster: String
  metadata: Metadata
  status: String
}
`;

export const resolver = {
  Query: {
    namespaces: (root, args, { resourceViewModel }) => resourceViewModel.fetchResources({ type: 'namespaces' }),
  },
};

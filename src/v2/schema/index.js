/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import _ from 'lodash';
import { gql } from 'apollo-server-express';

import * as applications from './application';
import * as channels from './channel';
import * as subscriptions from './subscription';
import * as placementrules from './placementrule';
import * as filter from './filter';
import * as json from './json';
import * as genericResources from './generic-resources';
import * as query from './query';
import * as topology from './topology';
import * as userAccess from './user-access';
import * as connection from './connection';
import * as userAccessAnyNamespaces from './user-access-any-namespaces';

const modules = [
  applications,
  channels,
  subscriptions,
  placementrules,
  filter,
  json,
  query,
  genericResources,
  topology,
  userAccess,
  connection,
  userAccessAnyNamespaces,
];

const mainDefs = [gql`
schema {
  query: Query,
  mutation: Mutation,
}
`];

export const typeDefs = mainDefs.concat(modules.filter((m) => m.typeDef).map((m) => m.typeDef));
export const resolvers = _.merge(...modules.map((m) => m.resolver));

export default { typeDefs, resolvers };

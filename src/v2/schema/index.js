/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import _ from 'lodash';
import { gql } from 'apollo-server-express';

import * as applications from './application';
import * as channels from './channel';
import * as subscriptions from './subscription';
import * as cluster from './cluster';
import * as compliance from './compliance';
import * as placementrules from './placementrule';
import * as filter from './filter';
import * as overview from './overview';
import * as occurrence from './occurrence';
import * as json from './json';
import * as genericResources from './generic-resources';
import * as query from './query';
import * as topology from './topology';
import * as userAccess from './user-access';
import * as connection from './connection';
import * as bmAsset from './bare-metal-asset';
import * as userAccessAnyNamespaces from './user-access-any-namespaces';

const modules = [
  applications,
  channels,
  subscriptions,
  placementrules,
  cluster,
  compliance,
  filter,
  overview,
  occurrence,
  json,
  query,
  genericResources,
  topology,
  userAccess,
  connection,
  bmAsset,
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

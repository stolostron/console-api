/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import * as applications from './application';
import * as channels from './channel';
import * as subscriptions from './subscription';
import * as charts from './helmchart';
import * as cluster from './cluster';
import * as compliance from './compliance';
import * as filter from './filter';
import * as overview from './overview';
import * as accountId from './user-accountid';
import * as occurrence from './occurrence';
import * as json from './json';
import * as namespace from './namespace';
import * as node from './node';
import * as pod from './pod';
import * as policy from './policy';
import * as pvs from './pvs';
import * as genericResources from './generic-resources';
import * as query from './query';
import * as releases from './helmrels';
import * as repo from './helmrepo';
import * as topology from './topology';
import * as userAccess from './user-access';
import * as userQuery from './user-query';
import * as userInfo from './user-info';
import * as cemIncident from './cem-incident';
import * as platformApi from './platformApi';

const modules = [
  applications,
  channels,
  subscriptions,
  charts,
  cluster,
  compliance,
  filter,
  overview,
  accountId,
  occurrence,
  json,
  namespace,
  node,
  pod,
  policy,
  pvs,
  query,
  genericResources,
  releases,
  repo,
  topology,
  userAccess,
  userQuery,
  userInfo,
  cemIncident,
  platformApi,
];

const mainDefs = [`
schema {
  query: Query,
  mutation: Mutation,
}
`];

export const typeDefs = mainDefs.concat(modules.map(m => m.typeDef));
export const resolvers = _.merge(...modules.map(m => m.resolver));

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

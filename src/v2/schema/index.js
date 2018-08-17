/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import * as applications from './application';
import * as charts from './helmchart';
import * as cluster from './cluster';
import * as filter from './filter';
import * as dashboard from './dashboard';
import * as json from './json';
import * as namespace from './namespace';
import * as node from './node';
import * as pod from './pod';
import * as policy from './policy';
import * as query from './query';
import * as releases from './helmrels';
import * as repo from './helmrepo';
import * as topology from './topology';

const modules = [
  applications,
  charts,
  cluster,
  filter,
  dashboard,
  json,
  namespace,
  node,
  pod,
  policy,
  query,
  releases,
  repo,
  topology,
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

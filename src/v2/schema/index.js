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

import * as charts from './helmchart';
import * as cluster from './cluster';
import * as json from './json';
import * as namespace from './namespace';
import * as node from './node';
import * as pod from './pod';
import * as query from './query';
import * as repo from './helmrepo';

const modules = [
  charts,
  cluster,
  json,
  namespace,
  node,
  pod,
  query,
  repo,
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

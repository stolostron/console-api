/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { makeExecutableSchema } from 'graphql-tools';
import * as query from './modules/query';
import * as toplogyType from './modules/topology-type';
import * as clusterType from './modules/cluster-type';
import * as podType from './modules/pod-type';
import * as nodeType from './modules/node-type';
import * as pvType from './modules/pv-type';
import * as namespaceType from './modules/namespace-type';
import * as releaseType from './modules/helmrel-type';
import * as chartType from './modules/helmchart-type';
import * as repoType from './modules/helmrepo-type';

const modules = [query, releaseType, chartType, repoType, toplogyType, clusterType,
  podType, nodeType, pvType, namespaceType];

const mainDefs = [
  `schema {
      query: Query,
      mutation: Mutation,
    } `,
];

const resolvers = modules.map(m => m.resolver).filter(res => !!res);

const typeDefs = mainDefs.concat(modules.map(m => m.typeDef).filter(res => !!res));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;

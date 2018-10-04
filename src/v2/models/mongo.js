/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import mongooseLib, { Schema } from 'mongoose';
import logger from '../lib/logger';
import { isRequired } from '../lib/utils';

const relationshipSchema = Schema({
  cluster: { type: Schema.ObjectId, ref: 'Resource' },
  labels: [{ name: String, value: String }],
  name: String,
  namespace: String,
  topology: String,
  type: String,
  uid: String,
});

const resourceSchema = Schema({
  cluster: { type: Schema.ObjectId, ref: 'Resource' },
  labels: [{ name: String, value: String }],
  name: String,
  namespace: String,
  relationships: [relationshipSchema],
  topology: String,
  type: String,
  uid: String,
});

export const ResourceModel = mongooseLib.model('Resource', resourceSchema);

const wait = ms => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export default class MongoModel {
  constructor(mongoURI, {
    mongoose = mongooseLib,
    namespaces = isRequired('namespaces'),
    Resource = ResourceModel,
  } = {}) {
    this.mongoURI = mongoURI;
    this.mongoose = mongoose;
    this.Resource = Resource;
    this.namespaces = namespaces;
  }

  async connect(numRetries = 5) {
    if (this.mongoose.connection.readyState) {
      return this.mongoose.connection;
    }

    let retries = numRetries;
    while (retries) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.mongoose.connect(this.mongoURI);
        logger.info('Mongo Connection Succesful');
        break;
      } catch (e) {
        retries -= 1;
        if (!retries) {
          logger.error(`Mongo connection failed with: ${e.message}`);
          throw new Error(`Mongo connection failed with: ${e.message}`);
        }

        logger.info(`Mongo connection failed with: ${e.message}, ${retries} retries remaining.`);
        // eslint-disable-next-line no-await-in-loop
        await wait(500);
      }
    }

    return this;
  }

  async getResourceQuery({ clusters, filter }) {
    await this.connect();

    const filters = [];

    const clusterNames = _.get(filter, 'cluster[0]')
      ? filter.cluster.filter(clus => clusters.includes(clus))
      : clusters;

    const clusterDocs = await this.Resource.find({ type: 'cluster', name: { $in: clusterNames } });

    filters.push({ cluster: { $in: clusterDocs.map(doc => doc.id) } });
    if (filter) {
      Object.keys(filter).forEach((filterType) => {
        if (filter[filterType] && filter[filterType][0]) {
          if (filterType === 'label') {
            filters.push({
              $or: filter[filterType].map(label => (
                { 'labels.name': label.name, 'labels.value': label.value }
              )),
            });
          } else if (filterType !== 'cluster') { // Cluster is a special type, handled above.
            filters.push({ [filterType]: { $in: filter[filterType] } });
          }
        }
      });

      if (filters.length > 0) {
        // Always include the nodes of type 'cluster' in the result.
        return { $or: [{ $and: filters }, { type: 'cluster' }] };
      }
    }

    return {};
  }

  async label() {
    await this.connect();
    return this.Resource.distinct('labels');
  }

  async resource(args, options) {
    await this.connect();
    const query = await this.getResourceQuery(args);
    return this.Resource.find(query, null, options);
  }

  async type() {
    await this.connect();
    const types = await this.Resource.distinct('type');
    // Exclude cluster, internet, and unmanaged types because these aren't valid filterable types.
    return types.filter(t => t !== 'cluster' && t !== 'internet' && t !== 'unmanaged');
  }
}

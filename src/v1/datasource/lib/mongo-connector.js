/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import mongooseLib, { Schema } from 'mongoose';

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

const ResourceModel = mongooseLib.model('Resource', resourceSchema);

const wait = ms => new Promise((resolve) => {
  setTimeout(() => resolve(), ms);
});

export default class MongoConnector {
  constructor({ mongoose = mongooseLib, Resource = ResourceModel } = {}) {
    this.mongoose = mongoose;
    this.Resource = Resource;
  }

  async connect(mongoURI, numRetries = 100) {
    if (this.mongoose.connection.readyState) {
      return this.mongoose.connection;
    }

    let retries = numRetries;
    while (retries) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.mongoose.connect(mongoURI);
        // eslint-disable-next-line no-console
        console.log('Mongo Connection Succesful');
        break;
      } catch (e) {
        retries -= 1;
        if (!retries) {
          // eslint-disable-next-line no-console
          console.log(new Error(`Mongo connection failed with: ${e.message}`));
          process.exit(1);
        }

        // eslint-disable-next-line no-console
        console.error(`Mongo connection failed with: ${e.message}, ${retries} retries remaining`);
        // eslint-disable-next-line no-await-in-loop
        await wait(1000);
      }
    }

    return this;
  }

  async getResourceQuery(args) {
    if (args.filter) {
      const filters = [];

      // Special case for filtering by cluster.
      // The filter object receives the cluster names to filter, but need to use the mongo doc id
      // in the search query.
      if (args.filter.cluster && args.filter.cluster[0]) {
        const clusterDocs = await this.Resource.find({ type: 'cluster' });
        filters.push({
          cluster: { $in: args.filter.cluster.map(f => clusterDocs.find(c => c.name === f).id) },
        });
      }

      Object.keys(args.filter).forEach((filterType) => {
        if (args.filter[filterType] && args.filter[filterType][0]) {
          if (filterType === 'label') {
            filters.push({
              $or: args.filter[filterType].map(f => ({ labels: f })),
            });
          } else if (filterType !== 'cluster') { // Cluster is a special type, handled above.
            filters.push({ [filterType]: { $in: args.filter[filterType] } });
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

  label() {
    return this.Resource.distinct('labels');
  }

  async resource(args, options) {
    const query = await this.getResourceQuery(args);
    return this.Resource.find(query, null, options);
  }

  async type() {
    const types = await this.Resource.distinct('type');
    // Exclude cluster, internet, and unmanaged types because these aren't valid filterable types.
    return types.filter(t => t !== 'cluster' && t !== 'internet' && t !== 'unmanaged');
  }
}

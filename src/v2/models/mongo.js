/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import fs from 'fs';
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

    const certs = process.env.NODE_ENV === 'development' ? './certs' : '/certs';
    const ca = [fs.readFileSync(`${certs}/mongodb-ca/tls.crt`)];
    const cert = fs.readFileSync(`${certs}/mongodb-client/tls.crt`);
    const key = fs.readFileSync(`${certs}/mongodb-client/tls.key`);

    let retries = numRetries;
    while (retries) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await this.mongoose.connect(`${this.mongoURI}?${process.env.NODE_ENV === 'production' ? `replicaSet=${process.env.MONGO_REPLICASET}&` : ''}authSource=admin`, {
          useNewUrlParser: true,
          ssl: true,
          sslCA: ca,
          sslKey: key,
          sslCert: cert,
        });
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

    // filter by cluster
    let clusterNames = [];
    if (filter.cluster) {
      clusterNames = filter.cluster.filter(clus => clusters.includes(clus));
    }
    const clusterDocs = await this.Resource.find({ type: 'cluster', name: { $in: clusterNames } });
    filters.push({ cluster: { $in: clusterDocs.map(doc => doc.id) } });

    // filter by label
    if (filter.label && filter.label.length > 0) {
      filters.push({
        $or: filter.label.map(label => (
          { 'labels.name': label.name, 'labels.value': label.value }
        )),
      });
    }

    // filter by type
    if (filter.type) {
      filters.push({ type: { $in: filter.type } });
    } else {
      // else include all types except 'unmanaged' and 'container'
      filters.push({ type: { $nin: ['unmanaged', 'container'] } });
    }

    // Always include the nodes of type 'cluster' in the result.
    return { $or: [{ $and: filters }, { type: 'cluster' }] };
  }

  async resource(args, options) {
    await this.connect();
    const query = await this.getResourceQuery(args);
    return this.Resource.find(query, null, options);
  }
}

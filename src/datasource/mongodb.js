/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import mongoose, { Schema } from 'mongoose';
import config from '../../config';

const resourceSchema = Schema({
  uid: String,
  cluster: { type: Schema.ObjectId, ref: 'Resource' },
  name: String,
  namespace: String,
  topology: String,
  type: String,
});

const Resource = mongoose.model('Resource', resourceSchema);

const relationshipSchema = Schema({
  cluster: { type: Schema.ObjectId, ref: 'Resource' },
  type: String,
  to: { type: Schema.ObjectId, ref: 'Resource' },
  from: { type: Schema.ObjectId, ref: 'Resource' },
});

const Relationship = mongoose.model('Relationship', relationshipSchema);

const mongoURI = config.get('mongodbUrl') || 'mongodb://localhost:27017/weave';

const wait = ms => new Promise((resolve) => {
  setTimeout(() => resolve(), ms);
});

(async () => {
  let retries = 100;
  while (retries) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await mongoose.connect(mongoURI);
      console.error('Mongo Connection Succesful'); // eslint-disable-line no-console
      break;
    } catch (e) {
      retries -= 1;
      if (!retries) {
        console.log(new Error(`Mongo connection failed with: ${e.message}`)); // eslint-disable-line no-console
        process.exit(1);
      }

      console.error(`Mongo connection failed with: ${e.message}, ${retries} retries remaining`); // eslint-disable-line no-console
      // eslint-disable-next-line no-await-in-loop
      await wait(1000);
    }
  }
})();

/**
 * Creates a DB query from the resource filters.
 */
async function getResourceQuery(args) {
  if (args.filter) {
    const filters = [];

    // Special case for filtering by cluster.
    // The filter object receives the cluster names to filter, but need to use the mongo doc id
    // in the search query.
    if (args.filter.cluster && args.filter.cluster[0]) {
      const clusterDocs = await Resource.find({ type: 'cluster' });
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


const label = () => Resource.distinct('labels');
const resource = async (args, options) =>
  Resource.find(await getResourceQuery(args), null, options);
const relationship = query => Relationship.find(query, null, { populate: 'to from' });
const type = async () => {
  const types = await Resource.distinct('type');

  // Remove internet and cluster types because these aren't filterable types.
  return types.filter(t => t !== 'internet' && t !== 'cluster');
};
export { label, resource, relationship, type };

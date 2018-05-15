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
      console.error('Mongo Connection Succesful');
      break;
    } catch (e) {
      retries -= 1;
      if (!retries) {
        console.log(new Error(`Mongo connection failed with: ${e.message}`));
        process.exit(1);
      }

      console.error(`Mongo connection failed with: ${e.message}, ${retries} retries remaining`);
      // eslint-disable-next-line no-await-in-loop
      await wait(1000);
    }
  }
})();

/**
 * Creates a DB query from the resource filters.
 */
function getResourceQuery(args) {
  if (args.filter) {
    const filters = [];
    Object.keys(args.filter).forEach((filterType) => {
      if (typeof args.filter[filterType] === 'string') {
        filters.push({ [filterType]: args.filter[filterType] });
      } else if (args.filter[filterType] && args.filter[filterType][0]) {
        filters.push({ [filterType]: { $in: args.filter[filterType] } });
      }
    });

    if (filters.length > 0) {
      return { $and: filters };
    }
  }

  return {};
}

const resource = (args, options) => Resource.find(getResourceQuery(args), null, options);
const relationship = query => Relationship.find(query, null, { populate: 'to from' });


export { resource, relationship };

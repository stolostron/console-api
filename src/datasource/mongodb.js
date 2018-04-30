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

mongoose.connect(mongoURI);

const resource = (query, options) => Resource.find(query, null, options);
const relationship = query => Relationship.find(query, null, { populate: 'to from' });

export { resource, relationship };

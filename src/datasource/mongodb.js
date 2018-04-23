import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/weave';
// const url = 'mongodb://mongo:topology@9.37.239.87:31833/admin';
// const DB_NAME = 'admin';

const resource = async (query = {}, filter = {}) => {
  const connection = await MongoClient.connect(url);
  let db = connection.db('weave');
  let topo = db.collection('resources');
  const weaveResult = await topo.find(query).toArray();
  db = connection.db('template');
  topo = db.collection('resources');
  const templateResult = await topo.find(query).toArray();

  return [...weaveResult, ...templateResult];
};

const relationship = async (query = {}, filter = {}) => {
  const connection = await MongoClient.connect(url);
  let db = connection.db('weave');
  let topo = db.collection('relationships');
  const weaveResult = await topo.aggregate([{
 $lookup: {
    from: 'resources', localField: 'to', foreignField: '_id', as: 'to',
  } 
}, {
 $lookup: {
    from: 'resources', localField: 'from', foreignField: '_id', as: 'from',
  } 
}, { $project: { type: 1, to: { $arrayElemAt: ['$to', 0] }, from: { $arrayElemAt: ['$from', 0] } } }]).toArray();
  db = connection.db('template');
  topo = db.collection('relationships');
  const templateResult = await topo.aggregate([{
 $lookup: {
    from: 'resources', localField: 'to', foreignField: '_id', as: 'to',
  } 
}, {
 $lookup: {
    from: 'resources', localField: 'from', foreignField: '_id', as: 'from',
  } 
}, { $project: { type: 1, to: { $arrayElemAt: ['$to', 0] }, from: { $arrayElemAt: ['$from', 0] } } }]).toArray();
  return [...weaveResult, ...templateResult];
};

export { resource, relationship };

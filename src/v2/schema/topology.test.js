/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import supertest from 'supertest';
import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';
import logger from '../lib/logger';
import server, { GRAPHQL_PATH } from '../index';
import {
  clusterModel,
  topologyModel,
  hostModel,
  podModel,
  statefulsetModel,
  deploymentModel,
  daemonsetModel,
  containerModel,
} from '../mocks/TopologyList';

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongodbMemoryServer({
    instance: {
      port: 27017,
      dbName: 'weave',
    },
    binary: {
      platform: 'linux',
      arch: 'x64',
    },
  });
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, {}, (err) => {
    if (err) {
      logger.info('Error Creating Mock DB', err);
    } else {
      logger.info('Successfully Created Mocked DB');
      clusterModel.save();
      topologyModel.save();
      hostModel.save();
      podModel.save();
      statefulsetModel.save();
      deploymentModel.save();
      daemonsetModel.save();
      containerModel.save();
      logger.info('Populated DB With Test Data');
    }
  });
});

afterAll(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

// Should skip the power build due to incompatible arch
// const testIf = process.arch === 'x64' ? describe : describe.skip;
const testIf = describe.skip;
testIf('Topology Resolver', () => {
  test('Should Correctly Resolve Topology Labels Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          labels {
            name
            value
          }
        }
      `,
      })
      .expect(200)
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.labels.length).toBeGreaterThanOrEqual(1);
        expect(result.data.labels[0]).toHaveProperty('name');
        expect(result.data.labels[0]).toHaveProperty('value');
        done();
      });
  });

  test('Should Correctly Resolves Topology Resource Types Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          resourceTypes
        }
      `,
      })
      .expect(200)
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.resourceTypes).toContain('host');
        expect(result.data.resourceTypes).toContain('service');
        expect(result.data.resourceTypes).toContain('deployment');
        expect(result.data.resourceTypes).toContain('daemonset');
        expect(result.data.resourceTypes).toContain('statefulset');
        expect(result.data.resourceTypes).toContain('pod');
        expect(result.data.resourceTypes).toContain('container');
        done();
      });
  });

  test('Should Correctly Resolves Topology Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          topology {
            resources {
              id
              cluster
              labels {
                name
                value
              }
              name
              namespace
              topology
              type
              uid
            }
            relationships {
              type
              to {
                id
              }
              from {
                id
              }
            }
          }
        }
      `,
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.topology.resources.length).toBeGreaterThanOrEqual(1);
        expect(result.data.topology.resources[0]).toHaveProperty('id');
        expect(result.data.topology.relationships.length).toBeGreaterThanOrEqual(1);
        expect(result.data.topology.relationships[0]).toHaveProperty('type');
        expect(result.data.topology.relationships[0]).toHaveProperty('to');
        expect(result.data.topology.relationships[0]).toHaveProperty('from');
        done();
      });
  });

  test('Should Correctly Resolves Topology Query With Filters', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          topology(filter:{
            cluster:"mycluster",
            namespace:"kube-system",
            label: {
              name:"app",
              value:"ibm-mcm-controller"
            }
          }) {
            resources {
              id
              cluster
              labels {
                name
                value
              }
              name
              namespace
              topology
              type
              uid
            }
          }
        }
      `,
      })
      .end((err, res) => {
        const result = JSON.parse(res.text);
        expect(result.data.topology.resources.length).toBeGreaterThanOrEqual(1);
        expect(result.data.topology.resources[0]).toHaveProperty('id');
        done();
      });
  });
});

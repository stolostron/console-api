/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('Cloud Connections', () => {
  test('Correctly Resolves Get Cloud Connections', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            {
              connections {
                 metadata{
                    name
                    namespace
                    provider
                    name_namespace
                 }
              }
            }`,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Get Cloud Providers', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            {
              providers {
                name
                longname
                configMetadata
                configValues
                clusterMetadata
                clusterValues
                statusCode
              }
            }`,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Create Cloud Connection', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                createCloudConnection(body: {name: "iks-test", namespace: "default", provider: "iks", metadata: "secret:\n  apiKey: iks-test\n"})
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Edit Cloud Connection', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                editCloudConnection(body: {name: "iks-test", namespace: "default", provider: "iks", metadata: "secret:\n  apiKey: iks-test\n"}, namespace:"default", name:"iks-test")
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Delete Cloud Connection', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                deleteCloudConnection(namespace:"default", name:"iks-test")
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});

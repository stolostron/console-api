/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('Connection Resolver', () => {
  test('Correctly Resolves Get Cloud Connections', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            connections {
              metadata {
                name
                namespace
                provider
                name_namespace
              }
              statusCode
              errorMsg
            }
          }`,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Get Cloud Connection Details', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            connectionDetails {
              name
              namespace
              provider
              metadata
            }
          }`,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Create Cloud Connection', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                createCloudConnection(body: {name: "new-aws", namespace: "default", provider: "aws", metadata: "metdata"})
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Create Cloud Connection Error', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                createCloudConnection(body: {name: "google", namespace: "hive", provider: "gke", metadata: "metadata"})
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Edit Cloud Connection', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                editCloudConnection(body: {name: "aws", namespace: "default", provider: "aws", metadata: "metdata"}, namespace: "default", name: "aws")
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Edit Cloud Connection Error', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                editCloudConnection(body: {name: "google", namespace: "hive", provider: "gke", metadata: "metdata"}, namespace: "hive", name: "google")
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Delete Cloud Connection', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                deleteCloudConnection(namespace: "ocm", name: "microsoft")
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
});

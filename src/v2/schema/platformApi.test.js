/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('Platform Api Resolver', () => {
  test('Get Automated Import Status', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            getAutomatedImportStatus(namespace: "test", name:"test")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Get Automated Import Status should return error msg', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            getAutomatedImportStatus(namespace: "", name:"test")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Create Kubernetes Cluster Resource for Import', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
            createClusterResource(body: "test")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Create Kubernetes Cluster Resource for Import should return error msg', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
            createClusterResource(body: "")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Start Automated Import Process', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
            automatedImport(namespace:"test", name:"test", body: "test")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Start Automated Import Process should return error msg', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
            automatedImport(namespace:"", name:"test", body: "test")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});

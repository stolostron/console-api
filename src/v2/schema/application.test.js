/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project

import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('Application Resolver', () => {
  test('Correctly Resolves Applications Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          application {
            metadata {
              name
              namespace
              creationTimestamp
              labels
              selfLink
            }
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Single Applications Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          application(name:"gbapp-gbapp",namespace:"default") {
            metadata {
              annotations
              creationTimestamp
              labels
              name
              namespace
              resourceVersion
              selfLink
              uid
            }
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Application secrets Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          secrets {
            ansibleSecretName
            ansibleSecretNamespace
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
  test('Correctly Resolves Create Application Mutation', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createApplication(application:[{
            apiVersion: "mcm.ibm.com/v1alpha1",
            kind: "Application",
            metadata: {
              name: "testapp",
              namespace: "default",
            },
          },
          { deleteLinks: [] },          
        ])
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Update Application Mutation', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          updateApplication(application:[{
            apiVersion: "mcm.ibm.com/v1alpha1",
            kind: "Application",
            metadata: {
              name: "testapp",
              namespace: "default",
            },
          },
          { deleteLinks: [] },          
        ])
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
});

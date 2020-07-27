/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('BareMetalAsset Resolver', () => {
  test('Correctly Resolves BareMetalAssets Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          bareMetalAssets {
            metadata {
              annotations
              creationTimestamp
              labels
              name
              namespace
              resourceVersion
              selfLink
              status
              uid
            }
            bmc {
              address
              credentialsName
            }
            bootMACAddress
            clusterDeployment {
              name
              namespace
            }
            hardwareProfile
            role
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves BareMetalAsset Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          bareMetalAsset (name:"baremetalasset-worker-0", namespace:"fake-cluster"){
            metadata {
              annotations
              creationTimestamp
              labels
              name
              namespace
              resourceVersion
              selfLink
              status
              uid
            }
            hardwareProfile
            role
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves BareMetalAssetSubresources Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          bareMetalAssetSubresources (name:"baremetalasset-worker-0", namespace:"fake-cluster"){
            namespaces
            bareMetalAsset {
              metadata {
                annotations
              }
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

  test('Correctly Resolves CreateBareMetalAsset Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createBareMetalAsset (namespace: "fake-cluster", name: "worker-0", bmcAddress:"ipmi://192.168.122.2:6233", username:"test1", password:"test1", bootMac:"00:1B:44:11:3A:B7")
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
});

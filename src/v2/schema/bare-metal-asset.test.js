// Copyright (c) 2020 Red Hat, Inc.
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

  test('Correctly Resolves UpdateBareMetalAsset Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          updateBareMetalAsset (namespace: "fake-cluster", name: "worker-0", bmcAddress:"ipmi://192.168.122.2:6233", username:"test2", password:"test2", bootMac:"00:1B:44:11:3A:B7")
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves DeleteBareMetalAsset Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          deleteBareMetalAssets (bmas:
            [{
              apiVersion: "inventory.open-cluster-management.io/v1alpha1",
              kind: "BareMetalAsset",
              metadata: {
                creationTimestamp: "2020-03-05T12:01:11Z",
                generation: 1,
                name: "baremetalasset-worker-0",
                namespace: "fake-cluster",
                resourceVersion: "579175",
                selfLink: "/apis/inventory.open-cluster-management.io/v1alpha1/namespaces/fake-cluster/baremetalassets/baremetalasset-worker-0",
                uid: "cb6eaf0e-2a60-4c4c-b068-2a4257fcce42",
              },
              spec: {
                bmc: {
                  address: "ipmi://192.168.122.1:6233",
                  credentialsName: "worker-0-bmc-secret",
                },
                bootMACAddress: "00:1B:44:11:3A:B7",
                clusterDeployment: {
                  name: "cluster0",
                  namespace: "cluster0",
                },
                hardwareProfile: "hardwareProfile",
                role: "worker",
              },
            },
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

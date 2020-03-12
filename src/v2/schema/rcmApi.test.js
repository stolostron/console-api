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

describe('RCM Api Resolver', () => {
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
            automatedImport(
              namespace:"test",
              name:"test",
              body: "test"
              )
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

  test('Correctly Resolves Get Cloud Providers', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            {
              orchestrations {
                name
                longname
                type
                configMetadata
                configValues
                clusterMetadata
                clusterValues
                categoryName
                categoryLongname              
                statusCode
              }
            }`,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('createCluster test that we can create cluster correctly', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                createCluster(namespace: "iks", cluster: {name: "ericabrtest4"})
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
  test('createCluster test with all required fields but returns with error', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                createCluster(namespace: "iks", cluster: {name:"ericabrtest5"})
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('createCluster test that we get an error when namespace not provided', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                createCluster(namespace:"", {name:"ericabrtest4"})
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('createCluster test that we get an error when cluster not provided', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                createCluster(namespace:"", cluster: null)
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('previewCluster test with all required fields but returns with error', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                previewCluster(namespace: "eks", cluster: {name:"llcao-aks-1"})
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('previewCluster test that we get an error when namespace not provided', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                previewCluster(namespace:"", {name:"llcao-gke-1"})
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('previewCluster test that we get an error when cluster not provided', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
            mutation {
                previewCluster(namespace:"", cluster: null)
            }
          `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Update Kubernetes Cluster Resource for Import', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          updateClusterResource(namespace:"test", name:"test", body: "test")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Update Kubernetes Cluster Resource for Import should return error msg', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          updateClusterResource(namespace:"", name:"test", body: "test")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});

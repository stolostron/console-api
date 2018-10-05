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

describe('Application Resolver', () => {
  test('Correctly Resolves Applications Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          applications {
            selector
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Single Applications Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          applications(name:"app02",namespace:"default") {
            selector
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });


  test('Correctly Resolves Deployables Query - MatchNames', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          deployables(selector:{
            matchNames:[{
              name: "deployable01"
            }]
          }) {
            deployer {
              chartName
              namespace
              repository
              version
            }
            dependencies {
              kind
              name
            }
            metadata {
              name
            }
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Placement Policies Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          placementPolicies(selector:{
             matchNames:[{
              name:"placement02"
            }]
          }) {
            clusterSelector
            metadata {
              annotations
              name
              namespace
            }
            replicas
            resourceSelector
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Create Application Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createApplication(resources:[{
            apiVersion: "mcm.ibm.com/v1alpha1",
            kind: "Application",
            metadata: {
              name: "testapp",
              labels: {
                deployable: "deployable01",
                hcmapp: "testapp",
              },
            },
            spec: {
              selector: {
                matchLabels: {
                  hcmapp: "testapp",
                },
              },
              componentKinds: [
                {
                  group: "mcm.ibm.com/v1alpha1",
                  kind: "PlacementPolicy",
                },
                {
                  group: "mcm.ibm.com/v1alpha1",
                  kind: "Deployable",
                },
              ],
            },
          }])
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Delete Application Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          deleteApplication(name:"testapp",namespace:"default")
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});


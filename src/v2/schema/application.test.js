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
            applicationRelationships {
              metadata {
                name
                selfLink
              }
            }
            applicationWorks {
              metadata {
                name
                selfLink
              }
            }
            dashboard
            deployables {
              metadata {
                name
                selfLink
              }
            }
            metadata {
              name
              namespace
              creationTimestamp
              labels
              selfLink
            }
            placementPolicies {
              metadata {
                name
                selfLink
              }
              status
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

  test('Correctly Resolves Single Applications Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          applications(name:"gbapp-gbapp",namespace:"default") {
            dashboard
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
            applicationRelationships {
              destination {
                kind
                name
              }
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
              raw
              source {
                kind
                name
              }
              type
            }
            applicationWorks {
              metadata {
                name
                namespace
                creationTimestamp
                labels
                selfLink
              }
              release
              status
              reason
              cluster
            }
            deployables {
              dependencies {
                kind
                name
              }
              deployer {
                chartName
                namespace
                repository
                version
                chartURL
              }
              metadata {
                name
                namespace
                creationTimestamp
              }
              raw
            }
            placementPolicies {
              metadata {
                annotations
                name
                namespace
                creationTimestamp
                selfLink
              }
              clusterLabels
              clusterReplicas
              resourceSelector
              status
              raw
            }
            raw
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


  // test('Correctly Resolves Deployables Query - MatchNames', (done) => {
  //   supertest(server)
  //     .post(GRAPHQL_PATH)
  //     .send({
  //       query: `
  //       {
  //         deployables(selector:{
  //           matchNames:[
  //             {name: "gbapp-gbapp"},
  //             {name: "gbapp-gbapp-redismaster"},
  //             {name: "gbapp-gbapp-redisslave"}
  //           ]
  //         }) {
  //           dependencies {
  //             kind
  //             name
  //           }
  //           deployer {
  //             chartName
  //             namespace
  //             repository
  //             version
  //             chartURL
  //           }
  //           metadata {
  //             name
  //             namespace
  //             creationTimestamp
  //           }
  //           raw
  //         }
  //       }
  //     `,
  //     })
  //     .end((err, res) => {
  //       expect(JSON.parse(res.text)).toMatchSnapshot();
  //       done();
  //     });
  // });

  // test('Correctly Resolves Placement Policies Query', (done) => {
  //   supertest(server)
  //     .post(GRAPHQL_PATH)
  //     .send({
  //       query: `
  //       {
  //         placementPolicies(selector:{
  //            matchNames:[{
  //             name:"gbapp-gbapp"
  //           }]
  //         }) {
  //           metadata {
  //             annotations
  //             name
  //             namespace
  //             creationTimestamp
  //             selfLink
  //           }
  //           clusterLabels
  //           clusterReplicas
  //           resourceSelector
  //           status
  //           raw
  //         }
  //       }
  //     `,
  //     })
  //     .end((err, res) => {
  //       expect(JSON.parse(res.text)).toMatchSnapshot();
  //       done();
  //     });
  // });

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

  test('Correctly Resolves Delete Application Mutation - with no child resources selected', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          deleteApplication(path:"/apis/mcm.ibm.com/v1alpha1/namespaces/default/applications/testapp",resources:[{}])
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});


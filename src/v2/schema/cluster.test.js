/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('Cluster Resolver', () => {
  test('Correctly Resolves Cluster Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          clusters {
            clusterip
            metadata {
              creationTimestamp
              labels
              name
              namespace
              uid
            }
            availableVersions
            desiredVersion
            distributionVersion
            nodes
            status
            upgradeFailed
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Single Cluster Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          cluster(name: "hub-cluster", namespace: "hub-cluster") {
            clusterip
            metadata {
              creationTimestamp
              labels
              name
              namespace
              uid
            }
            availableVersions
            desiredVersion
            distributionVersion
            nodes
            status
            upgradeFailed
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves ClusterImageSet Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          clusterImageSets {
            name
            releaseImage
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
});

describe('Cluster Mutation', () => {
  test('Correctly Resolves Update Cluster Labels', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          updateResourceLabels(resourceType:"HCMCompliance",namespace:"my-remote-cluster-1", name:"my-remote-cluster-1-xz", body:{cloud:"IBMs"}, selfLink:"/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/my-remote-cluster-1/compliances/compliance-xz", resourcePath:"/metadata/spec")
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Create Cluster', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createCluster(cluster: [])
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Create Kubernetes Cluster Resource for Import with No Namespace', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
            createCluster(
              cluster: [
                {
                  apiVersion: "cluster.open-cluster-management.io/v1",
                  kind: "ManagedCluster"
                },
                {
                  apiVersion: "agent.open-cluster-management.io/v1",
                  kind: "KlusterletAddonConfig",
                  spec:
                  {
                    clusterName: "foo"
                  }
                }
              ]
            )
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.error)).toBeFalsy();
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Detach Cluster', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          detachCluster(namespace:"default", cluster:"managed-cluster")
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Detach Cluster with Failure', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          detachCluster(namespace:"kube-system", cluster:"hub-cluster")
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Destroy Cluster', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          detachCluster(namespace:"default", cluster:"managed-cluster", destroy: true)
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));

  test('Correctly Resolves Destroy Cluster with Failure', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          detachCluster(namespace:"kube-system", cluster:"new-cluster", destroy: true)
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
});

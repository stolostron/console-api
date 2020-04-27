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
  test('Correctly Resolves Cluster Query', (done) => {
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
            totalCPU
            totalMemory
            totalStorage
            upgradeFailed
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Single Cluster Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          cluster(name: "hub-cluster", namespace: "kube-system") {
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
            totalCPU
            totalMemory
            totalStorage
            upgradeFailed
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves ClusterImageSet Query', (done) => {
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
  });
});

describe('Cluster Mutation', () => {
  test('Correctly Resolves Update Cluster Labels', (done) => {
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
  });
});


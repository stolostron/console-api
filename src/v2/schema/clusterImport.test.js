/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('Cluster Import Resolver', () => {
  test('Create Kubernetes Cluster Resource for Import should return error msg', (done) => {
    console.log('MYSERVER', server, GRAPHQL_PATH);
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
            createClusterResource(cluster: [])
          }
      `,
      })
      .end((err, res) => {
        console.log('COFFEE', err);
        console.log('BLAH', res.text);
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
            createClusterResource(
              cluster: [
                {},
                {spec: {
                  clusterName: "foo",
                  clusterNamespace: "foo"
                }
              }]
            )
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.error)).toBeFalsy();
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});

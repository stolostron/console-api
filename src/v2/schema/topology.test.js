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

describe('Topology Resolver', () => {
  test('Correctly Resolves Topology Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          topology(filter: {application:[{ name:"gbapp-gbapp-v2", namespace:"gbapp-gbapp-v2" }]}) {
            resources {
              id
              uid
              name
              cluster
              clusterName
              type
              specs
              namespace
              topology
              labels {
                name
                value
              }
            }
            relationships {
              type
              specs
              to {
                uid
              }
              from {
                uid
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
  });
});


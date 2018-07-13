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

describe('Cluster Resolver', () => {
  test('Correctly Resolves Cluster Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          clusters {
            name
            namespace
            uid
            status
            createdAt
            labels
          }
        }
      `,
      })
      .end((err, res) => {
        expect(res.text).toMatchSnapshot();
        done();
      });
  });
});

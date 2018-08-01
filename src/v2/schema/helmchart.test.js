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

describe('Helm Chart Resolver', () => {
  test('Correctly Resolves Helm Chart Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          charts {
            repoName
            name
            version
            urls
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

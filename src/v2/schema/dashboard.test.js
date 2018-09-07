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

describe('Dashboard Resolver', () => {
  test('Correctly Resolves Dashboard Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          dashboard {
            cardItems {
              name
              healthy
              critical
              warning
              table {
                status
                link
                resourceName
                percentage
              }
              error
            }
            pieChartItems {
              name
              data
              error
            }
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

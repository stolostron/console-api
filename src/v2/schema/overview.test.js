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

describe('Overview Resolver', () => {
  test('Correctly Resolves Overview Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
        overview {
          clusters {
            metadata {
              name
              namespace
              labels
              uid
            }
            capacity {
              cpu
              memory
              nodes
              storage
            }
            usage {
              cpu
              memory
              pods
              storage
            }
            status
          }
          applications {
            metadata {
              name
              namespace
            }
            raw
            selector
          }
          pods {
            metadata {
              name
              namespace
            }
            cluster {
              metadata {
                name
              }
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
});

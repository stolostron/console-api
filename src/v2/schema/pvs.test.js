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

describe('PVs Resolver', () => {
  test('Correctly Resolves PVs Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          pvs {
            accessModes
            capacity
            claim
            claimRef
            cluster {
              metadata {
                name
              }
            }
            metadata{
              name
              namespace
            }
            reclaimPolicy
            status
            type
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves PVsClaims Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          pvsClaims {
            accessModes
            cluster {
              metadata {
                name
              }
            }
            metadata {
              name
              namespace
            }
            persistentVolume
            requests
            status
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

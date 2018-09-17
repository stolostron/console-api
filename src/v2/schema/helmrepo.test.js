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

describe('Helm Repository Resolver', () => {
  test('Correctly Resolves Helm Repository Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          repos {
            Name
            URL
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Set Helm Repository Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          setHelmRepo(input:{Name:"testRepo",URL:"https://testRepo.com"}) {
            Name
            URL
          }
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Delete Helm Repository Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          deleteHelmRepository(input:{Name:"testRepo"}) {
            Name
            URL
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

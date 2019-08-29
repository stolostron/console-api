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

describe('User Query Resolver', () => {
  test('Correctly Resolves Add User Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          mutation {
            saveQuery(resource: {id:"id_10", name: "test", description: "test", searchText: "test"})
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Get User Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          query userQueries {
            items: userQueries {
              id
              name
              description
              searchText
            }
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Remove User Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          mutation {
            deleteQuery(resource: {id: "id_10", name: "test", description: "test", searchText: "test"})
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});

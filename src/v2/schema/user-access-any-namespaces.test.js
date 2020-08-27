/** *****************************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('User Access All Namespaces Resolver', () => {
  test('Correctly Resolves User Access All Namespaces Query', () => new Promise((done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
          {
            userAccessAnyNamespaces(resource:"pods", action:"delete", apiGroup:"")
          }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  }));
});

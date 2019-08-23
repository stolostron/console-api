/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import supertest from 'supertest';
import nock from 'nock';
import server, { GRAPHQL_PATH } from '../index';
import { mockOccurrences } from '../mocks/OccurrenceList';


describe('Occurrences Resolver', () => {
  beforeAll(() => {
    // specify the url to be intercepted
    const APIServer = nock('http://0.0.0.0/findings');

    // define the method to be intercepted
    APIServer.post('/v1/id-mycluster-account/graph', /\.*occurrences\.*/gi)
      .reply(200, mockOccurrences);
  });

  test('Correctly Resolves Occurrences Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          occurrences {
            name
            noteName
            updateTime
            createTime
            shortDescription
            context
            reportedBy
            finding
            securityClassification
          }
        }
      `,
      })
      .end((err, res) => {
        const textMessage = JSON.parse(res.text);
        expect(textMessage).toMatchSnapshot();
        done();
      });
  });
});

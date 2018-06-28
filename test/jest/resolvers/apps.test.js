/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import nock from 'nock';
import { applicationResolver } from '../../../src/schema/modules/application-type';
import { query, hcmResponse, resolverResult } from './query_data/apps.data';

describe('Query testing - Applications', () => {
  test.skip('Should return array of applications', () => {
    nock('http://localhost:8080')
      .get('/api/v1alpha1/applications', query)
      .reply(200, hcmResponse);
    const req = {
      headers: { authorization: '' },
    };
    return applicationResolver.Query.applications(null, null, req)
      .then((res) => {
        expect(res).toMatchObject(resolverResult);
        expect(res.length).toBeGreaterThan(0);
      });
  });
});

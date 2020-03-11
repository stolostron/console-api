/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * (c) Copyright Red Hat, Inc. All Rights Reserved.
 ****************************************************************************** */
import supertest from 'supertest';
import server, { GRAPHQL_PATH } from '../index';

describe('BareMetalAsset Resolver', () => {
  test('Correctly Resolves BareMetalAsset Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          bareMetalAssets {
            metadata {
              annotations
              creationTimestamp
              labels
              name
              namespace
              resourceVersion
              selfLink
              status
              uid
            }
            bmc {
              address
              credentialsName
            }
            bootMACAddress
            clusterDeployment {
              name
              namespace
            }
            hardwareProfile
            role
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

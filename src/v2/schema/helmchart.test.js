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

  test('Correctly Resolves Install Helm Chart', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          installHelmChart(input:{
            chartURL:"https://kubernetes-charts.storage.googleapis.com/weave-scope-0.9.2.tgz",
            namespace:"default",
            releaseName:"test-weave-scope",
            destinationClusters:[{name:"mycluster",namespace:"mycluster"}]
            values: "{'global.image.repository':'weaveworks/scope','global.image.tag':'1.6.5','global.image.pullPolicy':'IfNotPresent','global.service.port':80,'global.service.type':'ClusterIP','weave-scope-frontend.enabled':true,'weave-scope-agent.enabled':true,'weave-scope-agent.dockerBridge':'docker0','weave-scope-agent.scopeFrontendAddr':'','weave-scope-agent.probeToken':'','weave-scope-agent.rbac.create':true,'weave-scope-agent.serviceAccount.create':true,'selectedReleaseName':'weave-test','selectedNamespace':'default'}"
          }) {
            name
            namespace
            status
            cluster
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

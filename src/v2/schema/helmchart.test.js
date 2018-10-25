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
        expect(JSON.parse(res.text)).toMatchSnapshot();
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
            chartURL:"https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.2.0.tgz",
            namespace:"kube-system",
            releaseName:"test-acs-engine",
            destinationClusters:[{name:"hub-cluster",namespace:"mycluster"}]
            values: "{'replicaCount':1,'resources':{},'nodeSelector':{},'podAnnotations':{},'deploymentAnnotations':{},'tolerations':[],'affinity':{},'image.repository':'wbuchwalter/kubernetes-acs-engine-autoscaler','image.tag':'2.1.1','image.pullPolicy':'IfNotPresent','acsenginecluster.resourcegroup':'','acsenginecluster.azurespappid':'','acsenginecluster.azurespsecret':'','acsenginecluster.azuresptenantid':'','acsenginecluster.kubeconfigprivatekey':'','acsenginecluster.clientprivatekey':'','acsenginecluster.caprivatekey':'','selectedReleaseName':'selenium-acs-1540476559092','selectedNamespace':'kube-system'}"
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
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});

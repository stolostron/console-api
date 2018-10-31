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

describe('Policy Resolver', () => {
  test('Correctly Resolves Policy List Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policies {
            enforcement
            metadata {
              name
              namespace
            }
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

  test('Correctly Resolves Single Policy Query', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        {
          policies(name:"policy-xz-1",namespace:"default") {
            enforcement
            metadata {
              name
              namespace
            }
            status
            detail {
              exclude_namespace
              include_namespace
            }
            rules {
              ruleUID
            }
            roleTemplates {
              name
              lastTransition
              complianceType
              apiVersion
              compliant
              raw
            }
            violations {
              name
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

  test('Correctly Resolves Create Policy Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          createPolicy(resources:[{
            apiVersion: "policy.mcm.ibm.com/v1alpha1",
            kind: "Policy",
            metadata: {
              name: "test-policy",
              description: "Instance descriptor for policy resource",
            },
            spec: {
              remediationAction: "enforce",
              namespaces: {
                include: [
                  "default",
                ],
                exclude: [
                  "kube*",
                ],
              },
              roleTemplates: [
                {
                  kind: "RoleTemplate",
                  apiVersion: "roletemplate.mcm.ibm.com/v1alpha1",
                  complianceType: "musthave",
                  metadata: {
                    namespace: "",
                    name: "test-role",
                  },
                  selector: {
                    matchLabels: {
                      cloud: "IBM",
                    },
                  },
                  rules: [
                    {
                      complianceType: "musthave",
                      PolicyRule: {
                        apiGroups: [
                          "extensions",
                          "apps",
                        ],
                        resources: [
                          "deployments",
                        ],
                        verbs: [
                          "get",
                          "list",
                          "watch",
                          "delete",
                        ],
                      },
                    },
                    {
                      complianceType: "mustnothave",
                      PolicyRule: {
                        apiGroups: [
                          "core",
                        ],
                        resources: [
                          "pods",
                        ],
                        verbs: [
                          "create",
                          "update",
                          "patch",
                        ],
                      },
                    },
                    {
                      PolicyRule: {
                        apiGroups: [
                          "core",
                        ],
                        resources: [
                          "secrets",
                        ],
                        verbs: [
                          "get",
                          "watch",
                          "list",
                          "create",
                          "delete",
                          "update",
                          "patch",
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          }]),
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });

  test('Correctly Resolves Delete Policy Mutation', (done) => {
    supertest(server)
      .post(GRAPHQL_PATH)
      .send({
        query: `
        mutation {
          deletePolicy(name:"test-policy",namespace:"default")
        }
      `,
      })
      .end((err, res) => {
        expect(JSON.parse(res.text)).toMatchSnapshot();
        done();
      });
  });
});

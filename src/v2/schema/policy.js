/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Policy {
  # Possible values are: enforce, inform
  enforcement: String
  name: String
  namespace: String
  # Possible values are: compliant, notcompliant, invalid
  status: String
  detail: PolicyDetail
  templates: [PolicyTemplates]
  rules: [PolicyRules]
  violations: [Violations]
}

type Violations {
  name: String
  cluster: String
  status: String
  message: String
  reason: String
  selector: JSON
}

type PolicyDetail {
  selfLink: String
  creationTime: String
  exclude_namespace: [String]
  include_namespace: [String]
  annotations: JSON
  resourceVersion: String
  uid: String
}

type PolicyTemplates {
  name: String
  lastTransition: String
  complianceType: String
  apiVersion: String
  compliant: String
  validity: String
  templateType: String
  selector: JSON
}

type PolicyRules {
  complianceType: String
  apiGroups: [String]
  resources: [String]
  verbs: [String]
  templateType: String
  ruleUID: String
}
`;

export const resolver = {
  Query: {
    policies: (root, args, { kubeModel }) => kubeModel.getPolicies(args.name, args.namespace),
  },
  Mutation: {
    createPolicy: (root, args, { kubeModel }) => kubeModel.createPolicy(args.resources),
    deletePolicy: (root, args, { kubeModel }) => kubeModel.deletePolicy(args),
  },
};

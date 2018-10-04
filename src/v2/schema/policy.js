/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import ComplianceModel from '../models/compliance';

export const typeDef = `
type Policy implements K8sObject {
  detail: PolicyDetail
  # Possible values are: enforce, inform
  enforcement: String
  metadata: Metadata
  rules: [PolicyRules]
  # Possible values are: compliant, notcompliant, invalid
  status: String
  templates: [PolicyTemplates]
  violations: [Violations]
  roleRef: [RoleRef]
  roleSubjects: [RoleSubject]
}

type PolicyDetail {
  exclude_namespace: [String]
  include_namespace: [String]
}

type PolicyTemplates {
  apiVersion: String
  complianceType: String
  compliant: String
  lastTransition: String
  name: String
  selector: JSON
  templateType: String
  validity: String
}

type PolicyRules {
  apiGroups: [String]
  complianceType: String
  resources: [String]
  ruleUID: String
  templateType: String
  verbs: [String]
}

type Violations {
  cluster: String
  message: String
  name: String
  reason: String
  selector: JSON
  status: String
}

type RoleRef {
  apiGroup: String
  kind: String
  name: String
}

type RoleSubject {
  apiGroup: String
  kind: String
  name: String
}
`;

export const resolver = {
  Query: {
    policies: (root, args, { complianceModel }) =>
      complianceModel.getPolicies(args.name, args.namespace),
  },
  Policy: {
    detail: parent => ComplianceModel.resolvePolicyDetails(parent),
    enforcement: parent => ComplianceModel.resolvePolicyEnforcement(parent),
    templates: parent => ComplianceModel.resolvePolicyTemplates(parent),
    rules: parent => ComplianceModel.resolvePolicyRules(parent),
    status: parent => ComplianceModel.resolvePolicyStatus(parent),
    violations: parent => ComplianceModel.resolvePolicyViolations(parent),
    roleRef: parent => ComplianceModel.resolveRoleRef(parent),
    roleSubjects: parent => ComplianceModel.resolveRoleSubjects(parent),
  },
  Mutation: {
    createPolicy: (root, args, { complianceModel }) => complianceModel.createPolicy(args.resources),
    deletePolicy: (root, args, { complianceModel }) => complianceModel.deletePolicy(args),
  },
};

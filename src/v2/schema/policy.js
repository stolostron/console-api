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
  roleTemplates: [PolicyTemplates]
  roleBindingTemplates: [PolicyTemplates]
  objectTemplates: [PolicyTemplates]
  violations: [Violations]
  raw: JSON
  message: String
  cluster: String
}

type PolicyDetail {
  exclude_namespace: [String]
  include_namespace: [String]
}

type PolicyTemplates {
  apiVersion: String
  complianceType: String
  compliant: String
  status: String
  lastTransition: String
  name: String
  kind: String
  validity: String
  raw: JSON
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
`;

export const resolver = {
  Query: {
    policies: (root, args, { complianceModel }) =>
      complianceModel.getPolicies(args.name, args.clusterName),
  },
  Policy: {
    detail: parent => ComplianceModel.resolvePolicyDetails(parent),
    enforcement: parent => ComplianceModel.resolvePolicyEnforcement(parent),
    roleTemplates: parent => ComplianceModel.resolvePolicyTemplates(parent, 'role-templates'),
    roleBindingTemplates: parent => ComplianceModel.resolvePolicyTemplates(parent, 'roleBinding-templates'),
    objectTemplates: parent => ComplianceModel.resolvePolicyTemplates(parent, 'object-templates'),
    rules: parent => ComplianceModel.resolvePolicyRules(parent),
    status: parent => ComplianceModel.resolvePolicyStatus(parent),
    violations: parent => ComplianceModel.resolvePolicyViolations(parent),
    message: parent => ComplianceModel.resolvePolicyMessage(parent),
  },
  Mutation: {
    createPolicy: (root, args, { complianceModel }) => complianceModel.createPolicy(args.resources),
    deletePolicy: (root, args, { complianceModel }) => complianceModel.deletePolicy(args),
  },
};

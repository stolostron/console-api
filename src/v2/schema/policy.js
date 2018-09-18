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
  metadata: Metadata
  # Possible values are: enforce, inform
  enforcement: String
  # Possible values are: compliant, notcompliant, invalid
  status: String
  detail: PolicyDetail
  templates: [PolicyTemplates]
  rules: [PolicyRules]
  violations: [Violations]
  name: String @deprecated(reason: "Use metadata.name field.")
  namespace: String @deprecated(reason: "Use metadata.namespace field.")
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
  selfLink: String @deprecated(reason: "Use metadata.selfLink field.")
  creationTime: String @deprecated(reason: "Use metadata.creationTimestamp field.")
  exclude_namespace: [String]
  include_namespace: [String]
  annotations: JSON @deprecated(reason: "Use metadata.annotations field.")
  resourceVersion: String @deprecated(reason: "Use metadata.resourceVersion field.")
  uid: String @deprecated(reason: "Use metadata.uid field.")
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
  },
  Mutation: {
    createPolicy: (root, args, { complianceModel }) => complianceModel.createPolicy(args.resources),
    deletePolicy: (root, args, { complianceModel }) => complianceModel.deletePolicy(args),
  },
};

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
type Compliance implements K8sObject {
  clusterCompliant: String
  clusterSelector: JSON
  compliancePolicies: [CompliancePolicy]
  complianceStatus: [CompliantStatus]
  metadata: Metadata
  policyCompliant: String
}

type CompliantStatus {
  clusterNamespace: String
  localCompliantStatus: String
  localValidStatus: String
}

type CompliancePolicy implements K8sObject {
  cluster: String
  complianceName: String
  complianceNamespace: String
  compliant: String
  # Possible values are: enforce, inform
  enforcement: String
  metadata: Metadata
  name: String @deprecated(reason: "Use metadata.name field.")
  rules: [PolicyRules]
  status: String
  templates: [PolicyTemplates]
  valid: String
  violations: [Violations]
  roleRef: [RoleRef]
  roleSubjects: [RoleSubject]
}

`;

export const resolver = {
  Query: {
    compliances: (root, args, { complianceModel }) =>
      complianceModel.getCompliances(args.name, args.namespace),
  },
  Compliance: {
    compliancePolicies: parent => ComplianceModel.resolveCompliancePolicies(parent),
    complianceStatus: parent => ComplianceModel.resolveComplianceStatus(parent),
    policyCompliant: parent => ComplianceModel.resolvePolicyCompliant(parent),
    clusterCompliant: parent => ComplianceModel.resolveClusterCompliant(parent),
  },
  Mutation: {
    createCompliance: (root, args, { complianceModel }) =>
      complianceModel.createCompliance(args.resources),
    deleteCompliance: (root, args, { complianceModel }) =>
      complianceModel.deleteCompliance(args),
  },
};

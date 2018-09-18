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
  metadata: Metadata
  clusterSelector: JSON
  policyCompliant: String
  clusterCompliant: String
  compliancePolicies: [CompliancePolicy]
  complianceStatus: [CompliantStatus]
  name: String @deprecated(reason: "Use metadata.name field.")
  namespace: String @deprecated(reason: "Use metadata.namespace field.")
  detail: ComplianceDetail @deprecated(reason: "Use metadata field.")
}

type CompliantStatus {
  clusterNamespace: String
  localCompliantStatus: String
  localValidStatus: String
}

type CompliancePolicy implements K8sObject {
  metadata: Metadata
  cluster: String
  compliant: String
  valid: String
  complianceName: String
  complianceNamespace: String
  # Possible values are: enforce, inform
  enforcement: String
  status: String
  templates: [PolicyTemplates]
  rules: [PolicyRules]
  violations: [Violations]
  name: String @deprecated(reason: "Use metadata.name field.")
  namespace: String @deprecated(reason: "Use metadata.namespace field.")
  detail: PolicyDetail @deprecated(reason: "Use metadata field.")
}

type ComplianceDetail {
  selfLink: String @deprecated(reason: "Use metadata.selfLink field.")
  creationTime: String @deprecated(reason: "Use metadata.creationTimestamp field.")
  resourceVersion: String @deprecated(reason: "Use metadata.resourceVersion field.")
  uid: String @deprecated(reason: "Use metadata.uid field.")
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

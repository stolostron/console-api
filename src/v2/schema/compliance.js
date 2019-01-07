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
  compliancePolicies: [CompliancePolicies]
  compliancePolicy: [CompliancePolicyDetail]
  complianceStatus: [CompliantStatus]
  metadata: Metadata
  policyCompliant: String
  raw: JSON
  apiVersion: String
  placementPolicies: [PlacementPolicy]
  placementBindings: [PlacementBinding]
}

type CompliantStatus {
  clusterNamespace: String
  localCompliantStatus: String
  localValidStatus: String
}


type CompliancePolicies {
  name: String
  complianceName: String
  complianceNamespace: String
  clusterCompliant: [String]
  clusterNotCompliant: [String]
  policies: [CompliancePolicy]
}

type CompliancePolicyDetail {
  name: String
  complianceName: String
  complianceNamespace: String
  complianceSelfLink: String
  raw: JSON
  message: String
  detail: JSON
  status: String
  enforcement: String
  rules: [PolicyRules]
  roleTemplates: [PolicyTemplates]
  roleBindingTemplates: [PolicyTemplates]
  objectTemplates: [PolicyTemplates]
}

type CompliancePolicy implements K8sObject {
  cluster: String
  complianceName: String
  detail: JSON
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
  roleTemplates: [PolicyTemplates]
  roleBindingTemplates: [PolicyTemplates]
  objectTemplates: [PolicyTemplates]
  raw: JSON
  message: String
}

`;

export const resolver = {
  Query: {
    compliances: (root, args, { complianceModel }) =>
      complianceModel.getCompliances(args.name, args.namespace),
  },
  Compliance: {
    compliancePolicies: parent => ComplianceModel.resolveCompliancePolicies(parent),
    compliancePolicy: parent => ComplianceModel.resolveCompliancePolicy(parent),
    complianceStatus: parent => ComplianceModel.resolveComplianceStatus(parent),
    policyCompliant: parent => ComplianceModel.resolvePolicyCompliant(parent),
    clusterCompliant: parent => ComplianceModel.resolveClusterCompliant(parent),
    placementPolicies: (parent, args, { complianceModel }) =>
      complianceModel.getPlacementPolicies(parent),
    placementBindings: (parent, args, { complianceModel }) =>
      complianceModel.getPlacementBindings(parent),
  },
  Mutation: {
    createCompliance: (root, args, { complianceModel }) =>
      complianceModel.createCompliance(args.resources),
    deleteCompliance: (root, args, { complianceModel }) =>
      complianceModel.deleteCompliance(args),
  },
};

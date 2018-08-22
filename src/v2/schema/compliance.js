/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type Compliance {
  name: String
  namespace: String
  kind: String
  clusterSelector: [ClusterSelector]
  detail: ComplianceDetail
  policyCompliant: String
  clusterCompliant: String
  complianceStatus: [ComplianceData]
}

type ClusterSelector {
  selectorType: String
  selectors: [String]
}

type ComplianceData {
  name: String
  cluster: String
  compliant: String
  valid: String
  complianceName: String
  complianceNamespace: String
  
  # Possible values are: enforce, inform
  enforcement: String
  namespace: String
  status: String
  detail: PolicyDetail
  templates: [PolicyTemplates]
  rules: [PolicyRules]
  violations: [Violations]
}


type ComplianceDetail {
  selfLink: String
  creationTime: String
  resourceVersion: String
  uid: String
}
`;

export const resolver = {
  Query: {
    compliances: (root, args, { kubeModel }) => kubeModel.getCompliances(args.name, args.namespace),
  },
  Mutation: {
    createCompliance: (root, args, { kubeModel }) => kubeModel.createCompliance(args.resources),
    deleteCompliance: (root, args, { kubeModel }) => kubeModel.deleteCompliance(args),
  },
};

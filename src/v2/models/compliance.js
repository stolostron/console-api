/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import logger from '../lib/logger';
import config from '../../../config';

const POLICY_FAILURE_STATUS = 'Failure';

function getTemplates(policy) {
  const templates = [];
  Object.entries(policy.spec || []).forEach(([key, value]) => {
    if (key.endsWith('-templates')) {
      value.forEach(item => templates.push({ ...item, templateType: key }));
    }
  });
  return templates;
}


export default class ComplianceModel {
  constructor({ kubeConnector }) {
    if (!kubeConnector) {
      throw new Error('kubeConnector is a required parameter');
    }

    this.kubeConnector = kubeConnector;
  }

  async createPolicy(resources) {
    // TODO: revist this, do something like application,
    // combine policy and compliance into one mutation
    let errorMessage = '';
    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', (config.get('complianceNamespace') || 'mcm'));
      return this.kubeConnector.post(`/apis/policy.mcm.ibm.com/v1alpha1/namespaces/${namespace}/policies`, resource)
        .catch(err => Error(err));
    }));
    result.forEach((item) => {
      if (item.code >= 400 || item.status === POLICY_FAILURE_STATUS) {
        errorMessage += `${item.message}\n`;
      }
    });
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      // TODO: add partical errors
      return result;
    }
  }

  async createCompliance(resources) {
    let errorMessage = '';
    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', (config.get('complianceNamespace') || 'mcm'));
      return this.kubeConnector.post(`/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/${namespace}/compliances`, resource)
        .catch(err => Error(err));
    }));
    result.forEach((item) => {
      if (item.code >= 400 || item.status === POLICY_FAILURE_STATUS) {
        errorMessage += `${item.message}\n`;
      }
    });
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      // TODO: add partical errors
      return result;
    }
  }

  async deletePolicy(input) {
    const response = await this.kubeConnector.delete(`/apis/policy.mcm.ibm.com/v1alpha1/namespaces/${input.namespace}/policies/${input.name}`);
    if (response.code || response.message) {
      throw new Error(`MCM ERROR ${response.code} - ${response.message}`);
    }
    return response.metadata.name;
  }

  async deleteCompliance(input) {
    const response = await this.kubeConnector.delete(`/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/${input.namespace}/compliances/${input.name}`);
    if (response.code || response.message) {
      throw new Error(`MCM ERROR ${response.code} - ${response.message}`);
    }
    return response.metadata.name;
  }


  async getCompliances(name, namespace) {
    let compliances;

    if (!name) {
      // for getting compliance list
      const response = await this.kubeConnector.get(`/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/${namespace || config.get('complianceNamespace') || 'mcm'}/compliances`);
      if (response.code || response.message) {
        logger.error(`HCM ERROR ${response.code} - ${response.message}`);
        return [];
      }
      compliances = response.items;
    } else {
      // get single compliance from a specific namespace
      const response = await this.kubeConnector.get(`/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/${namespace || config.get('complianceNamespace') || 'mcm'}/compliances/${name}`);
      if (response.code || response.message) {
        logger.error(`HCM ERROR ${response.code} - ${response.message}`);
        return [];
      }
      compliances = [response];
    }

    return compliances.map(compliance => ({
      ...compliance,
      clusterSelector: _.get(compliance, 'spec.clusterSelector', {}),
    }));
  }


  static resolveCompliancePolicies(parent) {
    const compliancePolicies = [];
    const aggregatedStatus = _.get(parent, 'status', {});

    Object.values(aggregatedStatus).forEach((cluster) => {
      Object.entries(_.get(cluster, 'aggregatePoliciesStatus', {})).forEach(([key, value]) => {
        const policy = parent.spec['runtime-rules'].find(p => p.metadata.name === key);

        const policyObject = {
          cluster: _.get(cluster, 'clustername', parent.metadata.namespace),
          complianceName: parent.metadata.name,
          complianceNamespace: parent.metadata.namespace,
          compliant: _.get(value, 'Compliant', '-'),
          enforcement: _.get(policy, 'spec.remediationAction', 'unknown'),
          name: key,
          rules: this.resolvePolicyRules(policy), // TODO: Use resolver.
          status: _.get(value, 'Valid', false) === false ? 'invalid' : _.get(value, 'Compliant', 'unknown'),
          templates: this.resolvePolicyTemplates(policy), // TODO: Use resolver.
          valid: _.get(value, 'Valid', '-'),
          violations: this.resolvePolicyViolations(policy), // TODO: Use resolver.
          roleRef: this.resolveRoleRef(policy),
          roleSubjects: this.resolveRoleSubjects(policy),
          metadata: {
            ...parent.metadata,
            name: key,
          },
        };

        compliancePolicies.push(policyObject);
      });
    });

    return compliancePolicies;
  }


  static resolveComplianceStatus(parent) {
    const complianceStatus = [];
    Object.entries(_.get(parent, 'status', {})).forEach(([clusterName, perClusterStatus]) => {
      const aggregatedStatus = _.get(perClusterStatus, 'aggregatePoliciesStatus', {});

      // get compliant status per cluster
      if (aggregatedStatus) {
        let validNum = 0;
        let compliantNum = 0;
        let policyNum = 0;
        Object.values(aggregatedStatus).forEach((object) => {
          if (_.get(object, 'Compliant', '') === 'Compliant') compliantNum += 1;
          if (_.get(object, 'Valid')) validNum += 1;
          policyNum += 1;
        });
        complianceStatus.push({
          clusterNamespace: clusterName,
          localCompliantStatus: `${compliantNum}/${policyNum}`,
          localValidStatus: `${validNum}/${policyNum}`,
        });
      }
    });

    return complianceStatus;
  }


  static resolvePolicyCompliant({ status = {} }) {
    let totalPolicies = 0;
    let compliantPolicies = 0;

    Object.values(status || []).forEach((cluster) => {
      Object.values(cluster.aggregatePoliciesStatus || {}).forEach((policyValue) => {
        totalPolicies += 1;
        if (_.get(policyValue, 'Compliant', '').toLowerCase() === 'compliant') compliantPolicies += 1;
      });
    });

    return `${compliantPolicies}/${totalPolicies}`;
  }


  static resolveClusterCompliant({ status = {} }) {
    const totalClusters = Object.keys(status).length;
    const compliantClusters = Object.values(status).filter(cluster => (_.get(cluster, 'compliant', '').toLowerCase() === 'compliant'));

    return `${compliantClusters.length}/${totalClusters}`;
  }


  async getPolicies(name, namespace = 'default') {
    // if policy name specified
    if (name !== undefined) {
      const response = await this.kubeConnector.get(`/apis/policy.mcm.ibm.com/v1alpha1/namespaces/${namespace}/policies/${name}`);
      if (response.code || response.message) {
        logger.error(`HCM ERROR ${response.code} - ${response.message}`);
        return [];
      }
      return [response];
    }

    // for getting policy list
    const response = await this.kubeConnector.get('/apis/policy.mcm.ibm.com/v1alpha1/policies');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return response.items;
  }


  static resolvePolicyDetails(parent) {
    return {
      exclude_namespace: _.get(parent, 'spec.namespaces.exclude', ['*']),
      include_namespace: _.get(parent, 'spec.namespaces.include', ['*']),
    };
  }


  static resolvePolicyEnforcement(parent) {
    return _.get(parent, 'spec.remediationAction', 'unknown');
  }


  static resolvePolicyRules(parent) {
    const rules = [];
    getTemplates(parent).forEach((res) => {
      if (res.rules) {
        Object.entries(res.rules).forEach(([key, rul]) => {
          const complianceType = _.get(rul, 'complianceType');
          if (complianceType) {
            const rule = {
              complianceType,
              apiGroups: _.get(rul, 'policyRule.apiGroups', ['-']),
              resources: _.get(rul, 'policyRule.resources', ['-']),
              verbs: _.get(rul, 'policyRule.verbs', ['-']),
              templateType: _.get(res, 'templateType', ''),
              ruleUID: `${_.get(res, 'metadata.name', '-')}-rule-${key}`,
            };
            rules.push(rule);
          }
        });
      }
    });
    return rules;
  }

  static resolveRoleSubjects(parent) {
    let roleSubjects = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === 'roleBinding-templates') {
        roleSubjects = [..._.get(res, 'roleBinding.subjects', [])];
      }
    });
    return roleSubjects;
  }

  static resolveRoleRef(parent) {
    const roleRef = [];
    getTemplates(parent).forEach((res) => {
      if (_.get(res, 'templateType') === 'roleBinding-templates') {
        roleRef.push(_.get(res, 'roleBinding.roleRef', {}));
      }
    });
    return roleRef;
  }


  static resolvePolicyStatus(parent) {
    return _.get(parent, 'status.Valid', false) === false ? 'invalid' : _.get(parent, 'status.Compliant', 'unknown');
  }


  static resolvePolicyTemplates(parent) {
    return getTemplates(parent).map((res) => {
      if (_.get(res, 'templateType') === 'roleBinding-templates') {
        return ({
          name: _.get(res, 'roleBinding.metadata.name', '-'),
          lastTransition: _.get(res, 'status.conditions[0].lastTransitionTime', ''),
          complianceType: _.get(res, 'complianceType', ''),
          apiVersion: _.get(res, 'roleBinding.apiVersion', ''),
          compliant: _.get(res, 'status.Compliant', ''),
          validity: _.get(res, 'status.Validity.valid') || _.get(res, 'status.Validity', ''),
          selector: _.get(res, 'selector', ''),
          templateType: _.get(res, 'templateType', ''),
        });
      }
      return ({
        name: _.get(res, 'metadata.name', '-'),
        lastTransition: _.get(res, 'status.conditions[0].lastTransitionTime', ''),
        complianceType: _.get(res, 'complianceType', ''),
        apiVersion: _.get(res, 'apiVersion', ''),
        compliant: _.get(res, 'status.Compliant', ''),
        validity: _.get(res, 'status.Validity.valid') || _.get(res, 'status.Validity', ''),
        selector: _.get(res, 'selector', ''),
        templateType: _.get(res, 'templateType', ''),
      });
    });
  }


  static resolvePolicyViolations(parent) {
    const violationArray = [];
    getTemplates(parent).forEach((res) => {
      const templateCondition = _.get(res, 'status.conditions[0]');
      if (_.get(res, 'templateType') !== 'roleBinding-templates') {
        violationArray.push({
          name: _.get(res, 'metadata.name', '-'),
          cluster: 'local', // local means the cluster that this policy is applied
          status: _.get(res, 'status.Validity.valid', false) ? _.get(parent, 'status.Compliant', '-') : 'invalid',
          message: (templateCondition && _.get(templateCondition, 'message', '-')) || '-',
          reason: (templateCondition && _.get(templateCondition, 'reason', '-')) || '-',
          selector: _.get(res, 'selector', ''),
        });
      }
    });
    return violationArray;
  }
}

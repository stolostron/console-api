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
import requestLib from '../lib/request';
import KubeConnector from '../connectors/kube';
import config from '../../../config';


const POLICY_FAILURE_STATUS = 'Failure';

// The last char(s) in usage are units - need to be removed in order to get an int for calculation
function getPercentage(usage, capacity) {
  return (usage.substring(0, usage.length - 2) / capacity.substring(0, capacity.length - 2)) * 100;
}

function getCPUPercentage(usage, capacity) {
  return ((usage.substring(0, usage.length - 1) / 1000) / capacity) * 100;
}

function getComplianceObject(res) {
  let totalClusters = 0;
  let compliantClusters = 0;
  let totalPolicies = 0;
  let compliantPolicies = 0;

  const status = _.get(res, 'status', []);
  if (status) totalClusters = Object.keys(status).length;
  Object.values(status).forEach((cluster) => {
    if (_.get(cluster, 'compliant', '').toLowerCase() === 'compliant') compliantClusters += 1;
    Object.values(cluster.aggregatePoliciesStatus || {}).forEach((policyValue) => {
      totalPolicies += 1;
      if (_.get(policyValue, 'Compliant', '').toLowerCase() === 'compliant') compliantPolicies += 1;
    });
  });
  const compliance = {
    name: _.get(res, 'metadata.name', 'none'),
    namespace: _.get(res, 'metadata.namespace', 'none'),
    kind: _.get(res, 'kind', 'Compliance'),
    clusterSelector: _.get(res, 'spec.clusterSelector', {}),
    policyCompliant: `${compliantPolicies}/${totalPolicies}`,
    clusterCompliant: `${compliantClusters}/${totalClusters}`,
  };
  return compliance;
}

function getPolicyObject(response, target) {
  const templates = [];
  const rules = [];
  const responseTemplates = [];
  const violations = [];
  const policySpec = _.get(response, 'spec', []);

  // for now, `-templates` is the special key word that server side uses
  // to identify if an attribute is template arrays or not
  // only support role-templates and generic-templates
  Object.entries(policySpec).forEach(([key, value]) => {
    if (key.endsWith('-templates')) {
      value.forEach(item => responseTemplates.push({ ...item, templateType: key }));
    }
  });

  const detail = {
    uid: _.get(response, 'metadata.uid', 'none'),
    resourceVersion: _.get(response, 'metadata.resourceVersion', 'none'),
    annotations: _.get(response, 'metadata.annotations', ''),
    selfLink: _.get(response, 'metadata.selfLink', '-'),
    creationTime: _.get(response, 'metadata.creationTimestamp', '-'),
    exclude_namespace: _.get(response, 'spec.namespaces.exclude', ['*']),
    include_namespace: _.get(response, 'spec.namespaces.include', ['*']),
  };

  responseTemplates.forEach((res) => {
    // type: PolicyTemplate
    const template = {
      name: _.get(res, 'metadata.name', '-'),
      lastTransition: _.get(res, 'status.conditions[0].lastTransitionTime', ''),
      complianceType: _.get(res, 'complianceType', ''),
      apiVersion: _.get(res, 'apiVersion', ''),
      compliant: _.get(res, 'status.Compliant', ''),
      validity: _.get(res, 'status.Validity.valid') || _.get(res, 'status.Validity', ''),
      selector: _.get(res, 'selector', ''),
      templateType: _.get(res, 'templateType', ''),
    };
    const templateCondition = _.get(res, 'status.conditions[0]');

    // type: Violations
    const violation = {
      name: _.get(res, 'metadata.name', '-'),
      cluster: 'local', // local means the cluster that this policy is applied
      status: _.get(res, 'status.Validity.valid', false) ? _.get(response, 'status.Compliant', '-') : 'invalid',
      message: (templateCondition && _.get(templateCondition, 'message', '-')) || '-',
      reason: (templateCondition && _.get(templateCondition, 'reason', '-')) || '-',
      selector: _.get(res, 'selector', ''),
    };
    violations.push(violation);

    // type: PolicyRules
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
    templates.push(template);
  });
  return {
    ...target,
    templates,
    rules,
    violations,
    detail,
    namespace: _.get(response, 'metadata.namespace', 'none'),
    status: _.get(response, 'status.Valid', false) === false ? 'invalid' : _.get(response, 'status.Compliant', 'unknown'),
    enforcement: _.get(response, 'spec.remediationAction', 'unknown'),
  };
}

function getStatus(cluster) {
  const status = _.get(cluster, 'status.conditions[0].type', 'unknown');
  return status === '' ? 'unknown' : status.toLowerCase();
}

export default class KubeModel {
  constructor({ kubeConnector, token, httpLib = requestLib }) {
    if (kubeConnector) {
      this.kubeConnector = kubeConnector;
    } else if (token && httpLib) {
      this.kubeConnector = new KubeConnector({ token, httpLib });
    } else {
      throw new Error('Either initialize with KubeConnector or token + httpLib');
    }
  }

  async createPolicy(resources) {
    // TODO: revist this, do something like application,
    // combine policy and compliance into one mutation
    let errorMessage = '';
    const result = await Promise.all(resources.map((resource) => {
      const namespace = _.get(resource, 'metadata.namespace', 'default');
      return this.kubeConnector.post(`/apis/policy.mcm.ibm.com/v1alpha1/namespaces/${namespace}/policies`, resource)
        .catch(err => Error(err));
    }));
    result.forEach((item) => {
      if (item.code > 300 || item.status === POLICY_FAILURE_STATUS) {
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
      const namespace = _.get(resource, 'metadata.namespace', 'default');
      return this.kubeConnector.post(`/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/${namespace}/compliances`, resource)
        .catch(err => Error(err));
    }));
    result.forEach((item) => {
      if (item.code > 300 || item.status === POLICY_FAILURE_STATUS) {
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

  async getClusters() {
    const response = await this.kubeConnector.get('/apis/clusterregistry.k8s.io/v1alpha1/clusters');
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);

      // TODO: How should we handle errors? - 07/25/18 10:20:57 sidney.wijngaarde1@ibm.com
      return [];
    }

    const clusterStatus = await this.getClusterStatus();
    const result = [];

    response.items.forEach((cluster, idx) => {
      result.push({
        createdAt: cluster.metadata.creationTimestamp,
        clusterip: clusterStatus[idx].ip,
        labels: cluster.metadata.labels,
        name: cluster.metadata.name,
        namespace: cluster.metadata.namespace,
        status: getStatus(cluster),
        uid: cluster.metadata.uid,
        nodes: clusterStatus[idx].nodes,
        totalMemory: parseInt(clusterStatus[idx].memoryUtilization, 10),
        totalStorage: parseInt(clusterStatus[idx].storageUtilization, 10),
      });
    });
    return result;
  }

  async getClusterStatus() {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/clusterstatuses');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);
      return [];
    }

    const result = [];
    response.items.forEach((cluster) => {
      result.push({
        createdAt: cluster.metadata.creationTimestamp,
        labels: cluster.metadata.labels,
        name: cluster.metadata.name,
        namespace: cluster.metadata.namespace,
        uid: cluster.metadata.uid,
        nodes: cluster.spec.capacity.nodes,
        pods: cluster.spec.usage.pods,
        ip: cluster.spec.masterAddresses[0].ip,
        memoryUtilization: getPercentage(
          cluster.spec.usage.memory,
          cluster.spec.capacity.memory,
        ),
        storageUtilization: getPercentage(
          cluster.spec.usage.storage,
          cluster.spec.capacity.storage,
        ),
        cpuUtilization: getCPUPercentage(
          cluster.spec.usage.cpu,
          cluster.spec.capacity.cpu,
        ),
      });
    });
    return result;
  }

  async getCompliances(name, namespace = 'mcm') {
    // for getting compliance list
    const arr = [];
    if (!name) {
      const response = await this.kubeConnector.get(`/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/${config.get('complianceNamespace') || 'hcm'}/compliances`);
      if (response.code || response.message) {
        logger.error(`HCM ERROR ${response.code} - ${response.message}`);
        return [];
      }
      if (response.items) {
        response.items.forEach((res) => {
          arr.push(getComplianceObject(res));
        });
      }
    } else {
      // get single policy from a specific namespace
      const response = await this.kubeConnector.get('/apis/compliance.mcm.ibm.com/v1alpha1/compliances');
      if (response.code || response.message) {
        logger.error(`HCM ERROR ${response.code} - ${response.message}`);
        return [];
      }
      if (response.items) {
        let compliance = {};
        const compliancePolicies = [];

        // get compliance from all namespaces, filter down by the target name
        const filteredResponseData = response.items.filter(item => _.get(item, 'metadata.name') === name);

        // for each of the compliance
        filteredResponseData.forEach((complianceData) => {
          const complianceNamespace = _.get(complianceData, 'metadata.namespace');

          // in this case, variable namespace is the one where compliance
          // object has been created on the hub cluster
          if (complianceNamespace === namespace) {
            compliance = getComplianceObject(complianceData);

            // compliance details for compliance-detail-page
            const detail = {
              uid: _.get(complianceData, 'metadata.uid', 'none'),
              resourceVersion: _.get(complianceData, 'metadata.resourceVersion', 'none'),
              selfLink: _.get(complianceData, 'metadata.selfLink', '-'),
              creationTime: _.get(complianceData, 'metadata.creationTimestamp', ''),
            };
            const complianceStatus = [];

            Object.entries(_.get(complianceData, 'status', {})).forEach(([clusterName, perClusterStatus]) => {
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

            compliance.complianceStatus = complianceStatus;
            compliance.detail = detail;
          } else {
            // the compliance in the namespace that is associated with a remote cluster
            const aggregatedStatus = _.get(complianceData, 'status', {});
            // find out policy namespace
            Object.values(aggregatedStatus).forEach((cluster) => {
              Object.entries(_.get(cluster, 'aggregatePoliciesStatus', {})).forEach(([key, value]) => {
                let policyObject = {
                  name: key,
                  cluster: _.get(cluster, 'clustername', complianceNamespace),
                  compliant: _.get(value, 'Compliant', '-'),
                  valid: _.get(value, 'Valid', '-'),
                  complianceName: name,
                  complianceNamespace: namespace,
                };
                const spec = _.get(complianceData, 'spec', {});
                let targetPolicy;
                Object.values(spec).forEach((compliancePolicyArray) => {
                  targetPolicy = compliancePolicyArray.find(item => _.get(item, 'metadata.name') === key);
                });
                if (targetPolicy) policyObject = getPolicyObject(targetPolicy, policyObject);
                compliancePolicies.push(policyObject);
              });
            });
          }
        });
        compliance.compliancePolicies = compliancePolicies;
        arr.push(compliance);
      }
    }
    return arr;
  }

  async getPolicies(name, namespace = 'default') {
    // if policy name specified, return a single policy with details
    if (name !== undefined) {
      const arr = [];

      const response = await this.kubeConnector.get(`/apis/policy.mcm.ibm.com/v1alpha1/namespaces/${namespace}/policies/${name}`);
      if (response.code || response.message) {
        logger.error(`HCM ERROR ${response.code} - ${response.message}`);
        return [];
      }
      const policy = {
        name: _.get(response, 'metadata.name', 'none'),
      };

      arr.push(getPolicyObject(response, policy));
      return arr;
    }

    // for getting policy list
    const response = await this.kubeConnector.get('/apis/policy.mcm.ibm.com/v1alpha1/policies');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    const arr = [];
    if (response.items) {
      response.items.forEach((res) => {
        const policy = {
          name: _.get(res, 'metadata.name', 'none'),
          namespace: _.get(res, 'metadata.namespace', 'none'),
          status: _.get(res, 'status.Valid', false) === false ? 'invalid' : _.get(res, 'status.Compliant', 'unknown'),
          enforcement: _.get(res, 'spec.remediationAction', 'unknown'),
        };
        arr.push(policy);
      });
    }
    return arr;
  }

  async deleteCompliance(input) {
    const response = await this.kubeConnector.delete(`/apis/compliance.mcm.ibm.com/v1alpha1/namespaces/${input.namespace}/compliances/${input.name}`);
    if (response.code || response.message) {
      throw new Error(`MCM ERROR ${response.code} - ${response.message}`);
    }
    return response.metadata.name;
  }

  async deletePolicy(input) {
    const response = await this.kubeConnector.delete(`/apis/policy.mcm.ibm.com/v1alpha1/namespaces/${input.namespace}/policies/${input.name}`);
    if (response.code || response.message) {
      throw new Error(`MCM ERROR ${response.code} - ${response.message}`);
    }
    return response.metadata.name;
  }
}

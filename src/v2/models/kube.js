/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import logger from '../lib/logger';
import requestLib from '../lib/request';
import KubeConnector from '../connectors/kube';

const mock = (prefix, obj) => {
  logger.warn(`Using mocked values for ${prefix}`, Object.keys(obj));
  return obj;
};

// The last char(s) in usage are units - need to be removed in order to get an int for calculation
function getPercentage(usage, capacity) {
  return (usage.substring(0, usage.length - 2) / capacity.substring(0, capacity.length - 2)) * 100;
}

function getCPUPercentage(usage, capacity) {
  return ((usage.substring(0, usage.length - 1) / 1000) / capacity) * 100;
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

  async getApplications(name) {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/applications');
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return [];
    }

    const items = name ? response.items.filter(app => app.metadata.name === name) : response.items;

    return items.map((app) => {
      const components = [];
      const dependencies = [];
      const relationships = [];
      const { annotations } = app.metadata;
      delete annotations['kubectl.kubernetes.io/last-applied-configuration'];

      if (app.status && app.status.components) {
        app.status.components.forEach((component) => {
          components.push({
            name: component.metadata.name,
            namespace: component.metadata.namespace,
            created: component.metadata.creationTimestamp,
            labels: component.metadata.labels,
            annotations: component.metadata.annotations,
            ...mock('Application component', { cluster: 'unknown' }), // FIXME: AppService object doesn't have this info.
          });

          // Get dependencies for each component.
          component.spec.dependencies.forEach((dep) => {
            dependencies.push({
              name: dep.destination.name,
              type: dep.destination.kind,
              ...mock('Application dependencies', { cluster: 'unknown' }), // FIXME: AppService object doesn't have this info.
            });
            relationships.push({
              source: component.metadata.name,
              destination: dep.destination.name,
              type: 'dependsOn',
            });
          });
        });
      }


      return {
        annotations,
        components,
        dependencies,
        labels: app.metadata.labels,
        name: app.metadata.name,
        relationships,
        namespace: app.metadata.namespace,
        created: app.metadata.creationTimestamp,
        selfLink: app.metadata.selfLink,
        resourceVersion: app.metadata.resourceVersion,
        uid: app.metadata.uid,
        status: app.metadata.status,
        ...mock('Applications', {
          dashboard: '',
        }),
      };
    });
  }

  async getClusters() {
    const response = await this.kubeConnector.get('/apis/clusterregistry.k8s.io/v1alpha1/clusters');
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);

      // TODO: How should we handle errors? - 07/25/18 10:20:57 sidney.wijngaarde1@ibm.com
      return [];
    }

    return response.items.map(cluster => ({
      createdAt: cluster.metadata.creationTimestamp,
      labels: cluster.metadata.labels,
      name: cluster.metadata.name,
      namespace: cluster.metadata.namespace,
      status: cluster.status.conditions[0].type.toLowerCase(),
      uid: cluster.metadata.uid,
      ...mock('Cluster', {
        nodes: 1,
        totalMemory: 0,
        totalStorage: 0,
      }),
    }));
  }

  async getClusterStatus() {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/clusterstatuses');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);
      return [];
    }

    return response.items.map(cluster => ({
      createdAt: cluster.metadata.creationTimestamp,
      labels: cluster.metadata.labels,
      name: cluster.metadata.name,
      namespace: cluster.metadata.namespace,
      uid: cluster.metadata.uid,
      nodes: cluster.spec.capacity.nodes,
      pods: cluster.spec.usage.pods,
      ip: cluster.spec.masterAddresses[0].ip,
      memoryUtilization: getPercentage(cluster.spec.usage.memory, cluster.spec.capacity.memory),
      storageUtilization: getPercentage(cluster.spec.usage.storage, cluster.spec.capacity.storage),
      cpuUtilization: getCPUPercentage(cluster.spec.usage.cpu, cluster.spec.capacity.cpu),
    }));
  }

  async getPods() {
    const response = await this.kubeConnector.worksetResourceQuery('pods');
    return Object.keys(response.status.results).reduce((accum, clusterName) => {
      const pods = response.status.results[clusterName].items;

      pods.map(pod => accum.push({
        cluster: clusterName,
        containers: pod.spec.containers,
        createdAt: pod.metadata.creationTimestamp,
        hostIP: pod.status.hostIP,
        labels: pod.metadata.labels,
        name: pod.metadata.name,
        namespace: pod.metadata.namespace,
        owners: pod.metadata.ownerReferences,
        podIP: pod.status.podIP,
        startedAt: pod.status.startTime,
        status: pod.status.phase,
        uid: pod.metadata.uid,
      }));

      return accum;
    }, []);
  }

  async getRepos() {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/helmrepos');
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return response.items.map(cluster => ({
      Name: cluster.metadata.name,
      URL: cluster.spec.url,
    }));
  }

  async getPolicies() {
    const response = await this.kubeConnector.get('/apis/policy.hcm.ibm.com/v1alpha1/policies');
    if (response.code || response.message) {
      logger.error(`HCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return response.items.map(policy => ({
      name: policy.metadata && policy.metadata.name,
      namespace: policy.metadata && policy.metadata.namespace,
      status: () => {
        if (policy.status && policy.status.Valid === false) {
          return 'invalid';
        } else if (policy.status && policy.status.Compliant) {
          return policy.status.Compliant;
        }
        return 'unknown';
      },
      enforcement: () => {
        if (policy.spec) {
          return policy.spec.remediationAction;
        }
        return 'unknown';
      },
    }));
  }

  async setRepo(input) {
    const jsonBody = {
      apiVersion: 'mcm.ibm.com/v1alpha1',
      kind: 'HelmRepo',
      metadata: {
        name: input.Name,
      },
      spec: {
        url: input.URL,
      },
    };
    const response = await this.kubeConnector.post('/apis/mcm.ibm.com/v1alpha1/namespaces/default/helmrepos', jsonBody);
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return {
      Name: response.metadata.name,
      URL: response.spec.url,
    };
  }

  async deleteRepo(input) {
    const response = await this.kubeConnector.delete(`/apis/mcm.ibm.com/v1alpha1/namespaces/default/helmrepos/${input.Name}`);
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    return {
      Name: response.metadata.name,
      URL: response.spec.url,
    };
  }

  async getNodes() {
    const response = await this.kubeConnector.worksetResourceQuery('nodes');
    return Object.keys(response.status.results).reduce((accum, clusterName) => {
      const nodes = response.status.results[clusterName].items;

      nodes.map(node => accum.push({
        allocatable: node.status.allocatable,
        architecture: node.status.nodeInfo.architecture,
        capacity: node.status.capacity,
        cluster: clusterName,
        createdAt: node.metadata.creationTimestamp,
        labels: node.metadata.labels,
        name: node.metadata.name,
        images: node.status.images.reduce((imageNames, curr) => {
          imageNames.push(...curr.names);
          return imageNames;
        }, []),
        operatingSystem: node.status.nodeInfo.operatingSystem,
        osImage: node.status.nodeInfo.osImage,
        startedAt: node.status.startTime,
        status: node.status.phase,
        uid: node.metadata.uid,
      }));

      return accum;
    }, []);
  }

  async getNamespaces() {
    const response = await this.kubeConnector.worksetResourceQuery('namespaces');
    return Object.keys(response.status.results).reduce((accum, clusterName) => {
      const namespaces = response.status.results[clusterName].items;

      namespaces.map(namespace => accum.push({
        cluster: clusterName,
        createdAt: namespace.metadata.creationTimestamp,
        labels: namespace.metadata.labels,
        name: namespace.metadata.name,
        status: namespace.status.phase,
        uid: namespace.metadata.uid,
      }));

      return accum;
    }, []);
  }

  async getCharts() {
    const response = await this.kubeConnector.get('/apis/mcm.ibm.com/v1alpha1/helmrepos');
    if (response.code || response.message) {
      logger.error(`MCM ERROR ${response.code} - ${response.message}`);
      return [];
    }
    const charts = [];
    response.items.forEach((cluster) => {
      const rName = cluster.metadata.name;
      const repo = Object.values(cluster.status.charts);
      repo.forEach((chart) => {
        charts.push({
          repoName: rName,
          name: chart.chartVersions[0].name,
          version: chart.chartVersions[0].version,
          urls: chart.chartVersions[0].urls,
        });
      });
    });
    return charts;
  }
}

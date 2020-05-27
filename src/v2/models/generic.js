/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import _ from 'lodash';
import crypto from 'crypto';
import KubeModel from './kube';
import logger from '../lib/logger';

function getApiGroupFromSelfLink(selfLink, kind) {
  // TODO - need to pass apigroup from backend to this function so we dont need this hack
  let apiGroup = ''; // api group to differentiate between duplicate resources (ie. endpoints & subscriptions)
  const selfLinkData = selfLink.split('/');
  // eslint-disable-next-line
  // When splitting the selfLink, the item at selfLinkData[3] is either the api version (if the resource has an apiGroup namespaced or not), resource kind (if the resource is non-namespaced AND doesn’t have an apiGroup) or namespaces (if the resource is namespaced AND doesn’t have an apiGroup).
  // knowing this we grab the apiGroup if selfLinkData[3] is not the kind or 'namespaces'
  if (selfLinkData[3] !== kind && selfLinkData[3] !== 'namespaces') {
    // eslint-disable-next-line prefer-destructuring
    apiGroup = selfLinkData[2];
  }
  return apiGroup;
}

export default class GenericModel extends KubeModel {
  async getResourceEndPoint(resource, k8sPaths) {
    // dynamically get resource endpoint from kebernetes API
    // ie.https://ec2-54-84-124-218.compute-1.amazonaws.com:8443/kubernetes/
    if (k8sPaths) {
      const { apiVersion, kind } = resource;
      const apiPath = k8sPaths.paths.find(path => path.match(`/[0-9a-zA-z]*/?${apiVersion}`));
      if (apiPath) {
        return (async () => {
          const k8sResourceList = await this.kubeConnector.get(`${apiPath}`);
          const resourceType = k8sResourceList.resources.find(item => item.kind === kind);
          const namespace = _.get(resource, 'metadata.namespace');
          const { name, namespaced } = resourceType;
          if (namespaced && !namespace) {
            return null;
          }
          const requestPath = `${apiPath}/${namespaced ? `namespaces/${namespace}/` : ''}${name}`;
          return requestPath;
        })();
      }
    }
    return undefined;
  }

  async createResources(args) {
    const { resources, clusterInfo } = args;
    if (clusterInfo) {
      const responseArr = await Promise.all(resources.map(async (resource) => {
        let workName = `create-resource-${this.kubeConnector.uid()}`;
        workName = workName.substring(0, 63);
        const jsonBody = {
          apiVersion: 'mcm.ibm.com/v1alpha1',
          kind: 'Work',
          metadata: {
            name: workName,
            namespace: clusterInfo.clusterNameSpace,
          },
          spec: {
            cluster: {
              name: clusterInfo.clusterName,
            },
            type: 'Action',
            actionType: 'Create',
            kube: {
              resource: resource.kind.toLowerCase(),
              namespace: resource.metadata.namespace,
              template: resource,
            },
          },
        };
        const response = await this.kubeConnector.post(`/apis/mcm.ibm.com/v1alpha1/namespaces/${clusterInfo.clusterNameSpace}/works`, jsonBody);
        return response;
      }));
      return responseArr;
    }

    const k8sPaths = await this.kubeConnector.get('/');
    // get resource end point for each resource
    const requestPaths = await Promise.all(resources.map(async resource =>
      this.getResourceEndPoint(resource, k8sPaths)));
    if (requestPaths.length === 0 || requestPaths.includes(undefined)) {
      if (requestPaths.length > 0) {
        const resourceIndex = requestPaths.indexOf(undefined);
        return {
          errors: [{ message: `Cannot find resource type "${resources[resourceIndex].apiVersion}"` }],
        };
      }
      return {
        errors: [{ message: 'Cannot find resource path' }],
      };
    } else if (requestPaths.includes(null)) {
      return {
        errors: [{ message: 'Namespace not found in the template' }],
      };
    }

    const result = await Promise.all(resources.map((resource, index) =>
      this.kubeConnector.post(requestPaths[index], resource)
        .catch(err => ({
          status: 'Failure',
          message: err.message,
        }))));

    const errors = [];
    result.forEach((item) => {
      if (item.code >= 400 || item.status === 'Failure' || item.message) {
        errors.push({ message: item.message });
      }
    });
    return {
      errors,
      result,
    };
  }

  async patchResource(args) {
    /*
    update k8s resources' labels
    the Content-Type is 'application/json-patch+json'
    the request body should look like:
    [{
     "op": "replace", "path": "/metadata/labels", "value": {
            "cloud": "IBM",
            "datacenter": "toronto",
            "environment": "Dev"
        }
     }]
    */
    let endpointURL = '';
    let resourceName = '';
    let response;
    const {
      namespace, name, resourceType, body, resourcePath, selfLink,
    } = args;
    const requestBody = {
      body: [
        {
          op: 'replace',
          path: resourcePath,
          value: body,
        },
      ],
    };
    if (!selfLink) {
      switch (resourceType) {
        case 'HCMCluster':
          endpointURL = 'clusterregistry.k8s.io';
          resourceName = 'clusters';
          break;
        default:
          throw new Error('OCM ERROR cannot find matched resource type');
      }
      response = await this.kubeConnector.patch(`/apis/${endpointURL}/v1alpha1/namespaces/${namespace}/${resourceName}/${name}`, requestBody);
    } else {
      // will use selfLink by default
      response = await this.kubeConnector.patch(`${selfLink}`, requestBody);
    }
    if (response && (response.code || response.message)) {
      throw new Error(`${response.code} - ${response.message}`);
    }
    return response;
  }

  async putResource(args) {
    /*
    update k8s resources
    the Content-Type is 'application/json'
    the request body should look like:
    {
      "apiVersion": "compliance.mcm.ibm.com/v1alpha1",
      "kind": "Compliance",
      "metadata": {
        "name": "compliance-test-3",
        "finalizers": [
          "finalizer.mcm.ibm.com"
        ],
        "generation": 1,
        "namespace": "mcm",
        "resourceVersion": "2462226"
      },
     }
    */
    let endpointURL = '';
    let resourceName = '';
    let response;
    const {
      namespace, name, resourceType, body, selfLink,
    } = args;
    const requestBody = {
      body,
    };

    if (!selfLink) {
      switch (resourceType) {
        case 'HCMCompliance':
          endpointURL = 'compliance.mcm.ibm.com';
          resourceName = 'compliances';
          break;
        default:
          throw new Error('OCM ERROR cannot find matched resource type');
      }
      response = await this.kubeConnector.put(`/apis/${endpointURL}/v1alpha1/namespaces/${namespace}/${resourceName}/${name}`, requestBody);
    } else {
      // will use selfLink by default
      response = await this.kubeConnector.put(`${selfLink}`, requestBody);
    }
    if (response && (response.code || response.message)) {
      throw new Error(`${response.code} - ${response.message}`);
    }
    return response;
  }

  async resourceAction(resourceType, actionType, resourceName, resourceNamespace, clusterName) {
    let name = `workset-${resourceType}-${this.kubeConnector.uid()}`;
    name = name.substring(0, 63);
    const body = {
      apiVersion: 'mcm.ibm.com/v1alpha1',
      kind: 'WorkSet',
      metadata: {
        name,
      },
      spec: {
        clusterSelector: {
          matchLabels: {
            name: clusterName,
          },
        },
        template: {
          spec: {
            type: 'Action',
            actionType,
          },
        },
      },
    };
    if (resourceType === 'helm') {
      body.spec.template.spec.helm = {
        releaseName: resourceName,
        namespace: resourceNamespace,
      };
    } else {
      body.spec.template.spec.kube = {
        resource: resourceType,
        name: resourceName,
        namespace: resourceNamespace,
      };
    }

    const response = await this.kubeConnector.post(`/apis/mcm.ibm.com/v1alpha1/namespaces/${this.kubeConnector.resourceViewNamespace}/worksets`, body);
    if (response.status === 'Failure' || response.code >= 400) {
      throw new Error(`Create Resource Action Failed [${response.code}] - ${response.message}`);
    }

    const { cancel, promise: pollPromise } = this.kubeConnector.pollView(_.get(response, 'metadata.selfLink'));

    try {
      const result = await Promise.race([pollPromise, this.kubeConnector.timeout()]);
      logger.debug('result:', result);
      if (result) {
        this.kubeConnector.delete(`/apis/mcm.ibm.com/v1alpha1/namespaces/${this.kubeConnector.resourceViewNamespace}/worksets/${response.metadata.name}`)
          .catch(e => logger.error(`Error deleting workset ${response.metadata.name}`, e.message));
      }
      const reason = _.get(result, 'status.reason');
      if (reason) {
        throw new Error(`Failed to delete ${resourceName}: ${reason}`);
      } else {
        return _.get(result, 'metadata.name');
      }
    } catch (e) {
      logger.error('Resource Action Error:', e.message);
      cancel();
      throw e;
    }
  }

  async getLogs(containerName, podName, podNamespace, clusterName) {
    if (clusterName === 'local-cluster') { // TODO: Use flag _hubClusterResource instead of cluster name
      return this.kubeConnector.get(`/api/v1/namespaces/${podNamespace}/pods/${podName}/log?container=${containerName}&tailLines=1000`);
    }
    const cluster = await this.kubeConnector.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters/${clusterName}`);
    if (cluster && cluster.length === 1) {
      const clusterNamespace = cluster[0].metadata.namespace;
      return this.kubeConnector.get(`/apis/mcm.ibm.com/v1alpha1/namespaces/${clusterNamespace}/clusterstatuses/${clusterName}/log/${podNamespace}/${podName}/${containerName}?tailLines=1000`, { json: false }, true);
    }
    throw new Error(`Unable to find the cluster called ${clusterName}`);
  }

  // Generic query to get local and remote resource data
  // Remote resources are queried using SpokeView
  async getResource(args) {
    const {
      selfLink,
      cluster = '',
      kind,
      name,
      namespace = '',
      updateInterval,
      deleteAfterUse = false,
    } = args;
    if (cluster === 'local-cluster' && selfLink && selfLink !== '') {
      return this.kubeConnector.get(selfLink);
    }

    // Check if the SpokeView already exists if not create it
    const spokeViewName = crypto.createHash('sha1').update(`${cluster}-${name}-${kind}`).digest('hex').substr(0, 63);

    const resourceResponse = await this.kubeConnector.get(`/apis/view.open-cluster-management.io/v1beta1/namespaces/${cluster}/spokeviews/${spokeViewName}`);
    if (resourceResponse.status === 'Failure' || resourceResponse.code >= 400) {
      const apiGroup = getApiGroupFromSelfLink(selfLink);
      const response = await this.kubeConnector.spokeViewQuery(
        cluster,
        apiGroup,
        kind,
        name,
        namespace,
        updateInterval,
        deleteAfterUse,
      ).catch(() => null);

      const resourceResult = _.get(response, 'status.result');
      if (resourceResult) {
        return resourceResult;
      }

      return [{ message: 'Unable to load resource data - Check to make sure the cluster hosting this resource is online' }];
    }
    return _.get(resourceResponse, 'status.result');
  }

  // Delete a SpokeView resource
  async deleteSpokeView(spokeClusterNamespace, spokeViewName) {
    await this.kubeConnector.deleteSpokeView(spokeClusterNamespace, spokeViewName)
      .catch(() => null);
  }

  async updateResource(args) {
    const {
      selfLink, namespace, kind, name, body, cluster,
    } = args;
    const requestBody = { body };
    // If updating resource on local cluster use selfLink
    if (cluster === 'local-cluster' && selfLink && selfLink !== '') {
      const response = await this.kubeConnector.put(selfLink, requestBody);
      if (response.message) {
        throw new Error(`${response.code} - ${response.message}`);
      }
      return response;
    }
    const clusterResponse = await this.kubeConnector.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters/${cluster}`);
    const clusterNamespace = clusterResponse[0].metadata.namespace;
    const apiGroup = getApiGroupFromSelfLink(selfLink, kind);
    // Else If updating resource on remote cluster use an Action Type Work
    // Limit workName to 63 characters
    let workName = `update-resource-${this.kubeConnector.uid()}`;
    workName = workName.substring(0, 63);
    const jsonBody = {
      apiVersion: 'mcm.ibm.com/v1alpha1',
      kind: 'Work',
      metadata: {
        name: workName,
        namespace: clusterNamespace,
      },
      spec: {
        cluster: {
          name: cluster,
        },
        type: 'Action',
        scope: {
          resourceType: `${kind}${apiGroup ? `.${apiGroup}` : ''}`,
          namespace,
        },
        actionType: 'Update',
        kube: {
          resource: `${kind}${apiGroup ? `.${apiGroup}` : ''}`,
          name,
          namespace,
          template: body,
        },
      },
    };
    const response = await this.kubeConnector.post(`/apis/mcm.ibm.com/v1alpha1/namespaces/${clusterNamespace}/works`, jsonBody);
    if (response.code || response.message) {
      logger.error(`OCM ERROR ${response.code} - ${response.message}`);
      return [{
        code: response.code,
        message: response.message,
      }];
    }
    const { cancel, promise: pollPromise } = this.kubeConnector.pollView(_.get(response, 'metadata.selfLink'));

    try {
      const result = await Promise.race([pollPromise, this.kubeConnector.timeout()]);
      if (result) {
        this.kubeConnector.delete(`/apis/mcm.ibm.com/v1alpha1/namespaces/${clusterNamespace}/works/${response.metadata.name}`)
          .catch(e => logger.error(`Error deleting work ${response.metadata.name}`, e.message));
      }
      const reason = _.get(result, 'status.reason');
      if (reason) {
        throw new Error(`Failed to Update ${name}: ${reason}`);
      } else {
        return _.get(result, 'metadata.name');
      }
    } catch (e) {
      logger.error('Resource Action Error:', e.message);
      cancel();
      throw e;
    }
  }

  async deleteResource(args) {
    const {
      selfLink, name, namespace, cluster, kind, childResources,
    } = args;
    if (childResources) {
      const errors = this.deleteChildResource(childResources);
      if (errors && errors.length > 0) {
        throw new Error(`OCM ERROR: Unable to delete child resource(s) - ${JSON.stringify(errors)}`);
      }
    }

    // If deleting resource on local cluster use selfLink
    if ((cluster === '' || cluster === 'local-cluster' || cluster === undefined) && selfLink && selfLink !== '') {
      const response = await this.kubeConnector.delete(selfLink, {});
      if (response.status === 'Failure' || response.code >= 400) {
        throw new Error(`Failed to delete the requested resource [${response.code}] - ${response.message}`);
      }
      return response;
    }

    const clusterResponse = await this.kubeConnector.getResources(ns => `/apis/clusterregistry.k8s.io/v1alpha1/namespaces/${ns}/clusters/${cluster}`);
    const clusterNamespace = clusterResponse[0].metadata.namespace;
    const apiGroup = getApiGroupFromSelfLink(selfLink, kind);

    // Else if deleting resource on remote cluster use Action Type Work
    // Limit workName to 63 characters
    let workName = `delete-resource-${this.kubeConnector.uid()}`;
    workName = workName.substring(0, 63);
    const jsonBody = {
      apiVersion: 'mcm.ibm.com/v1alpha1',
      kind: 'Work',
      metadata: {
        name: workName,
        namespace: clusterNamespace,
      },
      spec: {
        cluster: {
          name: cluster,
        },
        type: 'Action',
        scope: {
          resourceType: `${kind}${apiGroup ? `.${apiGroup}` : ''}`,
          namespace,
        },
        actionType: 'Delete',
        kube: {
          resource: `${kind}${apiGroup ? `.${apiGroup}` : ''}`,
          name,
          namespace,
        },
      },
    };

    const response = await this.kubeConnector.post(`/apis/mcm.ibm.com/v1alpha1/namespaces/${clusterNamespace}/works`, jsonBody);
    if (response.code || response.message) {
      logger.error(`OCM ERROR ${response.code} - ${response.message}`);
      return [{
        code: response.code,
        message: response.message,
      }];
    }
    const { cancel, promise: pollPromise } = this.kubeConnector.pollView(_.get(response, 'metadata.selfLink'));

    try {
      const result = await Promise.race([pollPromise, this.kubeConnector.timeout()]);
      if (result) {
        this.kubeConnector.delete(`/apis/mcm.ibm.com/v1alpha1/namespaces/${clusterNamespace}/works/${response.metadata.name}`)
          .catch(e => logger.error(`Error deleting work ${response.metadata.name}`, e.message));
      }
      const reason = _.get(result, 'status.reason');
      if (reason) {
        throw new Error(`Failed to Update ${name}: ${reason}`);
      } else {
        return _.get(result, 'metadata.name');
      }
    } catch (e) {
      logger.error('Resource Action Error:', e.message);
      cancel();
      throw e;
    }
  }

  async deleteChildResource(resources) {
    if (resources.length < 1) {
      logger.info('No child resources selected for deletion');
      return [];
    }

    const result = await Promise.all(resources.map(resource =>
      this.kubeConnector.delete(resource.selfLink)
        .catch(err => ({
          status: 'Failure',
          message: err.message,
        }))));

    const errors = [];
    result.forEach((item) => {
      if (item.code >= 400 || item.status === 'Failure') {
        errors.push({ message: item.message });
      }
    });
    return errors;
  }

  async userAccess(resource, action, namespace = '', group = '') {
    const body = {
      apiVersion: 'authorization.k8s.io/v1',
      kind: 'SelfSubjectAccessReview',
      spec: {
        resourceAttributes: {
          verb: action,
          resource,
          namespace,
          group,
        },
      },
    };
    const response = await this.kubeConnector.post('/apis/authorization.k8s.io/v1/selfsubjectaccessreviews', body);
    if (response.status === 'Failure' || response.code >= 400) {
      throw new Error(`Get User Access Failed [${response.code}] - ${response.message}`);
    }
    return response.status;
  }
}

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

const routePrefix = '/apis/action.open-cluster-management.io/v1beta1/namespaces';
const clusterActionApiVersion = 'action.open-cluster-management.io/v1beta1';
const authApiVersion = 'authorization.k8s.io/v1';
const selfSubjectAccessReviewLink = '/apis/authorization.k8s.io/v1/selfsubjectaccessreviews';

function getApiGroupFromPath(path, kind) {
  // TODO - need to pass apigroup from backend to this function so we dont need this hack
  let apiGroup = ''; // api group to differentiate between duplicate resources (ie. endpoints & subscriptions)
  const pathData = path.split('/');
  // eslint-disable-next-line
  // When splitting the path, the item at pathData[3] is either the api version (if the resource has an apiGroup namespaced or not), resource kind (if the resource is non-namespaced AND doesn’t have an apiGroup) or namespaces (if the resource is namespaced AND doesn’t have an apiGroup).
  // knowing this we grab the apiGroup if pathData[3] is not the kind or 'namespaces'
  if (pathData[3] !== kind && pathData[3] !== 'namespaces') {
    // eslint-disable-next-line prefer-destructuring
    apiGroup = pathData[2];
  }
  return apiGroup;
}

export default class GenericModel extends KubeModel {
  async createResources(args) {
    const { resources, clusterInfo } = args;
    if (clusterInfo) {
      const responseArr = await Promise.all(resources.map(async (resource) => {
        let workName = `create-resource-${this.kubeConnector.uid()}`;
        workName = workName.substring(0, 63);
        const jsonBody = {
          apiVersion: clusterActionApiVersion,
          kind: 'ManagedClusterAction',
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
        try {
          return this.kubeConnector.post(`${routePrefix}/${clusterInfo.clusterNameSpace}/managedclusteractions`, jsonBody);
        } catch (e) {
          logger.error(e);
          throw e;
        }
      }));
      return responseArr;
    }

    // get resource end point for each resource
    const requestPaths = await Promise.all(resources.map(async (resource) => this.getResourceEndPoint(resource)));
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
    } if (requestPaths.includes(null)) {
      return {
        errors: [{ message: 'Namespace not found in the template' }],
      };
    }

    const result = await Promise.all(resources.map((resource, index) => this.kubeConnector.post(requestPaths[index], resource)
      .catch((err) => ({
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
    const {
      apiVersion, kind, namespace, name, body, resourcePath,
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
    const path = `${await this.getResourceEndPoint({ apiVersion, kind, metadata: { namespace } })}/${name}`;
    const response = await this.kubeConnector.patch(path, requestBody).catch((err) => {
      logger.error(err);
      throw err;
    });

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
    const {
      body,
    } = args;
    const {
      apiVersion, kind, metadata: { namespace, name },
    } = body;
    const requestBody = {
      body,
    };

    const path = `${await this.getResourceEndPoint({ apiVersion, kind, metadata: { namespace } })}/${name}`;
    const response = await this.kubeConnector.put(path, requestBody);

    if (response && (response.code || response.message)) {
      throw new Error(`${response.code} - ${response.message}`);
    }
    return response;
  }

  async getLogs(containerName, podName, podNamespace, clusterName) {
    if (clusterName === 'local-cluster') { // TODO: Use flag _hubClusterResource instead of cluster name
      return this.kubeConnector.get(`/api/v1/namespaces/${podNamespace}/pods/${podName}/log?container=${containerName}&tailLines=1000`).catch((err) => {
        logger.error(err);
        throw err;
      });
    }
    return this.kubeConnector.get(`/apis/proxy.open-cluster-management.io/v1beta1/namespaces/${clusterName
    }/clusterstatuses/${clusterName}/log/${podNamespace}/${podName}/${containerName}?tailLines=1000`, { json: false }, true).catch((err) => {
      logger.error(err);
      throw err;
    });
  }

  // Generic query to get local and remote resource data
  // Remote resources are queried using ManagedClusterView
  async getResource(args) {
    const {
      apiVersion,
      selfLink,
      cluster = '',
      kind,
      name,
      namespace = '',
      updateInterval,
      deleteAfterUse = true,
    } = args;
    const path = selfLink || `${await this.getResourceEndPoint({ apiVersion, kind, metadata: { namespace } })}/${name}`;
    if (cluster === 'local-cluster') {
      return this.kubeConnector.get(path).catch((err) => {
        logger.error(err);
        throw err;
      });
    }

    // Check if the ManagedClusterView already exists if not create it
    const managedClusterViewName = crypto.createHash('sha1').update(`${cluster}-${name}-${kind}`).digest('hex').substr(0, 63);

    const resourceResponse = await this.kubeConnector.get(
      `/apis/view.open-cluster-management.io/v1beta1/namespaces/${cluster}/managedclusterviews/${managedClusterViewName}`,
    ).catch((err) => {
      logger.error(err);
      throw err;
    });
    if (resourceResponse.status === 'Failure' || resourceResponse.code >= 400) {
      const apiGroup = getApiGroupFromPath(path);
      const response = await this.kubeConnector.managedClusterViewQuery(
        cluster,
        apiGroup,
        kind,
        name,
        namespace,
        updateInterval,
        deleteAfterUse,
      ).catch((err) => {
        logger.error(err);
        throw err;
      });

      const resourceResult = _.get(response, 'status.result');
      if (resourceResult) {
        return resourceResult;
      }

      return [{ message: 'Unable to load resource data. Verify that the cluster hosting this resource is online.' }];
    }
    return _.get(resourceResponse, 'status.result');
  }

  // Delete a ManagedClusterView resource
  async deleteManagedClusterView(managedClusterNamespace, managedClusterViewName) {
    await this.kubeConnector.deleteManagedClusterView(
      managedClusterNamespace,
      managedClusterViewName,
    ).catch((err) => {
      logger.error(err);
      return null;
    });
  }

  async updateResource(args) {
    const {
      body, cluster,
    } = args;
    const requestBody = { body };

    const {
      apiVersion, kind, metadata: { name, namespace },
    } = body;
    const path = `${await this.getResourceEndPoint({ apiVersion, kind, metadata: { namespace } })}/${name}`;

    if (cluster === 'local-cluster') {
      const response = await this.kubeConnector.put(path, requestBody);
      if (response.message) {
        throw new Error(`${response.code} - ${response.message}`);
      }
      return response;
    }
    const apiGroup = getApiGroupFromPath(path, kind);
    // Else If updating resource on remote cluster use an Action Type Work
    // Limit workName to 63 characters
    let workName = `update-resource-${this.kubeConnector.uid()}`;
    workName = workName.substring(0, 63);
    const jsonBody = {
      apiVersion: clusterActionApiVersion,
      kind: 'ManagedClusterAction',
      metadata: {
        name: workName,
        namespace: cluster,
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
    const actionPath = `${routePrefix}/${cluster}/managedclusteractions`;
    const response = await this.kubeConnector.post(actionPath, jsonBody);
    if (response.code || response.message) {
      logger.error(`OCM ERROR ${response.code} - ${response.message}`);
      return [{
        code: response.code,
        message: response.message,
      }];
    }
    const { cancel, promise: pollPromise } = this.kubeConnector.pollView(`${actionPath}/${workName}`);

    try {
      const result = await Promise.race([pollPromise, this.kubeConnector.timeout()]);
      if (result) {
        this.kubeConnector.delete(`${routePrefix}/${cluster}/managedclusteractions/${response.metadata.name}`)
          .catch((e) => logger.error(`Error deleting work ${response.metadata.name}`, e.message));
      }
      const reason = _.get(result, 'status.conditions[0].reason');
      if (reason && reason !== 'ActionDone') {
        const message = _.get(result, 'status.conditions[0].message');
        throw new Error(`Failed to Update ${name}. ${reason}. ${message}.`);
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
      apiVersion, selfLink, name, namespace, cluster, kind, childResources,
    } = args;
    if (childResources) {
      const errors = this.deleteChildResource(childResources);
      if (errors && errors.length > 0) {
        throw new Error(`OCM ERROR: Unable to delete child resource(s) - ${JSON.stringify(errors)}`);
      }
    }

    const path = selfLink || `${await this.getResourceEndPoint({ apiVersion, kind, metadata: { namespace } })}/${name}`;
    // Local cluster case
    if ((cluster === '' || cluster === 'local-cluster' || cluster === undefined)) {
      const localResponse = await this.kubeConnector.delete(path, {});
      if (localResponse.status === 'Failure' || localResponse.code >= 400) {
        throw new Error(`Failed to delete the requested resource [${localResponse.code}] - ${localResponse.message}`);
      }
      return localResponse;
    }

    const apiGroup = getApiGroupFromPath(path, kind);

    // Else if deleting resource on remote cluster use Action Type Work
    // Limit workName to 63 characters
    let workName = `delete-resource-${this.kubeConnector.uid()}`;
    workName = workName.substring(0, 63);
    const jsonBody = {
      apiVersion: clusterActionApiVersion,
      kind: 'ManagedClusterAction',
      metadata: {
        name: workName,
        namespace: cluster,
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

    const apiPath = `${routePrefix}/${cluster}/managedclusteractions`;
    const response = await this.kubeConnector.post(apiPath, jsonBody);
    if (response.code || response.message) {
      logger.error(`OCM ERROR ${response.code} - ${response.message}`);
      return [{
        code: response.code,
        message: response.message,
      }];
    }
    const managedClusterViewName = _.get(response, 'metadata.name');
    const { cancel, promise: pollPromise } = this.kubeConnector.pollView(`${apiPath}/${managedClusterViewName}`);
    try {
      const result = await Promise.race([pollPromise, this.kubeConnector.timeout()]);
      if (result) {
        this.kubeConnector.delete(`${routePrefix}/${cluster}/managedclusteractions/${response.metadata.name}`)
          .catch((e) => logger.error(`Error deleting work ${response.metadata.name}`, e.message));
      }
      const reason = _.get(result, 'status.conditions[0].reason');
      if (reason && reason !== 'ActionDone') {
        const message = _.get(result, 'status.conditions[0].message');
        throw new Error(`Failed to Delete ${name}. ${reason}. ${message}.`);
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

    const result = await Promise.all(resources.map((resource) => this.deleteResource(resource)
      .catch((err) => ({
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

  async userAccess({
    resource, action, namespace = '', apiGroup = '*', name = '', version = '*',
  }) {
    const body = {
      apiVersion: authApiVersion,
      kind: 'SelfSubjectAccessReview',
      spec: {
        resourceAttributes: {
          verb: action,
          resource,
          namespace,
          group: apiGroup,
          name,
          version,
        },
      },
    };
    const response = await this.kubeConnector.post(selfSubjectAccessReviewLink, body);
    if (response.status === 'Failure' || response.code >= 400) {
      throw new Error(`Get User Access Failed [${response.code}] - ${response.message}`);
    }
    return { ...response.status, ...response.spec.resourceAttributes };
  }

  async userAccessAnyNamespaces({
    resource, action, apiGroup = '*', name = '', version = '*',
  }) {
    // assuming the hub will only support running on openshift or else this won't work
    const existingNamespaces = await this.kubeConnector.get('/apis/project.openshift.io/v1/projects');
    if (existingNamespaces.code === 403) {
      return false;
    }
    if (existingNamespaces.status === 'Failure' || existingNamespaces.code >= 400) {
      throw new Error(`Get User Access Failed [${existingNamespaces.code}] - ${existingNamespaces.message}`);
    }

    let accessAllowed = false;

    // generate request array
    const requests = existingNamespaces.items.map((item) => {
      const body = {
        apiVersion: authApiVersion,
        kind: 'SelfSubjectAccessReview',
        spec: {
          resourceAttributes: {
            verb: action,
            resource,
            namespace: item.metadata.name,
            group: apiGroup,
            name,
            version,
          },
        },
      };
      return this.kubeConnector.post(selfSubjectAccessReviewLink, body)
        .catch((err) => ({
          status: 'Failure',
          message: err.message,
        }));
    });

    // add code to check for permission to create namespaces
    const checkNamespaceBody = {
      apiVersion: authApiVersion,
      kind: 'SelfSubjectAccessReview',
      spec: {
        resourceAttributes: {
          verb: 'create',
          resource: 'namespace',
          group: '*',
          version: 'v1',
        },
      },
    };

    const checkNamespacePromise = this.kubeConnector.post(selfSubjectAccessReviewLink, checkNamespaceBody)
      .catch((err) => ({
        status: 'Failure',
        message: err.message,
      }));

    requests.push(checkNamespacePromise);

    // wait for all requests to finish before proceeding
    await Promise.all(requests).then((data) => {
      data.forEach((res) => {
        accessAllowed = accessAllowed || res.status.allowed;
      });
    });

    return accessAllowed;
  }
}

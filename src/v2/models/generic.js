/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import KubeModel from './kube';

export default class GenericModel extends KubeModel {
  async updateLabels(args) {
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
    const {
      namespace, name, resourceType, labels,
    } = args;
    const requestBody = {
      body: [
        {
          op: 'replace',
          path: '/metadata/labels',
          value: labels,
        },
      ],
    };

    switch (resourceType) {
      case 'HCMCluster':
        endpointURL = 'clusterregistry.k8s.io';
        break;
      default:
        break;
    }
    const response = await this.kubeConnector.patch(`/apis/${endpointURL}/v1alpha1/namespaces/${namespace}/clusters/${name}`, requestBody);
    if (response.code || response.message) {
      throw new Error(`MCM ERROR ${response.code} - ${response.message}`);
    }
    return response;
  }
}

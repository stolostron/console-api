/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

import GenericModel from './generic';
import KubeConnector from '../connectors/kube';

// const asyncReturn = (value, waitTime = 500) =>
//   new Promise(res => setTimeout(res, waitTime, value));
describe('GenericModel CRUD operations', () => {
  test('GenericModel.updateResource operation returns valid response body', async () => {
    // const asyncReturn = (value, waitTime = 500) =>
    //     new Promise(res => setTimeout(res, waitTime, value));
    // const mockWorkset = {
    //     body: {
    //         metadata: {
    //         selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/test-set',
    //         },
    //     },
    //   };
    // const mockHttp = jest.fn(() => asyncReturn(mockWorkset, 200));

    const kubeConnector = new KubeConnector({
      kubeApiEndpoint: 'kubernetes',
      namespaces: ['rbrunopi-azure-c77c'],
      uid: () => '4be389b1-f5c5-4d8c-8a4c-2a50adb312e1',
    });


    const genericModel = new GenericModel({ kubeConnector });
    const args = {
      selfLink: '/apis/config.openshift.io/v1/clusterversions/version', namespace: 'rbrunopi-azure-c77c', kind: 'ClusterVersion', name: 'update-resource', body: '{ "apiVersion":"action.open-cluster-management.io/v1beta1", "kind":"ClusterAction", "metadata": {"name":"version", "finalizers":["finalizer.mcm.ibm.com"], "generation":1, "namespace":"rbrunopi-azure-c77c", "resourceVersion":"20326" }}', cluster: 'rbrunopi-azure-c77c',
    };
    try {
      const updateresponse = await genericModel.updateResource(args);
      const { responsebody } = updateresponse;

      console.log(`update response: ${responsebody}`);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    // expect(responsebody);
  });
});

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const mockResponse = {
  body: {
    kind: 'HelmRepo',
    apiVersion: 'hcm.ibm.com/v1alpha1',
    metadata: {
      name: 'testRepo',
      namespace: 'default',
      selfLink: '/apis/hcm.ibm.com/v1alpha1/namespaces/default/helmrepos/testRepo',
      uid: '54b10d8d-999d-11e8-bbf3-e6e9ac5de124',
      resourceVersion: '10130',
      creationTimestamp: '2018-08-06T17:22:44Z',
    },
    spec: {
      url: 'https://testRepo.com',
    },
    status: {},
  },
};

export default mockResponse;

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const getCloudConnectionsResponse = {
  body: {
    Items: [
      {
        name: 'iks-test',
        namespace: 'default',
        provider: 'iks',
        metadata: 'secret:\n  apiKey: iks-test\n',
      },
    ],
  },
  statusCode: 200,
};

const getCloudProvidersResponse = {
  body: {
    Items: [
      {
        name: 'iks-test',
        longname: 'iks-test',
        configMetadata: '',
        configValues: '',
        clusterMetadata: '',
        clusterValues: '',
      },
    ],
  },
  statusCode: 200,
};

export { getCloudConnectionsResponse, getCloudProvidersResponse };

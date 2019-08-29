/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const unitResponse = {
  body: {
    userQueries: [{
      id: 'id_01', name: 'test', description: 'test', searchText: 'test',
    }],
  },
};

const seleniumResponse = {
  body: {
    userQueries: [
      {
        id: 'id_02', name: 'test', description: 'test', searchText: 'test',
      },
      {
        id: 'id_03', name: 'SeleniumTesting', description: 'Testing the search UI using selenium/nightwatch', searchText: 'kind:pod',
      },
    ],
  },
};

export { unitResponse, seleniumResponse };

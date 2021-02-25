/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.

const unitResponse = {
  body: {
    Items: [{ userId: 'admin', activeAccountId: 'id-heroic-hound-icp-cluster-account', activeAccountName: 'heroic-hound-icp-cluster Account' }],
  },
};

const seleniumResponse = {
  body: {
    Items: [
      { userId: 'admin', activeAccountId: 'id-heroic-hound-icp-cluster-account', activeAccountName: 'heroic-hound-icp-cluster Account' },
    ],
  },
};

export { unitResponse, seleniumResponse };

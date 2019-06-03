/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const mockResponse = {
  body: {
    status: {
      userAccess: {
        allowed: true,
        reason: 'RBAC: allowed by ClusterRoleBinding "oidc-admin-binding" of ClusterRole "cluster-admin" to User "https://127.0.0.1:9443/oidc/endpoint/OP#admin"',
      },
    },
  },
};

export default mockResponse;

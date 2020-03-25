/* eslint-disable no-trailing-spaces */
/* eslint-disable key-spacing */
/* eslint-disable quote-props */
/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

// Copyright (c) 2020 Red Hat, Inc.

export const getNamespaceCreationResponse = {
  body: {
    kind: 'Namespace',
  },
  statusCode: 201,
};

export const getEndpointConfigsResponse = {
  body: {
    kind: 'EndpointConfig',
  },
  statusCode: 201,
};

export const getClusterResponse = {
  body: {
    kind: 'Cluster',
  },
  statusCode: 201,
};

export const getImportYamlSecret = {
  body: {
    kind: 'Secret',
  },
  statusCode: 200,
};

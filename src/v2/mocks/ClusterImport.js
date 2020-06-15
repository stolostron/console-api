/* eslint-disable no-trailing-spaces */
/* eslint-disable key-spacing */
/* eslint-disable quote-props */
/** *****************************************************************************
* Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

// Copyright (c) 2020 Red Hat, Inc.

export const getNamespaceCreationResponse = {
  body: {
    kind: 'Namespace',
  },
  statusCode: 201,
};

export const getKlusterletConfigsResponse = {
  body: {
    kind: 'KlusterletConfig',
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

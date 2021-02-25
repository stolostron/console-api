/* eslint-disable no-trailing-spaces */
/* eslint-disable key-spacing */
/* eslint-disable quote-props */

// Copyright (c) 2020 Red Hat, Inc.

export const getNamespaceCreationResponse = {
  body: {
    kind: 'Namespace',
    metadata:
    {
      name: 'a-namespace',
    },
  },
  statusCode: 201,
};

export const getKlusterletAddonConfigsResponse = {
  body: {
    kind: 'KlusterletAddonConfig',
  },
  statusCode: 201,
};

export const getClusterResponse = {
  body: {
    kind: 'Cluster',
    metadata:
    {
      name: 'a-cluster',
    },
  },
  statusCode: 201,
};

export const getImportYamlSecret = {
  body: {
    kind: 'Secret',
  },
  statusCode: 200,
};

export const badImportYamlSecret = {
  body: {
    'kind': 'Status',
    'apiVersion': 'v1',
    'metadata': {},
    'status': 'Failure',
    'message': 'secrets "no-yaml-import" not found',
    'reason': 'NotFound',
    'details': { 'name': 'no-yaml-import', 'kind': 'secrets' },
    'code': 404,
  },
};

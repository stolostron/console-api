/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
// Copyright (c) 2020 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import _ from 'lodash';

export function isRequired(paramName) {
  throw new Error(`${paramName} is required`);
}

export function getType(item) {
  if (item.spec.hostPath) {
    return 'Hostpath';
  }
  if (item.spec.gcePersistentDisk) {
    return 'GCEPersistentDisk';
  }
  if (item.spec.awsElasticBlockStore) {
    return 'AWSElasticBlockStore';
  }
  if (item.spec.nfs) {
    return 'NFS';
  }
  if (item.spec.iscsi) {
    return 'iSCSI';
  }
  if (item.spec.glusterfs) {
    return 'Glusterfs';
  }
  if (item.spec.rbd) {
    return 'RBD';
  }
  if (item.spec.secret) {
    return 'Secret';
  }
  if (item.spec.local) {
    return 'LocalVolume';
  }
  if (item.spec.vsphereVolume) {
    return 'vSphere';
  }

  return '-';
}

export function responseHasError(response) {
  const code = response.statusCode || response.code;
  return code < 200 || code >= 300;
}

export function getLatest(items, key) {
  if (items.length === 0) {
    return undefined;
  }
  if (items.length === 1) {
    return items[0];
  }

  return items.reduce((a, b) => {
    const [timeA, timeB] = [a, b].map((x) => new Date(_.get(x, key, '')));
    return timeA > timeB ? a : b;
  });
}

export default {};

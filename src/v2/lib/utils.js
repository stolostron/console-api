/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */

export function isRequired(paramName) {
  throw new Error(`${paramName} is required`);
}

export function getType(item) {
  if (item.spec.hostPath) {
    return 'Hostpath';
  } else if (item.spec.gcePersistentDisk) {
    return 'GCEPersistentDisk';
  } else if (item.spec.awsElasticBlockStore) {
    return 'AWSElasticBlockStore';
  } else if (item.spec.nfs) {
    return 'NFS';
  } else if (item.spec.iscsi) {
    return 'iSCSI';
  } else if (item.spec.glusterfs) {
    return 'Glusterfs';
  } else if (item.spec.rbd) {
    return 'RBD';
  } else if (item.spec.secret) {
    return 'Secret';
  } else if (item.spec.local) {
    return 'LocalVolume';
  } else if (item.spec.vsphereVolume) {
    return 'vSphere';
  }

  return '-';
}


export function responseHasError(response) {
  const code = response.statusCode || response.code;
  return (code < 200 || code >= 300);
}

export default {};

/** *****************************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 ****************************************************************************** */
import { getStatus } from './cluster';

const TODAY = '2020-07-13T14:18:28Z';
const YESTERDAY = '2020-07-12T14:18:28Z';
const TOMORROW = '2020-07-14T14:18:28Z';

const DETACHING_MANAGED_CLUSTER = {
  metadata:
  {
    deletionTimestamp: TODAY,
  },
};

const DETACHED_CLUSTER_DEPLOYMENT = {
  status: { installedTimestamp: YESTERDAY },
};

const job = (when, status) => ({
  metadata:
  {
    creationTimestamp: when,
  },
  status:
  {
    [status]: 1,
  },
});

const condition = (type) => ({
  status: 'True',
  type,
});

describe('getStatus()', () => {
  it('detects detaching', () => {
    expect(getStatus(DETACHING_MANAGED_CLUSTER)).toBe('detaching');
  });
  it('detects detaching with ClusterDeployment', () => {
    expect(getStatus(
      DETACHING_MANAGED_CLUSTER,
      null, // CSRs
      DETACHED_CLUSTER_DEPLOYMENT,
    )).toBe('detaching');
  });
  it('detects notaccepted', () => {
    expect(getStatus(
      {
        status: {
          conditions: [condition('ManagedClusterJoined')],
        },
      },
    )).toBe('notaccepted');
  });
  it('detects pendingimport', () => {
    expect(getStatus(
      {
        status: {
          conditions: [condition('HubAcceptedManagedCluster')],
        },
      },
    )).toBe('pendingimport');
  });
  it('detects needsapproval', () => {
    expect(getStatus(
      {
        status: {
          conditions: [
            condition('HubAcceptedManagedCluster'),
          ],
        },
      },
      [
        {}, // CSR
      ],
    )).toBe('needsapproval');
  });
  it('detects pending', () => {
    expect(getStatus(
      {
        status: {
          conditions: [
            condition('HubAcceptedManagedCluster'),
          ],
        },
      },
      [
        {
          status:
          {
            certificate: 'FAKE',
          },
        },
      ],
    )).toBe('pending');
  });
  it('detects offline', () => {
    expect(getStatus(
      {
        status: {
          conditions: [
            condition('HubAcceptedManagedCluster'),
            condition('ManagedClusterJoined'),
          ],
        },
      },
    )).toBe('offline');
  });
  it('detects ok', () => {
    expect(getStatus(
      {
        status: {
          conditions: [
            condition('HubAcceptedManagedCluster'),
            condition('ManagedClusterJoined'),
            condition('ManagedClusterConditionAvailable'),
          ],
        },
      },
    )).toBe('ok');
  });
  it('detects pendingimport with detached ClusterDeployment', () => {
    expect(getStatus(
      {
        status: {
          conditions: [condition('HubAcceptedManagedCluster')],
        },
      },
      null, // CSRs
      DETACHED_CLUSTER_DEPLOYMENT,
    )).toBe('pendingimport');
  });
  it('detects pending ClusterDeployment', () => {
    expect(getStatus(
      null, // ManagedCluster
      null, // CSRs
      {}, // ClusterDeployment
    )).toBe('pending');
  });
  it('detects destroying ClusterDeployment', () => {
    expect(getStatus(
      DETACHING_MANAGED_CLUSTER,
      null, // CSRs
      DETACHED_CLUSTER_DEPLOYMENT,
      [ // uninstall
        job(YESTERDAY, 'failed'),
        job(TOMORROW, 'active'),
        job(TODAY, 'failed'),
      ],
      [ // install
        job(YESTERDAY, 'failed'),
      ],
    )).toBe('destroying');
  });
  it('detects creating ClusterDeployment', () => {
    expect(getStatus(
      {
        status: {
          conditions: [condition('HubAcceptedManagedCluster')],
        },
      },
      null, // CSRs
      DETACHED_CLUSTER_DEPLOYMENT,
      null, // uninstall
      [ // install
        job(YESTERDAY, 'failed'),
        job(TODAY, 'active'),
      ],
    )).toBe('creating');
  });
  it('detects provisionfailed for creating ClusterDeployment', () => {
    expect(getStatus(
      {
        status: {
          conditions: [condition('HubAcceptedManagedCluster')],
        },
      },
      null, // CSRs
      DETACHED_CLUSTER_DEPLOYMENT,
      null, // uninstall
      [ // install
        job(YESTERDAY, 'succeeded'),
        job(TOMORROW, 'failed'),
        job(TODAY, 'succeeded'),
      ],
    )).toBe('provisionfailed');
  });
  it('detects provisionfailed for destroying ClusterDeployment', () => {
    expect(getStatus(
      {
        status: {
          conditions: [condition('HubAcceptedManagedCluster')],
        },
      },
      null, // CSRs
      DETACHED_CLUSTER_DEPLOYMENT,
      [ // uninstall
        job(YESTERDAY, 'succeeded'),
        job(TOMORROW, 'failed'),
        job(TODAY, 'succeeded'),
      ],
      null, // install
    )).toBe('provisionfailed');
  });
});

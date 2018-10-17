/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import KubeConnector from './kube';

const asyncReturn = (value, waitTime = 500) =>
  new Promise(res => setTimeout(res, waitTime, value));

const mockWorkset = {
  body: {
    metadata: {
      selfLink: '/apis/mcm.ibm.com/v1alpha1/namespaces/default/resourceviews/test-set',
    },
  },
};

const mockWorksetError = {
  body: {
    code: 401,
    message: 'Unauthorized',
    status: 'Failure',
  },
};

const mockWorksetPollIncomplete = {
  body: {
    items: [
      {
        status: {
          status: 'Not Finished',
        },
      },
    ],
  },
};

const mockWorksetPollComplete = {
  body: {
    items: [
      {
        status: {
          conditions: [
            { type: 'Completed', lastUpdateTime: '2018-08-15T18:44:41Z' },
          ],
        },
      },
    ],
  },
};

const mockWorksetResults = {
  body: {
    status: {
      conditions: [
        { type: 'Completed', lastUpdateTime: '2018-08-15T18:44:41Z' },
      ],
      results: {
        'mycluster.icp': {
          apiVersion: 'v1',
          items: [Array],
          kind: 'PodList',
          metadata: [Object],
        },
      },
    },
  },
};

describe('KubeConnector', () => {
  describe('Get', () => {
    test('calls httpLib with correct arguments', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { test: 'value' } }, 200));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      await connector.get('/api/test');

      expect(mockHttp.mock.calls).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });

    test('correctly merges additional arguments', async () => {
      const mockHttp = jest.fn(() =>
        new Promise(res =>
          setTimeout(res, 200, { body: { test: 'value' } })));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      await connector.get('/api/test', { headers: { 'x-custom-header': 'test-value' } });

      expect(mockHttp.mock.calls[0]).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('Post', () => {
    test('calls httpLib with correct arguments', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { test: 'value' } }, 200));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        namespaces: ['default'],
      });

      await connector.post('/api/test', { body: 'test-value' });

      expect(mockHttp.mock.calls[0]).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('CreateWorkset', () => {
    test('submits correct arguments and returns selfLink', async () => {
      const mockHttp = jest.fn(() => asyncReturn(mockWorkset, 200));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        uid: () => '1234',
        namespaces: ['default'],
      });

      const workset = await connector.createResourceView('pods', 'default');

      expect(mockHttp.mock.calls[0]).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
      expect(workset).toMatchSnapshot();
    });
  });

  describe('WorksetResourceQuery', () => {
    test('creates and polls workset api', async () => {
      const mockCache = { get: jest.fn().mockReturnValue(null), set: jest.fn() };
      const mockHttp = jest.fn()
        .mockImplementationOnce(() => asyncReturn(mockWorkset))
        .mockImplementationOnce(() => asyncReturn(mockWorksetPollIncomplete))
        .mockImplementationOnce(() => asyncReturn(mockWorksetPollIncomplete))
        .mockImplementationOnce(() => asyncReturn(mockWorksetPollIncomplete))
        .mockImplementationOnce(() => asyncReturn(mockWorksetPollComplete))
        .mockImplementation(() => asyncReturn(mockWorksetResults));

      const connector = new KubeConnector({
        cache: mockCache,
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        uid: () => '1234',
        namespaces: ['default'],
      });

      const result = await connector.resourceViewQuery('pods');

      expect(result).toMatchSnapshot();
    });

    test('throws if createWorkset fails', async () => {
      const mockHttp = jest.fn()
        .mockImplementationOnce(() => asyncReturn(mockWorksetError));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        uid: () => '1234',
        pollTimeout: 1000,
        namespaces: ['default'],
      });

      await expect(connector.resourceViewQuery('pods')).rejects.toMatchSnapshot();
    });

    test('throws on timeout', async () => {
      const mockHttp = jest.fn()
        .mockImplementationOnce(() => asyncReturn(mockWorkset))
        .mockImplementation(() => asyncReturn(mockWorksetPollIncomplete));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        uid: () => '1234',
        pollTimeout: 100,
        namespaces: ['default'],
      });

      await expect(connector.resourceViewQuery('pods')).rejects.toMatchSnapshot();
    });
  });
});

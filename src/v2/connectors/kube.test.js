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
      selfLink: '/apis/hcm.ibm.com/v1alpha1/namespaces/default/worksets/test-set',
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
    status: {
      status: 'Not Finished',
    },
  },
};

const mockWorksetPollComplete = {
  body: {
    status: {
      status: 'Completed',
      response: {
        test: 'test-value',
      },
    },
  },
};

describe('KubeConnector', () => {
  describe('Get', () => {
    test('calls httpLib with correct arguments', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { test: 'value' } }, 200));

      const connector = new KubeConnector({ kubeApiEndpoint: 'kubernetes', httpLib: mockHttp });
      await connector.get('/api/test');

      expect(mockHttp.mock.calls).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });

    test('correctly merges additional arguments', async () => {
      const mockHttp = jest.fn(() =>
        new Promise(res =>
          setTimeout(res, 200, { body: { test: 'value' } })));

      const connector = new KubeConnector({ kubeApiEndpoint: 'kubernetes', httpLib: mockHttp });
      await connector.get('/api/test', { headers: { 'x-custom-header': 'test-value' } });

      expect(mockHttp.mock.calls[0]).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
    });
  });

  describe('Post', () => {
    test('calls httpLib with correct arguments', async () => {
      const mockHttp = jest.fn(() => asyncReturn({ body: { test: 'value' } }, 200));

      const connector = new KubeConnector({ kubeApiEndpoint: 'kubernetes', httpLib: mockHttp });
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
      });

      const workset = await connector.createWorkset('pods');

      expect(mockHttp.mock.calls[0]).toHaveLength(1);
      expect(mockHttp.mock.calls[0]).toMatchSnapshot();
      expect(workset).toMatchSnapshot();
    });
  });

  describe('WorksetResourceQuery', () => {
    test('creates and polls workset api', async () => {
      const mockHttp = jest.fn()
        .mockImplementationOnce(() => asyncReturn(mockWorkset))
        .mockImplementationOnce(() => asyncReturn(mockWorksetPollIncomplete))
        .mockImplementationOnce(() => asyncReturn(mockWorksetPollIncomplete))
        .mockImplementationOnce(() => asyncReturn(mockWorksetPollIncomplete))
        .mockImplementation(() => asyncReturn(mockWorksetPollComplete));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        uid: () => '1234',
      });

      const result = await connector.worksetResourceQuery('pods');

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
      });

      await expect(connector.worksetResourceQuery('pods')).rejects.toMatchSnapshot();
    });

    test('throws on timeout', async () => {
      const mockHttp = jest.fn()
        .mockImplementationOnce(() => asyncReturn(mockWorkset))
        .mockImplementation(() => asyncReturn(mockWorksetPollIncomplete));

      const connector = new KubeConnector({
        kubeApiEndpoint: 'kubernetes',
        httpLib: mockHttp,
        uid: () => '1234',
        pollTimeout: 1000,
      });

      await expect(connector.worksetResourceQuery('pods')).rejects.toMatchSnapshot();
    });
  });
});

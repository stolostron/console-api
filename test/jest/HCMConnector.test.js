/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import HCMConnector from '../../src/datasource/lib/HCMConnector';

describe('HCMConnector', () => {
  const mockRequest = { headers: { authorization: '' } };
  const mockRequestLib = jest.fn();

  const hcmConnector = new HCMConnector({ requestLib: mockRequestLib });

  describe('processRequest', () => {
    test('returns unparsed response if JSON.parse fails', async () => {
      mockRequestLib.mockReturnValue({ body: { RetString: 'a-sample-work-id' } });

      const result = await hcmConnector.processRequest(mockRequest, '/api/v1alpha1/work');
      expect(result).toBe('a-sample-work-id');
    });

    test('returns parsed response if JSON.parse succeeds', async () => {
      mockRequestLib.mockReturnValue({
        body: {
          RetString: '{ "Result": { "test": ["values", "for", "testing"] } }',
        },
      });

      const result = await hcmConnector.processRequest(mockRequest, '/api/v1alpha1/work');
      expect(result).toMatchSnapshot();
    });

    test('throws GenericError if network error occurs', async () => {
      mockRequestLib.mockReturnValue({
        body: {
          Error: { message: 'Some generic error code' },
        },
      });

      try {
        const result = await hcmConnector.processRequest(mockRequest, '/api/v1alpha1/work');
        // Fail test if processRequest doesn't throw
        throw result;
      } catch (err) {
        expect(err).toMatchSnapshot();
      }
    });
  });
});

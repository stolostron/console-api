/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { helmRepoResolver } from '../../../src/v1/schema/modules/helmrepo-type';
import HCMConnector from '../../../src/v1/datasource/lib/hcm-connector';

describe('Helm Repository Resolver', () => {
  test('Correctly resolves helm repos query', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"default":{"Name":"default","URL":"http://9.42.80.212:8878"}},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await helmRepoResolver.Query.repos(null, null, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  test('Correctly resolves set repo mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"Name":"testRepo","URL":"https://testRepo.com"},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await helmRepoResolver.Mutation.setHelmRepo(null, { Name: 'testRepo', URL: 'https://testRepo.com' }, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  test('Correctly resolves delete repo mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"Name":"testRepo","URL":"https://testRepo.com"},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await helmRepoResolver.Mutation.deleteHelmRepository(null, { input: { Name: 'testRepo', URL: 'https://testRepo.com' } }, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });
});

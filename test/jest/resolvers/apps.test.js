/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { applicationResolver } from '../../../src/schema/modules/application-type';
import HCMConnector from '../../../src/datasource/lib/HCMConnector';

describe('Application Resolver', () => {
  test('correctly resolves applications query', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"fundtrader":{"Name":"fundtrader","Dashboard":"","Status":"registered","Labels":{"APPLICATION":"","fundtrader":"","instance":""},"Annotations":{"description":"Fund Trader Application","status":"registered","type":"instance"},"Components":[{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},{"Name":"redis-fund","Cluster":"toronto","Kind":"CACHESERVICE","Dashboard":"","Status":""}],"Dependencies":[{"Name":"odm","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},{"Name":"mq","Cluster":"toronto","Kind":"MESSAGEQUEUE","Dashboard":"","Status":""},{"Name":"db2","Cluster":"toronto","Kind":"DATABASESERVICE","Dashboard":"","Status":""}],"Relationships":[{"Start":{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"End":{"Name":"odm","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"Type":"usesExisting","Status":""},{"Start":{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"End":{"Name":"mq","Cluster":"toronto","Kind":"MESSAGEQUEUE","Dashboard":"","Status":""},"Type":"usesExisting","Status":""},{"Start":{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"End":{"Name":"redis-fund","Cluster":"toronto","Kind":"CACHESERVICE","Dashboard":"","Status":""},"Type":"usesCreated","Status":""},{"Start":{"Name":"fundsrv","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":""},"End":{"Name":"db2","Cluster":"toronto","Kind":"DATABASESERVICE","Dashboard":"","Status":""},"Type":"usesExisting","Status":""}]},"players":{"Name":"players","Dashboard":"","Status":"deployed","Labels":{"APPLICATION":"","instance":"","players":""},"Annotations":{"description":"Sample Application for deploy","status":"deployed","type":"instance"},"Components":[{"Name":"player2","Cluster":"myminikube","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":"deployed"},{"Name":"player1","Cluster":"toronto","Kind":"APPLICATIONSERVICE","Dashboard":"","Status":"deployed"}],"Dependencies":null,"Relationships":null}},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await applicationResolver.Query.applications(null, null, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });
});

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */
import { applicationResolver } from '../../../src/schema/modules/application-type';
import HCMConnector from '../../../src/datasource/lib/hcm-connector';

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

  test('correctly resolves create dashboard mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":"Application players has no components","Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await applicationResolver.Mutation.createDashboard(null, 'players', context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  test('correctly resolves delete application mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":"Success","Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await applicationResolver.Mutation.deleteApplication(null, 'testApp', context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  test('Correctly resolves deploy application mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"a26f8a94-902b-4757-82a7-03c8c914777a","Resource":"applications","Operation":"deploy","Work":{"Names":"players"},"Timestamp":"0001-01-01T00:00:00Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":null,"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"deploy","Resource":"applications","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"0001-01-01T00:00:00Z","UUID":"a26f8a94-902b-4757-82a7-03c8c914777a","Work":{"Names":"players"}},"Description":""},"Completed":true,"Results":{"crucial-owl":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"a26f8a94-902b-4757-82a7-03c8c914777a","Resource":"applications","Operation":"deploy","Work":{"Names":"players"},"Timestamp":"0001-01-01T00:00:00Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":null,"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"deploy","Resource":"applications","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"0001-01-01T00:00:00Z","UUID":"a26f8a94-902b-4757-82a7-03c8c914777a","Work":{"Names":"players"}},"Description":""},"Completed":false,"Results":{"Code":1,"GenTime":"2018-07-03T14:19:09.598229225Z","Location":"klusterlet","Message":"PollAndExecuteWork: wrong work resourceapplicationsoperationdeploy","Ref":""},"Timestamp":"2018-07-03T14:19:09.598371585Z"},"myminikube":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"a26f8a94-902b-4757-82a7-03c8c914777a","Resource":"applications","Operation":"deploy","Work":{"Names":"players"},"Timestamp":"0001-01-01T00:00:00Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":null,"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"deploy","Resource":"applications","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"0001-01-01T00:00:00Z","UUID":"a26f8a94-902b-4757-82a7-03c8c914777a","Work":{"Names":"players"}},"Description":""},"Completed":false,"Results":{"Code":1,"GenTime":"2018-07-03T14:19:10.095483434Z","Location":"klusterlet","Message":"PollAndExecuteWork: wrong work resourceapplicationsoperationdeploy","Ref":""},"Timestamp":"2018-07-03T14:19:10.095586425Z"}},"Timestamp":"2018-07-03T14:19:10.095586425Z"},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await applicationResolver.Mutation.deployApplication(null, 'players', context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  test('Correctly resolves undeploy application mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"8947f2bd-27c8-4757-b470-c287fc3e0ff5","Resource":"applications","Operation":"undeploy","Work":{"Names":"players"},"Timestamp":"0001-01-01T00:00:00Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":null,"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"undeploy","Resource":"applications","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"0001-01-01T00:00:00Z","UUID":"8947f2bd-27c8-4757-b470-c287fc3e0ff5","Work":{"Names":"players"}},"Description":""},"Completed":true,"Results":{"crucial-owl":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"8947f2bd-27c8-4757-b470-c287fc3e0ff5","Resource":"applications","Operation":"undeploy","Work":{"Names":"players"},"Timestamp":"0001-01-01T00:00:00Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":null,"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"undeploy","Resource":"applications","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"0001-01-01T00:00:00Z","UUID":"8947f2bd-27c8-4757-b470-c287fc3e0ff5","Work":{"Names":"players"}},"Description":""},"Completed":false,"Results":{"Code":1,"GenTime":"2018-07-03T14:36:33.593511508Z","Location":"klusterlet","Message":"PollAndExecuteWork: wrong work resourceapplicationsoperationundeploy","Ref":""},"Timestamp":"2018-07-03T14:36:33.593558326Z"},"myminikube":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"8947f2bd-27c8-4757-b470-c287fc3e0ff5","Resource":"applications","Operation":"undeploy","Work":{"Names":"players"},"Timestamp":"0001-01-01T00:00:00Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":null,"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"undeploy","Resource":"applications","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"0001-01-01T00:00:00Z","UUID":"8947f2bd-27c8-4757-b470-c287fc3e0ff5","Work":{"Names":"players"}},"Description":""},"Completed":false,"Results":{"Code":1,"GenTime":"2018-07-03T14:36:34.095654846Z","Location":"klusterlet","Message":"PollAndExecuteWork: wrong work resourceapplicationsoperationundeploy","Ref":""},"Timestamp":"2018-07-03T14:36:34.095845835Z"}},"Timestamp":"2018-07-03T14:36:34.095845835Z"},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await applicationResolver.Mutation.undeployApplication(null, 'players', context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  test('correctly resolves register application mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":"Success","Error":null}',
        Error: null,
      },
    });

    const templateYaml = 'aGNta2luZDogVG9wb2xvZ3lJbnN0YW5jZQpoY21hcGl2ZXJzaW9uOiBoY20uaW8vdjFhbHBoYTEKbWV0YWRhdGE6CiAgbmFtZTogc3Byc3J2MWluc3RhbmNlX215ZGV2Ci0tLQpraW5kOiBBcHBsaWNhdGlvbgphcGl2ZXJzaW9uOiBoY20uaW8vdjFhbHBoYTEKc2NvcGU6Cm1ldGFkYXRhOgogIG5hbWU6ICJ0ZXN0QXBwIgogIGRlc2NyaXB0aW9uOiAiU2FtcGxlIEFwcGxpY2F0aW9uIGZvciBkZXBsb3kiCiAgbGFiZWxzOgogIHByb3BlcnRpZXM6CiAgICB0eXBlOiBpbnN0YW5jZQpyZWxhdGlvbnNoaXBzOgogIC0gbmFtZTogcGxheWVyMQogICAgbWV0YWRhdGE6CiAgICAgIHRhcmdldG5hbWU6IHBsYXllcjEKICAgICAgdGFyZ2V0a2luZDogQXBwbGljYXRpb25TZXJ2aWNlCiAgICAgIHR5cGU6IGNvbnRhaW5zCiAgICAgIHByb3BlcnRpZXM6CiAgLSBuYW1lOiBwbGF5ZXIyCiAgICBtZXRhZGF0YToKICAgICAgdGFyZ2V0bmFtZTogcGxheWVyMgogICAgICB0YXJnZXRraW5kOiBBcHBsaWNhdGlvblNlcnZpY2UKICAgICAgdHlwZTogY29udGFpbnMKICAgICAgcHJvcGVydGllczoKLS0tCmtpbmQ6IEFwcGxpY2F0aW9uU2VydmljZQphcGl2ZXJzaW9uOiBoY20uaW8vdjFhbHBoYTEKc2NvcGU6CiAgY2x1c3RlcnM6IFsiY3J1Y2lhbC1vd2wiXQptZXRhZGF0YToKICBuYW1lOiAicGxheWVyMSIKICBkZXNjcmlwdGlvbjogU2VydmljZTEgVGVtcGxhdGUKICBsYWJlbHM6CiAgcHJvcGVydGllczoKICAgIHR5cGU6IGluc3RhbmNlCiAgICBydW50aW1lOiBrdWJlcm5ldGVzCiAgICBtb3ZlYWJsZTogdHJ1ZQogICAgZGlzY292ZXJhYmxlOiBmYWxzZQogICAgY29ubmVjdGlvbnM6CiAgICAgIC0gbmFtZTogaHR0cAogICAgICAgIHBvcnQ6IDMyMTExCiAgICAgICAgYWRkcmVzczogOS4yMS41MS41MgogICAgICAgIHByb3RvY29sOiBodHRwCnJlbGF0aW9uc2hpcHM6Ci0tLQpraW5kOiBBcHBsaWNhdGlvblNlcnZpY2UKYXBpdmVyc2lvbjogaGNtLmlvL3YxYWxwaGExCnNjb3BlOgogIGNsdXN0ZXJzOiBbIm15bWluaWt1YmUiXQptZXRhZGF0YToKICBuYW1lOiAicGxheWVyMiIKICBkZXNjcmlwdGlvbjogU2VydmljZTIgaW5zdGFuY2UKICBsYWJlbHM6CiAgcHJvcGVydGllczoKICAgIHR5cGU6IGluc3RhbmNlCiAgICBydW50aW1lOiBrdWJlcm5ldGVzCiAgICBtb3ZlYWJsZTogdHJ1ZQogICAgZGlzY292ZXJhYmxlOiBmYWxzZQogICAgcmVnaXN0cmllczoKICAgICAgLSBuYW1lOiBjb25zdWwKICAgICAgICBzZXJ2aWNlOiBjb25zdWwKICAgIGNvbm5lY3Rpb25zOgogICAgICAtIG5hbWU6IGh0dHAKICAgICAgICBwb3J0OiAzMTExMgogICAgICAgIHByb3RvY29sOiBodHRwCnJlbGF0aW9uc2hpcHM6Ci0tLQpraW5kOiBTZXJ2aWNlUmVnaXN0cnkKYXBpdmVyc2lvbjogaGNtLmlvL3YxYWxwaGExCnNjb3BlOgogIGNsdXN0ZXJzOiBbIm15bWluaWt1YmUiXQptZXRhZGF0YToKICBuYW1lOiAiY29uc3VsIgogIGRlc2NyaXB0aW9uOiBJbnN0YW5jZSBkZXNjcmlwdG9yIGZvciBjb25zdWxpbnN0YW5jZQogIGxhYmVsczoKICBwcm9wZXJ0aWVzOgogICAgdHlwZTogaW5zdGFuY2UKICAgIHJ1bnRpbWU6IGt1YmVybmV0ZXMKICAgIGNvbm5lY3Rpb25zOgogICAgICAtIG5hbWU6IGh0dHAKICAgICAgICBwb3J0OiA4NTAwCiAgICAgICAgYWRkcmVzczogOS4yMS41MS41MgogICAgICAgIHByb3RvY29sOiBodHRwCi0tLQ==';

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };
    const response = await applicationResolver.Mutation.registerApplication(
      null,
      templateYaml,
      context,
    );
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });
});

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { clusterResolver } from '../../../src/v1/schema/modules/cluster-type';
import HCMConnector from '../../../src/v1/datasource/lib/hcm-connector';

describe('Cluster Resolver', () => {
  test('correctly resolves query', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"crucial-owl":{"ClusterName":"crucial-owl","ClusterEndpoint":"","Labels":{"cloud":"IBM","clusterip":"9.42.80.212","datacenter":"toronto","environment":"Dev","owner":"marketing","region":"US","runtime":"kubernetes","vendor":"ICP"},"Status":"healthy","Conflict":false,"ProxyEndpoint":"","AgentEndpoint":"","TotalNodes":3,"TotalReadyNodes":3,"TotalStorage":93415538688,"TotalCpus":16,"TotalMemory":33253847040,"TotalDeployments":30,"TotalPods":78,"TotalServices":49,"CPURequestsFraction":29.4375,"MemoryRequestsFraction":38.54253465646542,"StorageUsageFraction":100,"Metrics":{"Available Nodes":"3","Available Storage":"0GB"},"LastHeard":"2018-06-28T14:15:49.223123339Z","LastLocation":"10.1.112.79:56372","LogConfig":""},"pumped-whale":{"ClusterName":"pumped-whale","ClusterEndpoint":"","Labels":{"cloud":"IBM","clusterip":"9.42.83.227","datacenter":"raleigh","environment":"Dev","owner":"marketing","region":"US","runtime":"kubernetes","vendor":"ICP"},"Status":"healthy","Conflict":false,"ProxyEndpoint":"","AgentEndpoint":"","TotalNodes":5,"TotalReadyNodes":5,"TotalStorage":69793218560,"TotalCpus":20,"TotalMemory":41331200000,"TotalDeployments":23,"TotalPods":80,"TotalServices":40,"CPURequestsFraction":5.05,"MemoryRequestsFraction":15.833786311551565,"StorageUsageFraction":100,"Metrics":{"Available Nodes":"5","Available Storage":"0GB"},"LastHeard":"2018-06-28T14:15:48.47002593Z","LastLocation":"10.1.112.79:56360","LogConfig":""}},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await clusterResolver.Query.clusters(null, null, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });
});

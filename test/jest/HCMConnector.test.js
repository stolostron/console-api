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
  const errorResponse = {
    body: {
      Error: { message: 'Some generic error code' },
    },
  };
  const mockRequest = { headers: { authorization: '' } };
  const pollIncompleteResponse = {
    body: {
      RetString: '{ "Result": { "Completed": false } }',
    },
  };
  const pollCompleteResponse = {
    body: {
      RetString: '{"Result":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"b136aa2f-e9f6-4c18-955a-5c67afdf4509","Resource":"nodes","Operation":"get","Work":{"Labels":"","Namespaces":"","Status":""},"Timestamp":"2018-07-02T15:09:10.561Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"get","Resource":"nodes","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-02T15:09:10.561Z","UUID":"b136aa2f-e9f6-4c18-955a-5c67afdf4509","Work":{"Labels":"","Namespaces":"","Status":""}},"Description":""},"Completed":true,"Results":{"crucial-owl":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"b136aa2f-e9f6-4c18-955a-5c67afdf4509","Resource":"nodes","Operation":"get","Work":{"Labels":"","Namespaces":"","Status":""},"Timestamp":"2018-07-02T15:09:10.561Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"get","Resource":"nodes","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-02T15:09:10.561Z","UUID":"b136aa2f-e9f6-4c18-955a-5c67afdf4509","Work":{"Labels":"","Namespaces":"","Status":""}},"Description":""},"Completed":true,"Results":{"9.37.137.174":{"NodeDetails":{"Annotations":{"node.alpha.kubernetes.io/ttl":"0","volumes.kubernetes.io/controller-managed-attach-detach":"true"},"Arch":"amd64","Cpu":"4","IP":"","Images":null,"KernelVersion":"4.4.0-124-generic","KubeProxyVersion":"v1.10.0+icp-ee","KubeletVersion":"v1.10.0+icp-ee","Labels":{"beta.kubernetes.io/arch":"amd64","beta.kubernetes.io/os":"linux","gpu/nvidia":"NA","kubernetes.io/hostname":"9.37.137.174"},"Mem":"8174900Ki","Node":"9.37.137.174","OSImage":"Ubuntu 16.04.4 LTS","Status":"Ready","TotalImageSpace":4434973565},"NodeName":"9.37.137.174","State":true},"9.37.137.92":{"NodeDetails":{"Annotations":{"node.alpha.kubernetes.io/ttl":"0","volumes.kubernetes.io/controller-managed-attach-detach":"true"},"Arch":"amd64","Cpu":"4","IP":"","Images":null,"KernelVersion":"4.4.0-124-generic","KubeProxyVersion":"v1.10.0+icp-ee","KubeletVersion":"v1.10.0+icp-ee","Labels":{"beta.kubernetes.io/arch":"amd64","beta.kubernetes.io/os":"linux","gpu/nvidia":"NA","kubernetes.io/hostname":"9.37.137.92"},"Mem":"8174900Ki","Node":"9.37.137.92","OSImage":"Ubuntu 16.04.4 LTS","Status":"Ready","TotalImageSpace":6246475129},"NodeName":"9.37.137.92","State":true},"9.42.23.230":{"NodeDetails":{"Annotations":{"node.alpha.kubernetes.io/ttl":"0","volumes.kubernetes.io/controller-managed-attach-detach":"true"},"Arch":"amd64","Cpu":"8","IP":"","Images":null,"KernelVersion":"4.4.0-121-generic","KubeProxyVersion":"v1.10.0+icp-ee","KubeletVersion":"v1.10.0+icp-ee","Labels":{"beta.kubernetes.io/arch":"amd64","beta.kubernetes.io/os":"linux","etcd":"true","gpu/nvidia":"NA","kubernetes.io/hostname":"9.42.23.230","management":"true","master":"true","proxy":"true","role":"master"},"Mem":"16431836Ki","Node":"9.42.23.230","OSImage":"Ubuntu 16.04.4 LTS","Status":"Ready","TotalImageSpace":22502834219},"NodeName":"9.42.23.230","State":true}},"Timestamp":"2018-07-02T15:09:11.598786712Z"},"myminikube":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"b136aa2f-e9f6-4c18-955a-5c67afdf4509","Resource":"nodes","Operation":"get","Work":{"Labels":"","Namespaces":"","Status":""},"Timestamp":"2018-07-02T15:09:10.561Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"get","Resource":"nodes","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-02T15:09:10.561Z","UUID":"b136aa2f-e9f6-4c18-955a-5c67afdf4509","Work":{"Labels":"","Namespaces":"","Status":""}},"Description":""},"Completed":true,"Results":{"9.42.1.134":{"NodeDetails":{"Annotations":{"node.alpha.kubernetes.io/ttl":"0","volumes.kubernetes.io/controller-managed-attach-detach":"true"},"Arch":"amd64","Cpu":"4","IP":"","Images":null,"KernelVersion":"4.4.0-124-generic","KubeProxyVersion":"v1.10.0+icp-ee","KubeletVersion":"v1.10.0+icp-ee","Labels":{"beta.kubernetes.io/arch":"amd64","beta.kubernetes.io/os":"linux","gpu/nvidia":"NA","kubernetes.io/hostname":"9.42.1.134","management":"true"},"Mem":"8174900Ki","Node":"9.42.1.134","OSImage":"Ubuntu 16.04.4 LTS","Status":"Ready","TotalImageSpace":5673335523},"NodeName":"9.42.1.134","State":true},"9.42.23.217":{"NodeDetails":{"Annotations":{"node.alpha.kubernetes.io/ttl":"0","volumes.kubernetes.io/controller-managed-attach-detach":"true"},"Arch":"amd64","Cpu":"4","IP":"","Images":null,"KernelVersion":"4.4.0-128-generic","KubeProxyVersion":"v1.10.0+icp-ee","KubeletVersion":"v1.10.0+icp-ee","Labels":{"beta.kubernetes.io/arch":"amd64","beta.kubernetes.io/os":"linux","etcd":"true","gpu/nvidia":"NA","kubernetes.io/hostname":"9.42.23.217","master":"true","proxy":"true","role":"master"},"Mem":"16432432Ki","Node":"9.42.23.217","OSImage":"Ubuntu 16.04.4 LTS","Status":"Ready","TotalImageSpace":20603800838},"NodeName":"9.42.23.217","State":true}},"Timestamp":"2018-07-02T15:09:12.101044838Z"}},"Timestamp":"2018-07-02T15:09:12.101044838Z"},"Error":null}',
      Error: null,
    },
  };

  const workIdResponse = { body: { RetString: 'a-sample-work-id' } };

  const mockRequestLib = jest.fn().mockName('requestLib');

  const hcmConnector = new HCMConnector({ requestLib: mockRequestLib });

  describe('processRequest', () => {
    test('returns unparsed response if JSON.parse fails', async () => {
      mockRequestLib.mockReturnValue(workIdResponse);

      const result = await hcmConnector.processRequest(mockRequest, '/api/v1alpha1/work');
      expect(result).toBe('a-sample-work-id');
    });

    test('returns parsed response if JSON.parse succeeds', async () => {
      mockRequestLib.mockReturnValue(pollCompleteResponse);
      await expect(hcmConnector.processRequest(mockRequest, '/api/v1alpha1/work')).resolves.toMatchSnapshot();
    });

    test('throws GenericError if network error occurs', async () => {
      mockRequestLib.mockReturnValue(errorResponse);
      await expect(hcmConnector.processRequest(mockRequest, '/api/v1alpha1/work')).rejects.toMatchSnapshot();
    });
  });

  describe('pollWork', () => {
    test('polls and returns data', async () => {
      const mockRequestLibPoll = jest.fn()
        .mockReturnValueOnce(workIdResponse)
        .mockReturnValueOnce(pollIncompleteResponse)
        .mockReturnValueOnce(pollIncompleteResponse)
        .mockReturnValueOnce(pollIncompleteResponse)
        .mockReturnValueOnce(pollCompleteResponse);

      const pollConnector = new HCMConnector({ requestLib: mockRequestLibPoll });
      await expect(pollConnector.pollWork(mockRequest)).resolves.toMatchSnapshot();
    });

    test('throws GenericError if poll times out', async () => {
      const timeoutMockRequestLib = jest.fn()
        .mockReturnValue(pollIncompleteResponse)
        .mockReturnValueOnce(workIdResponse)
        .mockName('timeout requestLib');

      const timeoutConnector = new HCMConnector({
        pollTimeout: 2,
        requestLib: timeoutMockRequestLib,
      });

      await expect(timeoutConnector.pollWork(mockRequest)).rejects.toMatchSnapshot();
    });
  });
});

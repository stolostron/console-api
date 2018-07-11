/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { helmChartResolver } from '../../../src/v1/schema/modules/helmchart-type';
import HCMConnector from '../../../src/v1/datasource/lib/hcm-connector';

describe('Helm charts Resolver', () => {
  test('Correctly resolves helm charts query', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"acs-engine-autoscaler":{"RepoName":"test","Name":"acs-engine-autoscaler","Version":"2.2.0","URLs":["https://kubernetes-charts.storage.googleapis.com/acs-engine-autoscaler-2.2.0.tgz"]},"aerospike":{"RepoName":"test","Name":"aerospike","Version":"0.1.7","URLs":["https://kubernetes-charts.storage.googleapis.com/aerospike-0.1.7.tgz"]},"anchore-engine":{"RepoName":"test","Name":"anchore-engine","Version":"0.1.7","URLs":["https://kubernetes-charts.storage.googleapis.com/anchore-engine-0.1.7.tgz"]}},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await helmChartResolver.Query.charts(null, null, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  test('Correctly resolves install helm chart mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"21c83170-2b4c-48aa-8f22-aff9d858e59a","Resource":"helmrels","Operation":"install","Work":{"ChartName":"default/hcm-demoaccessories","Dryrun":false,"Namespace":"default","ReleaseName":"","URL":"http://9.42.80.212:8878/hcm-demoaccessories-0.1.0.tgz","Values":null,"ValuesFile":"","Version":""},"Timestamp":"2018-07-10T16:18:39.91Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"install","Resource":"helmrels","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-10T16:18:39.91Z","UUID":"21c83170-2b4c-48aa-8f22-aff9d858e59a","Work":{"ChartName":"default/hcm-demoaccessories","Dryrun":false,"Namespace":"default","ReleaseName":"","URL":"http://9.42.80.212:8878/hcm-demoaccessories-0.1.0.tgz","Values":null,"ValuesFile":"","Version":""}},"Description":""},"Completed":true,"Results":{"crucial-owl":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"21c83170-2b4c-48aa-8f22-aff9d858e59a","Resource":"helmrels","Operation":"install","Work":{"ChartName":"default/hcm-demoaccessories","Dryrun":false,"Namespace":"default","ReleaseName":"","URL":"http://9.42.80.212:8878/hcm-demoaccessories-0.1.0.tgz","Values":null,"ValuesFile":"","Version":""},"Timestamp":"2018-07-10T16:18:39.91Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"install","Resource":"helmrels","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-10T16:18:39.91Z","UUID":"21c83170-2b4c-48aa-8f22-aff9d858e59a","Work":{"ChartName":"default/hcm-demoaccessories","Dryrun":false,"Namespace":"default","ReleaseName":"","URL":"http://9.42.80.212:8878/hcm-demoaccessories-0.1.0.tgz","Values":null,"ValuesFile":"","Version":""}},"Description":""},"Completed":true,"Results":{"binging-lobster":{"ChartName":"hcm-demoaccessories","ChartVersion":"0.1.0","HDetails":{"Description":"Install complete","FirstDeployed":{"nanos":619138559,"seconds":1531239519},"Images":[{"ImageName":"neo4j:latest","ImagePullPolicy":"IfNotPresent"},{"ImageName":"neo4j:latest","ImagePullPolicy":"IfNotPresent"}],"LastDeployed":{"nanos":619138559,"seconds":1531239519},"Values":"consul:\\n  enabled: false\\ninstancedb:\\n  enabled: true\\npromethues:\\n  enabled: false\\ntemplatedb:\\n  enabled: true\\n"},"HelmName":"binging-lobster","Namespace":"default","Status":"DEPLOYED","Version":1}},"Timestamp":"2018-07-10T16:18:39.907337343Z"},"myminikube":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"21c83170-2b4c-48aa-8f22-aff9d858e59a","Resource":"helmrels","Operation":"install","Work":{"ChartName":"default/hcm-demoaccessories","Dryrun":false,"Namespace":"default","ReleaseName":"","URL":"http://9.42.80.212:8878/hcm-demoaccessories-0.1.0.tgz","Values":null,"ValuesFile":"","Version":""},"Timestamp":"2018-07-10T16:18:39.91Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"install","Resource":"helmrels","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-10T16:18:39.91Z","UUID":"21c83170-2b4c-48aa-8f22-aff9d858e59a","Work":{"ChartName":"default/hcm-demoaccessories","Dryrun":false,"Namespace":"default","ReleaseName":"","URL":"http://9.42.80.212:8878/hcm-demoaccessories-0.1.0.tgz","Values":null,"ValuesFile":"","Version":""}},"Description":""},"Completed":true,"Results":{"exiled-anteater":{"ChartName":"hcm-demoaccessories","ChartVersion":"0.1.0","HDetails":{"Description":"Install complete","FirstDeployed":{"nanos":128814404,"seconds":1531239520},"Images":[{"ImageName":"neo4j:latest","ImagePullPolicy":"IfNotPresent"},{"ImageName":"neo4j:latest","ImagePullPolicy":"IfNotPresent"}],"LastDeployed":{"nanos":128814404,"seconds":1531239520},"Values":"consul:\\n  enabled: false\\ninstancedb:\\n  enabled: true\\npromethues:\\n  enabled: false\\ntemplatedb:\\n  enabled: true\\n"},"HelmName":"exiled-anteater","Namespace":"default","Status":"DEPLOYED","Version":1}},"Timestamp":"2018-07-10T16:18:40.51696839Z"}},"Timestamp":"2018-07-10T16:18:40.51696839Z"},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const inputs = {
      input: {
        DstClusters: {},
        Names: '',
        ChartName: 'hcm-demoaccessories',
        RepoName: 'default',
        Namespaces: '',
        URL: '',
        Values: '',
        Version: '',
      },
    };

    const response = await helmChartResolver.Mutation.installHelmChart(null, inputs, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });
});

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { helmRelResolver } from '../../../src/schema/modules/helmrel-type';
import HCMConnector from '../../../src/datasource/lib/hcm-connector';

describe('Helm releases Resolver', () => {
  test('Correctly resolves helm releases query', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"822576c6-1b9c-4d33-8a96-980983fd316b","Resource":"helmrels","Operation":"get","Work":{"Labels":"","Namespaces":"","Status":""},"Timestamp":"2018-07-06T16:43:26.429Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"get","Resource":"helmrels","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-06T16:43:26.429Z","UUID":"822576c6-1b9c-4d33-8a96-980983fd316b","Work":{"Labels":"","Namespaces":"","Status":""}},"Description":""},"Completed":true,"Results":{"crucial-owl":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["crucial-owl"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"822576c6-1b9c-4d33-8a96-980983fd316b","Resource":"helmrels","Operation":"get","Work":{"Labels":"","Namespaces":"","Status":""},"Timestamp":"2018-07-06T16:43:26.429Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["crucial-owl"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"get","Resource":"helmrels","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-06T16:43:26.429Z","UUID":"822576c6-1b9c-4d33-8a96-980983fd316b","Work":{"Labels":"","Namespaces":"","Status":""}},"Description":""},"Completed":true,"Results":{"auth-apikeys":{"ChartName":"auth-apikeys","ChartVersion":"1.0.0","HDetails":{"Description":"Install complete","FirstDeployed":{"nanos":822620669,"seconds":1526328996},"Images":[{"ImageName":"registry.ng.bluemix.net/mdelder/iam-token-service:1.0.0","ImagePullPolicy":"IfNotPresent"}],"LastDeployed":{"nanos":822620669,"seconds":1526328996},"Values":"auth_apikeys:\\n  config:\\n    disable-access-log: \\"true\\"\\n  extraArgs: {}\\n  hostNetwork: false\\n  hostPort: true\\n  image:\\n    pullPolicy: IfNotPresent\\n    repository: registry.ng.bluemix.net/mdelder/iam-token-service\\n    tag: 1.0.0\\n  name: auth-apikeys\\n  namespace: kube-system\\n  nodeSelector:\\n    role: master\\n  resources:\\n    limits:\\n      cpu: 100m\\n      memory: 128Mi\\n    requests:\\n      cpu: 100m\\n      memory: 128Mi\\n  tolerations:\\n  - effect: NoSchedule\\n    key: dedicated\\n    operator: Exists\\n  - key: CriticalAddonsOnly\\n    operator: Exists\\niamTokenService:\\n  extraArgs: {}\\n  name: iam-token-service\\n  namespace: kube-system\\n  pod: auth-apikeys\\n  sessionAffinity: ClientIP\\n  type: ClusterIP\\n"},"HelmName":"auth-apikeys","Namespace":"kube-system","Status":"DEPLOYED","Version":1}},"Timestamp":"2018-07-06T16:43:25.491319015Z"}},"Timestamp":"2018-07-06T16:43:25.491319015Z"},"Error":null}',
        Error: null,
      },
    });

    const context = {
      hcmConnector: new HCMConnector({ requestLib: mockRequestLib }),
      req: { headers: { authorization: '' } },
    };

    const response = await helmRelResolver.Query.releases(null, null, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });

  test('Correctly resolves delete helm release mutation', async () => {
    const mockRequestLib = jest.fn();
    mockRequestLib.mockReturnValue({
      body: {
        RetString: '{"Result":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["myminikube"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"cc35bce9-9287-4d84-a8d4-e98579694f35","Resource":"helmrels","Operation":"delete","Work":{"Labels":"","Names":"mouthy-catfish","Namespaces":"","Status":""},"Timestamp":"2018-07-10T15:51:20.529Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["myminikube"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"delete","Resource":"helmrels","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-10T15:51:20.529Z","UUID":"cc35bce9-9287-4d84-a8d4-e98579694f35","Work":{"Labels":"","Names":"mouthy-catfish","Namespaces":"","Status":""}},"Description":""},"Completed":true,"Results":{"crucial-owl":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["myminikube"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"cc35bce9-9287-4d84-a8d4-e98579694f35","Resource":"helmrels","Operation":"delete","Work":{"Labels":"","Names":"mouthy-catfish","Namespaces":"","Status":""},"Timestamp":"2018-07-10T15:51:20.529Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["myminikube"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"delete","Resource":"helmrels","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-10T15:51:20.529Z","UUID":"cc35bce9-9287-4d84-a8d4-e98579694f35","Work":{"Labels":"","Names":"mouthy-catfish","Namespaces":"","Status":""}},"Description":""},"Completed":true,"Results":{"mouthy-catfish":{"ChartName":"hcm-demoaccessories","ChartVersion":"0.1.0","HDetails":{"Description":"Deletion complete","FirstDeployed":{"nanos":622670210,"seconds":1531236349},"Images":[{"ImageName":"neo4j:latest","ImagePullPolicy":"IfNotPresent"},{"ImageName":"neo4j:latest","ImagePullPolicy":"IfNotPresent"}],"LastDeployed":{"nanos":622670210,"seconds":1531236349},"Values":"consul:\\n  enabled: false\\ninstancedb:\\n  enabled: true\\npromethues:\\n  enabled: false\\ntemplatedb:\\n  enabled: true\\n"},"HelmName":"mouthy-catfish","Namespace":"default","Status":"DELETED","Version":1}},"Timestamp":"2018-07-10T15:51:28.019949995Z"},"myminikube":{"Request":{"SrcClusters":{"Names":null,"Labels":null,"Status":null,"SortBy":"","TargetNum":0},"DstClusters":{"Names":["myminikube"],"Labels":null,"Status":["healthy"],"SortBy":"","TargetNum":0},"ClientID":"","Dryrun":false,"Completed":false,"UUID":"cc35bce9-9287-4d84-a8d4-e98579694f35","Resource":"helmrels","Operation":"delete","Work":{"Labels":"","Names":"mouthy-catfish","Namespaces":"","Status":""},"Timestamp":"2018-07-10T15:51:20.529Z","NextRequest":null,"RootRequest":null,"FinishedRequest":{"ClientID":"","Completed":false,"Description":"","Dryrun":false,"DstClusters":{"Labels":null,"Names":["myminikube"],"SortBy":"","Status":["healthy"],"TargetNum":0},"FinishedRequest":null,"NextRequest":null,"Operation":"delete","Resource":"helmrels","RootRequest":null,"SrcClusters":{"Labels":null,"Names":null,"SortBy":"","Status":null,"TargetNum":0},"Timestamp":"2018-07-10T15:51:20.529Z","UUID":"cc35bce9-9287-4d84-a8d4-e98579694f35","Work":{"Labels":"","Names":"mouthy-catfish","Namespaces":"","Status":""}},"Description":""},"Completed":false,"Results":{"code":2,"message":"release: \\"mouthy-catfish\\" not found"},"Timestamp":"2018-07-10T15:51:22.139230685Z"}},"Timestamp":"2018-07-10T15:51:28.019949995Z"},"Error":null}',
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
        Names: 'mouthy-catfish',
        ChartName: '',
        RepoName: '',
        Namespaces: '',
        Version: '',
      },
    };

    const response = await helmRelResolver.Mutation.deleteHelmRelease(null, inputs, context);
    expect(mockRequestLib).toHaveBeenCalled();
    expect(response).toMatchSnapshot();
  });
});

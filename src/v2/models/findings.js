/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import _ from 'lodash';
import KubeModel from './kube';
import config from '../../../config';

export default class SFModel extends KubeModel {
  async getOccurrences(args) {
    const url = config.get('NODE_ENV') === 'test' ? 'http://0.0.0.0' : config.get('cfcRouterUrl');
    const iamToken = _.get(args.req, "cookies['acm-access-token-cookie']") || config.get('acm-access-token-cookie');
    const opts = {
      url: `${url}/findings/v1/id-mycluster-account/graph`,
      headers: {
        AccessToken: iamToken,
      },
    };
    const body = {
      query: `
      {
        occurrences(kind: "FINDING") {
          name 
          noteName 
          updateTime 
          createTime 
          shortDescription 
          context {
            accountId 
            region 
            resourceType 
            resourceName 
            resourceId 
            resourceCrn 
            serviceName 
            serviceCrn
            clusterName
            namespaceName
          } 
          reportedBy {
            id 
            title 
            url 
          } 
          finding {
            severity 
            certainty 
            networkConnection {
              client {
                address 
                port
              } 
              server {
                address 
                port
              } 
              direction 
              protocol
            } 
            nextSteps {
              title 
              url
            } 
            dataTransferred {
              clientBytes 
              clientPackets 
              serverBytes 
              serverPackets
            }
          } 
          securityClassification { 
            securityStandards 
            securityCategories
            securityControl
          }
        }
      }`,
    };
    const response = await this.kubeConnector.post('', body, opts);
    if (response.errors) {
      throw new Error(`HCM ERROR ${JSON.stringify(response.errors)}`);
    }
    return response.data.occurrences || [];
  }
}

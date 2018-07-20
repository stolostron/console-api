/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import config from '../../../config';

class KubeConnector {
  constructor({ request, httpLib, kubeApiEndpoint = `${config.get('cfcRouterUrl')}/kubernetes` } = {}) {
    // Stubbed for now to get feedback
    this.token = request.kubeToken;
    this.http = httpLib;
    this.kubeApiEndpoint = kubeApiEndpoint;
  }

  get(path) {
    // Stubbed for now to get feedback
    const options = {
      url: `${this.kubeApiEndpoint}${path}`,
      method: 'GET',
      headers: {
        Authorization: this.token,
      },
    };

    return this.http(options).then(res => res.body);
  }
}

export default KubeConnector;

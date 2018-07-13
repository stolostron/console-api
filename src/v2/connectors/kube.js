/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export default class KubeConnector {
  constructor({ request, httpLib }) {
    // Stubbed for now to get feedback
    this.token = request.kubeToken;
    this.http = httpLib;
  }

  get(/* path */) {
    // Stubbed for now to get feedback
    return this.http();
  }
}

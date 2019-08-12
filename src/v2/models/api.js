/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { isRequired } from '../lib/utils';

// Abstract class for models that communicate with the kubernetes api
export default class Api {
  constructor({ apiConnector = isRequired('apiConnector') }) {
    this.apiConnector = apiConnector;
  }
}

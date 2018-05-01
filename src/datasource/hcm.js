/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import * as hcmClient from './lib/hcm-client';

export const clusters = () => hcmClient.getClusters();
export const pods = () => hcmClient.getWork('pods');
export const nodes = () => hcmClient.getWork('nodes');
export const pvs = () => hcmClient.getWork('pvs');
export const namespaces = () => hcmClient.getWork('namespaces');
export const releases = () => hcmClient.getWork('helmrels');
export const charts = () => hcmClient.charts('repo', 'default');

export { installHelmChart, setRepo } from './lib/hcm-client';

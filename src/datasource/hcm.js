import * as hcmClient from './lib/hcm-client';

export const clusters = () => hcmClient.getClusters();
export const pods = () => hcmClient.getWork('pods');
export const nodes = () => hcmClient.getWork('nodes');
export const pvs = () => hcmClient.getWork('pvs');
export const charts = () => hcmClient.search('repo', 'default');

export { installHelmChart, setRepo } from './lib/hcm-client';

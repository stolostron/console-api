import { getWork, getClusters, search, installHelmChart as createHelmRelease } from './lib/hcm-client';

export const clusters = () => getClusters();

export const pods = () => getWork('pods');
export const nodes = () => getWork('nodes');
export const pvs = () => getWork('pvs');
export const charts = () => search('repo', 'default');

export const installHelmChart = input => createHelmRelease(input);

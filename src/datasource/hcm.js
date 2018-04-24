import { getWork, getClusters } from './lib/hcm-client';


export const clusters = () => getClusters();

export const pods = () => getWork('pods');
export const nodes = () => getWork('nodes');
export const pvs = () => getWork('pvs');

import request from 'requestretry';
import config from '../../config';
import { getWork } from './lib/hcm-client';

const hcmUrl = config.get('hcmUrl');

export const clusters = async () => {
  const options = {
    url: `${hcmUrl}/api/v1alpha1/clusters`,
    json: {},
    method: 'GET',
  };
  const result = await request(options).then(res => res.body);
  const clustersJSON = JSON.parse(result.RetString).Result;
  return Object.values(clustersJSON);
};

export const pods = () => getWork('pods');
export const nodes = () => getWork('nodes');
export const pvs = () => getWork('pvs');

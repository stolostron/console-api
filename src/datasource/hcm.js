import request from 'requestretry';

export const clusters = async () => {
  console.log('xxx');
  const options = {
    url: 'http://9.42.80.212:31699/api/v1alpha1/clusters',
    json: {},
    method: 'GET',
  };
  const result = await request(options).then(res => res.body);
  console.log(JSON.parse(result.RetString));

  return JSON.parse(result.RetString);
};

export const pods = async () => {
  console.log('xxx');
  const options = {
    url: 'http://9.42.80.212:31699/api/v1alpha1/clusters',
    json: {},
    method: 'GET',
  };
  const result = await request(options).then(res => res.body);
  console.log(JSON.parse(result.RetString));

  return JSON.parse(result.RetString);
};

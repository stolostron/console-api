import request from 'requestretry';

const clusters = async function() {
    console.log('xxx')
    const options = {
        url: 'http://9.37.39.82:31699/api/v1alpha1/clusters',
        json: {},
        method: 'GET',
    }
    const result = await request(options).then(res => res.body)
    console.log(JSON.parse(result.RetString))
	
    return JSON.parse(result.RetString);
};

export { clusters }
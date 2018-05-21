const request = require('requestretry').defaults({ json: true, maxAttempts: 1, strictSSL: false });

export default request;

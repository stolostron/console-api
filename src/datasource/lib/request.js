const request = require('requestretry').defaults({ json: true, maxAttempts: 1 });

export default request;

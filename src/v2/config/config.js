const fs = require('fs');

const config = {};

config.ocp = {};

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  config.ocp.apiserver_url = process.env.API_SERVER_URL;
  config.ocp.serviceaccount_token = process.env.SERVICEACCT_TOKEN;
} else {
  // SERVICE ACCOUNT TOKEN needed to review user token
  config.ocp.apiserver_url = 'https://kubernetes.default.svc';
  config.ocp.serviceaccount_token = fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/token').toString();
}

module.exports = config;

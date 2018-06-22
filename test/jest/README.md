# Jest Unit Test

Links:
- https://facebook.github.io/jest/docs/en/getting-started.html
- https://facebook.github.io/jest/docs/en/asynchronous.html

[Nock](https://www.npmjs.com/package/nock) is used to test the GraphQL server.

Nock intercepts specified http requests and returns user mocked responses in order to eliminate the call to the actual DB.

By removing the actual call, the tests run faster and analyze only the functionality of the code.

## Examples:

source: https://scotch.io/tutorials/nodejs-tests-mocking-http-requests#creating-a-nodejs-app-to-test
```
const expect = require('chai').expect;
const nock = require('nock');

const getUser = require('../index').getUser;
const response = require('./response');

describe('Get User tests', () => {
  beforeEach(() => {
    nock('https://api.github.com')
      .get('/users/octocat')
      .reply(200, response);
  });

  it('Get a user by username', () => {
    return getUser('octocat')
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Test result of name, company and location for the response
        expect(response.name).to.equal('The Octocat')
        expect(response.company).to.equal('GitHub')
        expect(response.location).to.equal('San Francisco')
      });
  });
});
```

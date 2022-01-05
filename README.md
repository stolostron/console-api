# Console API

[![Build Status](https://travis-ci.com/stolostron/console-api.svg?token=APpLzibLo9i2xU1nq9kC&branch=release-2.2)](https://travis-ci.com/stolostron/console-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=open-cluster-management_console-api&metric=coverage&token=25e6ea1bb8964f0c39591ff195f505130db7906f)](https://sonarcloud.io/dashboard?id=open-cluster-management_console-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=open-cluster-management_console-api&metric=vulnerabilities&token=25e6ea1bb8964f0c39591ff195f505130db7906f)](https://sonarcloud.io/dashboard?id=open-cluster-management_console-api)

[Stolostron](https://github.com/stolostron) - Console API for the [Console UI](https://github.com/stolostron/console-ui).

## Prerequisites

- [node.js](https://nodejs.org/) version 12.x
- [nvm](https://github.com/nvm-sh/nvm) (optional)

## Installation

1. Install dependencies

   ```
   npm ci
   ```

2. Run unit tests

   ```
   npm test
   ```

3. Run style checks

   ```
   npm run lint
   ```

4. Setup environment variables

   | Variable          | Description                   |
   | ----------------- | ----------------------------- |
   | API_SERVER_URL    | Cluster API server URL        |
   | SERVICEACCT_TOKEN | Cluster service account token |

    ```zsh
    export API_SERVER_URL=`oc get infrastructure cluster -o jsonpath={.status.apiServerURL}`
    export SERVICEACCT_TOKEN=`oc whoami -t`
    ```

5. Start the server

   **Development**

      ```
      npm start
      ```

   **Production**
  
      ```
      npm run build
      npm run start:production
      ```

6. Open [GraphQL Playground](https://localhost:4000/hcmuiapi/graphql) UI

   ```
   open https://localhost:4000/hcmuiapi/graphql
   ```


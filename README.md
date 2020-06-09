# Console API

[![Build Status](https://travis-ci.com/open-cluster-management/console-api.svg?token=APpLzibLo9i2xU1nq9kC&branch=master)](https://travis-ci.com/open-cluster-management/console-api)

[Open Cluster Management](https://github.com/open-cluster-management) - Console API for the [Console UI](https://github.com/open-cluster-management/console-ui).

## Prerequisites

- [node.js](https://nodejs.org/) version 10.x
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
   | localKubeToken    | Needed for GraphiQL           |

    ```zsh
    export API_SERVER_URL=`oc get infrastructure cluster -o jsonpath={.status.apiServerURL}`
    export SERVICEACCT_TOKEN=`oc whoami -t`
    export localKubeToken="Bearer $SERVICEACCT_TOKEN"
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

6. Open [GraphiQL](https://localhost:4000/hcmuiapi/graphiql) UI

   ```
   open https://localhost:4000/hcmuiapi/graphiql
   ```

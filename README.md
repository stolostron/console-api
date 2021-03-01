# Console API
[![Build Status](https://travis-ci.com/open-cluster-management/console-api.svg?token=APpLzibLo9i2xU1nq9kC&branch=main)](https://travis-ci.com/open-cluster-management/console-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=open-cluster-management_console-api&metric=coverage&token=25e6ea1bb8964f0c39591ff195f505130db7906f)](https://sonarcloud.io/dashboard?id=open-cluster-management_console-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=open-cluster-management_console-api&metric=vulnerabilities&token=25e6ea1bb8964f0c39591ff195f505130db7906f)](https://sonarcloud.io/dashboard?id=open-cluster-management_console-api)

[Open Cluster Management](https://github.com/open-cluster-management) - Console API for the [Application UI](https://github.com/open-cluster-management/application-ui). It uses Kubernetes APIs to provide APIs that are used for topology, access checks, and generic resource CRUD.

------

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Community, discussion, contribution, and support](#community-discussion-contribution-and-support)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Community, discussion, contribution, and support

Check the [CONTRIBUTING Doc](CONTRIBUTING.md) for how to contribute to the repo.

------

## Getting Started

Console API provides APIs that are used for topology, access checks, and generic resource CRUD in Application UI. This is a guide on how to build and run open-cluster-management console-api.

## Prerequisites

- [node.js](https://nodejs.org/) version 14.x
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

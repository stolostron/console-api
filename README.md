# Console API
[![Build Status](https://travis-ci.com/open-cluster-management/console-api.svg?token=APpLzibLo9i2xU1nq9kC&branch=main)](https://travis-ci.com/open-cluster-management/console-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=open-cluster-management_console-api&metric=coverage&token=25e6ea1bb8964f0c39591ff195f505130db7906f)](https://sonarcloud.io/dashboard?id=open-cluster-management_console-api)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=open-cluster-management_console-api&metric=vulnerabilities&token=25e6ea1bb8964f0c39591ff195f505130db7906f)](https://sonarcloud.io/dashboard?id=open-cluster-management_console-api)

[Open Cluster Management](https://github.com/open-cluster-management) - Console API for the [Application console](https://github.com/open-cluster-management/application-ui). It uses Kubernetes APIs to provide APIs that are used for topology, access checks, and generic resource CRUD.

------

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Community, discussion, contribution, and support](#community-discussion-contribution-and-support)
- [Getting Started](#getting-started)
- [Prerequisite Tools](#prerequisite-tools)
- [Building for Development](#building-for-development)
- [Running locally with an OKD cluster](#running-locally-with-an-okd-cluster)
- [Building a local image](#building-a-local-image)
- [Testing](#testing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Community, discussion, contribution, and support

Check the [CONTRIBUTING Doc](CONTRIBUTING.md) for how to contribute to the repo.

------

## Getting Started

Console API provides APIs that are used for topology, access checks, and generic resource CRUD in Application console. This is a guide on how to build and run open-cluster-management console-api.

## Prerequisite Tools

- [node.js](https://nodejs.org/) version 14.x
- [nvm](https://github.com/nvm-sh/nvm) (optional)

## Building for Development
<pre>
git clone https://github.com/open-cluster-management/console-api.git
cd console-api
npm install
npm run build:production
</pre>

## Running locally with an OKD cluster

1. To run your local `console-api` code against an existing OCM installation, make sure you are logged in using `oc`

2. The following environment variables need to be set
   <pre>
   export API_SERVER_URL=`oc get infrastructure cluster -o jsonpath={.status.apiServerURL}`
   export SERVICEACCT_TOKEN=`oc whoami -t`
   </pre>

5. Start the server for production
   <pre>
   npm run start:production
   </pre>

6. Start the server for development
   <pre>
   npm run start
   </pre>

6. Now you can make GraphQL calls to `https://localhost:4000/hcmuiapi/graphql` or use it with a local instance of [Application UI](https://github.com/open-cluster-management/application-ui)

## Building a local image
<pre>
git clone https://github.com/open-cluster-management/console-api.git
cd console-api
export GITHUB_USER=&lt;github_user&gt;
export GITHUB_TOKEN=&lt;github_token&gt;
make
make image-dev
</pre>

## Testing

The following will run all unit tests.

<pre>
npm test
</pre>

To run a particular test.

<pre>
npm run test -- &lt;test_file&gt;

# for exmaple
npm run test -- application.test.js
</pre>

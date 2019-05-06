/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018, 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

const tapReporter = [
  'jest-tap-reporter',
  {
    logLevel: 'ERROR',
    showInternalStackTraces: true,
    filePath: 'test-output/jestTestLogs.tap',
  },
];

const jestConfig = {
  collectCoverage: true,
  coverageDirectory: './test-output/coverage',
  coverageReporters: [
    'json',
    'html',
    'lcov',
    'text',
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 62,
      lines: 55,
      statements: 55,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/mocks/*.js',
    '!src/v2/connectors/gremlin.js', // Excluding from coverage report because gremlin will be deleted.
    '!src/v2/connectors/gremlinConnectionHelper.js', // Excluding from coverage report because gremlin will be deleted.
  ],
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: './jest.setup.js',
};

jestConfig.reporters = process.env.TRAVIS ? ['default', tapReporter] : ['default'];

module.exports = jestConfig;

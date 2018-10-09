/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
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
      branches: 55,
      functions: 75,
      lines: 70,
      statements: 70,
    },
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/mocks/*.js',
  ],
  testEnvironment: 'node',
};

jestConfig.reporters = process.env.TRAVIS ? ['default', tapReporter] : ['default'];

module.exports = jestConfig;

/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * (c) Copyright Red Hat, Inc. All Rights Reserved.
 ****************************************************************************** */
import { transform } from './bare-metal-asset';

const bma1 = {
  metadata: {
    name: 'foo',
    namespace: 'bar',
  },
  spec: {
    bmc: {
      address: 'bmcAddr1',
      credentialsName: 'my-secret-name',
    },
    bootMACAddress: 'addr1',
    clusterDeployment: 'cluster',
    hardwareProfile: 'my-profile',
    role: 'role',
  },
};

const secret1 = {
  metadata: {
    namespace: 'bar',
    name: 'my-secret-name',
  },
  data: {
    username: Buffer.from('myuser1').toString('base64'),
    password: Buffer.from('mypwd1').toString('base64'),
  },
};

const secret2 = {
  metadata: {
    namespace: 'bar',
    name: 'not-my-secret-name',
  },
  data: {
    username: Buffer.from('myuser2').toString('base64'),
    password: Buffer.from('mypwd2').toString('base64'),
  },
};

const secret3 = {
  metadata: {
    namespace: 'dummy',
    name: 'my-secret-name',
  },
  data: {
    username: Buffer.from('myuser3').toString('base64'),
    password: Buffer.from('mypwd3').toString('base64'),
  },
};

const bma2 = Object.assign({}, bma1, {
  status: {
    conditions: [
      {
        type: 'condType1',
        status: 'False',
        // the rest is unused
      },
      {
        type: 'condType2',
        status: 'True',
      },
      {
        type: 'condType3',
        status: 'False',
      },
      {
        type: 'condType4',
        status: 'True',
      },
    ],
  },
});


const bma3 = Object.assign({}, bma1, {
  status: {
    conditions: [
      {
        type: 'condType1',
        status: 'True',
        // the rest is unused
      },
      {
        type: 'condType2',
        status: 'True',
      },
      {
        type: 'condType3',
        status: 'True',
      },
      {
        type: 'condType4',
        status: 'True',
      },
    ],
  },
});

const bma4 = Object.assign({}, bma1, {
  status: {
    condidtons: [],
  },
});

describe('Bare Metal Asset model', () => {
  test('BMA transform function', () => {
    expect(transform(bma1)).toMatchSnapshot();
    expect(transform(bma1, [secret1])).toMatchSnapshot();
    expect(transform(bma2, [secret2, secret1, secret3])).toMatchSnapshot();
    expect(transform(bma3, [secret3, secret2, secret1])).toMatchSnapshot();
    expect(transform(bma4, [secret1, secret2, secret3])).toMatchSnapshot();
  });
});

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */


import getApplicationElements from './applicationHelper';

describe('applicationHelper', () => {
  it('should match snapshot with subscription', () => {
    const application = {
      name: 'test',
      namespace: 'test',
      activeChannel: 'dev',
      channels: ['dev', 'prod'],
      subscription: {},
      deployables: [],
    };
    expect(getApplicationElements(application)).toMatchSnapshot();
  });

  it('should match snapshot without subscription', () => {
    const application = {
      name: 'test',
      namespace: 'test',
      activeChannel: 'dev',
      channels: ['dev', 'prod'],
      deployables: [],
    };
    expect(getApplicationElements(application)).toMatchSnapshot();
  });
});

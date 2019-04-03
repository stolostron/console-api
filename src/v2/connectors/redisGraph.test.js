/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { getOperator, getDateFilter, getFilterString } from './redisGraph';

describe('redisGraph', () => {
  describe('Class Functions', () => {
    test('getOperator', async () => {
      expect(getOperator('<=')).toEqual('<=');
      expect(getOperator('>=')).toEqual('>=');
      expect(getOperator('!=')).toEqual('!=');
      expect(getOperator('<')).toEqual('<');
      expect(getOperator('>')).toEqual('>');
    });
    test('getFilterString', async () => {
      expect(getFilterString([{ property: 'kind', values: ['cluster'] }])).toEqual('(n.kind = \'cluster\')');
      expect(getFilterString([{ property: 'cpu', values: ['<16'] }])).toEqual('(n.cpu < 16)');
    });
    test('getDateFilter', async () => {
      Date.now = jest.fn(() => 1548076708000); // 21-01-2019T13:18:28Z
      expect(getDateFilter('hour')).toEqual('> \'2019-01-21T12:18:28.000Z\'');
      expect(getDateFilter('day')).toEqual('> \'2019-01-20T13:18:28.000Z\'');
      expect(getDateFilter('week')).toEqual('> \'2019-01-14T13:18:28.000Z\'');
      expect(getDateFilter('month')).toEqual('> \'2018-12-22T02:49:25.000Z\'');
      expect(getDateFilter('year')).toEqual('> \'2018-01-21T07:29:42.000Z\'');
    });
  });
});

/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { getForbiddenKindsForRole, getOperator, getFilterString } from './redisGraph';

describe('redisGraph', () => {
  describe('Class Functions', () => {
    test('getForbiddenKindsForRole', async () => {
      expect(getForbiddenKindsForRole('viewer')).toEqual(['compliance', 'policy', 'node', 'placementpolicy', 'placementbinding', 'persistentvolume', 'persistentvolumeclaim', 'secret']);
      expect(getForbiddenKindsForRole('operator')).toEqual(['node', 'persistentvolume', 'persistentvolumeclaim', 'secret']);
      expect(getForbiddenKindsForRole('clusteradministrator')).toEqual([]);
    });
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
  });
});

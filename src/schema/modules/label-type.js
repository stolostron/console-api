/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { labels } from '../../datasource/mongodb';

export const typeDef = `
type Label {
  name: String
  value: String
}
`;

export const labelResolver = {
  Query: {
    labels,
  },
};

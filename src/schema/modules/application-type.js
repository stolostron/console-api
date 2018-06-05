/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { applications } from '../../datasource/hcm';

export const typeDef = `
type Application {
  Annotations: JSON
  Components: [String]
  Dependencies: [String]
  Labels: JSON
  Name: String
}
`;

export const applicationResolver = {
  Query: {
    applications,
  },
};

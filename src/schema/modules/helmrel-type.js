/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

import { releases } from '../../datasource/hcm';

export const typeDef = `
type HelmRel {
  ChartName: String
  ChartVersion: String
  HDetails: HelmChartDetails
  HelmName: String
  Namespace: String
  Status: String
  Version: Int
  name: String
  cluster: String
}
`;

export const helmRelResolver = {
  Query: {
    releases,
  },
};

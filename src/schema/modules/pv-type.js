/** *****************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 ****************************************************************************** */

export const typeDef = `
type PV {
  PVName: String
  name: String
  cluster: String
  PVDetails: PVDetails
}
type PVDetails {
  Capacity: String
  Status: String
  StorageClass: String
}
`;

export const pvResolver = {
  Query: {
    pvs: (obj, args, { req, hcmConnector }) => hcmConnector.getWork(req, 'pvs'),
  },
};

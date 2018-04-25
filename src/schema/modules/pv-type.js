import { pvs } from '../../datasource/hcm';

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
    pvs,
  },
};

import { pvs } from '../../datasource/hcm';

export const typeDef = `
type PV {
  PVName: String
  name: String
  cluster: String
}
`;

export const pvResolver = {
  Query: {
    pvs,
  },
};

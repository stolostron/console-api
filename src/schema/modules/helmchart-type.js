import { charts } from '../../datasource/hcm';

export const typeDef = `
type HelmChart {
  RepoName: String
  Name: String
  Version: String
  URLs: [String]
}
`;

export const helmChartResolver = {
  Query: {
    charts,
  },
};

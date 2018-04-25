import { setRepo } from '../../datasource/hcm';

export const typeDef = `
input HelmRepoInput {
  Name: String
  URL: String
}

type HelmRepo {
  Name: String
  URL: String
}
`;

export const helmRepoResolver = {
  Mutation: {
    setHelmRepo: (root, { input }) => setRepo(input),
  },
};

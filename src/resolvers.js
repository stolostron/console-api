import {resource, relationship} from './mongodb-client';

const resolvers = {
    Query: {
      resource: async (root, args) => {
        const result = await resource(args)
        return result[0]
      },
      allResources: async () => {
        return await resource({})
      },
      allRelationships: async () => {
        return await relationship({})
      }
    },
    Resource: {
      relationships: async (resource) => {
        return await relationship({from: resource.uid})
      }
    }
  };

  export default resolvers;
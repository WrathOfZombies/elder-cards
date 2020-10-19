import { ApolloClient, InMemoryCache } from "@apollo/client";

import { fetchCards } from "./data/fetch-cards";

/**
 * The instance of ApolloClient. Sets up local resolvers
 * based on {@see schema.graphql}
 */
export const client = new ApolloClient({
  name: "ElderCardsApp",
  version: "1.0",
  cache: new InMemoryCache(),
  resolvers: {
    Query: {
      cards: async (_, { query, page } = {}) => fetchCards(query, page),
      downloadImage: async (_, { src } = {}) => {
        if (!src) {
          return;
        }
        const res = await fetch(src);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        return blobUrl;
      },
    },
  },
});

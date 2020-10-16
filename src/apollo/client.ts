import { ApolloClient, InMemoryCache } from "@apollo/client";

import { fetchCards } from "./data/fetch-cards";

export const client = new ApolloClient({
  name: "ElderCardsApp",
  version: "1.0",
  cache: new InMemoryCache(),
  resolvers: {
    Query: {
      cards: async (_parent, args) => {
        const page = args?.page;
        console.log("Fetching from resolver for page: ", page);
        return fetchCards(page);
      },
    },
  },
});

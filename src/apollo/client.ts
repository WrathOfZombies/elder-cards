import { ApolloClient, InMemoryCache } from "@apollo/client";
import { fetchCards } from "./services/fetch-cards";

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      ElderCardPage: {
        keyFields: ["nextPage"],
      },
    },
  }),
  resolvers: {
    Query: {
      cards: async (_parent, args, { cache }) => {
        const page = args?.page;
        console.log(cache, "Fetching from resolver for page: ", page);
        return fetchCards(page);
      },
    },
  },
});

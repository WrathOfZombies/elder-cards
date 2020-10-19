import React from "react";
import { Provider, teamsTheme } from "@fluentui/react-northstar";
import { ApolloProvider } from "@apollo/client";

import { client } from "./apollo/client";
import { CardGridContainer as ElderCardGrid } from "./components/card-grid/card-grid-container";

export const ElderCardsApp: React.FC = () => (
  <ApolloProvider client={client}>
    <Provider id="elder-cards-app" theme={teamsTheme}>
      <ElderCardGrid />
    </Provider>
  </ApolloProvider>
);

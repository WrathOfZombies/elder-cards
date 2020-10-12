import { client } from "apollo/client";
import { ElderCardGrid } from "components/card-grid/card-grid-container";
import React from "react";
import { ApolloProvider } from "react-apollo";

import { Provider, teamsTheme } from "@fluentui/react-northstar";

export const ElderCardsApp: React.FC = () => (
  <ApolloProvider client={client}>
    <Provider id="elder-cards-app" theme={teamsTheme}>
      <ElderCardGrid />
    </Provider>
  </ApolloProvider>
);

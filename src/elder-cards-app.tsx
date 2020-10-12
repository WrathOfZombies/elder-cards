import React from "react";
import { Provider, teamsTheme } from "@fluentui/react-northstar";
import { ApolloProvider } from "@apollo/client";

import { ElderCardGrid } from "components/card-grid/card-grid-container";
import { client } from "apollo/client";
import { ErrorBoundary } from "components/error-boundary/error-boundary";

export const ElderCardsApp: React.FC = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <Provider id="elder-cards-app" theme={teamsTheme}>
        <ElderCardGrid />
      </Provider>
    </ApolloProvider>
  </ErrorBoundary>
);

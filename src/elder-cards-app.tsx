import React from "react";
import { ApolloProvider } from "@apollo/client";

import { client } from "./apollo/client";
import { CardGridContainer as ElderCardGrid } from "./components/card-grid/card-grid-container";
import { ThemeProvider } from "components/theme/theme-provider";

export const ElderCardsApp: React.FC = () => (
  <ApolloProvider client={client}>
    <ThemeProvider>
      <ElderCardGrid />
    </ThemeProvider>
  </ApolloProvider>
);

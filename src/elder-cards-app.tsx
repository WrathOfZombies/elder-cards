import React from "react";
import { ApolloProvider } from "@apollo/client";

import { client } from "apollo/client";
import { CardsLayout } from "components/card-grid/cards-layout";
import { ThemeProvider } from "components/theme/theme-provider";

export const ElderCardsApp: React.FC = () => (
  <ApolloProvider client={client}>
    <ThemeProvider>
      <CardsLayout />
    </ThemeProvider>
  </ApolloProvider>
);

import React from "react";
import { Provider, teamsTheme } from "@fluentui/react-northstar";

import { CardGrid } from "components/card-grid/card-grid";

export const ElderCardsApp: React.FC = () => (
  <Provider id="elder-cards-app" theme={teamsTheme}>
    <CardGrid />
  </Provider>
);

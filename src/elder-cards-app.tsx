import React from "react";
import { Provider, teamsTheme } from "@fluentui/react-northstar";

import { CardGridLoader } from "components/card-grid/card-grid-loader";

export const ElderCardsApp: React.FC = () => (
  <Provider id="elder-cards-app" theme={teamsTheme}>
    <CardGridLoader />
  </Provider>
);

import React from "react";
import { Provider, teamsTheme } from "@fluentui/react-northstar";

import { ElderCardGrid } from "./components/card-grid/card-grid-container";

export const ElderCardsApp: React.FC = () => (
  <Provider id="elder-cards-app" theme={teamsTheme}>
    <ElderCardGrid />
  </Provider>
);

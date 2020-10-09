import React from "react";

import { Provider, teamsTheme } from "@fluentui/react-northstar";
import { ElderCard } from "components/elder-card";

const mockCardData = {
  name: "Adoring Fan",
  rarity: "Legendary",
  type: "Creature",
  subtype: "Wood Elf",
  cost: 3,
  power: 0,
  health: 1,
  setName: "Core Set",
  set: {
    id: "cs",
    name: "Core Set",
    _self: "https://api.elderscrollslegends.io/v1/sets/cs",
  },
  soulSummon: 1200,
  soulTrap: 400,
  text:
    "Prophecy, Guard. Last Gasp: Adoring Fan will return. Adoring Fan is immune to Silence.",
  attributes: "Neutral",
  keywords: ["Guard", "Last Gasp", "Prophecy"],
  unique: true,
  imageUrl: "https://images.elderscrollslegends.io/cs/adoring_fan.png",
  id: "21909c205c443aa683d32133514db5cc3435f712",
};

export const ElderCardsApp: React.FC = () => (
  <Provider id="elder-cards-app" theme={teamsTheme}>
    <ElderCard {...(mockCardData as any)}></ElderCard>
  </Provider>
);

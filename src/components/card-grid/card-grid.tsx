import * as React from "react";
import Autosizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { BaseCard } from "components/cards/base-card";

const Cell: React.FC<GridChildComponentProps> = ({
  columnIndex,
  rowIndex,
  style,
  data,
  isScrolling,
}) => {
  console.log(data, isScrolling);

  return (
    <div style={style} data-testid={`${columnIndex}.${rowIndex}`}>
      <BaseCard {...(mockCards[0] as any)} />
    </div>
  );
};

export const CardGrid: React.FC = () => {
  const [items, setItems] = React.useState(() => mockCards);

  const loadMoreItems = React.useCallback(
    async () => setItems((items) => [...items, ...mockCards]),
    []
  );

  return (
    <Autosizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={() => true}
          itemCount={items.length}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <Grid
              ref={ref}
              onItemsRendered={onItemsRendered as any}
              columnCount={Math.floor(width / 300)}
              columnWidth={100}
              height={height}
              rowCount={10}
              rowHeight={650}
              width={width}
            >
              {Cell}
            </Grid>
          )}
        </InfiniteLoader>
      )}
    </Autosizer>
  );
};

const mockCards = [
  {
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
  },
  {
    name: "Monk's Strike",
    rarity: "Rare",
    type: "Action",
    cost: 4,
    setName: "Heroes of Skyrim",
    set: {
      id: "hos",
      name: "Heroes of Skyrim",
      _self: "https://api.elderscrollslegends.io/v1/sets/hos",
    },
    collectible: true,
    soulSummon: 100,
    soulTrap: 20,
    text: "Move a friendly creature and give it +3/+0 and Drain this turn.",
    attributes: "Willpower",
    keywords: ["Drain"],
    unique: false,
    imageUrl: "https://images.elderscrollslegends.io/hos/monks_strike.png",
    id: "70293afa570c18ef788bae9dd9e2b70b31f96363",
  },
  {
    name: "Mystic Dragon",
    rarity: "Common",
    type: "Creature",
    subtypes: "Dragon",
    cost: 4,
    power: 4,
    health: 4,
    setName: "Heroes of Skyrim",
    set: {
      id: "hos",
      name: "Heroes of Skyrim",
      _self: "https://api.elderscrollslegends.io/v1/sets/hos",
    },
    collectible: true,
    soulSummon: 50,
    soulTrap: 5,
    text: "Prophecy",
    attributes: "Intelligence",
    keywords: ["Prophecy"],
    unique: false,
    imageUrl: "https://images.elderscrollslegends.io/hos/mystic_dragon.png",
    id: "a6d5da4720701e467e8750448ca336aea7b0f9ba",
  },
  {
    name: "Brilliant Experiment",
    rarity: "Epic",
    type: "Action",
    cost: 3,
    setName: "Core Set",
    set: {
      id: "cs",
      name: "Core Set",
      _self: "https://api.elderscrollslegends.io/v1/sets/cs",
    },
    collectible: true,
    soulSummon: 400,
    soulTrap: 100,
    text: "Draw a copy of a friendly creature.",
    attributes: "Intelligence",
    unique: false,
    imageUrl:
      "https://images.elderscrollslegends.io/cs/brilliant_experiment.png",
    id: "ec73615dd8a14e480a0cf8f13067cb2c5c6e2fca",
  },
  {
    name: "High Hrothgar",
    rarity: "Legendary",
    type: "Support",
    cost: 4,
    setName: "Heroes of Skyrim",
    set: {
      id: "hos",
      name: "Heroes of Skyrim",
      _self: "https://api.elderscrollslegends.io/v1/sets/hos",
    },
    collectible: true,
    soulSummon: 1200,
    soulTrap: 400,
    text:
      "Ongoing. When you summon a creature, its power becomes equal to its health.",
    attributes: "Endurance",
    unique: true,
    imageUrl: "https://images.elderscrollslegends.io/hos/high_hrothgar.png",
    id: "ff56c7b72d949e90dedf333f82eba98e3c45940f",
  },
  {
    name: "Hit and Run",
    rarity: "Epic",
    type: "Action",
    cost: 4,
    setName: "Heroes of Skyrim",
    set: {
      id: "hos",
      name: "Heroes of Skyrim",
      _self: "https://api.elderscrollslegends.io/v1/sets/hos",
    },
    collectible: true,
    soulSummon: 400,
    soulTrap: 100,
    text: "Draw five cards. Discard your hand at the end of the turn.",
    attributes: "Strength",
    unique: false,
    imageUrl: "https://images.elderscrollslegends.io/hos/hit_and_run.png",
    id: "86f829c80e6a6a4988aef2a9812314894def060d",
  },
];

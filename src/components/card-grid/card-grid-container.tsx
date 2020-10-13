import { Grid, Header, Dropdown, Box } from "@fluentui/react-northstar";
import { ElderCard } from "apollo/schema";
import { CardFetcher } from "components/card-fetcher/card-fetcher";
import { BaseCard } from "components/cards/base-card";
import * as React from "react";
import Autosizer from "react-virtualized-auto-sizer";

import { CardGrid } from "./card-grid-renderer";
import { computeAvailableSpace } from "./compute-available-space";

const itemRenderer = (item: ElderCard) => <BaseCard {...item} />;

const inputItems = [
  "Bruce Wayne",
  "Natasha Romanoff",
  "Steven Strange",
  "Alfred Pennyworth",
  "Scarlett O'Hara",
  "Imperator Furiosa",
  "Bruce Banner",
  "Peter Parker",
  "Selina Kyle",
];

const CardGridContainer: React.FC = React.memo(() => (
  <Grid
    style={{
      gridTemplateRows: "auto 1fr",
      gridTemplateColumns: "auto 1fr",
      height: "100%",
      alignItems: "center",
    }}
    content={[
      <Header
        as="h1"
        content="Elder Scrolls: Legends"
        styles={{ marginLeft: "1.1rem", gridRow: 1, gridColumn: 1 }}
      />,
      <Dropdown
        search
        noResultsMessage="We couldn't find any matches."
        clearable
        items={inputItems}
        placeholder="Start typing a name"
        fluid
        styles={{
          gridRow: 1,
          gridColumn: 2,
          marginLeft: "10rem",
          marginRight: "10rem",
        }}
      />,
      <Box
        styles={{
          gridRow: 2,
          gridColumn: "1 / 3",
          width: "100%",
          height: "100%",
        }}
      >
        <CardFetcher>
          {({ onItemsRendered, ref, cards }) => (
            <Autosizer>
              {({ height, width }) => {
                const availableSpace = computeAvailableSpace({
                  height,
                  width,
                  itemCount: cards.length,
                });

                return (
                  <CardGrid
                    {...availableSpace}
                    innerRef={ref}
                    items={cards}
                    itemCount={cards.length}
                    itemRenderer={itemRenderer}
                    onItemsRendered={({
                      visibleRowStartIndex,
                      visibleRowStopIndex,
                      visibleColumnStartIndex,
                      visibleColumnStopIndex,
                    }) => {
                      const visibleStartIndex =
                        visibleRowStartIndex * availableSpace.columnCount +
                        visibleColumnStartIndex;

                      const visibleStopIndex =
                        visibleRowStopIndex * availableSpace.columnCount +
                        visibleColumnStopIndex;

                      onItemsRendered({
                        visibleStartIndex,
                        visibleStopIndex,
                        overscanStartIndex: visibleStartIndex + 1,
                        overscanStopIndex: visibleStopIndex + 1,
                      });
                    }}
                  />
                );
              }}
            </Autosizer>
          )}
        </CardFetcher>
      </Box>,
    ]}
  ></Grid>
));

export { CardGridContainer as ElderCardGrid };

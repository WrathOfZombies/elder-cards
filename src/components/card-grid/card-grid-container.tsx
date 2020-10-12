import * as React from "react";
import Autosizer from "react-virtualized-auto-sizer";

import { BaseCard } from "components/cards/base-card";

import { CardGrid } from "./card-grid-renderer";
import { computeAvailableSpace } from "./compute-available-space";
import { CardFetcher } from "./card-fetcher";
import { IElderCard } from "data/elder-scrolls-legends.interface";

const CardGridContainer: React.FC = React.memo(() => {
  const itemRenderer = React.useCallback(
    (item: IElderCard) => <BaseCard {...item} />,
    []
  );

  return (
    <CardFetcher>
      {({ onItemsRendered, ref, cards }) => (
        <Autosizer>
          {({ height, width }) => (
            <CardGrid
              {...computeAvailableSpace({
                height,
                width,
                itemCount: cards.length,
              })}
              innerRef={ref}
              items={cards}
              itemCount={cards.length}
              itemRenderer={itemRenderer}
              onItemsRendered={({
                visibleRowStartIndex,
                visibleRowStopIndex,
                overscanRowStartIndex,
                overscanRowStopIndex,
              }) => {
                // console.table({
                //   overscanStartIndex: overscanRowStartIndex,
                //   overscanStopIndex: overscanRowStopIndex,
                //   visibleStartIndex: visibleRowStartIndex,
                //   visibleStopIndex: visibleRowStopIndex,
                // });
                onItemsRendered({
                  overscanStartIndex: overscanRowStartIndex,
                  overscanStopIndex: overscanRowStopIndex,
                  visibleStartIndex: visibleRowStartIndex,
                  visibleStopIndex: visibleRowStopIndex,
                });
              }}
            />
          )}
        </Autosizer>
      )}
    </CardFetcher>
  );
});

export { CardGridContainer as ElderCardGrid };

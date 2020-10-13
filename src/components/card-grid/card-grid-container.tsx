import * as React from "react";
import Autosizer from "react-virtualized-auto-sizer";

import { BaseCard } from "components/cards/base-card";

import { CardGrid } from "./card-grid-renderer";
import { computeAvailableSpace } from "./compute-available-space";
import { CardFetcher } from "components/card-fetcher/card-fetcher";
import { ElderCard } from "data/elder-scrolls-legends.interface";

const CardGridContainer: React.FC = React.memo(() => {
  const itemRenderer = React.useCallback(
    (item: ElderCard) => <BaseCard {...item} />,
    []
  );

  return (
    <CardFetcher>
      {({ onItemsRendered, ref, cards }) => (
        <Autosizer>
          {({ height, width }) => {
            const availableSpace = computeAvailableSpace({
              height,
              width,
              itemCount: cards.length,
            });

            console.table(availableSpace);

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
  );
});

export { CardGridContainer as ElderCardGrid };

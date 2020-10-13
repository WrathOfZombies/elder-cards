import { ElderCard } from "data/elder-scrolls-legends.interface";
import * as React from "react";
import { ListOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useCardFetcherState } from "./card-fetcher-reducer";

type OnItemsRendered = (props: ListOnItemsRenderedProps) => void;

export const CardFetcher: React.FC<{
  children: (props: {
    onItemsRendered: OnItemsRendered;
    ref: React.Ref<unknown>;
    cards: ReadonlyArray<ElderCard>;
  }) => React.ReactNode;
}> = ({ children }) => {
  const {
    cards,
    totalCount,
    loadingPromise,
    loadMoreItems,
  } = useCardFetcherState();

  const isItemLoaded = React.useCallback(index => !!cards[index], [cards]);

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={totalCount}
      loadMoreItems={loadingPromise ? () => loadingPromise : loadMoreItems}
    >
      {({ onItemsRendered, ref }) => children({ onItemsRendered, ref, cards })}
    </InfiniteLoader>
  );
};

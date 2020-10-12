import { IElderCard } from "data/elder-scrolls-legends.interface";
import gql from "graphql-tag";
import * as React from "react";
import { useQuery } from "react-apollo";
import { ListOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

type OnItemsRendered = (props: ListOnItemsRenderedProps) => void;

export const CardFetcher: React.FC<{
  children: (props: {
    onItemsRendered: OnItemsRendered;
    ref: React.Ref<unknown>;
    cards: IElderCard[];
  }) => React.ReactNode;
}> = ({ children }) => {
  const { data, error, fetchMore } = useQuery(FETCH_CARDS);

  const { cards, totalCount, nextPage } = data?.cards ?? {
    cards: [],
    totalCount: 0,
  };

  const isItemLoaded = React.useCallback(index => !!cards[index], [cards]);

  const loadMoreItems = React.useCallback(async () => {
    debugger;

    return fetchMore({
      variables: { page: nextPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        debugger;
        if (!fetchMoreResult) return prev;
        const nextPage = fetchMoreResult.nextPage;
        return {
          ...prev,
          ...fetchMoreResult,
          cards: [...prev.cards, ...fetchMoreResult.cards],
          nextPage,
        };
      },
    });
  }, [fetchMore, nextPage]);

  if (error) {
    throw new Error("Failed to fetch data from the server.");
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={totalCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => children({ onItemsRendered, ref, cards })}
    </InfiniteLoader>
  );
};

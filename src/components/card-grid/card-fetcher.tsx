import { gql, useQuery } from "@apollo/client";
import { Text } from "@fluentui/react-northstar";
import { ElderCard } from "apollo/schema";
import * as React from "react";
import { ListOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

type OnItemsRendered = (props: ListOnItemsRenderedProps) => void;

const FETCH_CARDS = gql`
  query FetchCards($page: String) {
    cards(page: $page) @client {
      cards {
        id
        name
        rarity
        type
        subtype
        setname
        text
        attributes
        keywords
        imageUrl
      }
      nextPage
      totalCount
    }
  }
`;

export const CardFetcher: React.FC<{
  children: (props: {
    onItemsRendered: OnItemsRendered;
    ref: React.Ref<unknown>;
    cards: ElderCard[];
  }) => React.ReactNode;
}> = ({ children }) => {
  const { data, fetchMore, loading, error } = useQuery(FETCH_CARDS);
  const isItemLoaded = React.useCallback(index => !!data.cards[index], [data]);

  const { cards, totalCount, nextPage } = data || {
    cards: [],
    totalCount: 0,
  };

  const loadMoreItems = React.useCallback(
    async () =>
      fetchMore({
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
      }),
    [fetchMore, nextPage]
  );

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch data from the server");
  }

  if (loading || !data) {
    return <Text content="loading" />;
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

import { ElderCard } from "apollo/schema";
import { isEmpty } from "lodash";
import * as React from "react";
import { ListOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Text } from "@fluentui/react-northstar";

import { gql, useQuery } from "@apollo/client";

type OnItemsRendered = (props: ListOnItemsRenderedProps) => void;

const FETCH_CARDS = gql`
  query FetchCards($page: String) {
    cards(page: $page) @client {
      cards {
        attributes
        id
        imageUrl
        keywords
        name
        rarity
        setname
        subtypes
        text
        type
      }
      nextPage
      totalCount
      pageSize
    }
  }
`;

const useCardFetcher = () => {
  const { data, fetchMore, error } = useQuery(FETCH_CARDS);
  const { cards, totalCount, nextPage } = data?.cards ?? {
    cards: [],
    totalCount: 9999 /* arbitary number */,
    nextPage: undefined,
  };

  const loadMoreItems = React.useCallback(
    async () =>
      fetchMore({
        variables: { page: nextPage },
        updateQuery: (previousResult, { fetchMoreResult: nextResult }) => {
          if (isEmpty(nextResult?.cards?.cards)) return previousResult;

          const { cards } = previousResult.cards;
          const { cards: newCards } = nextResult.cards;

          return {
            cards: {
              ...nextResult.cards,
              cards: [...cards, ...newCards],
            },
          };
        },
      }),
    [fetchMore, nextPage]
  );

  return { cards, totalCount, error, loadMoreItems };
};

export const CardFetcher: React.FC<{
  children: (props: {
    onItemsRendered: OnItemsRendered;
    ref: React.Ref<unknown>;
    cards: ReadonlyArray<ElderCard>;
  }) => React.ReactNode;
}> = ({ children }) => {
  const { error, cards, totalCount, loadMoreItems } = useCardFetcher();

  const isItemLoaded = React.useCallback(index => !!cards[index], [cards]);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch data from the server");
  }

  if (isEmpty(cards)) {
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

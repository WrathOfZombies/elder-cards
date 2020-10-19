import { ElderCard, ElderCardPage, QueryCardsArgs } from "apollo/schema";
import { isEmpty } from "lodash";
import * as React from "react";
import { ListOnItemsRenderedProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Text } from "@fluentui/react-northstar";

import { ApolloQueryResult, gql, useQuery } from "@apollo/client";

export type OnItemsRendered = (props: ListOnItemsRenderedProps) => void;

const FETCH_CARDS = gql`
  query FetchCards($query: SearchQuery, $page: String) {
    cards(query: $query, page: $page) @client {
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
      hasMore
    }
  }
`;

/**
 * A hook that helps us establish the lazyloading logic using Apollo
 * @param search A optional search string to pass to the resolver
 */
const useCardFetcher = (search?: string) => {
  // Track the inflight request so that we can avoid performing
  // another fetch more if a request was already made
  const inFlightPromise = React.useRef<
    Promise<ApolloQueryResult<{ cards: ElderCardPage }>>
  >();

  // Set up the initial query and everytime the cache changes
  // this hook will trigger a re-render causing the UI to update
  const { data, fetchMore, error } = useQuery<
    { cards: ElderCardPage },
    QueryCardsArgs
  >(FETCH_CARDS, {
    variables: {
      query: search,
      page: undefined,
    },
    // For searches, we always want to hit the network inorder to avoid
    // coliding with any locally cached information. Else we'll serve from the
    // cache first
    fetchPolicy: search ? "network-only" : "cache-first",
    errorPolicy: "none",
  });

  const { cards, totalCount, nextPage, hasMore } = data?.cards ?? {
    cards: [],
    totalCount: 0,
    nextPage: undefined,
    hasMore: true,
  };

  const loadMoreItems = React.useCallback(async () => {
    // If there are more items and there's no inflight request and the next page is
    // defined (ie, this is not the first query) then consider firing a load more and
    // merge the results
    if (hasMore && inFlightPromise.current == null && nextPage) {
      inFlightPromise.current = fetchMore({
        variables: { query: search, page: nextPage },
        updateQuery: (previousResult, { fetchMoreResult: nextResult }) => {
          inFlightPromise.current = undefined;

          // We need to merge the existing results with the new results that have
          // come in. This logic is to achieve that. This way we can update the cache
          // with the same structure as when we first retrieved it. This is an Apollo
          // behaviour.
          if (!nextResult || isEmpty(nextResult?.cards?.cards))
            return previousResult;

          const { cards } = previousResult.cards ?? { cards: [] };
          const { cards: newCards } = nextResult.cards;

          return {
            cards: {
              ...nextResult.cards,
              cards: [...cards, ...newCards],
            },
          };
        },
      });
    }

    return inFlightPromise.current;
  }, [hasMore, fetchMore, search, nextPage]);

  return { cards, totalCount, error, loadMoreItems, hasMore };
};

/**
 * Fetches the card using Apollo based on the search criteria. Also integrates with the
 * lazy loading infinite list so that we can query additional data as we scroll
 */
export const CardFetcher: React.FC<{
  search?: string;
  children: (props: {
    hasMore: boolean;
    onItemsRendered: OnItemsRendered;
    ref: React.Ref<unknown>;
    cards: ReadonlyArray<ElderCard>;
  }) => React.ReactNode;
}> = React.memo(({ search, children }) => {
  const infiniteLoaderRef = React.useRef<InfiniteLoader>(null);
  const isMounted = React.useRef(false);
  const { error, cards, totalCount, hasMore, loadMoreItems } = useCardFetcher(
    search
  );

  const isItemLoaded = React.useCallback(index => !!cards[index], [cards]);

  React.useEffect(() => {
    // Each time the search changes, we need clear the cache
    // See https://github.com/bvaughn/react-window-infinite-loader#advanced-usage
    if (isMounted.current && infiniteLoaderRef.current) {
      infiniteLoaderRef.current.resetloadMoreItemsCache();
    }
    isMounted.current = true;
  }, [search]);

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch data from the server");
  }

  if (!hasMore && isEmpty(cards)) {
    return (
      <Text
        size="medium"
        align="center"
        role="alert"
        aria-label="No cards available."
        content="No cards available."
      />
    );
  }

  return (
    <InfiniteLoader
      ref={infiniteLoaderRef}
      isItemLoaded={isItemLoaded}
      itemCount={isEmpty(cards) ? 10000 : totalCount}
      loadMoreItems={loadMoreItems}
      minimumBatchSize={1}
      threshold={1}
    >
      {({ onItemsRendered, ref }) =>
        children({ onItemsRendered, ref, cards, hasMore })
      }
    </InfiniteLoader>
  );
});

import { fetchCards } from "data/elder-scrolls-legends";
import { ElderCard, ElderCardPage } from "data/elder-scrolls-legends.interface";
import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  CardFetcherActions,
  createLoadedState,
  createLoadingState,
} from "./card-fetcher-actions";

type CardFetcherState = {
  cards: ReadonlyArray<ElderCard>;
  totalCount: number;
  nextPage: string;
  loadingPromise: Promise<void> | null;
};

const BASE_URL = "https://api.elderscrollslegends.io/v1";
const STARTING_PAGE_SIZE = 20;

const reducer: React.Reducer<CardFetcherState, CardFetcherActions> = (
  state,
  { type, payload }
) => {
  switch (type) {
    case "CARDS_LOADING":
      return {
        ...state,
        loadingPromise: payload as Promise<void>,
      };

    case "CARDS_LOADED":
      return {
        ...state,
        ...payload,
        cards: [...state.cards, ...(payload as ElderCardPage).cards],
        loadingPromise: null,
      };

    default:
      return state;
  }
};

export const useCardFetcherState = (): any => {
  const isMounted = useRef(false);

  const [
    { cards, totalCount, nextPage, loadingPromise },
    dispatch,
  ] = useReducer(reducer, {
    cards: [],
    totalCount: 9999, // an arbitary number
    nextPage: `${BASE_URL}/cards?page=0&pageSize=${STARTING_PAGE_SIZE}`,
    loadingPromise: null,
  });

  const safeDispatch = useCallback((action: CardFetcherActions) => {
    if (isMounted.current) {
      dispatch(action);
    }
  }, []);

  const loadMoreItems = useCallback(() => {
    const promise = (async () => {
      const result = await fetchCards(nextPage);
      safeDispatch(createLoadedState(result));
    })();

    safeDispatch(createLoadingState(promise));

    return promise;
  }, [nextPage]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return { cards, totalCount, loadingPromise, loadMoreItems };
};

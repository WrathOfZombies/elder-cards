import { ElderCardPage } from "data/elder-scrolls-legends.interface";

type CardsLoading = {
  type: "CARDS_LOADING";
  payload: Promise<void>;
};

export const createLoadingState = (payload: Promise<void>): CardsLoading => ({
  type: "CARDS_LOADING",
  payload,
});

type CardsLoaded = {
  type: "CARDS_LOADED";
  payload: ElderCardPage;
};

export const createLoadedState = (payload: ElderCardPage): CardsLoaded => ({
  type: "CARDS_LOADED",
  payload,
});

export type CardFetcherActions = CardsLoading | CardsLoaded;

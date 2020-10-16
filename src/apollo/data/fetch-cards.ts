import { reduce } from "lodash";

import { ElderCard, ElderCardPage } from "../schema";
import {
  IElderScrollsCard,
  IElderScrollsCardPage,
} from "./elder-scrolls-api.interface";

const DEFAULT_PAGE_SIZE = 20;

const BASE_URL = "https://api.elderscrollslegends.io/v1";

/**
 * Converts an array of {@see IElderScrollsCard} to the GQL normalized variant {@see ElderCard}
 * @param {IElderScrollsCard} cards The original set of cards returned from the API.
 * @returns {Array<ElderCard>} An array containing the converted card {@see ElderCard}
 */
const convertToElderCard = (
  cards: IElderScrollsCard[] | undefined
): ElderCard[] => {
  if (!cards) {
    return [];
  }

  cards = Array.isArray(cards) ? cards : [cards];
  return reduce<IElderScrollsCard, ElderCard[]>(
    cards,
    (acc, card) => {
      if (!card) {
        return acc;
      }

      try {
        const elderCard: ElderCard = {
          id: card.id,
          name: card.name,
          rarity: card.rarity,
          type: card.type,
          subtypes: card.subtypes ?? [],
          setname: card.set?.name ?? "",
          text: card.text ?? "",
          attributes: card.attributes ?? [],
          keywords: card.keywords ?? [],
          imageUrl: card.imageUrl,
        };

        return [...acc, elderCard];
      } catch (error) {
        console.error("Failure while converting card", card);
        return acc;
      }
    },
    []
  );
};

/**
 * Converts a json containing {@see IElderScrollsCardPage} to {@see ElderCardPage}
 * @param {IElderSCrollsCardPage} json The current page returned from the API
 * @returns The GQL normalizaed variant of {@see IElderScrollsCardPage}
 */
const convertToElderCardsPage = (
  json: IElderScrollsCardPage | undefined
): ElderCardPage => {
  if (!json) {
    return {
      cards: [],
      totalCount: 0,
      pageSize: 20,
    };
  }

  const cards = convertToElderCard(json.cards);
  return {
    cards,
    nextPage: json._links?.next,
    totalCount: json._totalCount ?? 0,
    pageSize: json._pageSize ?? DEFAULT_PAGE_SIZE,
  };
};

/**
 * Retrieves cards from the ElderScrolls API in a batch of specified
 * amount of pageSize or 20 by default.
 * @param {string} page The current page, set this to undefined to start from the beginning
 * @param {number} pageSize The size of the current page
 * @returns {Promsie<ElderCardPage>} A promise containing an {@see ElderCardPage}
 */
export const fetchCards = async (
  page?: string,
  pageSize = DEFAULT_PAGE_SIZE
): Promise<ElderCardPage> => {
  const res = await fetch(
    page ?? `${BASE_URL}/cards?page=1&pageSize=${pageSize}`
  );
  const json = await res.json();
  const data = convertToElderCardsPage(json);
  return data;
};

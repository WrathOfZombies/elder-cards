import { reduce } from "lodash";

import { ElderCard, ElderCardPage } from "./elder-scrolls-legends.interface";

const DEFAULT_PAGE_SIZE = 20;

const convertToElderCard = (cards: any): ElderCard[] => {
  if (!cards) {
    return [];
  }

  cards = Array.isArray(cards) ? cards : [cards];
  return reduce<any, ElderCard[]>(
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
          text: card.text,
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

const convertToElderCardsPage = (json: any): ElderCardPage => {
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

export const fetchCards = async (page: string): Promise<ElderCardPage> => {
  const res = await fetch(page);
  const json = await res.json();
  return convertToElderCardsPage(json);
};

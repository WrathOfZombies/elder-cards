import { ElderCard, ElderCardPage } from "apollo/schema";
import { reduce } from "lodash";

const DEFAULT_PAGE_SIZE = 20;
const BASE_URL = "https://api.elderscrollslegends.io/v1";

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
          __typename: "ElderCard",
          id: card.id,
          name: card.name,
          rarity: card.rarity,
          type: card.type,
          subtype: card.subtype,
          setname: card.set?.name ?? "",
          text: card.text,
          attributes: card.attributes,
          keywords: card.keywords,
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
      __typename: "ElderCardPage",
      cards: [],
      totalCount: 0,
      pageSize: 20,
    };
  }

  const cards = convertToElderCard(json.cards);
  return {
    __typename: "ElderCardPage",
    cards,
    nextPage: json.links?.next,
    totalCount: json._totalCount ?? 0,
    pageSize: json._pageSize ?? DEFAULT_PAGE_SIZE,
  };
};

export const fetchCards = async (page?: string): Promise<ElderCardPage> => {
  const res = await fetch(
    page ?? `${BASE_URL}/cards?page=0&pageSize=${DEFAULT_PAGE_SIZE}`
  );
  const json = await res.json();
  return convertToElderCardsPage(json);
};

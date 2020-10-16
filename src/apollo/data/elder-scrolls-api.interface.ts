/**
 * Please refer to this API for documentation on the fields below:
 * https://docs.elderscrollslegends.io/#api_v1cards_list
 */

export interface IElderScrollsCard {
  name: string;
  rarity: string;
  type: string;
  cost: number;
  power?: number;
  health?: number;
  set: {
    id: string;
    name: string;
    _self: string;
  };
  subtypes?: Array<string>;
  collectible: boolean;
  soulSummon?: number;
  soulTrap?: number;
  text?: string;
  attributes?: Array<string>;
  unique: boolean;
  imageUrl: string;
  id: string;
  keywords?: Array<string>;
}

export interface IElderScrollsCardPage {
  cards: Array<IElderScrollsCard>;
  _links: {
    next?: string;
  };
  _pageSize: number;
  _totalCount: number;
}

export type ElderCard = {
  readonly id: string;
  readonly name: string;
  readonly rarity: string;
  readonly type: string;
  readonly subtypes: ReadonlyArray<string>;
  readonly setname: string;
  readonly text: string;
  readonly attributes: ReadonlyArray<string>;
  readonly keywords: ReadonlyArray<string>;
  readonly imageUrl: string;
};

export type ElderCardPage = {
  readonly cards: ReadonlyArray<ElderCard>;
  readonly nextPage?: string;
  readonly totalCount: number;
  readonly pageSize: number;
};

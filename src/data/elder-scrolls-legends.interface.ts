export interface IElderCard {
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
}

export interface IElderCardPage {
  readonly cards: ReadonlyArray<IElderCard>;
  readonly nextPage?: string;
  readonly totalCount: number;
  readonly pageSize: number;
}

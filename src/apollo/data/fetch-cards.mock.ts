import { ElderCard, ElderCardPage } from "apollo/schema";
import { sample } from "lodash";

export const fetchCards = (): Promise<ElderCardPage> =>
  Promise.resolve(createMockCardPage());

export const createMockCard = (
  overrides: Partial<ElderCard> = {}
): ElderCard => ({
  id: "ce7be2e72d6b06a52e50bed01952801ca4ecfade",
  name: "Raise Dead",
  rarity: "Legendary",
  type: "Action",
  subtypes: [],
  setname: "Core Set",
  text: "Summon a random creature from each discard pile.",
  attributes: ["Endurance"],
  keywords: [],
  imageUrl: "https://images.elderscrollslegends.io/cs/raise_dead.png",
  ...overrides,
});

export const createMockCardPage = (
  overrides: Partial<ElderCardPage> = {},
  cardCount = 20
): ElderCardPage => ({
  cards: new Array(cardCount)
    .fill(undefined)
    .map(() => createMockCard(sample(mockDataSet))),
  nextPage: "https://api.elderscrollslegends.io/v1/cards?page=2&pageSize=20",
  totalCount: 500,
  pageSize: cardCount,
  ...overrides,
});

const mockDataSet: ElderCard[] = [
  {
    id: "ce7be2e72d6b06a52e50bed01952801ca4ecfade",
    name: "Raise Dead",
    rarity: "Legendary",
    type: "Action",
    subtypes: [],
    setname: "Core Set",
    text: "Summon a random creature from each discard pile.",
    attributes: ["Endurance"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/cs/raise_dead.png",
  },
  {
    id: "15d9c10821d4033fb045ed2cb4599ac76288ac67",
    name: "Reachman Shaman",
    rarity: "Common",
    type: "Creature",
    subtypes: ["Reachman"],
    setname: "Core Set",
    text:
      "At the start of your turn, give another random friendly creature +1/+1.",
    attributes: ["Neutral"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/cs/reachman_shaman.png",
  },
  {
    id: "ebbd44e57df2df1c46f7eaeb7e7847d3c1b2ed46",
    name: "Redoran Enforcer",
    rarity: "Common",
    type: "Creature",
    subtypes: ["Dark Elf"],
    setname: "Core Set",
    text: "",
    attributes: ["Intelligence"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/cs/redoran_enforcer.png",
  },
  {
    id: "b3a743a36b1e0139954cc57c06ceae18b8d89f19",
    name: "Rift Thane",
    rarity: "Epic",
    type: "Creature",
    subtypes: ["Nord"],
    setname: "Core Set",
    text:
      "Summon: If you have less health than your opponent, +0/+2 and Guard. Otherwise, +2/+0 and Breakthrough.",
    attributes: ["Strength", "Willpower"],
    keywords: ["Breakthrough", "Guard"],
    imageUrl: "https://images.elderscrollslegends.io/cs/rift_thane.png",
  },
  {
    id: "958e2558d186c971bc1ced6071090498215e0449",
    name: "Rihad Horseman",
    rarity: "Common",
    type: "Creature",
    subtypes: ["Redguard"],
    setname: "Core Set",
    text:
      "Rihad Horseman has +3/+0 and Breakthrough while equipped with an item.",
    attributes: ["Strength"],
    keywords: ["Breakthrough"],
    imageUrl: "https://images.elderscrollslegends.io/cs/rihad_horseman.png",
  },
  {
    id: "c5ba5c67decffee9c3ddc1f8a4ab908498ea05c7",
    name: "Rihad Nomad",
    rarity: "Common",
    type: "Creature",
    subtypes: ["Redguard"],
    setname: "Core Set",
    text: "",
    attributes: ["Strength"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/cs/rihad_nomad.png",
  },
  {
    id: "ef8bc11591df723e127b9f825055ca4eab319f86",
    name: "Shimmerene Peddler",
    rarity: "Epic",
    type: "Creature",
    subtypes: ["High Elf"],
    setname: "Core Set",
    text: "At the end of each turn, if you played two actions, draw a card.",
    attributes: ["Intelligence"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/cs/shimmerene_peddler.png",
  },
  {
    id: "326d90bb4cfce93a5502b38f74e1f6e23c271d01",
    name: "Priest of the Moons",
    rarity: "Common",
    type: "Creature",
    subtypes: ["Khajiit"],
    setname: "Core Set",
    text: "Prophecy. Summon: Gain 2 health.",
    attributes: ["Willpower"],
    keywords: ["Prophecy"],
    imageUrl:
      "https://images.elderscrollslegends.io/cs/priest_of_the_moons.png",
  },
  {
    id: "1b41e4e0529947c755b77849510fe2c713e71c5d",
    name: "Protective Spider",
    rarity: "Common",
    type: "Creature",
    subtypes: ["Spider"],
    setname: "Core Set",
    text: "Guard|",
    attributes: ["Agility"],
    keywords: ["Guard"],
    imageUrl: "https://images.elderscrollslegends.io/cs/protective_spider.png",
  },
  {
    id: "dbdea0cbfd2cb85b11dffbd2febc8e9c3d4ac702",
    name: "Imperial Camp",
    rarity: "Rare",
    type: "Support",
    subtypes: [],
    setname: "Heroes of Skyrim",
    text:
      "Ongoing. Summon: Put a 1/2 Septim Guardsman with Guard into your hand. Friendly Guards have +1/+0.",
    attributes: ["Willpower"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/hos/imperial_camp.png",
  },
  {
    id: "adbf6c7782e052098f479f774ff715f86a35565f",
    name: "J'zargo",
    rarity: "Legendary",
    type: "Creature",
    subtypes: ["Khajiit"],
    setname: "Heroes of Skyrim",
    text: "Summon: Put an Experimental Scroll into your hand.",
    attributes: ["Intelligence"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/hos/jzargo.png",
  },
  {
    id: "7df7b329639d62a22dbc186a23a6e622ae388d76",
    name: "Lay Down Arms",
    rarity: "Rare",
    type: "Action",
    subtypes: [],
    setname: "Heroes of Skyrim",
    text: "Set a creature's power and health to 1.",
    attributes: ["Endurance"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/hos/lay_down_arms.png",
  },
  {
    id: "d6a7f917460de639b0493925f098bf82e9b31b83",
    name: "Legate Rikke",
    rarity: "Legendary",
    type: "Creature",
    subtypes: ["Nord"],
    setname: "Heroes of Skyrim",
    text:
      "When you summon an Imperial, summon a 1/1 Imperial Grunt in the other lane.",
    attributes: ["Willpower"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/hos/legate_rikke.png",
  },
  {
    id: "127a19dfe9f70e21c2174d2cc6adf8eb6d5ea7f9",
    name: "Mistveil Enchanter",
    rarity: "Common",
    type: "Creature",
    subtypes: ["Breton"],
    setname: "Heroes of Skyrim",
    text: "Ward. Summon: +2/+0 if you have another creature with Ward.",
    attributes: ["Intelligence"],
    keywords: ["Ward"],
    imageUrl:
      "https://images.elderscrollslegends.io/hos/mistveil_enchanter.png",
  },
  {
    id: "70293afa570c18ef788bae9dd9e2b70b31f96363",
    name: "Monk's Strike",
    rarity: "Rare",
    type: "Action",
    subtypes: [],
    setname: "Heroes of Skyrim",
    text: "Move a friendly creature and give it +3/+0 and Drain this turn.",
    attributes: ["Willpower", "Agility"],
    keywords: ["Drain"],
    imageUrl: "https://images.elderscrollslegends.io/hos/monks_strike.png",
  },
  {
    id: "a6d5da4720701e467e8750448ca336aea7b0f9ba",
    name: "Mystic Dragon",
    rarity: "Common",
    type: "Creature",
    subtypes: ["Dragon"],
    setname: "Heroes of Skyrim",
    text: "Prophecy",
    attributes: ["Intelligence"],
    keywords: ["Prophecy"],
    imageUrl: "https://images.elderscrollslegends.io/hos/mystic_dragon.png",
  },
  {
    id: "ec73615dd8a14e480a0cf8f13067cb2c5c6e2fca",
    name: "Brilliant Experiment",
    rarity: "Epic",
    type: "Action",
    subtypes: [],
    setname: "Core Set",
    text: "Draw a copy of a friendly creature.",
    attributes: ["Intelligence"],
    keywords: [],
    imageUrl:
      "https://images.elderscrollslegends.io/cs/brilliant_experiment.png",
  },
  {
    id: "ff56c7b72d949e90dedf333f82eba98e3c45940f",
    name: "High Hrothgar",
    rarity: "Legendary",
    type: "Support",
    subtypes: [],
    setname: "Heroes of Skyrim",
    text:
      "Ongoing. When you summon a creature, its power becomes equal to its health.",
    attributes: ["Endurance"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/hos/high_hrothgar.png",
  },
  {
    id: "86f829c80e6a6a4988aef2a9812314894def060d",
    name: "Hit and Run",
    rarity: "Epic",
    type: "Action",
    subtypes: [],
    setname: "Heroes of Skyrim",
    text: "Draw five cards. Discard your hand at the end of the turn.",
    attributes: ["Strength"],
    keywords: [],
    imageUrl: "https://images.elderscrollslegends.io/hos/hit_and_run.png",
  },
  {
    id: "5fe78c87fc4c52b7ab914924d0a6f23707267b8c",
    name: "Mages Guild Retreat",
    rarity: "Epic",
    type: "Support",
    subtypes: [],
    setname: "Core Set",
    text:
      "At the end of each turn, if you played two actions, summon a random Atronach.",
    attributes: ["Intelligence"],
    keywords: [],
    imageUrl:
      "https://images.elderscrollslegends.io/cs/mages_guild_retreat.png",
  },
];

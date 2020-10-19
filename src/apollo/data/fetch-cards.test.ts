import { fetchCards } from "./fetch-cards";

describe("Testing fetchCards", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        cards: [
          {
            name: "Cave Bear",
            rarity: "Common",
            type: "Creature",
            subtypes: ["Beast"],
            cost: 5,
            power: 5,
            health: 6,
            set: {
              id: "hos",
              name: "Heroes of Skyrim",
              _self: "https://api.elderscrollslegends.io/v1/sets/hos",
            },
            collectible: true,
            soulSummon: 50,
            soulTrap: 5,
            attributes: ["Endurance"],
            unique: false,
            imageUrl: "https://images.elderscrollslegends.io/hos/cave_bear.png",
            id: "4ce2dcfb9559e5bfee37bfb72bac55d45c95e7a8",
          },
        ],
        _links: {
          next:
            "https://api.elderscrollslegends.io/v1/cards?page=3&pageSize=20",
          prev: "https://api.elderscrollslegends.io/v1/cards?pageSize=20",
        },
        _pageSize: 20,
        _totalCount: 1212,
      }),
    });

    global.fetch = mockFetch;
  });

  test("should fetch some cards", async () => {
    const result = await fetchCards();
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=20"
    );
    expect(result).toMatchSnapshot();
  });

  test("should fetch some cards and search", async () => {
    await fetchCards("Alduin");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.elderscrollslegends.io/v1/cards?page=1&pageSize=20&name=Alduin"
    );
  });

  test("should not throw if no data is returned", async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(undefined),
    });

    const result = await fetchCards("Alduin");
    expect(result).toMatchSnapshot();
  });

  test("should not throw if cards are empty", async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        cards: [],
        _links: {
          next:
            "https://api.elderscrollslegends.io/v1/cards?page=3&pageSize=20",
          prev: "https://api.elderscrollslegends.io/v1/cards?pageSize=20",
        },
        _pageSize: 20,
        _totalCount: 1212,
      }),
    });

    const result = await fetchCards("Alduin");
    expect(result).toMatchSnapshot();
  });

  test("should not throw if some properties are missing", async () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        cards: [
          {
            name: "Cave Bear",
            rarity: "Common",
            type: "Creature",
            cost: 5,
            power: 5,
            health: 6,

            collectible: true,
            soulSummon: 50,
            soulTrap: 5,
            text: "some content",
            unique: false,
            imageUrl: "https://images.elderscrollslegends.io/hos/cave_bear.png",
            id: "4ce2dcfb9559e5bfee37bfb72bac55d45c95e7a8",
          },
        ],
        _links: {
          next:
            "https://api.elderscrollslegends.io/v1/cards?page=3&pageSize=20",
          prev: "https://api.elderscrollslegends.io/v1/cards?pageSize=20",
        },
        _pageSize: 20,
        _totalCount: 1212,
      }),
    });

    const result = await fetchCards("Alduin");
    expect(result).toMatchSnapshot();
  });

  test("should throw if the request fails", async () => {
    mockFetch.mockRejectedValue("Something went wrong");
    expect(fetchCards()).rejects.toThrow("Something went wrong");
  });
});

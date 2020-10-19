import React from "react";
import { shallow } from "enzyme";

import { ElderCardsApp } from "./elder-cards-app";

jest.mock("./apollo/client", () => ({
  client: { id: "someMockClient" },
}));

jest.mock("components/card-grid/cards-layout", () => ({
  CardsLayout: () => <div data-testid="elder-cards-grid" />,
}));

describe("Testing ElderCardsApp", () => {
  test("should render a theme provider", () => {
    const wrapper = shallow(<ElderCardsApp />);
    const provider = wrapper.find("ThemeProvider");

    expect(provider).toHaveLength(1);
  });

  test("should render an Apollo provider and pass the client to it", () => {
    const wrapper = shallow(<ElderCardsApp />);
    const provider = wrapper.find("ApolloProvider");

    expect(provider.props()).toMatchObject({
      client: expect.objectContaining({ id: "someMockClient" }),
    });
  });

  test("should render the card grid container entry point", () => {
    const wrapper = shallow(<ElderCardsApp />);
    const grid = wrapper.find("CardsLayout");

    expect(grid).toHaveLength(1);
  });
});

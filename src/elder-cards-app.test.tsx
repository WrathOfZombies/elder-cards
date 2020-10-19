import React from "react";
import { shallow } from "enzyme";

import { ElderCardsApp } from "./elder-cards-app";
import { teamsTheme } from "@fluentui/react-northstar";

jest.mock("./apollo/client", () => ({
  client: { id: "someMockClient" },
}));

jest.mock("./components/card-grid/card-grid-container", () => ({
  CardGridContainer: () => <div data-testid="elder-cards-grid" />,
}));

describe("Testing ElderCardsApp", () => {
  test("should render a UI provider with the right theme", () => {
    const wrapper = shallow(<ElderCardsApp />);
    const provider = wrapper.find("Provider");

    expect(provider.props()).toMatchObject({
      theme: teamsTheme,
      id: "elder-cards-app",
    });
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
    const grid = wrapper.find("CardGridContainer");

    expect(grid).toHaveLength(1);
  });
});

import React from "react";
import { shallow } from "enzyme";

import { ElderCardsApp } from "./elder-cards-app";
import { teamsTheme } from "@fluentui/react-northstar";

describe("Testing ElderCardsApp", () => {
  test("should render a provider with the right props", () => {
    const wrapper = shallow(<ElderCardsApp />);
    const provider = wrapper.find("Provider");

    expect(provider.props()).toMatchObject({
      theme: teamsTheme,
      id: "elder-cards-app",
    });
  });
});

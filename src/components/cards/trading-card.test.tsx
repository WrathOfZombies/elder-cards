import React from "react";
import { shallow } from "enzyme";

import { ElderCard } from "apollo/schema";
import { createMockCard } from "apollo/data/fetch-cards.mock";
import { TradingCard } from "./trading-card";

describe("Testing IElderCard", () => {
  let mockCardProps: ElderCard;

  beforeEach(() => {
    mockCardProps = createMockCard();
  });

  test("should render an accessible card that is elevated and centered", () => {
    const wrapper = shallow(<TradingCard {...mockCardProps} />);
    const card = wrapper.find("Card");
    expect(card.props()).toMatchObject({
      id: mockCardProps.id,
      "data-testid": mockCardProps.id,
      elevated: true,
      centered: true,
    });
  });

  test("should render a card with a header with the right structure", () => {
    const wrapper = shallow(<TradingCard {...mockCardProps} />);

    const header = wrapper.find("CardHeader");
    const flex = header.find("Flex");
    const text1 = header.find("Text").at(0);
    const text2 = header.find("Text").at(1);

    expect(flex.props()).toMatchObject({
      gap: "gap.small",
      column: true,
      hAlign: "center",
    });

    expect(text1.props()).toMatchObject({
      content: mockCardProps.name,
      size: "medium",
      weight: "bold",
      as: "span",
    });

    expect(text2.props()).toMatchObject({
      content: mockCardProps.subtypes,
      size: "small",
      as: "span",
    });
  });
});

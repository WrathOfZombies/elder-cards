import React from "react";
import { shallow } from "enzyme";

import { ElderCard } from "apollo/schema";
import { createMockCard } from "apollo/data/fetch-cards.mock";
import { TradingCard } from "./trading-card";

jest.mock("./lazy-image", () => ({ LazyImage: () => <div /> }));

describe("Testing IElderCard", () => {
  let mockCardProps: ElderCard;

  beforeEach(() => {
    mockCardProps = createMockCard();
  });

  test("should render an accessible card that is elevated and centered", () => {
    const wrapper = shallow(<TradingCard {...mockCardProps} />);
    const card = wrapper.find("Card");
    expect(card.props()).toMatchObject({
      id: "ce7be2e72d6b06a52e50bed01952801ca4ecfade",
      "data-testid": "ce7be2e72d6b06a52e50bed01952801ca4ecfade",
      elevated: true,
      centered: true,
      tabIndex: 0,
      role: "articlenN",
      "aria-label":
        "Raise Dead, A Legendary Action card of the set Core Set. Summon a random creature from each discard pile.",
      styles: {
        background:
          "radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(252,239,180,1) 100%)",
      },
      size: "medium",
    });
  });

  test("should render a card with a header with the right structure", () => {
    const wrapper = shallow(<TradingCard {...mockCardProps} />);
    const header = wrapper.find("CardHeader");
    const name = header.find("Text");
    expect(name.props()).toMatchObject({
      as: "h3",
      content: "Raise Dead",
      size: "large",
      weight: "semibold",
      styles: { margin: 0 },
    });
  });

  test("should render a card with a body with the right structure", () => {
    const wrapper = shallow(<TradingCard {...mockCardProps} />);
    const body = wrapper.find("CardBody");
    const image = body.find("LazyImage");
    expect(image.props()).toMatchObject({
      src: "https://images.elderscrollslegends.io/cs/raise_dead.png",
      title: "Raise Dead",
    });
  });

  test("should render a card with a footer with the right structure", () => {
    const wrapper = shallow(<TradingCard {...mockCardProps} />);
    const footer = wrapper.find("CardFooter");

    const type = footer.find("Label").at(0);
    const setName = footer.find("Label").at(1);
    const subType = footer.find("Label").at(2);
    const text = footer.find("Text");

    expect(type.props()).toMatchObject({
      circular: true,
      content: "Action",
      color: "black",
      styles: {
        padding: "0.625rem",
        marginBottom: "0.3rem",
        fontSize: "0.65rem",
      },
      as: "span",
      imagePosition: "start",
      iconPosition: "end",
    });

    expect(setName.props()).toMatchObject({
      circular: true,
      content: "Core Set",
      color: "red",
      styles: {
        padding: "0.625rem",
        marginBottom: "0.3rem",
        fontSize: "0.65rem",
      },
      as: "span",
      imagePosition: "start",
      iconPosition: "end",
    });

    expect(subType.props()).toMatchObject({
      content: "Random",
      color: "pink",
      circular: true,
      styles: {
        padding: "0.625rem",
        marginBottom: "0.3rem",
        fontSize: "0.65rem",
      },
      as: "span",
      imagePosition: "start",
      iconPosition: "end",
    });

    expect(text.props()).toMatchObject({
      temporary: true,
      content: "Summon a random creature from each discard pile.",
      styles: { fontSize: "0.8rem" },
      as: "span",
    });
  });
});

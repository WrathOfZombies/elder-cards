import { shallow } from "enzyme";
import React from "react";

import { BaseCard } from "./base-card";

import type { IBaseCardProps } from "./base-card";

describe("Testing ElderCard", () => {
  let mockCardProps: IBaseCardProps;

  beforeEach(() => {
    mockCardProps = {
      name: "Adoring Fan",
      subtype: "Wood Elf",
      setName: "Core Set",
      text:
        "Prophecy, Guard. Last Gasp: Adoring Fan will return. Adoring Fan is immune to Silence.",
      imageUrl: "https://images.elderscrollslegends.io/cs/adoring_fan.png",
      id: "21909c205c443aa683d32133514db5cc3435f712",
      rarity: "Legendary",
    };
  });

  test("should render an accessible card that is elevated and centered", () => {
    const wrapper = shallow(<BaseCard {...mockCardProps} />);
    const card = wrapper.find("Card");
    expect(card.props()).toMatchObject({
      id: mockCardProps.id,
      "data-testid": mockCardProps.id,
      elevated: true,
      centered: true,
      "aria-roledescription": "card with avatar, image and action buttons",
    });
  });

  test("should render a card with a header with the right structure", () => {
    const wrapper = shallow(<BaseCard {...mockCardProps} />);

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
      content: mockCardProps.subtype,
      size: "small",
      as: "span",
    });
  });
});

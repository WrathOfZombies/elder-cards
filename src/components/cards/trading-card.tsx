import { ElderCard } from "apollo/schema";
import * as React from "react";

import { Card, Flex, Text, Animation } from "@fluentui/react-northstar";
import { Label } from "@fluentui/react-northstar/dist/es/components/Label/Label";

import { LazyImage } from "./lazy-image";

export const MAX_CARD_WIDTH = 300;
export const MAX_CARD_HEIGHT = 670;

/**
 * A helper that provides a color based on the rarity.
 * @param rarity The rarity of the card
 */
const getRarityColor = (rarity?: string) => {
  switch (rarity) {
    case "Legendary":
      return "rgba(252,239,180,1)";

    case "Epic":
      return "rgba(237,212,255,1)";

    case "Rare":
      return "rgba(192,201,252,1)";

    case "Common":
    default:
      return "rgba(226,226,226,1)";
  }
};

const labelStyles = {
  padding: "0.625rem",
  marginBottom: "0.3rem",
  fontSize: "0.65rem",
};

/**
 * Renders a trading card based on the sourced information
 */
export const TradingCard: React.FC<ElderCard> = React.memo(
  ({ id, type, imageUrl, name, subtypes, setname, text, rarity }) => (
    <Animation name="slideUpEnterNormal">
      <Card
        id={id}
        data-testid={id}
        elevated
        centered
        tabIndex={0}
        role="articlenN"
        aria-label={`${name}, ${text}`}
        styles={{
          background: `radial-gradient(circle, rgba(255,255,255,1) 40%, ${getRarityColor(
            rarity
          )} 100%)`,
        }}
      >
        <Card.Header>
          <Text
            as="h3"
            content={name}
            size="large"
            weight="semibold"
            styles={{ margin: 0 }}
          />
        </Card.Header>
        <Card.Body>
          <LazyImage src={imageUrl} title={name} />
        </Card.Body>
        <Card.Footer>
          <Flex column gap="gap.small" hAlign="center">
            <Flex gap="gap.small" styles={{ flexWrap: "wrap" }} vAlign="center">
              <Label
                key="setname"
                circular
                content={type}
                color="black"
                styles={labelStyles}
              />
              <Label
                key="setname"
                circular
                content={setname}
                color="red"
                styles={labelStyles}
              />
              {subtypes.map(subtype => (
                <Label
                  key={subtype}
                  content={subtype}
                  color="pink"
                  circular
                  styles={labelStyles}
                />
              ))}
            </Flex>
            <Text temporary content={text} styles={{ fontSize: "0.8rem" }} />
          </Flex>
        </Card.Footer>
      </Card>
    </Animation>
  )
);

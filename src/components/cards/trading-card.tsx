import { ElderCard } from "apollo/schema";
import * as React from "react";
import { Card, Flex, Text, Animation, Label } from "@fluentui/react-northstar";

import { useIsDarkTheme } from "components/theme/theme-provider";

import { LazyImage } from "./lazy-image";

export const MAX_CARD_WIDTH = 300;
export const MAX_CARD_HEIGHT = 670;

/**
 * A helper that provides a color based on the rarity.
 * @param rarity The rarity of the card
 */
const getRarityColor = (rarity?: string, darkTheme = false) => {
  switch (rarity) {
    case "Legendary":
      return darkTheme ? "rgba(154,132,33,1)" : "rgba(252,239,180,1)";

    case "Epic":
      return darkTheme ? "rgba(124,65,168,1)" : "rgba(237,212,255,1)";

    case "Rare":
      return darkTheme ? "rgba(100,113,190,1)" : "rgba(192,201,252,1)";

    case "Common":
    default:
      return darkTheme ? "rgba(97,97,97,1)" : "rgba(226,226,226,1)";
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
        aria-label={`${name}, A ${rarity} ${type} card of the set ${setname}. ${text}`}
        styles={{
          background: `radial-gradient(circle, rgba(0,0,0,0) 30%, ${getRarityColor(
            rarity,
            useIsDarkTheme()
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

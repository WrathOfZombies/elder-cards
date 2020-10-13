import { ElderCard } from "apollo/schema";
import * as React from "react";

import { Card, Flex, Image, Text } from "@fluentui/react-northstar";
import { Label } from "@fluentui/react-northstar/dist/es/components/Label/Label";

export const MAX_CARD_WIDTH = 300;
export const MAX_CARD_HEIGHT = 670;

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

export const BaseCard: React.FC<ElderCard> = React.memo(
  ({ id, imageUrl, name, subtypes, setname, text, rarity }) => (
    <Card
      id={id}
      data-testid={id}
      elevated
      centered
      aria-roledescription="card with avatar, image and action buttons"
      styles={{
        background: `radial-gradient(circle, rgba(255,255,255,1) 40%, ${getRarityColor(
          rarity
        )} 100%)`,
      }}
    >
      <Card.Header>
        <Flex gap="gap.small" column hAlign="center">
          <Text content={name} size="large" weight="semibold" />
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small" hAlign="center">
          <Image width="100%" src={imageUrl} />
        </Flex>
      </Card.Body>
      <Card.Footer>
        <Flex column gap="gap.small" hAlign="center">
          <Flex gap="gap.small" styles={{ flexWrap: "wrap" }}>
            <Label
              key="setname"
              circular
              content={setname}
              color="pink"
              styles={{ padding: "0.6rem" }}
            />
            {subtypes.map(subtype => (
              <Label
                key={subtype}
                content={subtype}
                circular
                styles={{ padding: "0.6rem" }}
              />
            ))}
          </Flex>
          <Text temporary content={text} />
        </Flex>
      </Card.Footer>
    </Card>
  )
);

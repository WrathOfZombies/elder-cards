import { ElderCard } from "data/elder-scrolls-legends.interface";
import * as React from "react";

import { Card, Flex, Image, Text } from "@fluentui/react-northstar";
import { Label } from "@fluentui/react-northstar/dist/es/components/Label/Label";

export const MAX_CARD_WIDTH = 300;
export const MAX_CARD_HEIGHT = 670;

const getRarityColor = (rarity?: string) => {
  switch (rarity) {
    case "Legendary":
      return "#fcefb4";

    case "Epic":
      return "#f6e9ff";

    case "Rare":
      return "#c0c9fc";

    case "Common":
    default:
      return;
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
      styles={{ backgroundColor: getRarityColor(rarity) }}
    >
      <Card.Header>
        <Flex gap="gap.small" column hAlign="center">
          <Text content={name} size="medium" weight="bold" />
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex column gap="gap.small" hAlign="center">
          <Image width="100%" src={imageUrl} />
        </Flex>
      </Card.Body>
      <Card.Footer>
        <Flex column gap="gap.small" hAlign="center">
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
              color="red"
              styles={{ padding: "0.6rem" }}
            />
          ))}
          <Text temporary content={text} />
        </Flex>
      </Card.Footer>
    </Card>
  )
);

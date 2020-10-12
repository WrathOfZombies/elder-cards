import { IElderCard } from "data/elder-scrolls-legends.interface";
import * as React from "react";

import { Card, Flex, Image, Text } from "@fluentui/react-northstar";

export const BaseCard: React.FC<IElderCard> = ({
  id,
  imageUrl,
  name,
  subtypes,
  setname,
  text,
  rarity,
}) => (
  <Card
    id={id}
    data-testid={id}
    elevated
    centered
    aria-roledescription="card with avatar, image and action buttons"
  >
    <Card.Header>
      <Flex gap="gap.small" column hAlign="center">
        <Text content={name} size="medium" weight="bold" />
        {subtypes.map(subtype => (
          <Text key={subtype} content={subtype} size="small" />
        ))}
      </Flex>
    </Card.Header>
    <Card.Body>
      <Flex column gap="gap.small">
        <Image width="100%" src={imageUrl} />
        <Text temporary content={text} />
        <Text size="small" content={setname} />
        <Text content={rarity} size="small" />
      </Flex>
    </Card.Body>
  </Card>
);

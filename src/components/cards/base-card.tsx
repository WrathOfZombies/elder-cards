import * as React from "react";

import { Image, Card, Flex, Text } from "@fluentui/react-northstar";

export interface IBaseCardProps {
  id: string;
  imageUrl: string;
  name: string;
  setName: "Core Set";
  subtype: string;
  text: string;
  rarity: string;
}

export const BaseCard: React.FC<IBaseCardProps> = ({
  id,
  imageUrl,
  name,
  subtype,
  setName,
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
        <Text content={subtype} size="small" />
      </Flex>
    </Card.Header>
    <Card.Body>
      <Flex column gap="gap.small">
        <Image width="100%" src={imageUrl} />
        <Text temporary content={text} />
        <Text size="small" content={setName} />
        <Text content={rarity} size="small" />
      </Flex>
    </Card.Body>
  </Card>
);

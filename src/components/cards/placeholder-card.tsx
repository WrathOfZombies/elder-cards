import * as React from "react";

import { Box, Card, Animation } from "@fluentui/react-northstar";
import { LazyImage } from "./lazy-image";

export const PlaceholderCard: React.FC = React.memo(() => (
  <Animation name="slideUpEnterNormal">
    <Card
      data-testid="placeholder"
      elevated
      centered
      aria-roledescription="card indidating a loading placeholder"
      styles={{
        background:
          "radial-gradient(circle, rgba(255,255,255,1) 40%, rgba(226,226,226,1) 100%)",
      }}
    >
      <Card.Header>
        <Box
          styles={{
            height: "1.5rem",
            width: "10rem",
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "0.8rem",
          }}
        ></Box>
      </Card.Header>
      <Card.Body>
        <LazyImage />
      </Card.Body>
      <Box
        styles={{
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "0.8rem",
          height: "1.2rem",
          width: "4rem",
          alignSelf: "flex-start",
        }}
      ></Box>
      <Box
        styles={{
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "0.8rem",
          width: "15rem",
          height: "1rem",
          marginTop: "0.8rem",
          alignSelf: "flex-start",
        }}
      ></Box>
      <Box
        styles={{
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "0.8rem",
          width: "15rem",
          height: "1rem",
          marginTop: "0.8rem",
          alignSelf: "flex-start",
        }}
      ></Box>
    </Card>
  </Animation>
));

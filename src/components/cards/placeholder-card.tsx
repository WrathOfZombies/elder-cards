import * as React from "react";
import { Box, Card, Animation } from "@fluentui/react-northstar";

import { useIsDarkTheme } from "components/theme/theme-provider";

import { LazyImage } from "./lazy-image";

export const PlaceholderCard: React.FC = React.memo(() => {
  const darkTheme = useIsDarkTheme();

  const backgroundColor = darkTheme ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)";
  const background = darkTheme
    ? "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(80,80,80,1) 100%)"
    : "radial-gradient(circle, rgba(255,255,255,1) 40%, rgba(226,226,226,1) 100%)";

  return (
    <Animation name="slideUpEnterNormal">
      <Card
        data-testid="placeholder"
        elevated
        centered
        aria-roledescription="card indidating a loading placeholder"
        styles={{
          background,
        }}
      >
        <Card.Header>
          <Box
            styles={{
              height: "1.5rem",
              width: "10rem",
              backgroundColor,
              borderRadius: "0.8rem",
            }}
          ></Box>
        </Card.Header>
        <Card.Body>
          <LazyImage />
        </Card.Body>
        <Box
          styles={{
            backgroundColor,
            borderRadius: "0.8rem",
            height: "1.2rem",
            width: "4rem",
            marginTop: "0.8rem",
            alignSelf: "flex-start",
          }}
        ></Box>
        <Box
          styles={{
            backgroundColor,
            borderRadius: "0.8rem",
            width: "15rem",
            height: "1rem",
            marginTop: "0.8rem",
            alignSelf: "flex-start",
          }}
        ></Box>
        <Box
          styles={{
            backgroundColor,
            borderRadius: "0.8rem",
            width: "15rem",
            height: "1rem",
            marginTop: "0.8rem",
            alignSelf: "flex-start",
          }}
        ></Box>
      </Card>
    </Animation>
  );
});

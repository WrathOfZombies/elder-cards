import * as React from "react";
import Autosizer from "react-virtualized-auto-sizer";
import { Flex, Header, Box } from "@fluentui/react-northstar";

import { CardFetcher } from "components/card-fetcher/card-fetcher";
import { CardSearch } from "components/card-search/card-search";

import { CardGrid } from "./card-grid";

const baseFlexStyles = {
  height: "100%",
  alignItems: "center",
};

const headerFlexStyles = { width: "100%", padding: "1rem" };

const headerStyles = { margin: 0, fontSize: "1.2rem", marginRight: "0.625rem" };

const boxStyles = {
  width: "100%",
  height: "100%",
};

/**
 * Renders the base layout for the page and sets up a communication between
 * the {@see CardSearch} in the header and the {@see CardFetcher} components
 */
export const CardsLayout: React.FC = React.memo(() => {
  const [search, setSearch] = React.useState<string>();

  return (
    <Flex column styles={baseFlexStyles}>
      <Flex vAlign="center" styles={headerFlexStyles}>
        <Header as="h2" content="Legends" styles={headerStyles} />
        <CardSearch onSearch={setSearch} />
      </Flex>
      <Flex.Item grow>
        <Box
          styles={boxStyles}
          role="main"
          aria-label="Elder Srolls: Legends Card Grid"
        >
          <CardFetcher search={search}>
            {({ onItemsRendered, ref, cards, hasMore }) => (
              <Autosizer>
                {size => (
                  <CardGrid
                    {...size}
                    innerRef={ref}
                    items={cards}
                    hasMore={hasMore}
                    onItemsRendered={onItemsRendered}
                  />
                )}
              </Autosizer>
            )}
          </CardFetcher>
        </Box>
      </Flex.Item>
    </Flex>
  );
});

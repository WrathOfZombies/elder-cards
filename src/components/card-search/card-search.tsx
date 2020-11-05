import { debounce } from "lodash";
import * as React from "react";
import { InfoIcon, SearchIcon } from "@fluentui/react-icons-northstar";
import {
  Button,
  Flex,
  Header,
  Input,
  Popup,
  Text,
} from "@fluentui/react-northstar";

const exampleStyles = {
  outline: "none",
};

/**
 * Setups a debounced search box that triggers the onSearch callback when
 * the query string changes
 */
export const CardSearch: React.FC<{
  onSearch: (query: string) => void;
}> = React.memo(({ onSearch }) => {
  /**
   * Setup a debounced onChange listener
   * TODO: We can implement a string parser here to support some
   * advanced search syntax
   */
  const onChange = React.useCallback(
    debounce(
      (_, args) => {
        let query = args?.value;
        const containsQuery = /[,|]/g.test(query);
        if (containsQuery) {
          query = trimTerms(query);
        }
        onSearch(query);
      },
      150,
      {
        leading: false,
        trailing: true,
        maxWait: 1000,
      }
    ),
    [onSearch]
  );

  /**
   * Cancel the debounce when onChange changes
   */
  React.useEffect(() => () => onChange.cancel(), [onChange]);

  return (
    <>
      <Input
        fluid
        clearable
        role="search"
        icon={<SearchIcon outline title="Search" aria-label="Search button" />}
        aria-label="Search cards by name"
        placeholder="Search cards by name"
        onChange={onChange}
      />
      <Popup
        trapFocus
        trigger={
          <Button
            content={<InfoIcon outline aria-label="Examples button" />}
            text
            iconOnly
          />
        }
        content={popupContent}
        on={["click", "focus"]}
      />
    </>
  );
});

const popupContent = (
  <Flex column role="alert">
    <Header as="h5" content="Examples" styles={{ margin: "0.3rem 0" }} />
    <Text as="a" tabIndex={0} content="Raise Dead" styles={exampleStyles} />
    <Text as="a" tabIndex={0} content="Raise|Rift" styles={exampleStyles} />
    <Text as="a" tabIndex={0} content="Rihad,Battle" styles={exampleStyles} />
  </Flex>
);

const trimTerms = (query: string | undefined): string | undefined => {
  if (!query) {
    return query;
  }

  const delimiter = /[,]/g.test(query) ? "," : "|";

  return query
    .split(delimiter)
    .map(term => term.trim())
    .join(delimiter);
};

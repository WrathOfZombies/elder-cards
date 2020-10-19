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
    debounce((_, args) => onSearch(args?.value), 150, {
      leading: false,
      trailing: true,
      maxWait: 1000,
    }),
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
        autoFocus={false}
        trapFocus={false}
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

// TODO: It would be good to implement aria-live to announce the examples
const popupContent = (
  <Flex column role="alert">
    <Header as="h5" content="Examples" styles={{ margin: "0.3rem 0" }} />
    <Text content="Raise Dead" />
    <Text content="Raise Dead | Rift Thane" />
    <Text content="Raise Dead , Rift Thane" />
  </Flex>
);

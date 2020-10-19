import * as React from "react";
import { Size } from "react-virtualized-auto-sizer";
import {
  FixedSizeGrid as Grid,
  FixedSizeGridProps,
  GridChildComponentProps,
} from "react-window";
import { Box, BoxProps } from "@fluentui/react-northstar";

import { ElderCard } from "apollo/schema";
import { OnItemsRendered } from "components/card-fetcher/card-fetcher";
import { TradingCard } from "components/cards/trading-card";
import { PlaceholderCard } from "components/cards/placeholder-card";
import { useMemoizedValue } from "utilities/use-memoized-value";

import { computeAvailableSpace } from "./compute-available-space";

/**
 * Props required by the CardGridComponent
 */
export interface CardGridProps extends Size {
  /**
   * A ref to allow the parent to control the component layout
   */
  innerRef: React.Ref<unknown>;

  /**
   * Items to be rendered
   */
  items: ReadonlyArray<ElderCard>;

  /**
   * An indicator to see if there are more items
   */
  hasMore: boolean;

  /**
   * Callback function to notify the infinite scroll that more data is needed
   */
  onItemsRendered: OnItemsRendered;
}

interface ICardGridData {
  hasMore: CardGridProps["hasMore"];
  items: CardGridProps["items"];
  columnCount: number;
  gutterSize: number;
}

type GridChildComponentPropsWithData = GridChildComponentProps & {
  data: ICardGridData;
};

export const CardGrid: React.FC<CardGridProps> = React.memo(props => {
  const { items, hasMore, innerRef, onItemsRendered, height, width } = props;
  const itemCount = items.length;

  // Determine the available space so that we can distribute it
  // into the right number of rows and columns
  const availableSpace = React.useMemo(
    () =>
      computeAvailableSpace({
        height,
        width,
        itemCount,
      }),
    [height, width, itemCount]
  );

  const { columnCount, gutterSize } = availableSpace;

  // Construct a dataset that can be sent to every cell
  const itemData = useMemoizedValue<ICardGridData>({
    items,
    columnCount,
    gutterSize,
    hasMore,
  });

  // We need to inform the inifinite scroll on how to fetch the next batch
  // of data. Given that Autosizer reports row and column incides but infinite
  // scroll library only supports lists of data, we need to convert the row, column
  // position to the position of the item in a linear list
  const onItemsRenderedCallback: FixedSizeGridProps["onItemsRendered"] = React.useCallback(
    ({
      visibleRowStartIndex,
      visibleRowStopIndex,
      visibleColumnStartIndex,
      visibleColumnStopIndex,
    }) => {
      const visibleStartIndex =
        visibleRowStartIndex * columnCount + visibleColumnStartIndex;

      const visibleStopIndex =
        visibleRowStopIndex * columnCount + visibleColumnStopIndex;

      onItemsRendered({
        visibleStartIndex,
        visibleStopIndex,
        overscanStartIndex: visibleStartIndex + 1,
        overscanStopIndex: visibleStopIndex + 1,
      });
    },
    [columnCount, onItemsRendered]
  );

  return (
    <Grid
      {...availableSpace}
      ref={(innerRef as unknown) as React.RefObject<Grid>}
      itemData={itemData}
      innerElementType={InnerElement}
      onItemsRendered={onItemsRenderedCallback}
      children={Cell}
    />
  );
});

/**
 * Renders a item wrapper that either renders a placeholder or the real card associated
 * with the item at that cell.
 */
const Cell: React.FC<GridChildComponentPropsWithData> = React.memo(
  ({ columnIndex, rowIndex, style, data }) => {
    const { items, columnCount, gutterSize, hasMore } = data as ICardGridData;

    // From the row and column index, figure out the itemIndex
    const itemIndex = rowIndex * columnCount + columnIndex;
    const item = items[itemIndex];

    /**
     * Add some space to the left of the card.
     * This is typically gutterSize / 2 to simulate the
     * space around effect
     */
    const leftWithGutter: number =
      (parseInt(style.left?.toString() ?? "0") || 0) + gutterSize / 2;

    const cardWrapperStyles = {
      ...style,
      left: leftWithGutter,
      display: "flex",
      justifyContent: "center",
      padding: "0.625rem",
    };

    const props = {
      role: "gridcell",
      "aria-rowindex": columnCount,
      "aria-colindex": columnIndex,
      style: cardWrapperStyles,
      "data-testid": `cell-${rowIndex}-${columnIndex}`,
      key: `cell-${rowIndex}-${columnIndex}`,
    };

    // If the item is defined then render it
    if (item) {
      return <Box {...props} content={<TradingCard {...item} />} />;
    }

    // If there's more items to be loaded
    // render a placeholder card. else just return null
    if (hasMore) {
      return <Box {...props} content={<PlaceholderCard />} />;
    }

    return null;
  }
);

/**
 * A wrapping component that helps ensure that the styles are passed down
 * the component tree correctly. It's better to not fix native DOM elements with
 * styled components
 */
const InnerElement = React.forwardRef<
  HTMLDivElement,
  BoxProps & { style?: React.CSSProperties }
>(({ style, ...rest }, ref) => (
  <Box ref={ref} style={style} role="grid" {...rest} />
));

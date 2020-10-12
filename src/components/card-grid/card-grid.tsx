import * as React from "react";
import {
  FixedSizeGrid as Grid,
  FixedSizeGridProps,
  GridChildComponentProps,
} from "react-window";
import { Box } from "@fluentui/react-northstar";

import { useMemoizedValue } from "utilities/use-memoized-value";

import { IAvailableSpace } from "./compute-available-space";

import type { ElderCard } from "apollo/schema";
export interface ICardGridProps extends IAvailableSpace {
  innerRef: React.Ref<any>;
  items: ElderCard[];
  itemCount: number;
  itemRenderer: (item: ElderCard, index: number) => React.ReactElement | null;
  onItemsRendered: FixedSizeGridProps["onItemsRendered"];
}

interface ICardGridData {
  itemRenderer: ICardGridProps["itemRenderer"];
  items: ICardGridProps["items"];
  columnCount: number;
  gutterSize: number;
}

type GridChildComponentPropsWithData = GridChildComponentProps & {
  data: ICardGridData;
};

export const CardGridItem: React.FC<GridChildComponentPropsWithData> = ({
  columnIndex,
  rowIndex,
  style,
  data,
}) => {
  const {
    itemRenderer,
    items,
    columnCount,
    gutterSize,
  } = data as ICardGridData;

  // From the row and column index, figure out the itemIndex
  const itemIndex = rowIndex * columnCount + columnIndex;
  const item = items[itemIndex];

  /**
   * Add some space to the left of the card.
   * This is typically gutterSize / 2 to simulate the
   * space around effect
   */
  const leftWithGutter: number =
    parseInt(style.left?.toString() ?? "0") + gutterSize / 2;

  return item ? (
    <Box
      role="cell"
      style={{
        ...style,
        left: leftWithGutter,
        display: "flex",
        justifyContent: "center",
      }}
      data-testid={`item-${item.id}`}
      key={item.id}
    >
      {itemRenderer(item, itemIndex)}
    </Box>
  ) : null;
};

export const CardGrid: React.FC<ICardGridProps> = React.memo(props => {
  const { itemRenderer, items, innerRef, ...gridProps } = props;
  const { columnCount, gutterSize } = gridProps;

  const itemData = useMemoizedValue<ICardGridData>({
    items,
    itemRenderer,
    columnCount,
    gutterSize,
  });

  return (
    <Grid {...gridProps} ref={innerRef} itemData={itemData}>
      {CardGridItem}
    </Grid>
  );
});

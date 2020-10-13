import * as React from "react";
import {
  FixedSizeGrid as Grid,
  FixedSizeGridProps,
  GridChildComponentProps,
} from "react-window";
import { Box } from "@fluentui/react-northstar";

import { useMemoizedValue } from "utilities/use-memoized-value";

import { AvailableSpace } from "./compute-available-space";
import { ElderCard } from "data/elder-scrolls-legends.interface";

export interface CardGridProps extends AvailableSpace {
  innerRef: React.Ref<any>;
  items: ReadonlyArray<ElderCard>;
  itemCount: number;
  itemRenderer: (item: ElderCard, index: number) => React.ReactElement | null;
  onItemsRendered: FixedSizeGridProps["onItemsRendered"];
}

interface ICardGridData {
  itemRenderer: CardGridProps["itemRenderer"];
  items: CardGridProps["items"];
  columnCount: number;
  gutterSize: number;
}

type GridChildComponentPropsWithData = GridChildComponentProps & {
  data: ICardGridData;
};

export const CardGridItem: React.FC<GridChildComponentPropsWithData> = React.memo(
  ({ columnIndex, rowIndex, style, data }) => {
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
      (parseInt(style.left?.toString() ?? "0") || 0) + gutterSize / 2;

    return item ? (
      <Box
        role="cell"
        style={{
          ...style,
          left: leftWithGutter,
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
        data-testid={`item-${item.id}`}
        key={item.id}
      >
        {itemRenderer(item, itemIndex)}
      </Box>
    ) : null;
  }
);

const InnerElement = React.forwardRef<any, any>(({ style, ...rest }, ref) => (
  <Box ref={ref} style={style} {...rest} />
));

export const CardGrid: React.FC<CardGridProps> = React.memo(props => {
  const { itemRenderer, items, innerRef, ...gridProps } = props;
  const { columnCount, gutterSize } = gridProps;

  const itemData = useMemoizedValue<ICardGridData>({
    items,
    itemRenderer,
    columnCount,
    gutterSize,
  });

  return (
    <Grid
      {...gridProps}
      ref={innerRef}
      itemData={itemData}
      innerElementType={InnerElement}
    >
      {CardGridItem}
    </Grid>
  );
});

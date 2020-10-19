import { Size } from "react-virtualized-auto-sizer";
import { FixedSizeGridProps } from "react-window";

import { MAX_CARD_HEIGHT, MAX_CARD_WIDTH } from "components/cards/trading-card";

const MIN_ROW_OR_COLUMN = 1;

export interface AvailableSpace extends Omit<FixedSizeGridProps, "children"> {
  columnCount: number;
  gutterSize: number;
}

/**
 * Compute the rows, columns and other properties based off of {@see Size} from the Autosize component.
 * This way we can limit the number of times the child re-renders as we only pass in, infrequently changing
 * primitives that can be memoized.
 * @returns An object of type {@see AvailableSpace}
 */
export const computeAvailableSpace = ({
  itemCount,
  width,
  height,
}: Size & { itemCount: number }): AvailableSpace => {
  // Divide the available width into columns
  // NO_OF_COLUMNS = AVAILABLE_WIDTH / ITEM_WIDTH
  // NO_OF_ROWS = ITEMS_COUNT / COLUMNS;
  const columnCount =
    Math.floor(width / MAX_CARD_WIDTH) ||
    MIN_ROW_OR_COLUMN; /* Min number of columns */

  const rowCount =
    Math.ceil(itemCount / columnCount) ||
    MIN_ROW_OR_COLUMN; /* Min number of rows */

  const renderedWidth = columnCount * MAX_CARD_WIDTH;

  // The gutter spacing can be calculated as:
  // GUTTER_SIZE = ((AVAILABLE_SPACE - MAX_SPACE_TAKEN_BY_COLMNS) / (TOTAL_COLUMS - 1)) / 2
  //
  // We add half the gutter size to create a "space around" effect
  // where the remaining available width in the UI is distributed among the items
  // horizontally
  // if availableSpace < renderedSpace (the case where there's no space for even 1 column) then gutters are 0
  const gutterSize =
    width > renderedWidth
      ? Math.abs((width - renderedWidth - 20) / (columnCount + 1))
      : 0;

  const columnWidth = MAX_CARD_WIDTH + gutterSize;
  const rowHeight = MAX_CARD_HEIGHT;

  return {
    width,
    height,
    rowCount,
    columnCount,
    columnWidth,
    rowHeight,
    gutterSize,
  };
};

import { Size } from "react-virtualized-auto-sizer";
import { FixedSizeGridProps } from "react-window";

const MIN_ROW_OR_COLUMN = 1;
const ITEM_WIDTH = 300;
const ITEM_HEIGHT = 650;
const WINDOWS_SCROLLBAR = 20;

export interface IAvailableSpace extends Omit<FixedSizeGridProps, "children"> {
  columnCount: number;
  gutterSize: number;
}

/**
 * Compute the rows, columns and other properties based off of {@see Size} from the Autosize component.
 * This way we can limit the number of times the child re-renders as we only pass in, infrequently changing
 * primitives that can be memoized.
 * @returns An object of type {@see ISpaceDetectorProps}
 */
export const computeAvailableSpace = ({
  itemCount,
  width,
  height,
}: Size & { itemCount: number }): IAvailableSpace => {
  // Divide the available width into columns
  // NO_OF_COLUMNS = AVAILABLE_WIDTH / ITEM_WIDTH
  // NO_OF_ROWS = ITEMS_COUNT / COLUMNS;
  const columnCount =
    Math.floor(width / ITEM_WIDTH) ||
    MIN_ROW_OR_COLUMN; /* Min number of columns */

  const rowCount =
    Math.ceil(itemCount / columnCount) ||
    MIN_ROW_OR_COLUMN; /* Min number of rows */

  const renderedWidth = columnCount * ITEM_WIDTH;
  const renderedHeight = rowCount * ITEM_HEIGHT;

  // The gutter spacing can be calculated as:
  // GUTTER_SIZE = ((AVAILABLE_SPACE - MAX_SPACE_TAKEN_BY_COLMNS) / (TOTAL_COLUMS - 1)) / 2
  //
  // We add half the gutter size to create a "space around" effect
  // where the remaining available width in the UI is distributed among the items
  // horizontally
  // if availableSpace < renderedSpace (the case where there's no space for even 1 column) then gutters are 0
  const gutterSize =
    width > renderedWidth
      ? Math.abs(
          (width - renderedWidth - WINDOWS_SCROLLBAR) / (columnCount + 1)
        )
      : 0;
  // const gutterSize = 0;

  const columnWidth = ITEM_WIDTH + gutterSize;
  const rowHeight = ITEM_HEIGHT;

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

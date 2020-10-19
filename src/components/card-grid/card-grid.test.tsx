import * as React from "react";
import { shallow } from "enzyme";
import { useMemoizedValue } from "utilities/use-memoized-value";

import { CardGrid, CardGridProps } from "./card-grid";
import { computeAvailableSpace } from "./compute-available-space";

jest.mock("utilities/use-memoized-value", () => ({
  useMemoizedValue: jest.fn(value => value),
}));

jest.mock("./compute-available-space");

describe("Testing CardGridRenderer", () => {
  const generateMockProps = (
    overrides: Partial<CardGridProps> = {}
  ): CardGridProps => ({
    ...(overrides as CardGridProps),
    items: ([1, 2, 3, 4, 5] as unknown) as never,
    height: 200,
    width: 200,
    onItemsRendered: jest.fn(),
    innerRef: ({} as unknown) as never,
  });

  beforeEach(() => {
    (computeAvailableSpace as jest.Mock).mockReturnValue({
      width: 1024,
      height: 768,
      rowCount: 2,
      columnCount: 2,
      columnWidth: 200,
      rowHeight: 200,
      gutterSize: 10,
    });
  });

  test("should render a grid with the right set of props", () => {
    const props = generateMockProps();
    const wrapper = shallow(<CardGrid {...props} />);
    const grid = wrapper.find("Grid");

    expect(grid.props()).toMatchObject({
      columnCount: 2,
      rowCount: 2,
      columnWidth: 100,
      rowHeight: 100,
      gutterSize: 10,
      itemCount: 5,
      height: 200,
      width: 200,
      onItemsRendered: expect.anything(),
      itemData: expect.objectContaining({
        items: expect.arrayContaining([1, 2, 3, 4, 5]),
        itemRenderer: expect.anything(),
        columnCount: 2,
        gutterSize: 10,
      }),
      children: expect.anything(),
      direction: "ltr",
      useIsScrolling: false,
    });
  });

  test("should memoize the item data", () => {
    const props = generateMockProps();
    shallow(<CardGrid {...props} />);

    expect(useMemoizedValue).toHaveBeenCalledWith({
      columnCount: 2,
      gutterSize: 10,
      itemRenderer: expect.anything(),
      items: expect.arrayContaining([1, 2, 3, 4, 5]),
    });
  });

  test("should render a grid item with the right set of props", () => {
    const props = generateMockProps();
    const wrapper = shallow(<CardGrid {...props} />);
    const grid = wrapper.find("Grid");
    const gridItem = (grid.prop("children") as unknown) as jest.Mock;

    const firstCall = (useMemoizedValue as jest.Mock).mock.calls[0][0];

    const mockGridItemProps = {
      style: { someStyle: "someStyleValue" },
      rowIndex: 0,
      columnIndex: 0,
      data: firstCall,
    };

    const item = gridItem(mockGridItemProps);
    const itemWrapper = shallow(item);

    expect(itemWrapper.props()).toMatchObject({
      className: "ui-box",
      role: "cell",
      style: expect.objectContaining({
        someStyle: "someStyleValue",
        left: 5,
        display: "flex",
        justifyContent: "center",
      }),
      "data-testid": "item-undefined",
      "data-uses-unhanded-props": true,
      onKeyDown: undefined,
      children: undefined,
    });
  });

  test("should not render a grid item if the item isn't defined", () => {
    const props = generateMockProps({ items: [] });
    const wrapper = shallow(<CardGrid {...props} />);
    const grid = wrapper.find("Grid");
    const gridItem = (grid.prop("children") as unknown) as jest.Mock;

    const mockGridItemProps = {
      style: { someStyle: "someStyleValue", left: "100" },
      rowIndex: 0,
      columnIndex: 0,
      data: {
        items: [],
      },
    };

    const item = gridItem(mockGridItemProps);
    expect(item).toBeNull();
  });
});

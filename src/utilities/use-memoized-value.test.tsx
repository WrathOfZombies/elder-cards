import * as React from "react";
import { shallow } from "enzyme";
import { useMemoizedValue } from "./use-memoized-value";

const MockComponent = ({
  value,
  isValueSame,
  checkResult,
}: {
  value: { a: unknown; b: unknown };
  isValueSame?: jest.Mock;
  checkResult: jest.Mock;
}) => {
  const result = useMemoizedValue(value, isValueSame);
  checkResult(result);
  return null;
};

describe("Testing useMemoizedValue", () => {
  test("should update the component", () => {
    const checkResult = jest.fn();
    const wrapper = shallow(
      <MockComponent
        checkResult={checkResult}
        value={{ a: 1, b: { c: 1, d: 2 } }}
      />
    );
    wrapper.setProps({ value: { a: 1, b: { c: 3, d: 4 } } });
    wrapper.update();
    expect(checkResult).toHaveBeenCalledWith(
      expect.objectContaining({ a: 1, b: { c: 3, d: 4 } })
    );
  });

  test("should not update the component", () => {
    const b = { c: 1, d: 2 };
    const checkResult = jest.fn();
    const wrapper = shallow(
      <MockComponent checkResult={checkResult} value={{ a: 1, b }} />
    );
    wrapper.setProps({ value: { a: 1, b } });
    wrapper.update();
    expect(checkResult).toHaveBeenCalledWith(
      expect.objectContaining({ a: 1, b: { c: 1, d: 2 } })
    );
  });

  test("should update the component when an observed segment changes", () => {
    const checkResult = jest.fn();
    const wrapper = shallow(
      <MockComponent
        checkResult={checkResult}
        value={{ a: 1, b: { c: 1, d: 2 } }}
      />
    );
    wrapper.setProps({ value: { a: 1, b: { c: 3, d: 4 } } });
    wrapper.update();
    expect(checkResult).toHaveBeenCalledWith(
      expect.objectContaining({ a: 1, b: { c: 3, d: 4 } })
    );
  });

  test("should not update the component when an observed segment is the same", () => {
    const checkResult = jest.fn();
    const wrapper = shallow(
      <MockComponent
        checkResult={checkResult}
        value={{ a: 1, b: { c: 1, d: 2 } }}
      />
    );
    wrapper.setProps({ value: { a: 1, b: { c: 1, d: 2 } } });
    wrapper.update();
    expect(checkResult).toHaveBeenCalledWith(
      expect.objectContaining({ a: 1, b: { c: 1, d: 2 } })
    );
  });

  test("should not update the component when custom isValueSame returns true", () => {
    const checkResult = jest.fn();
    const wrapper = shallow(
      <MockComponent
        checkResult={checkResult}
        value={{ a: 1, b: { c: 1, d: 2 } }}
        isValueSame={jest.fn<unknown, []>().mockReturnValue(true)}
      />
    );
    wrapper.setProps({ value: { a: 1, b: { c: 3, d: 4 } } });
    wrapper.update();
    expect(checkResult).toHaveBeenCalledWith(
      expect.objectContaining({ a: 1, b: { c: 1, d: 2 } })
    );
  });

  test("should update the component when custom isValueSame returns false", () => {
    const checkResult = jest.fn();
    const wrapper = shallow(
      <MockComponent
        checkResult={checkResult}
        value={{ a: 1, b: { c: 1, d: 2 } }}
        isValueSame={jest.fn<unknown, []>().mockReturnValue(false)}
      />
    );
    wrapper.setProps({ value: { a: 1, b: { c: 3, d: 4 } } });
    wrapper.update();
    expect(checkResult).toHaveBeenCalledWith(
      expect.objectContaining({ a: 1, b: { c: 3, d: 4 } })
    );
  });
});

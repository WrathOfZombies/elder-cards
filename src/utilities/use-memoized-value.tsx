import { useRef } from "react";

import { shallowCompare } from "utilities/shallow-compare";

/**
 * `useMemoizedValue` will return a memoized version of the value that only changes if one of the `inputs`
 * has changed. It optionally also takes a `isValueSame` to support a custom comparision. By default it uses
 * `shallowCompare`
 * @param value The value to be memoized
 * @param isValueSame A comparision function to determine changes. Defaults to `shallowCompare`
 * @returns The memoized value if the new value is the same
 */
export const useMemoizedValue = <TValue,>(
  value: TValue,
  isValueSame: (oldValue: TValue, newValue: TValue) => boolean = shallowCompare
): TValue => {
  const memoizedValue = useRef<TValue>(value);
  if (!isValueSame(memoizedValue.current, value)) {
    memoizedValue.current = value;
  }
  return memoizedValue.current;
};

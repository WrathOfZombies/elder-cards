export function is<T>(left: T, right: T): boolean;
export function is(left: number, right: number): boolean;
export function is<T>(left: T | number, right: T | number): boolean {
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  if (left === right) {
    // If `left === right`, then differentiate `-0` and `0` via division.
    return left !== 0 || 1 / left === 1 / (right as number);
  } else {
    // If `left !== right`, then return false unless both `left` and `right` are `NaN`.
    // `NaN` can be detected via `self !== self`.
    // eslint-disable-next-line no-self-compare
    return left !== left && right !== right;
  }
}

/**
 * Performs equality of two objects by running through their immmediate keys.
 * The contents of the object for each key are compared under strict equality check.
 * @param source The source object
 * @param target The target object
 * @returns {boolean} Returns true if the objects are equal
 */
export const shallowCompare = <TItem extends unknown>(
  source: TItem | undefined | null,
  target: TItem | undefined | null
): boolean => {
  // Check if the objects are equal, if so then return
  if (is(source, target)) {
    return true;
  }

  // Given that the `is` comparision has failed, if either of the
  // inputs are null/undefined we have to assume they are different
  if (source == null || target == null) {
    return false;
  }

  // If the items are arrays then shallowCompare them with a different algo
  if (Array.isArray(source) && Array.isArray(target)) {
    return areArraysEqual(source, target);
  }

  // Assume they are objects and shallowCompare them
  return areObjectsEqual(source, target);
};

/**
 * Compares two arrays and returns true if they are same
 * @param source source array
 * @param target target array
 */
const areArraysEqual = <TArray extends unknown[]>(
  source: TArray,
  target: TArray
): boolean => {
  if (source.length !== target.length) {
    return false;
  }

  const length = source.length;
  for (let key = length - 1; key >= 0; key--) {
    if (!is(source[key], target[key])) {
      return false;
    }
  }

  return true;
};

/**
 * Compares two objects and returns true if they are same
 * @param source source object
 * @param target target object
 */
const areObjectsEqual = <TObject extends unknown>(
  source: TObject,
  target: TObject
): boolean => {
  const sourceKeys = Object.keys(
    source as Record<string, unknown>
  ) as (keyof TObject)[];
  const targetKeys = Object.keys(
    target as Record<string, unknown>
  ) as (keyof TObject)[];
  if (sourceKeys.length !== targetKeys.length) {
    return false;
  }

  for (const key of sourceKeys) {
    if (!is(source[key], target[key])) {
      return false;
    }
  }

  return true;
};

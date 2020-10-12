import { shallowCompare } from "./shallow-compare";

describe("Testing shallowCompare", () => {
  test("should return false if any of the objects are not defined", () => {
    expect(shallowCompare({}, undefined)).toBeFalsy();
    expect(shallowCompare(undefined, {})).toBeFalsy();
  });

  test("should return true if both of the objects are not defined", () => {
    expect(shallowCompare(null, null)).toBeTruthy();
    expect(shallowCompare(undefined, undefined)).toBeTruthy();
  });

  test("should return true if both of the objects are empty", () => {
    expect(shallowCompare({}, {})).toBeTruthy();
  });

  test("should return false if any of the objects are empty", () => {
    expect(shallowCompare({}, { a: 1 })).toBeFalsy();
    expect(shallowCompare({ b: 2 }, {})).toBeFalsy();
  });

  test("should return false if the objects have different properties", () => {
    expect(shallowCompare({ a: 1 }, { b: 2 })).toBeFalsy();
    expect(shallowCompare({ a: 1 }, { b: 2, a: 1 })).toBeFalsy();
    expect(shallowCompare({ a: 1, b: 2, c: 3 }, { b: 2, a: 1 })).toBeFalsy();
  });

  test("should return false if the object keys are different", () => {
    expect(shallowCompare({ a: 1 }, { b: 2 })).toBeFalsy();
  });

  test("should return false if the objects have same properties, but are inherited", () => {
    const A = { a: 1 };
    const AChild = Object.create(A);
    expect(shallowCompare(AChild, { a: 1 })).toBeFalsy();
  });

  test("should return false if shallow properties are same but values aren't strictly equal", () => {
    expect(
      shallowCompare({ a: 1, b: { b1: 1 } }, { a: 1, b: { b1: 1 } })
    ).toBeFalsy();
    expect(
      shallowCompare({ a: 1, b: ["b1", "b2"] }, { a: 1, b: ["b1", "b2"] })
    ).toBeFalsy();
  });

  test("should return true if the objects are same", () => {
    const A = { a: 1 };
    expect(shallowCompare(A, A)).toBeTruthy();
    expect(shallowCompare({ b: 2 }, { b: 2 })).toBeTruthy();
  });

  test("should return true if the objects have same properties and their values are strictly equal", () => {
    const C = ["c1", "c2", "c3"];
    const A = { a: 1, C };
    expect(shallowCompare(A, A)).toBeTruthy();
    expect(shallowCompare({ b: 2, C }, { b: 2, C })).toBeTruthy();
    expect(shallowCompare({ a: false }, { a: false })).toBeTruthy();
  });

  test("should return true if the objects have same properties and their values are empty", () => {
    expect(shallowCompare({ b: 2, a: {} }, { b: 2, a: {} })).toBeFalsy();
    expect(
      shallowCompare({ a: false, b: [] }, { a: false, b: [] })
    ).toBeFalsy();
  });

  test("should return true if the objects have NaN", () => {
    expect(shallowCompare({ a: NaN }, { a: NaN })).toBeTruthy();
  });

  test("should return false if the objects have boolean and their values are different", () => {
    expect(shallowCompare({ a: false }, { a: true })).toBeFalsy();
  });

  test("should return true for similar arrays", () => {
    expect(shallowCompare(["a", "b"], ["a", "b"])).toBeTruthy();
  });

  test("should return false for different arrays", () => {
    expect(shallowCompare(["a", "b", "c"], ["a", "b"])).toBeFalsy();
  });

  test("should return false for different ordered arrays", () => {
    expect(shallowCompare(["a", "b", "c"], ["a", "c", "b"])).toBeFalsy();
  });

  test("should return false for different arrays", () => {
    expect(shallowCompare(["d", "c"], ["a", "b"])).toBeFalsy();
  });
});

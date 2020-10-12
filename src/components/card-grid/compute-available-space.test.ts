import { computeAvailableSpace } from "./compute-available-space";

describe("Testing computeAvailableSpace", () => {
  const resolutions = [
    [240, 120],
    [360, 240],
    [640, 480],
    [1024, 720],
    [1280, 720],
    [1366, 768],
    [1920, 1080],
    [2560, 1440],
    [3820, 2160],
    [3440, 1440],
  ];

  const itemCounts = [0, 5, 43, 100];

  const cases = resolutions.flatMap(res =>
    itemCounts.map(items => [items, ...res])
  );

  test.each(cases)(
    "should compute the available space when itemCount is %p, width is %p and height is %p",
    (itemCount, width, height) => {
      const result = computeAvailableSpace({ itemCount, width, height });
      expect(result).toMatchSnapshot();
    }
  );
});

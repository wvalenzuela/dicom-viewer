// utils/flattenPixelArray.test.js
import { flattenPixelArray } from "./flattenPixelArray";

describe("flattenPixelArray", () => {
  it("correctly flattens a 2D pixel array into a 1D Float32Array", () => {
    const slice = {
      width: 2,
      height: 2,
      pixelData: [
        [1, 2],
        [3, 4],
      ],
    };

    const expected = new Float32Array([1, 2, 3, 4]);
    const result = flattenPixelArray(slice);

    expect(result).toEqual(expected);
  });
});

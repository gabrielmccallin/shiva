import { Resize } from '../src/Resize';

describe("RESIZE", function () {
  test("proportionalOutside", function () {
    const dimensions = Resize.proportionalOutside({
      width: 1000,
      height: 500
    },
      {
        width: 300,
        height: 250
      }
    );

    const expectedResult = {
      width: 500,
      height: 250
    };

    expect(dimensions).toEqual(expectedResult);
  });

  test("proportionalInside", function () {
    const dimensions = Resize.proportionalInside({
      width: 1200,
      height: 600
    },
      {
        width: 500,
        height: 200
      }
    );

    const expectedResult = {
      width: 400,
      height: 200
    };

    expect(dimensions).toEqual(expectedResult);
  });
});

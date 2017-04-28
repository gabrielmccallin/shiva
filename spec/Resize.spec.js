describe("RESIZE", function () {

  it("✔️ proportionalOutside", function () {
    var dimensions = shiva.Resize.proportionalOutside({
      width: 1000,
      height: 500
    },
      {
        width: 300,
        height: 250
      }
    );

    var expectedResult = {
      width: 500,
      height: 250
    };

    expect(dimensions).toEqual(expectedResult);
  });

  it("✔️ proportionalInside", function () {
    var dimensions = shiva.Resize.proportionalInside({
      width: 1200,
      height: 600
    },
      {
        width: 500,
        height: 200
      }
    );

    var expectedResult = {
      width: 400,
      height: 200
    };

    expect(dimensions).toEqual(expectedResult);
  });



});

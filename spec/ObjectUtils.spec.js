describe("OBJECTUTILS", function () {

  it("✔️ merge", function () {
    var date = new Date();
    
    var source = {
      riders: ["Rossi", "Marquez", "Lorenzo", "Vinales", "Dovizioso", date],
      sport: "MotoGP",
      champion: "Marquez",
      circuits: {
        netherlands: "assen",
        germany: "sachsenring",
        france: "le mans",
        uk: "silverstone",
        spain: {
          0: "catalunya",
          1: "jerez"
        },
      }
    };

    var targetDate = new Date("2012-08-12");
    var target = {
      riders: ["Rossi", "Marquez", "Lorenzo", "Vinales", "Zarco", targetDate],
      sport: "Dorma MotoGP",
      rounds: 20,
      circuits: {
        uk: "silversstone",
        spain: {
          0: "castalunya",
          1: "jerez",
          2: "valencia"
        },
        italy: "misano"
      }
    };

    var result = shiva.ObjectUtils.merge(target, source);

    var expectedResult = {
      riders: ["Rossi", "Marquez", "Lorenzo", "Vinales", "Dovizioso", date],
      sport: "MotoGP",
      rounds: 20,
      champion: "Marquez",
      circuits: {
        netherlands: "assen",
        germany: "sachsenring",
        france: "le mans",
        uk: "silverstone",
        spain: {
          0: "catalunya",
          1: "jerez",
          2: "valencia"
        },
        italy: "misano"
      }
    };

    expect(result).toEqual(expectedResult);
  });

});

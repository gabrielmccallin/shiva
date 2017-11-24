import { ObjectUtils } from '../src/ObjectUtils';

describe("OBJECTUTILS", function () {
  test("merge", function () {
    const date = new Date();

    const source = {
      riders: ["Rossi", "Marquez", "Lorenzo", "Vinales", "Dovizioso", date],
      compounds: [{
        "slick": ["soft", "medium", "hard"],
        "wet": ["supersoft", "hard"]
      }],
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

    const targetDate = new Date("2012-08-12");
    const target = {
      compounds: [{
        "slick": ["soft", "medium", "hard"],
        "wett": ["soft", "hard"]
      }],
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

    const result = ObjectUtils.merge(target, source);

    const expectedResult = {
      riders: ["Rossi", "Marquez", "Lorenzo", "Vinales", "Dovizioso", date],
      compounds: [{
        "slick": ["soft", "medium", "hard"],
        "wett": ["soft", "hard"],
        "wet": ["supersoft", "hard"]
      }],
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

  test("merge just properties", function () {
    const result = ObjectUtils.merge('hello', 'goodbye');
    expect(result).toEqual('goodbye');
  });

  test("merge arrays", function () {
    const target = ['hello', 'goodbye'];
    const source = ['really', 'hello', 'goodbye'];

    const result = ObjectUtils.merge(target, source);
    expect(result).toEqual(source);
  });

  test("merge booleans", function () {
    const result = ObjectUtils.merge(false, true);
    expect(result).toEqual(true);
  });

  test("merge different types", function () {
    const hello = {
      hello: 'hello'
    }
    let result = ObjectUtils.merge(false, hello);
    expect(result).toEqual(hello);

    result = ObjectUtils.merge(hello, false);
    expect(result).toEqual(false);

    result = ObjectUtils.merge(hello, {});
    expect(result).toEqual(hello);

    result = ObjectUtils.merge({}, hello);
    expect(result).toEqual(hello);
  });

});

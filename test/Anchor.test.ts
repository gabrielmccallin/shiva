import { Anchor } from '../src/Anchor';

describe("ANCHOR", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new Anchor({
        href: "http://hello.com/"
      });
      expect(container.href).toEqual("http://hello.com/");
    });

  });
});

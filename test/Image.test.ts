import { Image } from '../src/Image';

describe("IMAGE", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new Image({
      });
      expect(container.element.tagName).toEqual("IMG");
    });

    it("✔️ src correct", function () {
      var container = new Image({
        path: "assets/curly.png"
      });

      const element = <HTMLImageElement>container.element;
      expect(element.src).toEqual("assets/curly.png");
    });

  });
});

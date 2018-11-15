import { Image } from '../src/Image';

describe("IMAGE", function () {
  describe("constructor", function () {

    test("constructed", function () {
      const image = new Image({
      });
      expect(image.element.tagName).toEqual("IMG");
    });

    test("path correct", function () {
      const image = new Image({
        path: "assets/curly.png"
      });

      const element = <HTMLImageElement>image.element;
      expect(element.src).toEqual("http://localhost/assets/curly.png");
    });


    test("src correct", function () {
      const image = new Image({
        src: "assets/curly.png"
      });

      const element = <HTMLImageElement>image.element;
      expect(element.src).toEqual("http://localhost/assets/curly.png");
    });


    test("attributes", function () {
      const image = new Image({
        src: "assets/curly.png",
        attributes: {
          alt: "hello"
        }
      });

      const element = <HTMLImageElement>image.element;
      expect(element.getAttribute("alt")).toEqual("hello");
    });

  });
});

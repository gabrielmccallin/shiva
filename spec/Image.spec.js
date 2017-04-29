describe("IMAGE", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new shiva.Image({
      });
      expect(container.element.matches('img')).toBeTruthy();
    });

    it("✔️ src correct", function () {
      var container = new shiva.Image({
        path: "assets/curly.png"
      });
      expect(container.element.src).toEqual(window.location.protocol + "//" + window.location.host + "/" + "assets/curly.png");
    });

  });
});

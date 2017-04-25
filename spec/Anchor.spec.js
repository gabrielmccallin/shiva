describe("ANCHOR", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new shiva.Anchor({
        href: "http://hello.com/"
      });
      expect(container.href).toEqual("http://hello.com/");
    });

  });
});

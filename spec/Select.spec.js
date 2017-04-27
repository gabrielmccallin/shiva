describe("SELECT", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new shiva.Select({
        options: ["hello", "goodbye"]
      });

      expect(container.value).toEqual("hello");
    });

    it("✔️ get selected index", function () {
      var container = new shiva.Select({
        options: ["hello", "goodbye"]
      });

      expect(container.selectedIndex).toEqual(0);
    });



  });
});

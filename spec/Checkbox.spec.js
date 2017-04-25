describe("CHECKBOX", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new shiva.CheckBox({
        checked: true
      });
      expect(container.checked).toBeTruthy();
    });

  });
});

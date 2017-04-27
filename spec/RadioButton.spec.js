describe("RADIOBUTTON", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new shiva.RadioButton({
        checked: false
      });

      expect(container.checked).toBeFalsy();
    });

  });
});

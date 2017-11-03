import { CheckBox } from '../src/CheckBox';

describe("CHECKBOX", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new CheckBox({
        checked: true
      });
      expect(container.checked).toBeTruthy();
    });

  });
});

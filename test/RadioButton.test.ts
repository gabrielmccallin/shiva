import { RadioButton } from '../src/RadioButton';

describe("RADIOBUTTON", function () {
  describe("constructor", function () {

    test("constructed", function () {
      var container = new RadioButton({
        checked: false
      });

      expect(container.checked).toBeFalsy();
    });

  });
});

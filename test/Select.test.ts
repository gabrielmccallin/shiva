import { Select } from '../src/Select';

describe("SELECT", function () {
  describe("constructor", function () {

    test("constructed", function () {
      const container = new Select({
        options: [
          { value: "hello", text: "shiva" },
          { value: "goodbye", text: "shiva" }
        ]
      });

      const option = container.element.children.item(0);
      expect(option.innerHTML).toEqual("shiva");
    });

    test("get selected index", function () {
      const container = new Select({
        options: [
          { value: "hello", text: "shiva" },
          { value: "goodbye", text: "shiva" }
        ]
      });

      expect(container.selectedIndex).toEqual(0);
    });

    test("set selected index", function () {
      const container = new Select({
        options: [
          { value: "hello", text: "shiva" },
          { value: "goodbye", text: "shiva" }
        ]
      });
      container.selectedIndex = 1;

      expect(container.selectedIndex).toEqual(1);
    });

  });
});

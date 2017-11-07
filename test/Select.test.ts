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

      const option = container.element.firstChild;
      expect(option.textContent).toEqual("shiva");
    });
  });

  describe('Selected Index', () => {
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

  describe('Options', () => {
    test("get select options", function () {
      const options = [
        { value: "hello", text: "shiva" },
        { value: "goodbye", text: "shiva" }
      ];
      const container = new Select({
        options
      });

      expect(container.options).toEqual(options);
    });

    test("set select options", function () {
      const options = [
        { value: "hello", text: "shiva" },
        { value: "goodbye", text: "shiva" }
      ];
      const container = new Select({
        options: []
      });
      
      expect(container.element.children.length).toEqual(0);

      container.options = options;

      expect(container.element.children.length).toEqual(2);
      expect(container.element.firstChild.textContent).toBe('shiva');
    });
  });
});

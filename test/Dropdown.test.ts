import { DropDown } from '../src/DropDown';

describe("DROPDOWN", function () {
  describe("constructor", function () {

    it("constructed", function () { 
      const dropdown = new DropDown({
        options: ["hello", "goodbye", "stay here"],
        style: {
          button: {
            color: "white",
            backgroundColor: "blue"
          },
          item: {
            padding: "1em", 
            color: "yellow",
            backgroundColor: "green",
            width: "100%",
            hover: {
              backgroundColor: "green",
              color: "black",
              durationOut: 10,
              durationIn: 0
            }
          }
        },
        text: "hello",
        id: "dropdown-hello"
      });

      const button = <HTMLButtonElement>dropdown.element.children.item(0);
      expect(button.tagName).toEqual("BUTTON");
      expect(button.style.color).toEqual("white");
      expect(button.style.backgroundColor).toEqual("blue");

      const ul = <HTMLUListElement>dropdown.element.children.item(1);
      expect(ul.tagName).toEqual("UL");
      expect(ul.childElementCount).toEqual(3);

      const li = <HTMLLIElement>ul.children.item(0);
      expect(li.tagName).toEqual("LI");
      expect(li.style.padding).toEqual('1em');

    });

    it("click item in dropdown", function () {
      const dropdown = new DropDown({
        options: ["hello", "goodbye", "stay here"],
        text: "hello",
        id: "dropdown-hello"
      });

      dropdown.addEventListener(this, DropDown.CHANGE, function (e) {
        expect(e.data).toEqual("hello");
      });

      const ul = dropdown.element.children.item(1);
      const li = ul.children.item(0);

      li.dispatchEvent(new Event("mouseup"));

    });

    it("disable", function () {
      const container = new DropDown({
        options: ["hello", "there"],
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });

      const button = <HTMLButtonElement>container.element.children.item(0);

      container.disable();
      expect(button.style.cursor).toEqual('default');

    });

    it("enable", function () {
      const container = new DropDown({
        options: ["hello", "there"],
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });

      const button = <HTMLButtonElement>container.element.children.item(0);

      container.disable();
      container.enable();
      expect(button.style.cursor).toEqual('pointer');
    });

  });
});

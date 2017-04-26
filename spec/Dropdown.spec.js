describe("DROPDOWN", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var dropdown = new shiva.DropDown({
        options: ["hello", "goodbye", "stay here"],
        style: {
          button: {
            color: "white",
            backgroundColor: "blue"
          },
          item: {
            padding: "1rem",
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

      var button = dropdown.element.children.item(0);
      expect(button.matches("button")).toBeTruthy();
      expect(button.style.color).toEqual("white");
      expect(button.style.backgroundColor).toEqual("blue");

      var ul = dropdown.element.children.item(1);
      expect(ul.matches("ul")).toBeTruthy();
      expect(ul.childElementCount).toEqual(3);

      var li = ul.children.item(0);
      expect(li.matches("li")).toBeTruthy();
      expect(li.style.padding).toEqual('1rem');

    });

    it("✔️ click item in dropdown", function () {
      var dropdown = new shiva.DropDown({
        options: ["hello", "goodbye", "stay here"],
        text: "hello",
        id: "dropdown-hello"
      });

      dropdown.addEventListener(this, shiva.DropDown.CHANGE, function (e) {
        expect(e.data).toEqual("hello");
      });

      var ul = dropdown.element.children.item(1);
      var li = ul.children.item(0);

      li.dispatchEvent(new Event("mouseup"));

    });

    it("✔️ disable", function () {
      var container = new shiva.DropDown({
        options: ["hello", "there"],
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });

      var button = container.element.children.item(0);

      container.disable();
      expect(button.style.cursor).toEqual('default');
      // expect(button.onmouseup).toEqual('default');
      // expect(button.onmouseover).toEqual('default');

      // spyOn(button, 'over');


    });

    it("✔️ enable", function () {
      var container = new shiva.DropDown({
        options: ["hello", "there"],
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });

      var button = container.element.children.item(0);

      container.disable();
      container.enable();
      expect(button.style.cursor).toEqual('pointer');
    });

  });
});

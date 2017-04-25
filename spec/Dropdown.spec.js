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

      dropdown.addEventListener(this, shiva.DropDown.CHANGE, this.dropChange);

      // expect(container.href).toEqual("http://hello.com/");
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

  });
});

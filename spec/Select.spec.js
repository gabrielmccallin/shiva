describe("SELECT", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new shiva.Select({
        options: [
          {value:"hello", text:"shiva"}, 
          {value:"goodbye", text:"shiva"}
        ]
      });
      
      var option = container.element.children.item(0);
      expect(option.innerHTML).toEqual("shiva");
    });

    it("✔️ get selected index", function () {
      var container = new shiva.Select({
        options: [
          {value:"hello", text:"shiva"}, 
          {value:"goodbye", text:"shiva"}
        ]
      });

      expect(container.selectedIndex).toEqual(0);
    });

    it("✔️ set selected index", function () {
      var container = new shiva.Select({
        options: [
          {value:"hello", text:"shiva"}, 
          {value:"goodbye", text:"shiva"}
        ]
      });
      container.selectedIndex = 1;
 
      expect(container.selectedIndex).toEqual(1);
    });

  });
});

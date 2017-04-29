describe("PAGES", function () {
  describe("constructor", function () {

    it("✔️ constructed", function () {
      class home extends shiva.Container {
        constructor() {
          super({
            id: "home"
          });

          var title = new shiva.Container({
            text: "Home"
          });
          this.addChild(title);
        }
      }

      var container = new shiva.Pages({
        pages: {
          "/": home,
          "/contact": "contact"
        }
      });

      var page = container.element.children.item(0);
      // var li = ul.children.item(0);

      expect(page.id).toEqual('home');
      expect(page.style.position).toEqual('absolute');

      var title = page.children.item(0);
      expect(title.innerText).toEqual("Home");

    });

    it("✔️ page changed", function () {
      class home extends shiva.Container {
        constructor() {
          super({
            id: "home"
          });

          var title = new shiva.Container({
            text: "Home"
          });
          this.addChild(title);
        }
      }

      class contact extends shiva.Container {
        constructor() {
          super({
            id: "contact"
          });

          var title = new shiva.Container({
            text: "Contact"
          });
          this.addChild(title);
        }
      }

      var container = new shiva.Pages({
        routes: false,
        pages: {
          "/": home,
          "/contact": contact
        }
      });

      container.update("/contact");

      var page = container.element.children.item(0);
      expect(page.id).toEqual('contact');

      var title = page.children.item(0);
      expect(title.innerText).toEqual("Contact");

      container.update("/");

      var page = container.element.children.item(0);
      expect(page.id).toEqual('home');

      var title = page.children.item(0);
      expect(title.innerText).toEqual("Home");


    });


  });
});

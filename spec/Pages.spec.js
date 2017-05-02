describe("PAGES", function () {

  // inheritance helper
  var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };

  var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
      var _this = _super.call(this, {
        id: "Home"
      }) || this;
      var title = new shiva.Container({
        text: "Home",
      });
      _this.addChild(title);
      return _this;
    }
    return Home;
  }(shiva.Container));

  var Contact = (function (_super) {
    __extends(Contact, _super);
    function Contact() {
      var _this = _super.call(this, {
        id: "Contact"
      }) || this;
      var title = new shiva.Container({
        text: "Contact",
      });
      _this.addChild(title);
      return _this;
    }
    return Contact;
  }(shiva.Container));


  describe("constructor", function () {
    it("✔️ constructed", function () {

      var container = new shiva.Pages({
        pages: {
          "/": Home,
          "/contact": "contact"
        },
        routes: false
      });
      container.update("/");

      var page = container.element.children.item(0);
      expect(page.id).toEqual('Home');
      expect(page.style.position).toEqual('absolute');

      var title = page.children.item(0);
      expect(title.innerText).toEqual("Home");

    });

    it("✔️ page changed", function () {
      var container = new shiva.Pages({
        routes: false,
        pages: {
          "/": Home,
          "/contact": Contact
        }
      });

      container.update("/contact");

      var page = container.element.children.item(0);
      expect(page.id).toEqual('Contact');

      var title = page.children.item(0);
      expect(title.innerText).toEqual("Contact");

      container.update("/");

      var page = container.element.children.item(0);
      expect(page.id).toEqual('Home');

      var title = page.children.item(0);
      expect(title.innerText).toEqual("Home");


    });


  });
});

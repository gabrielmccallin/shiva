import { Pages } from '../src/Pages';
import { Container } from '../src/Container';

export class Home extends Container {
  constructor() {
    super({
      id: 'Home'
    });

    const title = new Container({
      text: 'Home'
    });
    this.addChild(title);
  }
}

export class Contact extends Container {
  constructor() {
    super({
      id: 'Contact'
    });

    const title = new Container({
      text: 'Contact'
    });
    this.addChild(title);
  
  }
}

describe("PAGES", function () {

  describe("constructor", function () {
    test("constructed", function () {

      const container = new Pages({
        pages: {
          "/": Home,
          "/contact": "contact"
        },
        routes: false
      });
      container.update("/");

      const page = <HTMLElement>container.element.children.item(0);
      expect(page.id).toEqual('Home');
      expect(page.style.position).toEqual('absolute');

      const title = <HTMLElement>page.children.item(0);
      expect(title.textContent).toEqual("Home");

    });

    test("page changed", function () {
      const pages = new Pages({
        routes: false,
        pages: {
          "/": Home,
          "/contact": Contact
        }
      });

      pages.update("/contact");

      let page = <HTMLElement>pages.element.children.item(0);
      expect(page.id).toEqual('Contact');

      let title = <HTMLElement>page.children.item(0);
      expect(title.textContent).toEqual("Contact");

      pages.update("/");

      page = <HTMLElement>pages.element.children.item(0);
      expect(page.id).toEqual('Home');

      title = <HTMLElement>page.children.item(0);
      expect(title.textContent).toEqual("Home");

    });
  });
});

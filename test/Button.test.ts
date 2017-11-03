import { Button } from '../src/Button';

jest.useFakeTimers();

describe("BUTTON", () => {
  describe("constructor", () => {

    it("constructed", () => {
      const container = new Button({

      });
      expect(container).toBeDefined();
    });

    it("html element created", () => {
      const container = new Button({

      });
      expect(container.element).toBeDefined();
    });

    it("id", () => {
      const container = new Button({
        id: "hello"
      });
      expect(container.id).toBe("hello");
    });

    it("type is button", () => {
      const container = new Button({
        type: "button"
      });
      expect(container.element.tagName).toEqual("BUTTON");
    });

    it("type is a if href in config object", () => {
      const container = new Button({
        href: "//hello.com"
      });
      expect(container.element.tagName).toEqual("A");
    });

    it("default style", () => {
      const container = new Button({
      });
      expect(container.element.style.whiteSpace).toEqual("nowrap");
      expect(container.element.style.msTouchAction).toEqual("manipulation");
      expect(container.element.style.touchAction).toEqual("manipulation");
      expect(container.element.style.cursor).toEqual("pointer");
      expect(container.element.style.webkitUserSelect).toEqual("none");
      expect(container.element.style.msUserSelect).toEqual("none");
      expect(container.element.style.userSelect).toEqual("none");
      expect(container.element.textContent).toEqual("Button");

      expect(container.styles.hover).toBeUndefined();
    });

    it("style", () => {
      const container = new Button({
        style: {
          color: "red",
          hover: {
            durationIn: 1
          }
        }
      });
      expect(container.element.style.color).toEqual("red");
      expect(container.styles.hover.durationIn).toEqual(1);
    });

    it("styles", () => {
      const container = new Button({
        styles: [
          {
            color: "blue",
            hover: {
              durationIn: 1
            }
          },
          {
            color: "red",
            hover: {
              durationIn: 10
            }
          }
        ]
      });
      expect(container.element.style.color).toEqual("red");
      expect(container.styles.hover.durationIn).toEqual(10);
    });

    it("text", () => {
      const container = new Button({
        text: "hello"
      });
      expect(container.element.textContent).toEqual("hello");
    });

    it("text empty string", () => {
      const container = new Button({
        text: ""
      });
      expect(container.element.textContent).toEqual("");
    });

    it("text default string", () => {
      const container = new Button({
      });
      expect(container.element.textContent).toEqual("Button");
    });

    it("data", () => {
      const data = { greeting: "hello" };
      const container = new Button({
        data: data
      });
      expect(container.data).toEqual(data);
    });

    it("className", () => {
      const className = "hello";
      const container = new Button({
        className: className
      });
      expect(container.element.className).toEqual(className);
    });

    it("classNames", () => {
      const classNames = ["hello", "goodbye"];
      const container = new Button({
        className: classNames
      });

      const classNamesString = classNames.reduce(function (acc, curr) {
        return acc + " " + curr;
      });
      expect(container.element.className).toEqual(classNamesString);
    });

  });

  describe("methods", () => {

    it("className", () => {
      const className = "hello";
      const container = new Button({
      });
      container.className(className);
      expect(container.element.className).toEqual(className);
    });

    it("classNames", () => {
      const container = new Button({
      });

      container.className("hello", "goodbye");
      expect(container.element.className).toEqual("hello goodbye");
    });


    it("styles set by the constructor and then overridden by style", () => {
      const container = new Button({
        styles: [
          {
            color: "blue",
            hover: {
              durationIn: 1
            }
          },
          {
            color: "orange",
            hover: {
              color: "black"
            }
          }
        ]
      });
      container.style({
        color: "red",
        hover: {
          durationIn: 10,
          color: "blue"
        }
      })
      expect(container.element.style.color).toEqual("red");
      expect(container.styles.hover.durationIn).toEqual(10);
      expect(container.styles.hover.color).toEqual("blue");
    });

    it("style", () => {
      const container = new Button({
      });
      container.style({
        color: "red",
        hover: {
          durationIn: 10,
          color: "blue"
        }
      });
      expect(container.element.style.color).toEqual("red");
      expect(container.styles.hover.color).toEqual("blue");
      expect(container.styles.hover.durationIn).toEqual(10);
    });

    it("over", () => {
      const container = new Button({
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });
      container.over();

      jest.runTimersToTime(10);

      expect(container.element.style.color).toEqual('red');
      expect(container.element.style.transition).toEqual('background-color 1s, color 1s');

    });


    it("out", () => {
      const container = new Button({
        style: {
          color: "blue",
          backgroundColor: "yellow",
          hover: {
            durationIn: 0,
            durationOut: 1,
            color: "red",
            backgroundColor: "green"
          }
        }
      });

      container.over();
      container.out();

      jest.runTimersToTime(10);

      expect(container.element.style.color).toEqual('blue');
      expect(container.element.style.backgroundColor).toEqual('yellow');
      expect(container.element.style.transition).toEqual('background-color 1s, color 1s');

    });

    it("click", () => {
      const container = new Button({});
      container.addEventListener(this, Button.CLICK, function (e) {
        expect(e.target.element.tagName).toEqual("BUTTON");
      });
      container.click(null);
    });


    it("disable", () => {
      const button = new Button({
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });

      button.disable();
      button.over();

      jest.runTimersToTime(10);

      expect(button.element.style.color).toEqual('blue');
      expect(button.element.style.transition).toEqual(undefined);

    });

    it("enable", () => {
      const container = new Button({
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });

      container.disable();
      container.enable();
      container.over();

      jest.runTimersToTime(10);

      expect(container.element.style.color).toEqual('red');
      expect(container.element.style.transition).toEqual('background-color 1s, color 1s');

    });
  });

  describe("multiple buttons", () => {

    it("check over states are different", () => {
      const b1 = new Button({
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });

      const b2 = new Button({
        style: {
          color: "yellow",
          hover: {
            durationIn: 1,
            color: "green"
          }
        }
      });

      b1.over();
      b2.over();

      jest.runTimersToTime(20);

      expect(b1.element.style.color).toEqual('red');
      expect(b1.element.style.transition).toEqual('background-color 1s, color 1s');
      expect(b2.element.style.color).toEqual('green');
      expect(b2.element.style.transition).toEqual('background-color 1s, color 1s');
    });
  });
});

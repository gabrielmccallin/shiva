import { Button } from '../src/Button';
import { Styles } from '../src/Styles';

jest.useFakeTimers();

describe("BUTTON", () => {
  describe("constructor", () => {

    test("constructed", () => {
      const container = new Button();
      expect(container).toBeDefined();
    });

    test("html element created", () => {
      const container = new Button();
      expect(container.element).toBeDefined();
    });

    test("id", () => {
      const container = new Button({
        id: "hello"
      });
      expect(container.id).toBe("hello");
    });

    test("type is button", () => {
      const container = new Button();
      expect(container.element.tagName).toEqual("BUTTON");
    });

    test("type is button with other config", () => {
      const container = new Button({
        color: "white"
      });
      expect(container.element.tagName).toEqual("BUTTON");
      expect(container.element.style.color).toEqual("white");
    });

    test("default style", () => {
      const container = new Button();
      expect(container.element.style.whiteSpace).toEqual("nowrap");
      expect(container.element.style.msTouchAction).toEqual("manipulation");
      expect(container.element.style.touchAction).toEqual("manipulation");
      expect(container.element.style.cursor).toEqual("pointer");
      expect(container.element.style.webkitUserSelect).toEqual("none");
      expect(container.element.style.msUserSelect).toEqual("none");
      expect(container.element.style.userSelect).toEqual("none");
      expect(container.element.textContent).toEqual("Button");
    });

    test("takes style from root config", () => {
      const container = new Button({
        color: "red",
        hover: {
          durationIn: 1,
          color: "blue"
        }
      });
      expect(container.element.style.color).toEqual("red");

      container.over();
      jest.runAllTimers();
      expect(container.element.style.color).toEqual("blue");

      container.out();
      jest.runAllTimers();
      expect(container.element.style.color).toEqual("red");


    });

    test("style", () => {
      const container = new Button({
        style: {
          color: "red",
          hover: {
            durationIn: 1
          }
        }
      });
      expect(container.element.style.color).toEqual("red");
    });

    test("styles", () => {
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
              durationIn: 10,
              color: "blue"
            }
          }
        ]
      });
      expect(container.element.style.color).toEqual("red");

      container.over();
      jest.runAllTimers();
      expect(container.element.style.color).toEqual("blue");
    });

    test("text", () => {
      const container = new Button({
        text: "hello"
      });
      expect(container.element.textContent).toEqual("hello");
    });

    test("text empty string", () => {
      const container = new Button({
        text: ""
      });
      expect(container.element.textContent).toEqual("");
    });

    test("text default string", () => {
      const button = new Button();
      expect(button.element.textContent).toEqual("Button");
    });

    test("data", () => {
      const data = { greeting: "hello" };
      const container = new Button({
        data: data
      });
      expect(container.data).toEqual(data);
    });

    test("className", () => {
      const className = "hello";
      const container = new Button({
        className: className
      });
      expect(container.element.className).toEqual(className);
    });

    test("classNames", () => {
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

    test("className", () => {
      const className = "hello";
      const container = new Button({
      });
      container.className(className);
      expect(container.element.className).toEqual(className);
    });

    test("classNames", () => {
      const container = new Button({
      });

      container.className("hello", "goodbye");
      expect(container.element.className).toEqual("hello goodbye");
    });


    test("styles set by the constructor and then overridden by style", () => {
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

      container.over();
      jest.runAllTimers();
      expect(container.element.style.color).toEqual("blue");
    });

    test("style", () => {
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
    });

    test("over", () => {
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


    test("out", () => {
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

    test("click", () => {
      const container = new Button({});
      container.addEventListener(this, Button.CLICK, function (e) {
        expect(e.target.element.tagName).toEqual("BUTTON");
      });
      container.click();
    });


    test("disable", () => {
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
      expect(button.element.getAttribute("disabled")).toEqual("true");

    });

    test("enable", () => {
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
      expect(container.element.getAttribute("disabled")).toBeNull();

    });
  });

  describe("multiple buttons", () => {

    test("check over states are different", () => {
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

import { Button } from '../src/Button';

describe("BUTTON", () => {
  describe("constructor", () => {


    it("✔️ constructed", () => {
      var container = new Button({

      });
      expect(container).toBeDefined();
    });

    it("✔️ html element created", () => {
      var container = new Button({

      });
      expect(container.element).toBeDefined();
    });

    it("✔️ id", () => {
      var container = new Button({
        id: "hello"
      });
      expect(container.id).toBe("hello");
    });

    it("✔️ type is button", () => {
      var container = new Button({
        type: "button"
      });
      expect(container.element.tagName).toEqual("BUTTON");
    });

    it("✔️ type is a if href in config object", () => {
      var container = new Button({
        href: "//hello.com"
      });
      expect(container.element.tagName).toEqual("A");
    });

    it("✔️ default style", () => {
      var container = new Button({
      });
      expect(container.element.style.whiteSpace).toEqual("nowrap")
      expect(container.element.style.msTouchAction).toEqual("manipulation")
      expect(container.element.style.touchAction).toEqual("manipulation")
      expect(container.element.style.cursor).toEqual("pointer")
      expect(container.element.style.webkitUserSelect).toEqual("none")
      expect(container.element.style.msUserSelect).toEqual("none")
      expect(container.element.style.userSelect).toEqual("none")
      expect(container.element.textContent).toEqual("Button")
    });

    it("✔️ style", () => {
      var container = new Button({
        style: {
          color: "red",
          hover: {
            durationIn: 1
          },
          icon: {
            code: "hello"
          }
        }
      });
      expect(container.element.style.color).toEqual("red");
      expect(container.styles.hover.durationIn).toEqual(1);
      expect(container.styles.icon.code).toEqual("hello");
    });

    it("✔️ styles", () => {
      var container = new Button({
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

    it("✔️ text", () => {
      var container = new Button({
        text: "hello"
      });
      expect(container.element.textContent).toEqual("hello");
    });

    it("✔️ text empty string", () => {
      var container = new Button({
        text: ""
      });
      expect(container.element.textContent).toEqual("");
    });

    it("✔️ text default string", () => {
      var container = new Button({
      });
      expect(container.element.textContent).toEqual("Button");
    });

    it("✔️ data", () => {
      var data = { greeting: "hello" };
      var container = new Button({
        data: data
      });
      expect(container.data).toEqual(data);
    });

    it("✔️ className", () => {
      var className = "hello";
      var container = new Button({
        className: className
      });
      expect(container.element.className).toEqual(className);
    });

    it("✔️ classNames", () => {
      var classNames = ["hello", "goodbye"];
      var container = new Button({
        className: classNames
      });

      var classNamesString = classNames.reduce(function (acc, curr) {
        return acc + " " + curr;
      });
      expect(container.element.className).toEqual(classNamesString);
    });

  });

  describe("methods", () => {

    it("✔️ className", () => {
      var className = "hello";
      var container = new Button({
      });
      container.className(className);
      expect(container.element.className).toEqual(className);
    });

    it("✔️ classNames", () => {
      var container = new Button({
      });

      container.className("hello", "goodbye");
      expect(container.element.className).toEqual("hello goodbye");
    });


    it("✔️ styles set by the constructor and then overridden by style", () => {
      var container = new Button({
        styles: [
          {
            color: "blue",
            hover: {
              durationIn: 1
            },
            icon: {
              code: "hi"
            }
          },
          {
            color: "orange",
            hover: {
              color: "black"
            },
            icon: {
              code: "hello"
            }
          }
        ]
      });
      container.style({
        color: "red",
        hover: {
          durationIn: 10,
          color: "blue"
        },
        icon: {
          code: "goodbye"
        }
      })
      expect(container.element.style.color).toEqual("red");
      expect(container.styles.hover.durationIn).toEqual(10);
      expect(container.styles.hover.color).toEqual("blue");
      expect(container.styles.icon.code).toEqual("goodbye");
    });

    it("✔️ style", () => {
      var container = new Button({
      });
      container.style({
        color: "red",
        hover: {
          durationIn: 10,
          color: "blue"
        },
        icon: {
          code: "hello"
        }
      });
      expect(container.element.style.color).toEqual("red");
      expect(container.styles.hover.color).toEqual("blue");
      expect(container.styles.hover.durationIn).toEqual(10);
      expect(container.styles.icon.code).toEqual("hello");
    });

    it("✔️ over", () => {
      var container = new Button({
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });
      container.over();

      jest.useFakeTimers();

      setTimeout(() => {
        expect(container.element.style.color).toEqual('red');
        expect(container.element.style.transition).toEqual('background-color 1s, color 1s');
      }, 10);

      jest.runAllTimers();
    });


    it("✔️ out", () => {
      var container = new Button({
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

      jest.useFakeTimers();

      setTimeout(() => {
        expect(container.element.style.color).toEqual('blue');
        expect(container.element.style.backgroundColor).toEqual('yellow');
        expect(container.element.style.transition).toEqual('background-color 1s, color 1s');
        
      }, 10);

      jest.runAllTimers();
    });

    it("✔️ click", () => {
      var container = new Button({});
      container.addEventListener(this, Button.CLICK, function (e) {
        expect(e.target.element.tagName).toEqual("BUTTON");
      });
      container.click(null);
    });


    it("✔️ disable", () => {
      var button = new Button({
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

      jest.useFakeTimers();

      setTimeout(() => {
        expect(button.element.style.color).toEqual('blue');
        expect(button.element.style.transition).toEqual(undefined);
      }, 10);


      jest.runAllTimers();

    });

    it("✔️ enable", () => {
      var container = new Button({
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

      jest.useFakeTimers();

      setTimeout(() => {
        expect(container.element.style.color).toEqual('red');
        expect(container.element.style.transition).toEqual('background-color 1s, color 1s');
        
      }, 10);

      
      jest.runAllTimers();

    });
  });

  describe("multiple buttons", () => {

    jest.useFakeTimers();

    it("✔️ check over states are different", () => {
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


      setTimeout(() => {
        expect(b1.element.style.color).toEqual('red');
        expect(b1.element.style.transition).toEqual('background-color 1s, color 1s');
        expect(b2.element.style.color).toEqual('green');
        expect(b2.element.style.transition).toEqual('background-color 1s, color 1s');
      }, 20);

      jest.runAllTimers();
    });
  });
});

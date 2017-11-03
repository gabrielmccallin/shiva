import { Container } from '../src/Container';
import { Event } from '../src/EventDispatcher';

jest.useFakeTimers();

describe("CONTAINER", () => {

  describe("constructor", () => {

    it("pass responsive duration", () => {
      // JSDOM set to width 1024

      var container = new Container({
        backgroundColor: "black",
        responsive: [
          {
            maxWidth: 300,
            style: {
              backgroundColor: "grey"
            },
            duration: 1
          },
          {
            maxWidth: 1500,
            minWidth: 301,
            style: {
              backgroundColor: "white"
            },
            duration: 2
          },
          {
            minWidth: 1501,
            style: {
              backgroundColor: "red"
            },
            duration: 3
          }
        ]
      });

      jest.runTimersToTime(10);

      expect(container.element.style.backgroundColor).toEqual('white');
      expect(container.element.style.transition).toEqual('background-color 3s');

    });
  });

  describe("methods", () => {

    it("addToBody", () => {
      var container = new Container({
      });
      container.addToBody();
      expect(container.element.parentElement.localName).toEqual("body");
    });

    it("className", () => {
      var className = "hello";
      var container = new Container({
      });
      container.className(className);
      expect(container.element.className).toEqual(className);
    });

    it("classNames", () => {
      var container = new Container({
      });

      container.className("hello", "goodbye");
      expect(container.element.className).toEqual("hello goodbye");
    });

    it("addChild", () => {
      var parent = new Container({
      });

      var child = new Container({
      });
      parent.addChild(child);

      expect(parent.element.hasChildNodes()).toBeTruthy();
    });

    it("appendChild", () => {
      var parent = new Container({
      });

      var child = new Container({
      });
      parent.appendChild(child);

      expect(parent.element.hasChildNodes()).toBeTruthy();
    });

    it("removeChild", () => {
      var parent = new Container({
      });

      var child = new Container({
      });
      parent.addChild(child);
      parent.removeChild(child);

      expect(parent.element.hasChildNodes()).toBeFalsy();
    });

    it("styles set by the constructor and then overridden by style", () => {
      var container = new Container({
        styles: [
          {
            color: "blue"
          },
          {
            color: "orange"
          }
        ]
      });
      container.style({
        color: "red"
      })
      expect(container.element.style.color).toEqual("red");
    });

    it("style", () => {
      var container = new Container({
      });
      container.style({
        color: "red"
      });
      expect(container.element.style.color).toEqual("red");
    });

    it("event dispatched", () => {
      var container = new Container({});
      container.addEventListener(this, "CUSTOM", function (e) {
        expect(e.type).toEqual('CUSTOM');
        expect(e.target.element).toBeDefined();
      });
      container.dispatchEvent(new Event("CUSTOM", container));
    });


    it("to", () => {
      var container = new Container({
      });

      container.to({
        duration: 1,
        delay: 0.2,
        toVars: {
          backgroundColor: 'purple',
          color: 'blue'
        }
      });


      jest.runTimersToTime(250);

      expect(container.element.style.color).toEqual('blue');
      expect(container.element.style.backgroundColor).toEqual('purple');
      expect(container.element.style.transition).toEqual('background-color 1s, color 1s');

    });

    it("to with zero duration", () => {
      var container = new Container({
      });

      container.to({
        duration: 0,
        toVars: {
          backgroundColor: 'red',
          color: 'blue'
        }
      });


      jest.runTimersToTime(10);

      expect(container.element.style.color).toEqual('blue');
      expect(container.element.style.backgroundColor).toEqual('red');
      expect(container.element.style.transition).toEqual('');

    });

    it("fromTo", () => {

      var container = new Container({
      });

      container.fromTo({
        duration: 0.2,
        fromVars: {
          backgroundColor: 'red',
          color: 'white'
        },
        toVars: {
          backgroundColor: 'purple',
          color: 'blue'
        }
      });

      expect(container.element.style.color).toEqual('white');
      expect(container.element.style.backgroundColor).toEqual('red');

      jest.runTimersToTime(200);

      expect(container.element.style.color).toEqual('blue');
      expect(container.element.style.backgroundColor).toEqual('purple');
      expect(container.element.style.transition).toEqual('background-color 0.2s, color 0.2s');
    });

    it("fromTo with immediate render", () => {

      var container = new Container({
      });

      container.fromTo({
        duration: 0.2,
        delay: 0.2,
        immediateRender: true,
        fromVars: {
          backgroundColor: 'red',
          color: 'white'
        },
        toVars: {
          backgroundColor: 'purple',
          color: 'blue'
        }
      });

      expect(container.element.style.color).toEqual('white');
      expect(container.element.style.backgroundColor).toEqual('red');

      jest.runTimersToTime(220);

      expect(container.element.style.color).toEqual('blue');
      expect(container.element.style.backgroundColor).toEqual('purple');
      expect(container.element.style.transition).toEqual('background-color 0.2s, color 0.2s');
    });



    it("remove listener", () => {
      var container = new Container({
      });

      var testDouble = {
        handle: () => { }
      }

      spyOn(testDouble, 'handle');

      container.addEventListener(this, "CUSTOM", testDouble.handle);
      container.removeEventListener("CUSTOM", testDouble.handle);

      container.dispatchEvent(new Event("CUSTOM", container));

      expect(testDouble.handle).toHaveBeenCalledTimes(0);

    });

    it("style with numeric properties", () => {
      var container = new Container({

      });
      container.style({
        x: 300,
        y: 300,
        width: 300,
        height: 300,
        alpha: 0.2
      });

      expect(container.element.style.left).toEqual("300px");
      expect(container.element.style.top).toEqual("300px");
      expect(container.element.style.width).toEqual("300px");
      expect(container.element.style.height).toEqual("300px");
      expect(container.element.style.opacity).toEqual("0.2");

    });

    it("responsive less than width max", () => {
      // JSDOM set to width 1024
      var container = new Container();
      container.responsive([
        {
          maxWidth: 1100,
          style: {
            backgroundColor: "blue"
          }
        }
      ]);
      expect(container.element.style.backgroundColor).toEqual("blue");

    });

    it("responsive greater than width max", () => {
      // JSDOM set to width 1024
      var container = new Container();
      container.responsive([
        {
          maxWidth: 300,
          style: {
            backgroundColor: "blue"
          }
        }
      ]);
      expect(container.element.style.backgroundColor).toEqual("");

    });

    it("responsive less than width min", () => {
      // JSDOM set to width 1024
      var container = new Container();
      container.responsive({
        minWidth: 1100,
        style: {
          backgroundColor: "blue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("");

    });

    it("responsive greater than width min", () => {
      // JSDOM set to width 1024
      var container = new Container();
      container.responsive({
        minWidth: 300,
        style: {
          backgroundColor: "blue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("blue");

    });

    it("responsive between max and min width", () => {
      // JSDOM set to width 1024
      var container = new Container();
      container.responsive({
        maxWidth: 1500,
        minWidth: 300,
        style: {
          backgroundColor: "blue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("blue");

    });

    it("responsive less than max and min width", () => {
      // JSDOM set to width 1024
      var container = new Container();
      container.responsive({
        maxWidth: 1000,
        minWidth: 500,
        style: {
          backgroundColor: "blue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("");

    });

    it("responsive greater than max and min width", () => {
      // JSDOM set to width 1024
      var container = new Container();
      container.responsive({
        maxWidth: 400,
        minWidth: 300,
        style: {
          backgroundColor: "blue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("");

    });

    it("responsive combinations", () => {
      // JSDOM set to width 1024
      var container = new Container();
      container.responsive([
        {
          maxWidth: 300,
          style: {
            backgroundColor: "grey"
          }
        },
        {
          maxWidth: 1500,
          minWidth: 300,
          style: {
            backgroundColor: "blue"
          }
        },
        {
          minWidth: 1500,
          style: {
            backgroundColor: "yellow"
          }
        }
      ]);
      expect(container.element.style.backgroundColor).toEqual("blue");

    });


    it("responsive duration", () => {
      // JSDOM set to width 1024

      var container = new Container();
      container.responsive([
        {
          maxWidth: 300,
          style: {
            backgroundColor: "grey"
          },
          duration: 1
        },
        {
          maxWidth: 1500,
          minWidth: 500,
          style: {
            backgroundColor: "blue"
          },
          duration: 2
        },
        {
          minWidth: 1500,
          style: {
            backgroundColor: "goldenrod"
          },
          duration: 3
        }
      ]);

      jest.runTimersToTime(20);

      expect(container.element.style.backgroundColor).toEqual('blue');
      expect(container.element.style.transition).toEqual('background-color 3s');

    });

  });

  describe("getters / setters", () => {

    var text = "Hello";
    it("innerText setter", () => {
      var container = new Container();
      container.innerText = text;

      expect(container.element.innerText).toEqual(text);
    });

    it("innerText getter", function () {
      var container = new Container();
      container.element.innerText = text;

      expect(container.innerText).toEqual(text);
    });
  });

});
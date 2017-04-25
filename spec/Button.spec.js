describe("BUTTON", function () {

  describe("constructor", function () {


    it("✔️ constructed", function () {
      var container = new shiva.Button({

      });
      expect(container).toBeDefined();
    });

    it("✔️ html element created", function () {
      var container = new shiva.Button({

      });
      expect(container.element).toBeDefined();
    });

    it("✔️ id", function () {
      var container = new shiva.Button({
        id: "hello"
      });
      expect(container.id).toBe("hello");
    });

    it("✔️ type is button", function () {
      var container = new shiva.Button({
        type: "button"
      });
      expect(container.element.matches("button")).toBeTruthy();
    });

    it("✔️ type is a if href in config object", function () {
      var container = new shiva.Button({
        href: "//hello.com"
      });
      expect(container.element.matches("a")).toBeTruthy();
    });

    it("✔️ default style", function () {
      var container = new shiva.Button({
      });
      expect(container.element.style.fontSize).toEqual("1.2em")
      expect(container.element.style.fontFamily).toEqual("sans-serif")
      expect(container.element.style.backgroundColor).toEqual("rgb(254, 254, 254)")
      expect(container.styles.hover.backgroundColor).toEqual("#dddddd")
      expect(container.styles.hover.durationOut).toEqual(1)
      expect(container.styles.hover.durationIn).toEqual(0)
      expect(container.styles.hover.color).toEqual("#000000")
      expect(container.element.style.padding).toEqual("0.75rem")
      expect(container.element.style.textAlign).toEqual("left")
      expect(container.element.style.whiteSpace).toEqual("nowrap")
      expect(container.element.style.msTouchAction).toEqual("manipulation")
      expect(container.element.style.touchAction).toEqual("manipulation")
      expect(container.element.style.cursor).toEqual("pointer")
      expect(container.element.style.webkitUserSelect).toEqual("none")
      expect(container.element.style.mozUserSelect).toEqual("none")
      expect(container.element.style.msUserSelect).toEqual("none")
      expect(container.element.style.userSelect).toEqual("none")
      expect(container.element.style.border).toEqual("2px solid rgb(238, 238, 238)")
      expect(container.element.style.color).toEqual("rgb(0, 0, 0)")
      expect(container.element.innerText).toEqual("Button")
    });

    it("✔️ style", function () {
      var container = new shiva.Button({
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

    it("✔️ styles", function () {
      var container = new shiva.Button({
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

    it("✔️ text", function () {
      var container = new shiva.Button({
        text: "hello"
      });
      expect(container.element.innerText).toEqual("hello");
    });

    it("✔️ data", function () {
      var data = { greeting: "hello" };
      var container = new shiva.Button({
        data: data
      });
      expect(container.data).toEqual(data);
    });

    it("✔️ className", function () {
      var className = "hello";
      var container = new shiva.Button({
        className: className
      });
      expect(container.element.className).toEqual(className);
    });

    it("✔️ classNames", function () {
      var classNames = ["hello", "goodbye"];
      var container = new shiva.Button({
        className: classNames
      });

      var classNamesString = classNames.reduce(function (acc, curr) {
        return acc + " " + curr;
      });
      expect(container.element.className).toEqual(classNamesString);
    });

  });

  describe("methods", function () {

    it("✔️ className", function () {
      var className = "hello";
      var container = new shiva.Button({
      });
      container.className(className);
      expect(container.element.className).toEqual(className);
    });

    it("✔️ classNames", function () {
      var container = new shiva.Button({
      });

      container.className("hello", "goodbye");
      expect(container.element.className).toEqual("hello goodbye");
    });


    it("✔️ styles set by the constructor and then overridden by style", function () {
      var container = new shiva.Button({
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

    it("✔️ style", function () {
      var container = new shiva.Button({
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

    it("✔️ over", function (done) {
      var container = new shiva.Button({
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });
      container.over(null);

      setTimeout(function () {
        expect(container.element.style.color).toEqual('red');
        expect(container.element.style.backgroundColor).toEqual('rgb(221, 221, 221)');
        expect(container.element.style.transition).toEqual('background-color 1s, color 1s');
        done();
      }, 10);
    });


    it("✔️ out", function (done) {
      var container = new shiva.Button({
        style: {
          color: "blue",
          backgroundColor: "grey",
          hover: {
            durationIn: 0,
            durationOut: 1,
            color: "red"
          }
        }
      });

      container.over(null);
      container.out(null);

      setTimeout(function () {
        expect(container.element.style.color).toEqual('blue');
        expect(container.element.style.backgroundColor).toEqual('grey');
        expect(container.element.style.transition).toEqual('background-color 1s, color 1s');
        done();
      }, 100);
    });

    it("✔️ click", function () {
      var container = new shiva.Button({});
      container.addEventListener(this, shiva.Button.CLICK, function (e) {
        expect(e.target.element.matches("button")).toBeTruthy();
      });
      container.click(null);
    });

    it("✔️ disable", function (done) {
      var container = new shiva.Button({
        style: {
          color: "blue",
          hover: {
            durationIn: 1,
            color: "red"
          }
        }
      });

      container.disable();
      container.over(null);

      setTimeout(function () {
        expect(container.element.style.color).toEqual('blue');
        expect(container.element.style.transition).toEqual('');
        done();
      }, 10);
    });

    it("✔️ enable", function (done) {
      var container = new shiva.Button({
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
      container.over(null);

      setTimeout(function () {
        expect(container.element.style.color).toEqual('red');
        expect(container.element.style.backgroundColor).toEqual('rgb(221, 221, 221)');
        expect(container.element.style.transition).toEqual('background-color 1s, color 1s');
        done();
      }, 10);
    });

  });
});

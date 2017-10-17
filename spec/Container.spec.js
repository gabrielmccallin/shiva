describe("CONTAINER", function () {

  describe("constructor", function () {

    it("✔️ constructed", function () {
      var container = new shiva.Container({

      });
      expect(container).toBeDefined();
    });

    it("✔️ html element created", function () {
      var container = new shiva.Container({

      });
      expect(container.element).toBeDefined();
    });

    it("✔️ root element created", function () {
      var container = new shiva.Container({
        root: true
      });
      expect(container.element.parentElement.localName).toEqual("body");

      document.body.removeChild(container.element);
    });

    it("✔️ root element properties", function () {
      var container = new shiva.Container({
        root: true
      });

      expect(container.element.style.position).toEqual("absolute");
      expect(container.element.style.top).toEqual("0px");
      expect(container.element.style.left).toEqual("0px");
      expect(container.element.style.margin).toEqual("0px");
      expect(container.element.style.width).toEqual("100%");
      expect(container.element.style.height).toEqual("100%");
      expect(container.element.id).toEqual("app");

      document.body.removeChild(container.element);
    });

    it("✔️ id", function () {
      var container = new shiva.Container({
        id: "hello"
      });
      expect(container.id).toBe("hello");
    });

    it("✔️ type", function () {
      var container = new shiva.Container({
        type: "p"
      });
      expect(container.element.tagName).toEqual("P");
    });

    it("✔️ style", function () {
      var container = new shiva.Container({
        style: {
          color: "red"
        }
      });
      expect(container.element.style.color).toEqual("red");
    });

    it("✔️ style on root of configuration object", function () {
      var container = new shiva.Container({
        color: "red"
      });
      expect(container.element.style.color).toEqual("red");
    });

    it("✔️ styles", function () {
      var container = new shiva.Container({
        styles: [
          {
            color: "blue"
          },
          {
            color: "red"
          }
        ]
      });
      expect(container.element.style.color).toEqual("red");
    });

    it("✔️ text", function () {
      var container = new shiva.Container({
        text: "hello"
      });
      expect(container.element.innerText).toEqual("hello");
    });

    it("✔️ data", function () {
      var data = { greeting: "hello" };
      var container = new shiva.Container({
        data: data
      });
      expect(container.data).toEqual(data);
    });

    it("✔️ className", function () {
      var className = "hello";
      var container = new shiva.Container({
        className: className
      });
      expect(container.element.className).toEqual(className);
    });

    it("✔️ classNames", function () {
      var classNames = ["hello", "goodbye"];
      var container = new shiva.Container({
        className: classNames
      });

      var classNamesString = classNames.reduce(function (acc, curr) {
        return acc + " " + curr;
      });
      expect(container.element.className).toEqual(classNamesString);
    });

    it("✔️ pass attributes", function () {
      var attributes = {
        for: "hello",
        src: "//hello.com/hello.jpg",
        hello: "there"
      };

      var container = new shiva.Container({
        type: "label",
        attributes: attributes
      });

      for (var key in attributes) {
        expect(container.element.getAttribute(key)).toEqual(attributes[key]);
      }
    });

    it("✔️ pass responsive", function () {

      var container = new shiva.Container({
        responsive: {
          maxWidth: 900,
          style: {
            backgroundColor: "aliceblue"
          }
        }
      });
      expect(container.element.style.backgroundColor).toEqual("rgb(240, 248, 255)");

    });



  });

  describe("methods", function () {

    it("✔️ addToBody", function () {
      var container = new shiva.Container({
      });
      container.addToBody();
      expect(container.element.parentElement.localName).toEqual("body");
    });

    it("✔️ className", function () {
      var className = "hello";
      var container = new shiva.Container({
      });
      container.className(className);
      expect(container.element.className).toEqual(className);
    });

    it("✔️ classNames", function () {
      var container = new shiva.Container({
      });

      container.className("hello", "goodbye");
      expect(container.element.className).toEqual("hello goodbye");
    });

    it("✔️ addChild", function () {
      var parent = new shiva.Container({
      });

      var child = new shiva.Container({
      });
      parent.addChild(child);

      expect(parent.element.hasChildNodes(child)).toBeTruthy();
    });

    it("✔️ appendChild", function () {
      var parent = new shiva.Container({
      });

      var child = new shiva.Container({
      });
      parent.appendChild(child);

      expect(parent.element.hasChildNodes(child)).toBeTruthy();
    });

    it("✔️ removeChild", function () {
      var parent = new shiva.Container({
      });

      var child = new shiva.Container({
      });
      parent.addChild(child);
      parent.removeChild(child);

      expect(parent.element.hasChildNodes(child)).toBeFalsy();
    });

    it("✔️ styles set by the constructor and then overridden by style", function () {
      var container = new shiva.Container({
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

    it("✔️ style", function () {
      var container = new shiva.Container({
      });
      container.style({
        color: "red"
      });
      expect(container.element.style.color).toEqual("red");
    });

    it("✔️ event dispatched", function () {
      var container = new shiva.Container({});
      container.addEventListener(this, "CUSTOM", function (e) {
        expect(e.type).toEqual('CUSTOM');
        expect(e.target.element).toBeDefined();
      });
      container.dispatchEvent(new shiva.Event("CUSTOM", container));
    });


    it("✔️ to", function (done) {
      var container = new shiva.Container({
      });

      container.to({
        duration: 1,
        delay: 0.2,
        toVars: {
          backgroundColor: 'rgb(128, 128, 128)',
          color: 'blue'
        }
      });

      setTimeout(function () {
        expect(container.element.style.color).toEqual('blue');
        expect(container.element.style.backgroundColor).toEqual('rgb(128, 128, 128)');
        expect(container.element.style.transition).toEqual('background-color 1s, color 1s');
        done();
      }, 200);
    });

    it("✔️ to with zero duration", function (done) {
      var container = new shiva.Container({
      });

      container.to({
        duration: 0,
        // delay: 0.2,
        toVars: {
          backgroundColor: 'rgb(128, 128, 128)',
          color: 'blue'
        }
      });

      setTimeout(function () {
        expect(container.element.style.color).toEqual('blue');
        expect(container.element.style.backgroundColor).toEqual('rgb(128, 128, 128)');
        expect(container.element.style.transition).toEqual('');
        done();
      }, 10);
    });

    it("✔️ fromTo", function (done) {
      var container = new shiva.Container({
      });

      container.fromTo({
        duration: 0.2,
        fromVars: {
          backgroundColor: 'red',
          color: 'white'
        },
        toVars: {
          backgroundColor: 'rgb(128, 128, 128)',
          color: 'blue'
        }
      });

      // setTimeout(function () {
      expect(container.element.style.color).toEqual('white');
      expect(container.element.style.backgroundColor).toEqual('red');
      // }, 100);

      setTimeout(function () {
        expect(container.element.style.color).toEqual('blue');
        expect(container.element.style.backgroundColor).toEqual('rgb(128, 128, 128)');
        expect(container.element.style.transition).toEqual('background-color 0.2s, color 0.2s');
        done();
      }, 200);
    });

    it("✔️ fromTo with immediate render", function (done) {
      var container = new shiva.Container({
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
          backgroundColor: 'rgb(128, 128, 128)',
          color: 'blue'
        }
      });

      // setTimeout(function () {
      expect(container.element.style.color).toEqual('white');
      expect(container.element.style.backgroundColor).toEqual('red');
      // }, 100);

      setTimeout(function () {
        expect(container.element.style.color).toEqual('blue');
        expect(container.element.style.backgroundColor).toEqual('rgb(128, 128, 128)');
        expect(container.element.style.transition).toEqual('background-color 0.2s, color 0.2s');
        done();
      }, 250);
    });



    it("✔️ remove listener", function () {
      var container = new shiva.Container({
      });

      var testDouble = {
        handle: function () { }
      }

      spyOn(testDouble, 'handle');

      container.addEventListener(this, "CUSTOM", testDouble.handle);
      container.removeEventListener("CUSTOM", testDouble.handle);

      container.dispatchEvent(new shiva.Event("CUSTOM", container));

      expect(testDouble.handle).toHaveBeenCalledTimes(0);

    });

    it("✔️ style with numeric properties", function () {
      var container = new shiva.Container({

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

    it("✔️ responsive less than width max", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive([
        {
          maxWidth: 1000,
          style: {
            backgroundColor: "aliceblue"
          }
        }
      ]);
      expect(container.element.style.backgroundColor).toEqual("rgb(240, 248, 255)");

    });

    it("✔️ responsive greater than width max", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive([
        {
          maxWidth: 300,
          style: {
            backgroundColor: "aliceblue"
          }
        }
      ]);
      expect(container.element.style.backgroundColor).toEqual("");

    });

    it("✔️ responsive less than width min", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive({
        minWidth: 1000,
        style: {
          backgroundColor: "aliceblue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("");

    });

    it("✔️ responsive greater than width min", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive({
        minWidth: 300,
        style: {
          backgroundColor: "aliceblue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("rgb(240, 248, 255)");

    });

    it("✔️ responsive between max and min width", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive({
        maxWidth: 500,
        minWidth: 300,
        style: {
          backgroundColor: "aliceblue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("rgb(240, 248, 255)");

    });

    it("✔️ responsive less than max and min width", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive({
        maxWidth: 1500,
        minWidth: 500,
        style: {
          backgroundColor: "aliceblue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("");

    });

    it("✔️ responsive greater than max and min width", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive({
        maxWidth: 400,
        minWidth: 300,
        style: {
          backgroundColor: "aliceblue"
        }
      });
      expect(container.element.style.backgroundColor).toEqual("");

    });

    it("✔️ responsive combinations", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive([
        {
          maxWidth: 300,
          style: {
            backgroundColor: "grey"
          }
        },
        {
          maxWidth: 500,
          minWidth: 300,
          style: {
            backgroundColor: "aliceblue"
          }
        },
        {
          minWidth: 500,
          style: {
            backgroundColor: "goldenrod"
          }
        }
      ]);
      expect(container.element.style.backgroundColor).toEqual("rgb(240, 248, 255)");

    });


    it("✔️ responsive duration", function () {
      // Phantom set to width 400
      var container = new shiva.Container();
      container.responsive([
        {
          maxWidth: 300,
          style: {
            backgroundColor: "grey"
          },
          duration: 1
        },
        {
          maxWidth: 500,
          minWidth: 300,
          style: {
            backgroundColor: "aliceblue"
          },
          duration: 2
        },
        {
          minWidth: 500,
          style: {
            backgroundColor: "goldenrod"
          },
          duration: 3
        }
      ]);


      setTimeout(function () {
        expect(container.element.style.backgroundColor).toEqual('aliceblue');
        expect(container.element.style.transition).toEqual('backgroundColor 3s');
        done();
      }, 200);
    });

  });

  describe("getters / setters", function () {

    var text = "Hello";
    it("✔️ innerText setter", function () {
      var container = new shiva.Container();
      container.innerText = text;

      expect(container.element.innerText).toEqual(text);
    });

    it("✔️ innerText getter", function () {
      var container = new shiva.Container();
      container.element.innerText = text;

      expect(container.innerText).toEqual(text);
    });
  });

});

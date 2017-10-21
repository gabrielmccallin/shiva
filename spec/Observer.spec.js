describe("OBSERVER", function () {

  it("✔️ addEventListener and dispatchEvent", function () {
    var testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    shiva.Observer.addEventListener(this, "EVENT!", testDouble.handle);
    shiva.Observer.dispatchEvent(new shiva.Event("EVENT!"));

    expect(testDouble.handle).toHaveBeenCalledTimes(1);

    shiva.Observer.removeEventListener("EVENT!", testDouble.handle);

  });

  it("✔️ dispatchEvent without addEventListener", function () {
    var testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    shiva.Observer.dispatchEvent(new shiva.Event("EVENT!"));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  it("✔️ removeEventListener", function () {
    var testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    shiva.Observer.addEventListener(this, "EVENT!", testDouble.handle);
    shiva.Observer.removeEventListener("EVENT!", testDouble.handle);

    shiva.Observer.dispatchEvent(new shiva.Event("EVENT!"));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

});

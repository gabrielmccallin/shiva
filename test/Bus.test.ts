import { Bus } from '../src/Bus';
import { Event } from '../src/EventDispatcher';

describe("BUS", function () {

  test("addEventListener and dispatchEvent", function () {
    class Last extends Bus { }

    const testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    Last.addEventListener(this, "EVENT!", testDouble.handle);
    Last.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(1);

    Last.removeEventListener("EVENT!", testDouble.handle);

  });

  test("dispatchEvent without addEventListener", function () {
    class Electric extends Bus { }

    const testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    Electric.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  test("removeEventListener", function () {
    class RouteMaster extends Bus { }

    const testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    RouteMaster.addEventListener(this, "EVENT!", testDouble.handle);
    RouteMaster.removeEventListener("EVENT!", testDouble.handle);

    RouteMaster.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  test("multiple buses", function () {
    class DoubleDecker extends Bus { }

    class Bendy extends Bus { }

    const doubleDouble = {
      handle: function () { }
    }

    const bendyDouble = {
      handle: function () { }
    }

    spyOn(doubleDouble, 'handle');
    spyOn(bendyDouble, 'handle');

    DoubleDecker.addEventListener(this, "DOUBLE_DECKER", doubleDouble.handle);
    DoubleDecker.dispatchEvent(new Event("DOUBLE_DECKER", this));
    DoubleDecker.dispatchEvent(new Event("BENDY", this));

    Bendy.addEventListener(this, "BENDY", bendyDouble.handle);
    Bendy.dispatchEvent(new Event("BENDY", this));
    Bendy.dispatchEvent(new Event("DOUBLE_DECKER", this));

    expect(doubleDouble.handle).toHaveBeenCalledTimes(1);
    expect(bendyDouble.handle).toHaveBeenCalledTimes(1);

  })

});

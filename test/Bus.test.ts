import { Bus } from '../src/Bus';
import { Event } from '../src/EventDispatcher';

describe("BUS", () => {

  test("addEventListener and dispatchEvent", () => {
    class Last extends Bus { }

    const testDouble = {
      handle: () => { return; }
    };

    spyOn(testDouble, 'handle');

    Last.addEventListener(this, "EVENT!", testDouble.handle);
    Last.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(1);

    Last.removeEventListener("EVENT!", testDouble.handle);

  });

  test("dispatchEvent without addEventListener", () => {
    class Electric extends Bus { }

    const testDouble = {
      handle: () => { return; }
    };

    spyOn(testDouble, 'handle');

    Electric.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  test("removeEventListener", () => {
    class RouteMaster extends Bus { }

    const testDouble = {
      handle: () => { return; }
    };

    spyOn(testDouble, 'handle');

    RouteMaster.addEventListener(this, "EVENT!", testDouble.handle);
    RouteMaster.removeEventListener("EVENT!", testDouble.handle);

    RouteMaster.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  test("removeEventListener without existing listener", () => {
    class RouteMaster extends Bus { }

    const testDouble = {
      handle: () => { return; }
    };

    spyOn(testDouble, 'handle');

    RouteMaster.removeEventListener("EVENT!", testDouble.handle);

    RouteMaster.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  test("multiple buses", () => {
    class DoubleDecker extends Bus { }

    class Bendy extends Bus { }

    const doubleDouble = {
      handle: () => { return; }
    };

    const bendyDouble = {
      handle: () => { return; }
    };

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

  });

});

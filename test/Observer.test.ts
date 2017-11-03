import { Observer } from '../src/Observer';
import { Event } from '../src/EventDispatcher';

describe("OBSERVER", function () {

  test("addEventListener and dispatchEvent", function () {
    const testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    Observer.addEventListener(this, "EVENT!", testDouble.handle);
    Observer.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(1);

    Observer.removeEventListener("EVENT!", testDouble.handle);

  });

  test("dispatchEvent without addEventListener", function () {
    const testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    Observer.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  test("removeEventListener", function () {
    const testDouble = {
      handle: function () { }
    }

    spyOn(testDouble, 'handle');

    Observer.addEventListener(this, "EVENT!", testDouble.handle);
    Observer.removeEventListener("EVENT!", testDouble.handle);

    Observer.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

});

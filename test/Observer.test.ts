import { Observer } from '../src/Observer';
import { Event } from '../src/EventDispatcher';

describe("OBSERVER", () => {

  test("addEventListener and dispatchEvent", () => {
    const testDouble = {
      handle: () => { return; }
    };

    spyOn(testDouble, 'handle');

    Observer.addEventListener(this, "EVENT!", testDouble.handle);
    Observer.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(1);

    Observer.removeEventListener("EVENT!", testDouble.handle);

  });

  test("dispatchEvent without addEventListener", () => {
    const testDouble = {
      handle: () => { return; }
    };

    spyOn(testDouble, 'handle');

    Observer.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  test("removeEventListener", () => {
    const testDouble = {
      handle: () => { return; }
    };

    spyOn(testDouble, 'handle');

    Observer.addEventListener(this, "EVENT!", testDouble.handle);
    Observer.removeEventListener("EVENT!", testDouble.handle);

    Observer.dispatchEvent(new Event("EVENT!", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

  test("removeEventListener without existing listener", () => {
    const testDouble = {
      handle: () => { return; }
    };

    spyOn(testDouble, 'handle');

    Observer.removeEventListener("EVENT3", testDouble.handle);

    Observer.dispatchEvent(new Event("EVENT3", this));

    expect(testDouble.handle).toHaveBeenCalledTimes(0);

  });

});

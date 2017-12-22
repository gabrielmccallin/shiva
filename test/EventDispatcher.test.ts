import { Container } from '../src/Container';
import { Event, EventDispatcher } from '../src/EventDispatcher';

jest.useFakeTimers();

describe("EVENTDISPATCHER", () => {

  describe("constructor", () => {
    test("event has data and type", () => {

      const event = new Event("HELLO", this, { hello: true });

      expect(event.data).toEqual({ hello: true });
      expect(event.type).toEqual("HELLO");
    });
  });

  describe("methods", () => {
    test("dispatch event on a container", () => {
      const mockFn = jest.fn();

      const event = new Event("HELLO", this, { hello: true });
      class Box extends Container {
        public sendIt() {
          this.dispatchEvent(event);
        }
      }

      const box = new Box();
      box.addEventListener(this, "HELLO", mockFn);

      box.sendIt();

      expect(mockFn.mock.calls.length).toBe(1);
      expect(mockFn.mock.calls[0]).toEqual([event]);
    })
  });

});

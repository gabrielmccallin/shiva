import { createStore } from "./store";

describe("create options", () => {
    it("should call a subscriber on publish", () => {
        const fixture = "hello";
        const expected = "got ya!";

        // called in a module and exported - now user can import throughout codebase
        const store = createStore(fixture);

        const [subscribe, publish] = store;

        const mockSubscribeHook = jest.fn();

        subscribe((data) => {
            mockSubscribeHook(data);
        });

        // immediate callback on subscriber set up
        expect(mockSubscribeHook).toHaveBeenCalledWith(fixture);

        publish(expected);

        // callback on publish
        expect(mockSubscribeHook).toHaveBeenCalledWith(expected);
    });

    it("should call multiple subscribers on publish", () => {
        const fixture = "hello";
        const expected = "got ya!";

        // called in a module and exported - now user can import throughout codebase
        const store = createStore(fixture);

        const [subscribe, publish] = store;

        const mockSubscribeHook = jest.fn();
        const mockSubscribeHook1 = jest.fn();

        // subscribe in one module
        subscribe((data) => {
            mockSubscribeHook(data);
        });

        // subscribe in another module
        subscribe((data) => {
            mockSubscribeHook1(data);
        });

        // immediate callback on subscriber set up
        expect(mockSubscribeHook).toHaveBeenCalledWith(fixture);
        expect(mockSubscribeHook1).toHaveBeenCalledWith(fixture);
        
        publish(expected);

        // callback on publish
        expect(mockSubscribeHook).toHaveBeenCalledWith(expected);
        expect(mockSubscribeHook1).toHaveBeenCalledWith(expected);
    });
});

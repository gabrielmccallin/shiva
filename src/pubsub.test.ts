import { pubsub } from "./pubsub";

describe("create options", () => {
    it("should call a subscriber on publish, no initial state", () => {
        const expected = "got ya!";

        const [subscribe, publish] = pubsub();

        const mockSubscribeHook = jest.fn();

        subscribe((data) => {
            mockSubscribeHook(data);
        });

        // immediate callback on subscriber set up
        expect(mockSubscribeHook).toHaveBeenCalledWith(undefined);

        publish(expected);

        // callback on publish
        expect(mockSubscribeHook).toHaveBeenCalledWith(expected);
    });

    it("should call a subscriber on publish", () => {
        const fixture = "hello";
        const expected = "got ya!";

        const [subscribe, publish] = pubsub(fixture);

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

    it("should call a subscriber on publish and run reducer", () => {
        const fixture = "hello";
        const fixture1 = "got ya!";
        const expected = "hello, got ya!";

        const reducer = (current, next) => {
            return `${current}, ${next}`;
        };

        const [subscribe, publish] = pubsub(fixture, reducer);

        const mockSubscribeHook = jest.fn();

        subscribe((data) => {
            mockSubscribeHook(data);
        });

        // immediate callback on subscriber set up
        expect(mockSubscribeHook).toHaveBeenCalledWith(fixture);

        publish(fixture1);

        // callback on publish
        expect(mockSubscribeHook).toHaveBeenCalledWith(expected);
    });

    it("should call all subscribers on publish", () => {
        const fixture = "hello";
        const expected = "got ya!";

        const [subscribe, publish] = pubsub(fixture);

        const mockSubscribeHook = jest.fn();
        const mockSubscribeHook1 = jest.fn();

        subscribe((data) => {
            mockSubscribeHook(data);
        });

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

    it("should call all subscribers on publish and run reducer", () => {
        const fixture = "hello";
        const fixture1 = "got ya!";
        const expected = "hello, got ya!";

        const reducer = (current, next) => {
            return `${current}, ${next}`;
        };

        const [subscribe, publish] = pubsub(fixture, reducer);

        const mockSubscribeHook = jest.fn();
        const mockSubscribeHook1 = jest.fn();

        subscribe((data) => {
            mockSubscribeHook(data);
        });

        subscribe((data) => {
            mockSubscribeHook1(data);
        });

        // immediate callback on subscriber set up
        expect(mockSubscribeHook).toHaveBeenCalledWith(fixture);
        expect(mockSubscribeHook1).toHaveBeenCalledWith(fixture);

        publish(fixture1);

        // callback on publish
        expect(mockSubscribeHook).toHaveBeenCalledWith(expected);
        expect(mockSubscribeHook1).toHaveBeenCalledWith(expected);
    });
});

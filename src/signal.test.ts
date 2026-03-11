import { signal, isSignal, Signal } from "./signal"

describe("signal", () => {
    it("should return initial value", () => {
        const s = signal(42)
        expect(s.get()).toBe(42)
    })

    it("should update value with set", () => {
        const s = signal("hello")
        s.set("world")
        expect(s.get()).toBe("world")
    })

    it("should notify subscriber on set", () => {
        const s = signal(0)
        const fn = jest.fn()
        s.subscribe(fn)
        s.set(1)
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it("should notify multiple subscribers", () => {
        const s = signal(0)
        const fn1 = jest.fn()
        const fn2 = jest.fn()
        s.subscribe(fn1)
        s.subscribe(fn2)
        s.set(1)
        expect(fn1).toHaveBeenCalledTimes(1)
        expect(fn2).toHaveBeenCalledTimes(1)
    })

    it("should unsubscribe when returned function is called", () => {
        const s = signal(0)
        const fn = jest.fn()
        const unsubscribe = s.subscribe(fn)
        unsubscribe()
        s.set(1)
        expect(fn).not.toHaveBeenCalled()
    })

    it("should reflect latest value in subscriber callback", () => {
        const s = signal(0)
        let captured: number | undefined
        s.subscribe(() => {
            captured = s.get() as number
        })
        s.set(99)
        expect(captured).toBe(99)
    })
})

describe("isSignal", () => {
    it("should return true for a signal", () => {
        const s = signal(0)
        expect(isSignal(s)).toBe(true)
    })

    it("should return false for null", () => {
        expect(isSignal(null)).toBe(false)
    })

    it("should return false for a plain object", () => {
        expect(isSignal({ get: 1 })).toBe(false)
    })

    it("should return false for a string", () => {
        expect(isSignal("hello")).toBe(false)
    })

    it("should return false for an object missing subscribe", () => {
        expect(
            isSignal({ get: () => {}, set: () => {} })
        ).toBe(false)
    })

    it("should return true for a duck-typed signal", () => {
        const duck: Signal<string> = {
            get: () => "a",
            set: () => {},
            subscribe: () => () => {},
        }
        expect(isSignal(duck)).toBe(true)
    })
})

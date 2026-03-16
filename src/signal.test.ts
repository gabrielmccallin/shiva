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

describe("signal with object - reactive fields", () => {
    it("should expose a signal for each field", () => {
        const s = signal({ name: "Alice", age: 30 })
        expect(s.name.get()).toBe("Alice")
        expect(s.age.get()).toBe(30)
    })

    it("should notify field subscriber when that field changes", () => {
        const s = signal({ name: "Alice", age: 30 })
        const fn = jest.fn()
        s.name.subscribe(fn)
        s.set({ name: "Bob", age: 30 })
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it("should not notify field subscriber when a different field changes", () => {
        const s = signal({ name: "Alice", age: 30 })
        const fn = jest.fn()
        s.name.subscribe(fn)
        s.set({ name: "Alice", age: 31 })
        expect(fn).not.toHaveBeenCalled()
    })

    it("should reflect the latest value after source update", () => {
        const s = signal({ name: "Alice", age: 30 })
        s.set({ name: "Bob", age: 30 })
        expect(s.name.get()).toBe("Bob")
    })

    it("should return the same signal instance for repeated field access", () => {
        const s = signal({ name: "Alice", age: 30 })
        expect(s.name).toBe(s.name)
    })

    it("should write back to source when field signal is set", () => {
        const s = signal({ name: "Alice", age: 30 })
        s.name.set("Carol")
        expect(s.get().name).toBe("Carol")
        expect(s.get().age).toBe(30)
    })

    it("should notify source subscribers when a field signal is set", () => {
        const s = signal({ name: "Alice", age: 30 })
        const fn = jest.fn()
        s.subscribe(fn)
        s.name.set("Carol")
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it("should unsubscribe field signal correctly", () => {
        const s = signal({ name: "Alice", age: 30 })
        const fn = jest.fn()
        const unsubscribe = s.name.subscribe(fn)
        unsubscribe()
        s.set({ name: "Bob", age: 30 })
        expect(fn).not.toHaveBeenCalled()
    })
})

describe("signal with nested object - deep reactive fields", () => {
    it("should expose a signal for a nested field", () => {
        const s = signal({ description: { nested: "hello" } })
        expect(s.description.nested.get()).toBe("hello")
    })

    it("should notify nested field subscriber when that field changes", () => {
        const s = signal({ description: { nested: "hello" } })
        const fn = jest.fn()
        s.description.nested.subscribe(fn)
        s.set({ description: { nested: "world" } })
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it("should not notify nested field subscriber when a sibling field changes", () => {
        const s = signal({ description: { nested: "hello", other: "x" } })
        const fn = jest.fn()
        s.description.nested.subscribe(fn)
        s.set({ description: { nested: "hello", other: "y" } })
        expect(fn).not.toHaveBeenCalled()
    })

    it("should reflect latest value after source update", () => {
        const s = signal({ description: { nested: "hello" } })
        s.set({ description: { nested: "updated" } })
        expect(s.description.nested.get()).toBe("updated")
    })

    it("should write back through nested field signal", () => {
        const s = signal({ description: { nested: "hello" } })
        s.description.nested.set("written")
        expect(s.get().description.nested).toBe("written")
    })

    it("should notify source subscribers when a nested field signal is set", () => {
        const s = signal({ description: { nested: "hello" } })
        const fn = jest.fn()
        s.subscribe(fn)
        s.description.nested.set("written")
        expect(fn).toHaveBeenCalledTimes(1)
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

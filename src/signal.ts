type Subscriber = () => void

export type Signal<T> = {
    get: () => T
    set: (value: T) => void
    subscribe: (fn: Subscriber) => () => void
}

export const signal = <T>(initialValue: T): Signal<T> => {
    let value = initialValue
    const subscribers = new Set<Subscriber>()

    return {
        get: () => value,
        set: (newValue: T) => {
            value = newValue
            subscribers.forEach((fn) => fn())
        },
        subscribe: (fn: Subscriber) => {
            subscribers.add(fn)
            return () => subscribers.delete(fn)
        },
    }
}

export const isSignal = <T>(value: unknown): value is Signal<T> =>
    typeof value === "object" &&
    value !== null &&
    typeof (value as Signal<T>).get === "function" &&
    typeof (value as Signal<T>).set === "function" &&
    typeof (value as Signal<T>).subscribe === "function"

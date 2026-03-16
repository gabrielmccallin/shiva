type Subscriber = () => void

export type Signal<T> = {
    get: () => T
    set: (value: T) => void
    subscribe: (fn: Subscriber) => () => void
}

export type ReactiveSignal<T extends object> = Signal<T> & {
    [K in keyof T]: T[K] extends object
        ? ReactiveSignal<T[K]>
        : Signal<T[K]>
}

const SIGNAL_KEYS = new Set(["get", "set", "subscribe"])

function makeReactive<T extends object>(
    base: Signal<T>
): ReactiveSignal<T> {
    const cache = new Map<string | symbol, Signal<any>>()

    return new Proxy(base, {
        get(target, key: string | symbol) {
            if (SIGNAL_KEYS.has(key as string))
                return target[key as keyof typeof target]

            if (cache.has(key)) return cache.get(key)!

            const fieldSubscribers = new Set<Subscriber>()
            let fieldValue = base.get()[key as keyof T]

            base.subscribe(() => {
                const next = base.get()[key as keyof T]
                if (next !== fieldValue) {
                    fieldValue = next
                    fieldSubscribers.forEach((fn) => fn())
                }
            })

            const derived: Signal<T[keyof T]> = {
                get: () => base.get()[key as keyof T],
                set: (v) =>
                    base.set({ ...base.get(), [key]: v }),
                subscribe: (fn) => {
                    fieldSubscribers.add(fn)
                    return () => fieldSubscribers.delete(fn)
                },
            }

            const result =
                typeof fieldValue === "object" &&
                fieldValue !== null
                    ? makeReactive(
                          derived as Signal<
                              T[keyof T] & object
                          >
                      )
                    : derived

            cache.set(key, result)
            return result
        },
    }) as ReactiveSignal<T>
}

export function signal<T extends object>(
    initialValue: T
): ReactiveSignal<T>
export function signal<T>(initialValue: T): Signal<T>
export function signal<T>(
    initialValue: T
): Signal<T> | ReactiveSignal<T & object> {
    let value = initialValue
    const subscribers = new Set<Subscriber>()

    const base: Signal<T> = {
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

    if (
        typeof initialValue === "object" &&
        initialValue !== null
    )
        return makeReactive(base as Signal<T & object>)

    return base
}

export const isSignal = <T>(value: unknown): value is Signal<T> =>
    typeof value === "object" &&
    value !== null &&
    typeof (value as Signal<T>).get === "function" &&
    typeof (value as Signal<T>).set === "function" &&
    typeof (value as Signal<T>).subscribe === "function"

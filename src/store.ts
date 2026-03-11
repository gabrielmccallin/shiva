import { pubsub } from "./pubsub"

export const createStore = <T>(
    initial?: T,
    reducer?: (current: T, next: T) => T
) => {
    return pubsub<T>(initial, reducer)
}

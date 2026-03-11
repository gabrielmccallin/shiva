type Callback<T> = (state: T) => void
type Reducer<T> = (current: T, next: T) => T

export const pubsub = <T>(
    initial?: T,
    reducer?: Reducer<T>
): [(callback: Callback<T>) => void, (payload: T) => T] => {
    const callbacks: Callback<T>[] = []
    let state = initial as T

    const subscribe = (callback: Callback<T>) => {
        callbacks.push(callback)
        callback(state)
    }

    const publish = (payload: T) => {
        if (state) {
            if (reducer) {
                state = reducer(state, payload)
            } else {
                state = payload
            }
        } else {
            state = payload
        }
        callbacks.forEach((callback) =>
            callback(state)
        )
        return state
    }

    return [subscribe, publish]
}

export const pubsub = (initial?: any, reducer?: (current: any, next?:any) => void ) => {
    const callbacks = [];
    let state = initial;

    return [subscribe({callbacks, state}), publish({state, reducer, callbacks})];
};

export const publish = ({ state, reducer, callbacks }) => (payload) => {
    if (state) {
        if (reducer) {
            state = reducer(state, payload);
        } else {
            state = payload;
        }
    } else {
        state = payload;
    }
    callbacks.forEach((callback) => callback(state));
    return state;
};

export const subscribe = ({callbacks, state}) => (callback) => {
    callbacks.push(callback);
    callback(state);
};

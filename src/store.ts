import { subscribe, publish } from "./pubsub";

let state;
let reducer;
const callbacks = [];

export const createStore = (initial?: any, _reducer?: any) => {
    state = initial;
    reducer = _reducer;
    return [subscribe({ callbacks, state }), publish({ state, reducer, callbacks })];
};

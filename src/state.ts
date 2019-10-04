import { updateChildren } from './container';

export interface State {
    element?: HTMLElement;
    reducer?;
    setState?: (state) => void;
    subscribe?: (callback: (state) => void) => void;
    value?;
    attributes?: string[];
    events?;
    styles?: string[];
    properties?: string[];
}

export const updateState = (element, properties) => {
    Object.entries(properties)
        // property is attributes / style / properties, value should be an object
        .forEach(([property, valueObj]) => Object.entries(valueObj)
            .filter(([key, state]: [string, State]) => state.setState)
            // [['hiya', state]]
            .forEach(([key, state]: [string, State]) => {
                state.element = element;
                if (!state[property]) {
                    state[property] = [];
                }
                state[property].push(key);
                // TODO this is mutating property values
                properties[property][key] = state.reducer ? state.reducer(state.value) : state.value;
            })
        );
};

export const createState = <T, U>(
    initial: T | State,
    reducer?: (state) => U
): [(T extends U ? T : U), (state) => void] => {
    let callback: (state) => void;
    const state: State = {
        setState: newState => {
            setState(newState);
        },
        set subscribe(subscriberCallback) {
            callback = subscriberCallback;
        },
        get value() {
            return initial;
        },
        set value(newValue) {
            initial = newValue;
        },
        reducer
    };

    const setState = (newState) => statePropertyArraysSetState(state, newState, callback, reducer);

    if (initial && (<State>initial).setState) {
        (<State>initial).subscribe = newState => setState(newState);
    }

    return [state as (T extends U ? T : U), setState];
};

const statePropertyArraysSetState = (currentState, newState, callback, reducer?) => {
    const { element, attributes = [], style = [], properties = [] } = currentState;
    currentState.value = newState;

    const reducedState = reducer ? reducer(newState) : newState;

    attributes.map(attribute => element.setAttribute(attribute, reducedState));
    style.map(prop => element.style[prop] = reducedState);
    properties.map(prop => {
        if (prop === 'children') {
            updateChildren(element, reducedState);
        } else {
            element[prop] = reducedState;
        }
    });

    callback && callback(reducedState);
};

const isObject = (obj) => {
    return obj === Object(obj) && !Array.isArray(obj);
};

const deepState = (target: State | any = {}, src: State | any = {}): State => {
    Object.keys(src).forEach(key => {
        if (typeof src[key] === 'object' && !src[key].length) {
            target[key] = deepState(target[key], src[key]);
        } else {
            const [state] = createState(src[key]);
            target[key] = state;
        }
    });
    return target;
};

export const useState = <T, U>(
    initial: T | State,
    reducer?: (state) => U
): [(T extends U ? T : U), (state) => void] => {
    let cachedState;

    const updateAll = (stateObj) => {
        const deepUpdate = (cache, state) => {
            Object.keys(state).forEach(key => {
                if (typeof state[key] === 'object' && !state[key].length) {
                    deepUpdate(cache[key], state[key]);
                } else {
                    cache[key].setState(state[key]);
                }
            });
        };
        deepUpdate(cachedState, reducer ? reducer(stateObj) : stateObj);
    };

    if (isObject(initial) && !(<State>initial).setState) {
        cachedState = deepState(cachedState, initial);
        return [cachedState, updateAll];
    } else {
        return createState(initial, reducer);
    }
};

export const value = <T>(state: T): T => {
    const extractValues = (acc, nestedState) => {
        Object.entries(nestedState)
            .forEach(([key, stateValue]) => {
                if ((<State>stateValue).value) {
                    acc[key] = (<State>stateValue).value;
                } else {
                    acc[key] = {};
                    extractValues(acc[key], nestedState[key]);
                }
            });
        return acc;
    };

    if ((<State>state).value || (<State>state).value === 0 || (<State>state).value === '' || (<State>state).value === []) {
        return (<State>state).value;
    } else {
        return extractValues({}, state);
    }
};

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
            .filter(([key, value]: [string, State]) => value.setState)
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

export const createState = (
    value,
    reducer?: (state) => any
) => {
    let callback: (state) => void;
    const state: State = {
        // tslint:disable-next-line: no-shadowed-variable
        setState: state => {
            setState(state);
        },
        set subscribe(subscriberCallback) {
            callback = subscriberCallback;
        },
        get value() {
            return value;
        },
        set value(newValue) {
            value = newValue;
        },
        reducer
    };

    const setState = (newState) => statePropertyArraysSetState(state, newState, callback, reducer);

    if (value && (<State>value).setState) {
        (<State>value).subscribe = newState => setState(newState);
    }

    return [state, setState];
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
    return obj === Object(obj) && !obj.length;
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

export const useState = (
    value,
    reducer?: (state) => any
) => {
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

    if (isObject(value) && !(<State>value).setState) {
        cachedState = deepState(cachedState, value);
        return [cachedState, updateAll];
    } else {
        return createState(value, reducer);
    }
};

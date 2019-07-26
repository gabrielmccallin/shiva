import { removeAllChildren, appendChild } from './container';

export interface State {
    element?: HTMLElement;
    props?: Array<[string, string]>;
    reducer?: any;
    setState?: (state) => void;
    subscribe?: (callback: (state: any) => void) => void;
    value?: any;
}

export const checkForStateVariable = (
    props,
    element,
    type: 'prop' | 'attribute' | 'style'
) => {
    Object.entries(props)
        .filter(([key, value]: [string, State]) => value.setState)
        .forEach(([key, state]: [string, State]) => {
            state.props.push([key, type]);
            state.element = element;
            props[key] = state.reducer ? state.reducer(state.value) : state.value;
        });
};

export const useState = (
    value: State | any,
    reducer?: (state) => any
): [State, any] => {
    let callback: (state) => void;
    if (value && (<State>value).setState) {
        (<State>value).subscribe = newState => setState(newState);
    }

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
        reducer,
        props: []
    };

    const setState = newState => {
        const { element, props } = state;
        state.value = newState;

        const reducedState = reducer ? reducer(newState) : newState;

        props &&
            props.forEach(([key, type]) => {
                switch (type) {
                    case 'attribute':
                        element.setAttribute(key, reducedState);
                        break;
                    case 'style':
                        element.style[key] = reducedState;
                        break;
                    case 'prop':
                        if (key === 'children') {
                            removeAllChildren(element);
                            const child = typeof reducedState === 'string'
                            ? document.createTextNode(reducedState)
                            : reducedState;
                            appendChild(element, child);
                        } else {
                            element[key] = reducedState;
                        }
                        break;
                    default:
                        break;
                }
            });

        callback && callback(reducedState);
    };
    return [state, setState];
};
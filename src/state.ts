import { Primitive, removeAllChildren, appendChild } from './container';

export interface State {
    element?: HTMLElement;
    initial?: Primitive;
    props?: Array<[string, string]>;
    setState?: (state) => void;
    subscribe?: (callback: (state: any) => void) => void;
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
            props[key] = state.initial;
        });
};

export const useState = (
    initial: State | any,
    reducer?: (state) => any
): [State, any] => {
    let callback;
    if (initial && (<State>initial).setState) {
        (<State>initial).subscribe = newState => setState(newState);
    }

    const state: State = {
        // tslint:disable-next-line: no-shadowed-variable
        setState: state => {
            setState(state);
        },
        get initial() {
            return reducer && initial ? reducer(initial) : initial;
        },
        set subscribe(subscriberCallback) {
            callback = subscriberCallback;
        },
        props: []
    };

    const setState = newState => {
        const { element, props } = state;
        const reducedState = reducer && newState ? reducer(newState) : newState;

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
                            appendChild(element, reducedState);
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

import { State, checkForStateVariable } from './state';

export interface EventSchema {
    type: string;
    handler: (e) => void;
}

export interface Primitive {
    [key: string]: string | boolean | number | State;
}

type HTMLTagName = keyof HTMLElementTagNameMap;

type GenericOrState<T> = { [K in keyof T]?: T[K] | State };

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type ContainerSchema<T = HTMLElement> = Merge<
    GenericOrState<T>,
    {
        attributes?: Primitive;
        children?: HTMLElement[] | HTMLElement | State;
        events?: EventSchema[] | EventSchema;
        root?: boolean;
        style?: GenericOrState<Partial<CSSStyleDeclaration>>;
        tagName?: HTMLTagName;
    }
>;

export const removeAllChildren = (parent: HTMLElement) => {
    // TO DO Maybe don't use Object.values
    Object.values(parent.children).forEach((child: HTMLElement) =>
        child.remove()
    );
};

const addListener = (element: HTMLElement, event: { type; handler }) => {
    const { type, handler } = event;
    element.addEventListener(type, handler);
};

export const appendChild = (
    element: HTMLElement,
    children: HTMLElement[] | HTMLElement
) => {
    if (children instanceof Array) {
        children.forEach(child => element.appendChild(child));
    } else {
        if (element instanceof HTMLElement) element.appendChild(children);
    }
};

export const container = <T extends HTMLElement = HTMLElement>(
    {
        attributes = {},
        events = [],
        root = false,
        style = {},
        tagName = 'div',
        ...props
    }: ContainerSchema<T> = {} as ContainerSchema<T>
): T => {
    let element: HTMLElement;

    if (root) {
        if (document.querySelector('#app')) {
            element = document.querySelector('#app');
            removeAllChildren(element);
        } else {
            element = document.createElement('div');
            element.id = 'app';
            document.body.prepend(element);
        }
    } else {
        element = document.createElement(tagName as string);
    }

    checkForStateVariable(attributes, element, 'attribute');
    checkForStateVariable(props, element, 'prop');
    checkForStateVariable(style, element, 'style');

    if (events instanceof Array) {
        events.forEach(event => {
            addListener(element, event);
        });
    } else {
        addListener(element, events);
    }

    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value as string);
    });

    const { children = [], ...elementProps } = props;

    Object.assign(element, elementProps);

    appendChild(element, children as HTMLElement[] | HTMLElement);

    const styleElement = element as HTMLElement;
    Object.assign(styleElement.style, style);

    return element as T;
};

export const replaceChild = (parent: HTMLElement, children: HTMLElement) => {
    removeAllChildren(parent);
    appendChild(parent, children);
};

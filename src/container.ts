type omitted = "attributes" | "style" | "children" | "tagName";

export type ContainerOptions<K extends keyof HTMLElementTagNameMap = "div"> = Partial<
    Omit<HTMLElementTagNameMap[K], omitted>
> & {
    attributes?: { [key: string]: any };
    style?: Partial<CSSStyleDeclaration>;
    customElement?: string;
    tagName?: K;
    children?: any;
    root?: boolean;
};

export const container = <K extends keyof HTMLElementTagNameMap = "div">({
    customElement,
    root,
    tagName,
    ...props
}: ContainerOptions<K> = {}) => {
    const elementName = customElement ? customElement : tagName || "div";
    let element: HTMLElementTagNameMap[K];

    const config = { ...props };

    if (root) {
        if (document.querySelector("#app")) {
            element = document.querySelector("#app");
            element.innerHTML = "";
        } else {
            element = document.createElement(
                elementName
            ) as HTMLElementTagNameMap[K];
            element.id = "app";
            document.body.prepend(element);
        }
    } else {
        element = document.createElement(
            elementName
        ) as HTMLElementTagNameMap[K];
    }

    updateElement({ element, ...config });

    return element;
};

type UpdateContainerOptions<H = HTMLDivElement> = Partial<Omit<H, omitted>> & {
    attributes?: { [key: string]: any };
    style?: Partial<CSSStyleDeclaration>;
    element?: H;
    children?: HTMLElement | HTMLElement[];
};

export const updateElement = <H extends HTMLElement>({
    element,
    attributes = {},
    style = {},
    children = [],
    ...props
}: UpdateContainerOptions<H>) => {
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value as string);
    });

    Object.assign(element, props);
    Object.assign(element.style, style);

    const childrenArray = Array.isArray(children) ? children : [children];
    if (childrenArray.length > 0) {
        element.innerHTML = "";
        element.append(...childrenArray);
    }
};

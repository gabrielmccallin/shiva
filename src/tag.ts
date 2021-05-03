import { container, ContainerOptions } from "./container";

type TagOptions<K extends keyof HTMLElementTagNameMap = "div"> =
    | string
    | ContainerOptions<K>
    | HTMLElement[]
    | HTMLElement;

const chooseOption = <K extends keyof HTMLElementTagNameMap = "div">(
    option: TagOptions<K>
) => {
    if (typeof option === "string") return { textContent: option };

    if (typeof option === "object") {
        return { ...option };
    }
};

export const createOptions = <K extends keyof HTMLElementTagNameMap = "div">(
    ...options: TagOptions<K>[]
): ContainerOptions<K> => {
    let mergedOptions = {};
    let children = [];
    options.forEach((option) => {
        if (option instanceof Array) children = [...option];
        if (option instanceof HTMLElement) children = [...children, option];
        mergedOptions = { ...mergedOptions, ...chooseOption(option) };
    });

    if (children.length > 0) mergedOptions = { ...mergedOptions, children };

    return mergedOptions;
};

export const div = (...options: TagOptions[]) => {
    return container(createOptions(...options));
};

export const img = (...options: TagOptions<"img">[]) => {
    const mergedOptions = createOptions<"img">(...options);
    mergedOptions.tagName = "img";

    return container<"img">(mergedOptions);
};

export const p = (...options: TagOptions<"p">[]) => {
    const mergedOptions = createOptions<"p">(...options);
    mergedOptions.tagName = "p";

    return container<"p">(mergedOptions);
};

export const tag = <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    ...options: TagOptions<K>[]
) => {
    const mergedOptions = createOptions<K>(...options);
    mergedOptions.tagName = tagName;

    return container(mergedOptions);
};

import {
    container,
    ContainerOptions,
} from "./container"

type TagOptions<
    K extends keyof HTMLElementTagNameMap = "div"
> =
    | string
    | number
    | boolean
    | ContainerOptions<K>
    | HTMLElement[]
    | (HTMLElement | string)[]
    | HTMLElement

const chooseOption = <
    K extends keyof HTMLElementTagNameMap = "div"
>(
    option: TagOptions<K>
): ContainerOptions<K> => {
    if (typeof option === "string")
        return {
            textContent: option,
        } as ContainerOptions<K>

    if (typeof option === "object") {
        return {
            ...(option as ContainerOptions<K>),
        }
    }
}

export const createOptions = <
    K extends keyof HTMLElementTagNameMap = "div"
>(
    ...options: TagOptions<K>[]
): ContainerOptions<K> => {
    let mergedOptions: ContainerOptions<K> = {}
    let children = []
    options.forEach((option) => {
        if (option instanceof Array)
            children = [...option]
        if (option instanceof HTMLElement)
            children = [...children, option]
        mergedOptions = {
            ...mergedOptions,
            ...chooseOption(option),
        }
    })

    if (children.length > 0) {
        mergedOptions = {
            ...mergedOptions,
            children,
        }
        const textContent = children.reduce(
            (prev, current) => {
                if (typeof current === "string")
                    return prev + current
            },
            ""
        )
        mergedOptions.children = [
            ...mergedOptions.children,
            document.createTextNode(textContent),
        ]

        mergedOptions.children = children.filter(
            (child) =>
                typeof child !== "string" ||
                typeof child !== "object"
        )
    }

    return mergedOptions
}

export const div = (...options: TagOptions[]) => {
    return container(createOptions(...options))
}

const createContainer = <
    K extends keyof HTMLElementTagNameMap
>(
    tagName: keyof HTMLElementTagNameMap,
    options: TagOptions<K>[]
) => {
    const mergedOptions = createOptions<K>(
        ...options
    )
    mergedOptions.tagName = tagName as K

    return container<K>(mergedOptions)
}

export const img = (
    ...options: TagOptions<"img">[]
) => {
    return createContainer("img", options)
}

export const p = (
    ...options: TagOptions<"p">[]
) => {
    return createContainer("p", options)
}

export const h1 = (
    ...options: TagOptions<"h1">[]
) => {
    return createContainer("h1", options)
}

export const h2 = (
    ...options: TagOptions<"h2">[]
) => {
    return createContainer("h2", options)
}

export const h3 = (
    ...options: TagOptions<"h3">[]
) => {
    return createContainer("h3", options)
}

export const h4 = (
    ...options: TagOptions<"h4">[]
) => {
    return createContainer("h4", options)
}

export const h5 = (
    ...options: TagOptions<"h5">[]
) => {
    return createContainer("h5", options)
}

export const h6 = (
    ...options: TagOptions<"h6">[]
) => {
    return createContainer("h6", options)
}

export const b = (
    ...options: TagOptions<"b">[]
) => {
    return createContainer("b", options)
}

export const strong = (
    ...options: TagOptions<"strong">[]
) => {
    return createContainer("strong", options)
}

export const i = (
    ...options: TagOptions<"i">[]
) => {
    return createContainer("i", options)
}

export const em = (
    ...options: TagOptions<"em">[]
) => {
    return createContainer("em", options)
}

export const a = (
    ...options: TagOptions<"a">[]
) => {
    return createContainer("a", options)
}

export const ul = (
    ...options: TagOptions<"ul">[]
) => {
    return createContainer("ul", options)
}

export const ol = (
    ...options: TagOptions<"ol">[]
) => {
    return createContainer("ol", options)
}

export const li = (
    ...options: TagOptions<"li">[]
) => {
    return createContainer("li", options)
}

export const span = (
    ...options: TagOptions<"span">[]
) => {
    return createContainer("span", options)
}

export const br = (
    ...options: TagOptions<"br">[]
) => {
    return createContainer("br", options)
}

export const code = (
    ...options: TagOptions<"code">[]
) => {
    return createContainer("code", options)
}

export const pre = (
    ...options: TagOptions<"pre">[]
) => {
    return createContainer("pre", options)
}

export const button = (
    ...options: TagOptions<"button">[]
) => {
    return createContainer("button", options)
}

export const element = (
    tagName: keyof HTMLElementTagNameMap,
    ...options: TagOptions<
        keyof HTMLElementTagNameMap
    >[]
) => {
    return createContainer(tagName, options)
}

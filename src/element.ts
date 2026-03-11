import {
    container,
    ContainerOptions,
} from "./container"
import { Signal, isSignal } from "./signal"

export type ReactiveStyle = {
    [key: string]: string | Signal<string> | undefined
}

export type ReactiveAttributes = {
    [key: string]: string | Signal<string>
}

type ReactiveContainerOptions<
    K extends keyof HTMLElementTagNameMap = "div"
> = Omit<ContainerOptions<K>, "style" | "attributes"> & {
    style?: ReactiveStyle | Signal<ReactiveStyle>
    attributes?: ReactiveAttributes | Signal<ReactiveAttributes>
}

type TagOptions<
    K extends keyof HTMLElementTagNameMap = "div"
> =
    | string
    | number
    | boolean
    | Signal<string>
    | Signal<number>
    | Signal<string | number>
    | ReactiveContainerOptions<K>
    | HTMLElement[]
    | (HTMLElement | string)[]
    | HTMLElement

const chooseOption = <
    K extends keyof HTMLElementTagNameMap = "div"
>(
    option: TagOptions<K>
): ContainerOptions<K> => {
    if (isSignal(option))
        return {
            textContent: String(option.get()),
        } as ContainerOptions<K>

    if (typeof option === "string")
        return {
            textContent: option,
        } as ContainerOptions<K>

    if (
        option instanceof HTMLElement ||
        option instanceof Array
    )
        return {} as ContainerOptions<K>

    if (typeof option === "object") {
        const { style, attributes, ...rest } =
            option as ReactiveContainerOptions<K>

        const resolveStyle = (
            s: ReactiveStyle
        ): Partial<CSSStyleDeclaration> =>
            Object.fromEntries(
                Object.entries(s).map(([k, v]) => [
                    k,
                    isSignal(v) ? v.get() : v,
                ])
            ) as Partial<CSSStyleDeclaration>

        const resolvedStyle = style
            ? resolveStyle(
                  isSignal(style)
                      ? style.get()
                      : style
              )
            : undefined

        const resolveAttributes = (
            a: ReactiveAttributes
        ) =>
            Object.fromEntries(
                Object.entries(a).map(([k, v]) => [
                    k,
                    isSignal(v) ? v.get() : v,
                ])
            )

        const resolvedAttributes = attributes
            ? resolveAttributes(
                  isSignal(attributes)
                      ? attributes.get()
                      : attributes
              )
            : undefined

        return {
            ...(rest as unknown as ContainerOptions<K>),
            ...(resolvedStyle !== undefined && {
                style: resolvedStyle,
            }),
            ...(resolvedAttributes !== undefined && {
                attributes: resolvedAttributes,
            }),
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
        const elementChildren = children.filter(
            (child) => typeof child !== "string"
        )
        const textNodes = children
            .filter((child) => typeof child === "string")
            .map((text) => document.createTextNode(text))

        mergedOptions.children = [
            ...elementChildren,
            ...textNodes,
        ]
    }

    return mergedOptions
}

const createContainer = <
    K extends keyof HTMLElementTagNameMap
>(
    tagName: keyof HTMLElementTagNameMap,
    options: TagOptions<K>[]
) => {
    const containerOpts = {
        tagName: tagName as K,
    } as ContainerOptions<K>
    const orderedChildren: Node[] = []
    const reactiveOpts: ReactiveContainerOptions<K>[] =
        []

    const processItem = (
        item:
            | TagOptions<K>
            | string
            | HTMLElement
    ) => {
        if (isSignal(item)) {
            const textNode = document.createTextNode(
                String(item.get())
            )
            orderedChildren.push(textNode)
            item.subscribe(() => {
                textNode.textContent = String(
                    item.get()
                )
            })
        } else if (
            typeof item === "string" ||
            typeof item === "number" ||
            typeof item === "boolean"
        ) {
            orderedChildren.push(
                document.createTextNode(String(item))
            )
        } else if (item instanceof HTMLElement) {
            orderedChildren.push(item)
        } else if (item instanceof Array) {
            item.forEach((child) => processItem(child))
        } else if (
            typeof item === "object" &&
            item !== null
        ) {
            const { style, attributes, ...rest } =
                item as ReactiveContainerOptions<K>
            Object.assign(containerOpts, rest)
            reactiveOpts.push({
                style,
                attributes,
            } as ReactiveContainerOptions<K>)
        }
    }

    options.forEach((option) => processItem(option))

    if (orderedChildren.length > 0) {
        containerOpts.children = orderedChildren
    }

    const element = container<K>(containerOpts)

    const setStyle = (k: string, v: string) => {
        if (isNaN(Number(k))) {
            element.style.setProperty(
                k.replace(
                    /[A-Z]/g,
                    (m) => `-${m.toLowerCase()}`
                ),
                v
            )
        }
    }

    reactiveOpts.forEach(({ style, attributes }) => {
        if (isSignal(style)) {
            Object.entries(style.get()).forEach(
                ([k, v]) =>
                    setStyle(
                        k,
                        isSignal(v)
                            ? v.get()
                            : (v as string)
                    )
            )
            style.subscribe(() =>
                Object.entries(style.get()).forEach(
                    ([k, v]) =>
                        setStyle(
                            k,
                            isSignal(v)
                                ? v.get()
                                : (v as string)
                        )
                )
            )
        } else if (style) {
            Object.entries(style).forEach(([k, v]) => {
                if (isSignal(v)) {
                    setStyle(k, v.get())
                    v.subscribe(() => setStyle(k, v.get()))
                } else {
                    setStyle(k, v as string)
                }
            })
        }

        if (isSignal(attributes)) {
            Object.entries(attributes.get()).forEach(
                ([k, v]) =>
                    element.setAttribute(
                        k,
                        isSignal(v) ? v.get() : v
                    )
            )
            attributes.subscribe(() =>
                Object.entries(
                    attributes.get()
                ).forEach(([k, v]) =>
                    element.setAttribute(
                        k,
                        isSignal(v) ? v.get() : v
                    )
                )
            )
        } else if (attributes) {
            Object.entries(attributes).forEach(
                ([k, v]) => {
                    if (isSignal(v)) {
                        element.setAttribute(k, v.get())
                        v.subscribe(() =>
                            element.setAttribute(
                                k,
                                v.get()
                            )
                        )
                    } else {
                        element.setAttribute(k, v)
                    }
                }
            )
        }
    })

    return element
}

export const div = (...options: TagOptions[]) => {
    return createContainer("div", options)
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

import {
    button,
    code,
    div,
    h2,
    h3,
    p,
    pre,
    signal,
} from "shiva"

export const reactive = () => {
    const count = signal<string | number>(0)
    const color = signal("royalblue")
    const dataCount = signal("0")

    const increment = () => {
        count.set((count.get() as number) + 1)
    }

    const incrementAttr = () => {
        dataCount.set(
            String(Number(dataCount.get()) + 1),
        )
    }

    const colours = [
        "crimson",
        "royalblue",
        "seagreen",
        "darkorange",
        "mediumpurple",
    ]

    const cycleColor = () => {
        const next =
            (colours.indexOf(color.get()) + 1) %
            colours.length
        color.set(colours[next])
    }

    return div(
        h2("Reactive signals"),
        p(
            "Pass a ",
            code("signal()"),
            " to any element — the DOM updates automatically when the value changes.",
        ),
        h3("Reactive text"),
        pre(`import { signal, p, code } from "shiva"

const count = signal(0)
const counter = p(code(count))

count.set(1) // counter now shows "1"`),
        p("Live example:"),
        p(code(count)),
        button("increment", {
            onclick: increment,
        }),
        h3("Reactive style"),
        pre(`import { signal, div } from "shiva"

const color = signal("royalblue")
const el = div("hello", { style: { color } })

color.set("crimson") // only color updates`),
        p("Live example:"),
        div("hello", {
            style: {
                color,
                fontWeight: "bold",
                fontSize: "1.5rem",
            },
        }),
        button("cycle colour", {
            onclick: cycleColor,
        }),
        h3("Reactive attributes"),
        pre(`import { signal, div } from "shiva"

const dataCount = signal("0")
const el = div("hello", { attributes: { "data-count": dataCount } })

dataCount.set("1") // only data-count updates`),
        p("Live example:"),
        div("data-count is ", dataCount, {
            attributes: {
                "data-count": dataCount,
            },
        }),
        p(
            "Inspect the element above — ",
            code("data-count"),
            " updates when you click increment.",
        ),
        button("increment", {
            onclick: incrementAttr,
        }),
    )
}

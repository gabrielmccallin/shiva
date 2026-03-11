import {
    button,
    code,
    div,
    p,
    signal,
} from "shiva"
import type { Signal } from "../../src/signal"

type ReactiveStyle = Partial<
    Record<
        keyof CSSStyleDeclaration,
        string | Signal<string>
    >
>

const count = signal<string | number>(0)
const style = signal<ReactiveStyle>({
    fontSize: "2rem",
    color: "white",
})

export const counter = () => {
    const incrementCount = () => {
        const next = (count.get() as number) + 1
        count.set(next)
        const colours = [
            "crimson",
            "royalblue",
            "seagreen",
            "darkorange",
            "mediumpurple",
        ]
        style.set({
            color: colours[next % colours.length],
        })
    }

    const resetCount = () => {
        count.set(0)
        style.set({
            color: "white",
        })
    }

    return div(
        p(
            code(count, {
                style,
            }),
        ),
        div(
            button(
                "click me to increment the count and change the colour",
                {
                    onclick: incrementCount,
                },
            ),
            button("reset", {
                onclick: resetCount,
            }),
            {
                style: {
                    display: "flex",
                    gap: "0.5rem",
                },
            },
        ),
    )
}

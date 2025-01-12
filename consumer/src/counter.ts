import {
    button,
    code,
    div,
    p,
} from "../../src/shiva"

let count = 0

export const counter = () => {
    const incrementCount = () => {
        count++
        element.replaceWith(counter())
    }

    const element = div(
        p(
            code(count.toString(), {
                style: { fontSize: "2rem" },
            })
        ),
        button(
            "click me to increment the count ⬇️",
            {
                onclick: incrementCount,
            }
        )
    )

    return element
}

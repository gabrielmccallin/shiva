import { div, h2, p } from "../../src/shiva"

export const counterExample = () => {
    return div(
        h2("Counter Example"),
        p(
            "This is a simple counter example showing how to update the DOM with shiva."
        )
    )
}

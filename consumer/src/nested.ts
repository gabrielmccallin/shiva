import {
    code,
    div,
    h2,
    p,
    pre,
    span,
    strong,
} from "../../src/shiva"

export const nested = () =>
    div([
        h2("Nested"),
        p(
            "Nested elements are easy to construct:"
        ),
        pre(`import { div } from "shiva"

const nestedHTMLDivElement = div(
    div("Hi there 👋"),
    div("Hi there 👋"),
)`),
        p("This will produce:"),
        pre(`<div>
    <div>Hi there 👋</div>
    <div>Hi there 👋</div>
</div>`),
        p(
            strong(code("shiva")),
            span(
                "will append HTML elements if they are passed as an argument. It will set `textContent` on the element if a string is passed."
            )
        ),
    ])

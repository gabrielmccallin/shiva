import {
    code,
    div,
    h2,
    p,
    pre,
    span,
    strong,
} from "shiva"

export const aim = () =>
    div([
        h2("Aim"),
        p(
            strong(code("shiva")),
            span(
                " wraps the DOM API with a functional syntax for creating and composing HTML elements.",
            ),
        ),
        p("So instead of:"),
        pre("<div>Hi there 👋</div>"),
        p(
            strong(code("shiva")),
            span(" provides a function called "),
            code("div()"),
            span(":"),
        ),
        pre(`import { div } from "shiva"

const HTMLDivElement = div("Hi there 👋")`),
        p(
            span(
                "This will create the same element as the ",
            ),
            code("html"),
            span(" version."),
        ),
    ])

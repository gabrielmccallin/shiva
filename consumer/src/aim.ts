import {
    code,
    div,
    h2,
    p,
    pre,
    span,
    strong,
} from "../../src/shiva"

export const aim = () =>
    div([
        h2("Aim"),
        p(
            span("The aim of"),
            strong(code("shiva")),
            span(
                "is to use JavaScript to create HTML elements without HTML. It abstracts the DOM JavaScript API for a declarative and easy to use syntax."
            )
        ),
        p("So instead of:"),
        pre("<div>Hi there 👋</div>"),
        p(
            strong(code("shiva")),
            span("provides a function called "),
            code("div()"),
            span(":")
        ),
        pre(`import { div } from "shiva"

const HTMLDivElement = div("Hi there 👋")`),
        p(
            span(
                "This will create the same element as the "
            ),
            code("html"),
            span("version.")
        ),
    ])

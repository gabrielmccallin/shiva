import {
    code,
    div,
    h2,
    li,
    p,
    pre,
    span,
    strong,
    ul,
} from "../../src/shiva"

export const elements = () =>
    div([
        h2("Elements"),
        p(
            span(strong(code("shiva"))),
            span("provides:")
        ),
        ul(
            li(code("div()")),
            li(code("img()")),
            li(code("p()")),
            li(code("h1()")),
            li(code("h2()")),
            li(code("h3()")),
            li(code("h4()")),
            li(code("h5()")),
            li(code("h6()")),
            li(code("b()")),
            li(code("strong()")),
            li(code("i()")),
            li(code("em()")),
            li(code("a()")),
            li(code("ul()")),
            li(code("ol()")),
            li(code("li()")),
            li(code("span()")),
            li(code("br()")),
            li(code("code()")),
            li(code("pre()")),
            li(code("button()"))
        ),
        p(
            span(
                "To create other HTML elements not included in the API,"
            ),
            strong(code("shiva")),
            span("provides a more generic"),
            strong(code("element()")),
            span("function.")
        ),
        pre(`import { element } from "shiva"

const HTMLButtonElement = element("button", "Click me ⬇️")`),
        p(
            "Any HTML element, including custom elements, can be created."
        ),
    ])

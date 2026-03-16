import { code, h2, p, pre } from "shiva"

export const mixedContent = () => [
    h2("Mixed content"),
    p(
        "Strings, elements, and signals can be mixed freely as arguments. Order is preserved:",
    ),
    pre(`import { p, code } from "shiva"

const sentence = p("The value is ", code("42"), " and that's final.")`),
    p("Live example:"),
    p(
        "The value is ",
        code("42"),
        " and that's final.",
    ),
]

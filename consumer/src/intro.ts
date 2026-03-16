import { code, h1, p, strong } from "shiva"

export const intro = () => [
    h1("shiva example"),
    p([
        strong(code("shiva")),
        " is a minimal JavaScript library for building reactive user interfaces - no templates, no virtual DOM.",
    ]),
]

import {
    code,
    div,
    h1,
    p,
    strong,
} from "../../src/shiva"

export const intro = () =>
    div([
        h1("shiva example"),
        p([
            strong(code("shiva")),
            "is a minimal JavaScript library for building user interfaces.",
        ]),
    ])

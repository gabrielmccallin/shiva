import { div, h2, pre } from "../../src/shiva"

export const attributes = () =>
    div([
        h2("Attributes"),
        pre(`import { div } from "shiva"

const handler = () => {
    console.log("handled it 👊")
}

const superDiv = div("Hi there 👋", { 
    onclick: handler,
    class: style,
    id: "Super Div 🦸‍♂️",
    style: {
        fontSize: "3rem"
    }
})`),
    ])

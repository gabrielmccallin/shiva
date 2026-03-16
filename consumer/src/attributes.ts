import { h2, pre } from "shiva"

export const attributes = () => [
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
]

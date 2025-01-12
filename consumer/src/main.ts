import { div } from "../../src/shiva"
import { aim } from "./aim"
import { attributes } from "./attributes"
import { counter } from "./counter"
import { counterExample } from "./counter-example"
import { elements } from "./elements"
import { intro } from "./intro"
import { nested } from "./nested"

div(
    {
        root: true,
    },
    intro(),
    aim(),
    nested(),
    attributes(),
    elements(),
    counterExample(),
    counter()
)

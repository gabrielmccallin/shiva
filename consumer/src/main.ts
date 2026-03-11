import { div } from "shiva"
import { aim } from "./aim"
import { attributes } from "./attributes"
import { elements } from "./elements"
import { intro } from "./intro"
import { nested } from "./nested"
import { reactive } from "./reactive"

div(
    {
        root: true,
    },
    intro(),
    aim(),
    nested(),
    attributes(),
    elements(),
    reactive(),
)

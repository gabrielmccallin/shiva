import { div } from "shiva"
import { aim } from "./aim"
import { attributes } from "./attributes"
import { elements } from "./elements"
import { intro } from "./intro"
import { mixedContent } from "./mixed-content"
import { nested } from "./nested"
import { reactive } from "./reactive"

div(
    {
        root: true,
    },
    intro(),
    aim(),
    nested(),
    mixedContent(),
    attributes(),
    elements(),
    reactive(),
)

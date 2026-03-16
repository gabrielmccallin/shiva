import { code, h2, p, pre, strong } from "shiva"

export const aim = () => {
    const aimData = {
        heading: "Aim",
        description:
            " wraps the DOM API with a functional syntax for creating and composing HTML elements.",
        soInsteadOf: "So instead of:",
        htmlExample: "<div>Hi there 👋</div>",
        providesFunction:
            " provides a function called ",
        codeExample: `import { div } from "shiva"
    
    const HTMLDivElement = div("Hi there 👋")`,
        conclusion:
            "This will create the same element as the ",
    }

    const {
        heading,
        description,
        soInsteadOf,
        htmlExample,
        providesFunction,
        codeExample,
        conclusion,
    } = aimData

    return [
        h2(heading),
        p(strong(code("shiva")), description),
        p(soInsteadOf),
        pre(htmlExample),
        p(
            strong(code("shiva")),
            providesFunction,
            code("div()"),
            ":",
        ),
        pre(codeExample),
        p(conclusion, code("html"), " version."),
    ]
}

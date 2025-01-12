import { container } from "./container"
import {
    div,
    p,
    img,
    createOptions,
    element,
} from "./element"

describe("create options", () => {
    it("should return an object with textContent", () => {
        const fixture = "hello"

        const expected = {
            textContent: fixture,
        }

        expect(createOptions(fixture)).toEqual(
            expected
        )
    })

    it("should return an object with color blue", () => {
        const fixture = {
            style: {
                color: "blue",
            },
        }

        const expected = {
            style: {
                color: "blue",
            },
        }

        expect(createOptions(fixture)).toEqual(
            expected
        )
    })

    it("should return an object with children", () => {
        const fixture = container()

        const expected = {
            children: fixture,
        }

        expect(
            createOptions(fixture)
        ).toHaveProperty("children")
    })

    it("should return an object with textContent and children", () => {
        const fixture = {
            textContent: "hello",
            children: container(),
        }

        const options = createOptions(
            fixture.textContent,
            fixture.children
        )

        expect(options).toHaveProperty("children")
        expect(options).toHaveProperty(
            "textContent"
        )
    })

    it("should return an object with textContent and children", () => {
        const fixture = {
            textContent: "hello",
            children: container(),
        }

        const options = createOptions(
            fixture.children,
            fixture.textContent
        )

        expect(options).toHaveProperty("children")
        expect(options).toHaveProperty(
            "textContent"
        )
    })

    it("should return an object with parameters (children, textContent and color blue)", () => {
        const fixture = {
            textContent: "hello",
            children: container(),
            options: {
                style: {
                    color: "blue",
                },
            },
        }

        const options = createOptions(
            fixture.children,
            fixture.textContent,
            fixture.options
        )

        expect(options).toHaveProperty("children")
        expect(options).toHaveProperty(
            "textContent"
        )
        expect(options.style).toEqual(
            fixture.options.style
        )
    })

    it("should return an object with parameters (textContent, children and color blue)", () => {
        const fixture = {
            textContent: "hello",
            children: container(),
            options: {
                style: {
                    color: "blue",
                },
            },
        }

        const options = createOptions(
            fixture.textContent,
            fixture.children,
            fixture.options
        )

        expect(options).toHaveProperty("children")
        expect(options).toHaveProperty(
            "textContent"
        )
        expect(options.style).toEqual(
            fixture.options.style
        )
    })
})

describe("div", () => {
    it("should have textContent", () => {
        const fixture = "hello"
        const testDiv = div({
            textContent: fixture,
        })

        expect(testDiv.textContent).toEqual(
            fixture
        )
    })

    it("should have textContent with just text passed", () => {
        const fixture = "hello"
        const testDiv = div(fixture)

        expect(testDiv.textContent).toEqual(
            fixture
        )
    })

    it("should have child", () => {
        const testDiv = div(
            div({
                textContent: "hello",
            }),
            {
                style: {
                    color: "blue",
                },
            }
        )

        expect(testDiv.children.length).toEqual(1)
        expect(
            testDiv.children[0].textContent
        ).toEqual("hello")
        expect(testDiv.style.color).toEqual(
            "blue"
        )
    })

    it("should have children with just text passed", () => {
        const testDiv = div(
            div("first"),
            div("second")
        )

        expect(testDiv.children.length).toEqual(2)
        expect(
            testDiv.children[0].textContent
        ).toEqual("first")
        expect(
            testDiv.children[1].textContent
        ).toEqual("second")
    })
})

describe("img", () => {
    const fixture = {
        src: "image.jpg",
        colour: "red",
        tag: "IMG",
    }
    it(`should be an img`, () => {
        const element = img({
            attributes: {
                src: fixture.src,
            },
            style: {
                color: fixture.colour,
            },
        })
        expect(element.tagName).toEqual(
            fixture.tag
        )
    })
})

describe("p", () => {
    const fixture = {
        tag: "P",
    }
    it(`should be a p`, () => {
        const element = p()
        expect(element.tagName).toEqual(
            fixture.tag
        )
    })
})

describe("element", () => {
    const fixture = {
        tag: "P",
    }
    it(`should be a p`, () => {
        const p = element("p")
        expect(p.tagName).toEqual(fixture.tag)
    })

    it("should have children with just text passed", () => {
        const p = element(
            "p",
            div("first"),
            div("second")
        )

        expect(p.children.length).toEqual(2)
        expect(p.children[0].textContent).toEqual(
            "first"
        )
        expect(p.children[1].textContent).toEqual(
            "second"
        )
    })

    it("should have textContent with just text passed", () => {
        const fixture = "hello"
        const p = element("p", fixture)

        expect(p.textContent).toEqual(fixture)
    })
})

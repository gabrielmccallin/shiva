import { container } from "./container"
import {
    div,
    p,
    img,
    createOptions,
    element,
    type ReactiveAttributes,
    type ReactiveStyle,
} from "./element"
import { signal } from "./signal"

describe("create options", () => {
    it("should return an object with textContent", () => {
        const fixture = "hello"

        const expected = {
            textContent: fixture,
        }

        expect(createOptions(fixture)).toEqual(
            expected,
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
            expected,
        )
    })

    it("should return an object with children", () => {
        const fixture = container()

        const expected = {
            children: fixture,
        }

        expect(
            createOptions(fixture),
        ).toHaveProperty("children")
    })

    it("should return an object with textContent and children", () => {
        const fixture = {
            textContent: "hello",
            children: container(),
        }

        const options = createOptions(
            fixture.textContent,
            fixture.children,
        )

        expect(options).toHaveProperty("children")
        expect(options).toHaveProperty(
            "textContent",
        )
    })

    it("should return an object with textContent and children", () => {
        const fixture = {
            textContent: "hello",
            children: container(),
        }

        const options = createOptions(
            fixture.children,
            fixture.textContent,
        )

        expect(options).toHaveProperty("children")
        expect(options).toHaveProperty(
            "textContent",
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
            fixture.options,
        )

        expect(options).toHaveProperty("children")
        expect(options).toHaveProperty(
            "textContent",
        )
        expect(options.style).toEqual(
            fixture.options.style,
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
            fixture.options,
        )

        expect(options).toHaveProperty("children")
        expect(options).toHaveProperty(
            "textContent",
        )
        expect(options.style).toEqual(
            fixture.options.style,
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
            fixture,
        )
    })

    it("should have textContent with just text passed", () => {
        const fixture = "hello"
        const testDiv = div(fixture)

        expect(testDiv.textContent).toEqual(
            fixture,
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
            },
        )

        expect(testDiv.children.length).toEqual(1)
        expect(
            testDiv.children[0].textContent,
        ).toEqual("hello")
        expect(testDiv.style.color).toEqual(
            "blue",
        )
    })

    it("should have children with just text passed", () => {
        const testDiv = div(
            div("first"),
            div("second"),
        )

        expect(testDiv.children.length).toEqual(2)
        expect(
            testDiv.children[0].textContent,
        ).toEqual("first")
        expect(
            testDiv.children[1].textContent,
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
            fixture.tag,
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
            fixture.tag,
        )
    })
})

describe("signal as textContent", () => {
    it("should render initial signal value", () => {
        const s = signal<string | number>("hello")
        const el = p(s)
        expect(el.textContent).toBe("hello")
    })

    it("should update textContent when signal changes", () => {
        const s = signal<string | number>(0)
        const el = p(s)
        s.set(5)
        expect(el.textContent).toBe("5")
    })
})

describe("reactive style", () => {
    it("should apply initial style from signal", () => {
        const color = signal("crimson")
        const el = div("hi", { style: { color } })
        expect(el.style.color).toBe("crimson")
    })

    it("should update style property when signal changes", () => {
        const color = signal("crimson")
        const el = p("hi", { style: { color } })
        color.set("royalblue")
        expect(el.style.color).toBe("royalblue")
    })

    it("should update all styles when whole-object style signal changes", () => {
        const style = signal<ReactiveStyle>({
            color: "red",
        })
        const el = p("hi", { style })
        style.set({ color: "blue" })
        expect(el.style.color).toBe("blue")
    })
})

describe("reactive attributes", () => {
    it("should apply initial attribute from signal", () => {
        const src = signal("image.jpg")
        const el = img({ attributes: { src } })
        expect(el.getAttribute("src")).toBe(
            "image.jpg",
        )
    })

    it("should update attribute when signal changes", () => {
        const src = signal("image.jpg")
        const el = img({ attributes: { src } })
        src.set("other.jpg")
        expect(el.getAttribute("src")).toBe(
            "other.jpg",
        )
    })

    it("should update all attributes when whole-object attributes signal changes", () => {
        const attrs = signal<ReactiveAttributes>({
            src: "a.jpg",
        })
        const el = img({ attributes: attrs })
        attrs.set({ src: "b.jpg" })
        expect(el.getAttribute("src")).toBe(
            "b.jpg",
        )
    })
})

describe("reactive signal object field as child", () => {
    it("should render initial field value from signal(object)", () => {
        const { heading } = signal({ heading: "Aim" })
        const el = p(heading)
        expect(el.textContent).toBe("Aim")
    })

    it("should update when field signal is set", () => {
        const { heading } = signal({ heading: "Aim" })
        const el = p(heading)
        heading.set("reactive!")
        expect(el.textContent).toBe("reactive!")
    })

    it("should update when parent signal is set", () => {
        const s = signal({ heading: "Aim" })
        const { heading } = s
        const el = p(heading)
        s.set({ heading: "updated" })
        expect(el.textContent).toBe("updated")
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
            div("second"),
        )

        expect(p.children.length).toEqual(2)
        expect(p.children[0].textContent).toEqual(
            "first",
        )
        expect(p.children[1].textContent).toEqual(
            "second",
        )
    })

    it("should have textContent with just text passed", () => {
        const fixture = "hello"
        const p = element("p", fixture)

        expect(p.textContent).toEqual(fixture)
    })
})

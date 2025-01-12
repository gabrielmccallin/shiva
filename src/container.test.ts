import {
    container,
    updateElement,
} from "./container"

describe("typed container", () => {
    it("should return a HTMLAnchorElement", () => {
        const wrapper = container({
            tagName: "a",
        })
        expect(wrapper.tagName).toBe("A")
    })

    it("should return a HTMLImageElement", () => {
        const wrapper = container({
            tagName: "img",
        })
        expect(wrapper.tagName).toBe("IMG")
    })

    it("should return a HTMLDivElement", () => {
        const wrapper = container()
        expect(wrapper.tagName).toBe("DIV")
    })

    it("should return a custom element", () => {
        const wrapper = container({
            customElement: "hello",
        })
        expect(wrapper.tagName).toBe("HELLO")
    })

    it("should return a div with attributes", () => {
        const fixture = {
            hello: "hello",
            "data-id": "data-test-id",
            id: "id",
        }
        const wrapper = container({
            attributes: fixture,
        })

        Object.entries(fixture).forEach(
            ([key, value]) => {
                expect(
                    wrapper.getAttribute(key)
                ).toEqual(value)
            }
        )
    })

    it("should return a container with textContent", () => {
        const fixture = "hello"
        const wrapper = container({
            textContent: fixture,
        })

        expect(wrapper.textContent).toEqual(
            fixture
        )
    })

    it("should return a container with NO textContent", () => {
        const wrapper = container()
        expect(wrapper.textContent).toEqual("")
    })

    it("should call a function when container clicked", () => {
        const clicked = jest.fn()

        const wrapper = container({
            onclick: clicked,
        })

        const element =
            document.createElement("div")
        const props = { onclick: clicked }
        Object.assign(element, props)

        wrapper.click()
        expect(clicked).toHaveBeenCalled()
    })

    it("should add style", () => {
        const wrapper = container({
            style: {
                color: "green",
            },
        })

        expect(wrapper.style.color).toEqual(
            "green"
        )
    })

    it("should add class", () => {
        const wrapper = container({
            className: "hello",
        })

        expect(wrapper.className).toEqual("hello")
    })

    it("create container with children", () => {
        const children = [
            container({ textContent: "1" }),
            container({ textContent: "2" }),
        ]

        const testContainer = container({
            children,
        })

        expect(
            testContainer.children.length
        ).toEqual(2)
        expect(
            testContainer.children[0].textContent
        ).toEqual("1")
        expect(
            testContainer.children[1].textContent
        ).toEqual("2")
    })

    it("create container with child", () => {
        const children = container({
            textContent: "1",
        })

        const testContainer = container({
            children,
        })

        expect(
            testContainer.children[0].textContent
        ).toEqual("1")
    })

    it("should create container with children and overwrite textContent", () => {
        const children = [
            container({ textContent: "1" }),
            container({ textContent: "2" }),
        ]

        const fixture = {
            textContent: "I should not be here",
            children,
        }

        const testContainer = container(fixture)

        expect(
            testContainer.children.length
        ).toEqual(2)
        expect(
            testContainer.children[0].textContent
        ).toEqual("1")
        expect(
            testContainer.children[1].textContent
        ).toEqual("2")
    })

    it("create container with multiple properties", () => {
        const style = {
            color: "blue",
            fontSize: "2rem",
        }

        const fixture = {
            innerText: "hiya!",
            id: "wow",
            style,
        }

        const testContainer = container(fixture)

        expect(
            testContainer.style.fontSize
        ).toEqual(style.fontSize)
        expect(testContainer.innerText).toEqual(
            fixture.innerText
        )
        expect(testContainer.style.color).toEqual(
            style.color
        )
        expect(
            testContainer.getAttribute("id")
        ).toEqual(fixture.id)
    })

    it("create container with HTMLElement children and textNodes", () => {
        const testContainer = container({
            children: [
                "Hello",
                container({ textContent: "2" }),
            ],
        })

        expect(
            testContainer.childNodes[0]
                .textContent
        ).toEqual("Hello")
        expect(
            testContainer.children.length
        ).toEqual(1)
        expect(
            testContainer.children[0].textContent
        ).toEqual("2")
        expect(
            testContainer.children[0].tagName
        ).toEqual("DIV")
        expect(
            testContainer.hasChildNodes()
        ).toBeTruthy()
    })

    it("create container with one textNode", () => {
        const testContainer = container({
            children: "Hello",
        })

        expect(
            testContainer.childNodes[0]
                .textContent
        ).toEqual("Hello")
        expect(
            testContainer.hasChildNodes()
        ).toBeTruthy()
    })

    it("update container with new properties", () => {
        const config = {
            src: "hello",
            textContent: "hello",
            style: {
                color: "green",
            },
        }

        const element = container()

        updateElement({ element, ...config })

        expect(element.style.color).toEqual(
            config.style.color
        )
    })
})

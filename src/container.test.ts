import { container, ContainerSchema, appendChild } from './container';
import { useState } from './state';

describe('container', () => {
    it('append child', () => {
        const testContainer = container({
            textContent: 'hello'
        });

        const textNode = document.createTextNode(' there');

        testContainer.appendChild(textNode);
        expect(testContainer.textContent).toEqual('hello there');
    });

    it('create container with properties', () => {
        const textContentFixture = 'hello';

        const testContainer = container({
            textContent: textContentFixture
        });

        expect(testContainer.textContent).toEqual(textContentFixture);
    });

    it('create container with multiple properties', () => {
        const style = {
            color: 'blue',
            fontSize: '2rem'
        };

        const fixture: ContainerSchema = {
            innerText: 'hiya!',
            id: 'wow',
            style
        };

        const testContainer = container(fixture);

        expect(testContainer.style.fontSize).toEqual(style.fontSize);
        expect(testContainer.innerText).toEqual(fixture.innerText);
        expect(testContainer.style.color).toEqual(style.color);
        expect(testContainer.getAttribute('id')).toEqual(fixture.id);
    });

    it('create container with custom attributes', () => {
        const fixture: ContainerSchema = {
            attributes: {
                ['data-test-id']: 'wow'
            }
        };

        const testContainer = container(fixture);

        expect(testContainer.getAttribute('data-test-id')).toEqual(
            fixture.attributes['data-test-id']
        );
    });

    it('create container with children', () => {
        const children = [
            container<HTMLElement>({ textContent: '1' }),
            container<HTMLElement>({ textContent: '2' })
        ];

        const fixture: ContainerSchema = {
            textContent: 'hello',
            children
        };

        const testContainer = container(fixture);

        expect(testContainer.childNodes[0].textContent).toEqual('hello');
        expect(testContainer.children.length).toEqual(2);
        expect(testContainer.children[0].textContent).toEqual('1');
        expect(testContainer.children[1].textContent).toEqual('2');
        expect(testContainer.hasChildNodes()).toBeTruthy();
    });

    it('create container with HTMLElement children and textNodes', () => {
        const testContainer = container({
            children: [
                'Hello',
                container<HTMLElement>({ textContent: '2' })
            ]
        });

        expect(testContainer.childNodes[0].textContent).toEqual('Hello');
        expect(testContainer.children.length).toEqual(1);
        expect(testContainer.children[0].textContent).toEqual('2');
        expect(testContainer.children[0].tagName).toEqual('DIV');
        expect(testContainer.hasChildNodes()).toBeTruthy();
    });

    it('create container with one textNode', () => {
        const testContainer = container({
            children: 'Hello'
        });

        expect(testContainer.childNodes[0].textContent).toEqual('Hello');
        expect(testContainer.hasChildNodes()).toBeTruthy();
    });

    it('create container with attribute', () => {
        const testContainer = container({
            id: 'hello',
            attributes: {
                value: 'asdf'
            }
        });

        expect(testContainer.getAttribute('id')).toEqual('hello');
    });

    it('create container with className', () => {
        const testContainer = container({
            style: {
                fontSize: '1rem'
            },
            className: 'wow'
        });

        expect(testContainer.className).toEqual('wow');
        expect(testContainer.style.fontSize).toEqual('1rem');
    });

    it('create container with properties', () => {
        const textContentFixture = 'hello';

        const testContainer = container({
            textContent: textContentFixture
        });

        expect(testContainer.textContent).toEqual(textContentFixture);
    });

    it('create input with properties', () => {
        const testContainer = container<HTMLInputElement>({
            tagName: 'input',
            value: 'hello'
        });

        expect(testContainer.value).toEqual('hello');
    });
});

describe('events', () => {
    it('set eventlistener', () => {
        const clickHandler = jest.fn();

        const testContainer = container({
            events: {
                handler: clickHandler,
                type: 'wow'
            }
        });

        const event = new Event('wow');
        testContainer.dispatchEvent(event);

        expect(clickHandler).toBeCalled();
    });
});

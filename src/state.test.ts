import { useState } from './state';
import { container } from './container';

describe('state', () => {
    it('create container with state children', () => {
        const [children, setChildren] = useState([
            container({ textContent: '1' }),
            container({ textContent: '2' })
        ]);

        const testContainer = container({
            children
        });

        expect(testContainer.children.length).toEqual(2);
        expect(testContainer.childNodes[0].textContent).toEqual('1');
        expect(testContainer.childNodes[1].textContent).toEqual('2');
        expect(testContainer.hasChildNodes()).toBeTruthy();
    });

    it('update container with state children', () => {
        const [children, setChildren] = useState([
            container({ textContent: '1' }),
            container({ textContent: '2' })
        ]);

        const testContainer = container({
            children
        });

        setChildren([container({ textContent: 'NEW' })]);

        expect(testContainer.children.length).toEqual(1);
        expect(testContainer.childNodes[0].textContent).toEqual('NEW');
        expect(testContainer.childNodes[1]).toBeUndefined();
        expect(testContainer.hasChildNodes()).toBeTruthy();
    });

    it('update container with state variable', () => {
        const fixture = {
            textContent: 'hello',
            updateTextContent: 'there'
        };

        const [text, setText] = useState(fixture.textContent);

        const testContainer = container({
            textContent: text
        });

        setText(fixture.updateTextContent);
        expect(testContainer.textContent).toEqual(fixture.updateTextContent);
    });

    it('update multiple container properties with the same state', () => {
        const fixture = {
            textContent: 'hello',
            updateTextContent: 'there'
        };

        const [text, setText] = useState(fixture.textContent);

        const testContainer = container({
            textContent: text,
            contentEditable: text,
            attributes: {
                hiya: text
            }
        });

        setText(fixture.updateTextContent);
        expect(testContainer.textContent).toEqual(fixture.updateTextContent);
        expect(testContainer.contentEditable).toEqual(
            fixture.updateTextContent
        );
        expect(testContainer.getAttribute('hiya')).toEqual(
            fixture.updateTextContent
        );
    });

    it('create container with state attribute', () => {
        const [attr, setAttr] = useState('hello');

        const testContainer = container({
            id: attr
        });

        expect(testContainer.getAttribute('id')).toEqual('hello');
    });

    it('update container with state attribute', () => {
        const fixture = {
            initial: 'hello',
            updated: 'blue'
        };

        const [attr, setAttr] = useState(fixture.initial);

        const testContainer = container({
            attributes: {
                hiya: attr
            },
            style: {
                color: attr
            }
        });

        setAttr(fixture.updated);
        expect(testContainer.getAttribute('hiya')).toEqual(fixture.updated);
        expect(testContainer.style.color).toEqual(fixture.updated);
    });

    it('update container with className', () => {
        const fixture = {
            initial: 'wow',
            update: 'hey!'
        };
        const [className, setClassName] = useState(fixture.initial);

        const testContainer = container({
            className,
            accessKey: 'asdf'
        });

        setClassName(fixture.update);
        expect(testContainer.className).toEqual(fixture.update);
    });

    it('update container with a chained state object', () => {
        const fixture = {
            initial: 'wow',
            update: 'hey!'
        };
        const [portal, setPortal] = useState(fixture.initial);

        const [className] = useState(portal);

        const testContainer = container({
            className
        });

        setPortal(fixture.update);
        expect(testContainer.className).toEqual(fixture.update);
    });

    it('create container with state properties', () => {
        const textContentFixture = 'hello';
        const prop: any = {
            get initial() {
                return textContentFixture;
            },
            setState: () => {},
            props: []
        };

        const testContainer = container({
            textContent: prop
        });

        expect(testContainer.textContent).toEqual(textContentFixture);
    });

    it('update container with a state object and reducer', () => {
        const addDegrees = (temp: string) => `${temp}°C`;

        const [temperature, setTemperature] = useState('21', addDegrees);

        const component = container({
            textContent: temperature
        });
        expect(component.textContent).toEqual('21°C');

        setTemperature('31');

        expect(component.textContent).toEqual('31°C');
    });

    it('update container with a chained state object and reducer', () => {
        const [start, setStart] = useState(true);

        const [className] = useState(start, state =>
            state ? 'true' : 'false'
        );

        const testContainer = container({
            className
        });

        expect(testContainer.className).toEqual('true');

        setStart(false);
        expect(testContainer.className).toEqual('false');
    });

    it('useState with null initial', () => {
        const [fixture, setFixture] = useState(null);
        expect(fixture.setState).toBeTruthy();
    });

    it('useState with null initial and reducer', () => {
        const [fixture, setFixture] = useState(null, state => {});
        expect(fixture.setState).toBeTruthy();
    });

    it('useState with null initial and null reducer', () => {
        const [fixture, setFixture] = useState(null, null);
        expect(fixture.setState).toBeTruthy();
    });

    it('useState with null reducer', () => {
        const [fixture, setFixture] = useState(4, null);
        expect(fixture.setState).toBeTruthy();
    });
});

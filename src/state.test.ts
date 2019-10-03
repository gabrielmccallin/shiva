import { useState } from './state';
import { container, ContainerSchema } from './container';

describe('state', () => {
    it('create state variable ', () => {
        const fixture = ['hello'];
        const [items] = useState(['hello']);
        expect(items.value).toEqual(fixture);
    });

    it('set state variable ', () => {
        const [items, setItems] = useState(['hello']);
        setItems([...items.value, ['there']]);
        expect(items.value.length as []).toBe(2);
    });

    it('set state variable with reducer', () => {
        const [items, setItems] = useState(0, state => `Reduced ${state}`);
        setItems(items.value + 1);
        expect(items.value).toBe(1);
    });

    it('create container with state children', () => {
        const [children] = useState([
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

    it('should create a container from multiple properties with state objects', () => {
        const [state] = useState('block');

        const containerProps: ContainerSchema<HTMLImageElement> = {
            attributes: {
                hiya: state,
                another: state
            },
            src: state,
            style: {
                display: state
            },
            tagName: 'img'
        };

        const testContainer = container<HTMLImageElement>(containerProps);

        expect(testContainer.style.display).toEqual('block');
        expect(testContainer['src']).toEqual('http://localhost/block');
        expect(testContainer.getAttribute('hiya')).toEqual('block');
        expect(testContainer.getAttribute('another')).toEqual('block');
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

        const [text, setText] = useState(fixture);

        const testContainer = container({
            children: text.textContent
        });

        setText(fixture);
        expect(testContainer.textContent).toEqual(fixture.textContent);
    });

    it('update container with state object and nested array', () => {
        const fixture = {
            original: {
                children: ['hello', 'there']
            },
            update: {
                children: ['goodbye', 'you']
            }
        };

        const [text, setText] = useState(fixture.original);

        const testContainer = container({
            children: text.children
        });

        expect(testContainer.childNodes[0].textContent).toEqual(fixture.original.children[0]);
        expect(testContainer.childNodes[1].textContent).toEqual(fixture.original.children[1]);

        setText(fixture.update);
        expect(testContainer.childNodes[0].textContent).toEqual(fixture.update.children[0]);
    });

    it('update container with state array', () => {
        const fixture = {
            original: ['hello', 'there'],
            update: ['goodbye', 'you']
        };

        const [children, setChildren] = useState(fixture.original);

        const testContainer = container({
            children
        });

        expect(testContainer.childNodes[0].textContent).toEqual(fixture.original[0]);
        expect(testContainer.childNodes[1].textContent).toEqual(fixture.original[1]);

        setChildren(fixture.update);
        expect(testContainer.childNodes[0].textContent).toEqual(fixture.update[0]);
    });

    it('should update containers without leaking', () => {
        const fixture1 = {
            original: { hello: 'there'},
            update: { hello: 'you' }
        };

        const fixture2 = {
            original: { hello: 'there2'},
            update: { hello: 'you2' }
        };

        const [children, setChildren] = useState(fixture1.original);
        const [children2, setChildren2] = useState(fixture2.original);

        const testContainer1 = container({
            children: children.hello
        });

        const testContainer2 = container({
            children: children2.hello
        });

        expect(testContainer1.childNodes[0].textContent).toEqual(fixture1.original.hello);
        expect(testContainer2.childNodes[0].textContent).toEqual(fixture2.original.hello);

        setChildren(fixture1.update);
        expect(testContainer1.childNodes[0].textContent).toEqual(fixture1.update.hello);

        setChildren2(fixture2.update);
        expect(testContainer2.childNodes[0].textContent).toEqual(fixture2.update.hello);
    });

    it('update container with dates', () => {
        const fixture = {
            original: Date.now(),
            update: Date.now() + 1000
        };

        const [children, setChildren] = useState(fixture.original);

        const testContainer = container({
            children
        });

        expect(testContainer.childNodes[0].textContent).toEqual(fixture.original.toString());

        setChildren(fixture.update);
        expect(testContainer.childNodes[0].textContent).toEqual(fixture.update.toString());
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
        const prop = {
            get value() {
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

    it('update container with an initially empty state object and reducer', () => {
        const addDegrees = (temp: string) => `${temp}°C`;

        const [temperature, setTemperature] = useState(0, addDegrees);

        const component = container({
            textContent: temperature
        });
        expect(component.textContent).toEqual('0°C');

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

describe('nested state object', () => {
    it('should return state objects for each leaf node', () => {
        const fixture = {
            wow: {
                wow: 'wow'
            },
            hey: 'hey'
        };

        const [nested] = useState(fixture);

        expect(nested.wow.wow).toHaveProperty('value');
        expect(nested.hey).toHaveProperty('setState');

        expect(nested.wow.wow.value).toEqual('wow');
    });

    it('should update containers with new values', () => {
        const fixture = {
            wow: {
                wow: 'wow'
            },
            hey: 'hey'
        };
        const [state, setState] = useState(fixture);

        const testContainer = container({
            children: state.hey
        });

        const testContainer2 = container({
            children: state.wow.wow
        });

        expect(testContainer.childNodes[0].textContent).toEqual('hey');
        expect(testContainer2.childNodes[0].textContent).toEqual('wow');

        setState({
            wow: {
                wow: 'wownow'
            },
            hey: 'heynow'
        });

        expect(testContainer.childNodes[0].textContent).toEqual('heynow');
        expect(testContainer2.childNodes[0].textContent).toEqual('wownow');
    });

    it('should update containers partially', () => {
        const fixture = {
            wow: {
                wow: 'wow'
            },
            hey: 9
        };
        const [state, setState] = useState(fixture);

        const testContainer = container({
            children: state.hey
        });

        const testContainer2 = container({
            children: state.wow.wow
        });

        expect(testContainer.childNodes[0].textContent).toEqual('9');
        expect(testContainer2.childNodes[0].textContent).toEqual('wow');

        setState({
            wow: {
                wow: 'wownow'
            }
        });

        expect(testContainer.childNodes[0].textContent).toEqual('9');
        expect(testContainer2.childNodes[0].textContent).toEqual('wownow');
    });
    it('should run the reducer on the whole state object', () => {
        const fixture = {
            monthly: 100,
            left: 5
        };

        const reducer = ({ monthly, left }: { monthly: number, left: number }): { monthly: string, left: string } => ({
            monthly: monthly.toFixed(2),
            left: left.toFixed(0)
        });

        const [monthLeft, setMonthLeft] = useState(fixture, reducer);

        const testContainer = container({
            children: monthLeft.monthly
        });

        const testContainer2 = container({
            children: monthLeft.left
        });

        setMonthLeft({
            monthly: 200,
            left: 10
        });

        expect(testContainer.childNodes[0].textContent).toEqual('200.00');
        expect(testContainer2.childNodes[0].textContent).toEqual('10');
    });

    it('should update with a HTMLElement from the reducer', () => {
        const fixture = {
            initial: 'hello',
            expected: 'there'
        };

        const reducer = (state) => container({ children: state });

        const [element, setElement] = useState(fixture.initial, reducer);

        const testContainer = container({
            children: element
        });

        setElement(fixture.expected);

        expect(testContainer.childNodes[0].textContent).toEqual(fixture.expected);
    });
});

import { Container } from '../Container';

export default class TemperatureInput extends Container {
    private input: Container;
    private scaleNames = {
        c: 'Celsius',
        f: 'Fahrenheit'
    }

    constructor({ scale, callback }: { scale: string, callback: Function }) {
        super({
            id: 'celsius-container',
            padding: '1rem',
            color: 'white',
            fontFamily: 'monospace'
        });

        const fieldset = new Container({
            type: 'fieldset'
        });
        this.addChild(fieldset);

        const legend = new Container({
            type: 'legend',
            text: `Enter temperature in ${this.scaleNames[scale]}`,

        });
        fieldset.addChild(legend);

        this.input = new Container({
            type: 'input'
        });
        this.input.addEventListener(this, "input", e => callback(e.target.value));
        fieldset.addChild(this.input);

    }

    update(temperature) {
        this.input.value = temperature;
    }
}
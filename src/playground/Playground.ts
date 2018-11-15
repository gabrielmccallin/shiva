import { RootContainer } from '../RootContainer';
import TemperatureInput from './TemperatureInput';

class Playground extends RootContainer {
    private celsiusInput: TemperatureInput;
    private fahrenheitInput: TemperatureInput;

    constructor() {
        super();

        this.celsiusInput = new TemperatureInput({
            scale: 'c',
            callback: e => this.handleCelsiusChange(e)
        });
        this.addChild(this.celsiusInput);

        this.fahrenheitInput = new TemperatureInput({
            scale: 'f',
            callback: e => this.handleFahrenheitChange(e)
        });
        this.addChild(this.fahrenheitInput);

    }

    toCelsius(fahrenheit: number) {
        return (fahrenheit - 32) * 5 / 9;
    }

    toFahrenheit(celsius: number) {
        return (celsius * 9 / 5) + 32;
    }

    handleCelsiusChange(temperature: string) {
        this.fahrenheitInput.update(this.tryConvert(temperature, this.toFahrenheit));
    }

    handleFahrenheitChange(temperature: string) {
        this.celsiusInput.update(this.tryConvert(temperature, this.toCelsius));
    }

    tryConvert(temperature: string, convert: Function) {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }
}

window.onload = () => {
    new Playground(); // tslint:disable-line
};

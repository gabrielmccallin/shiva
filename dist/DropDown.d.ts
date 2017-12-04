import { Container } from './Container';
import { DropDownConfig } from './DropDownConfig';
import { Event } from './EventDispatcher';
export declare class DropDown extends Container {
    static CHANGE: string;
    private button;
    private caret;
    private unorderedList;
    private scopedEventHandler;
    private items;
    private buttonStyle;
    private dropStyle;
    private itemStyle;
    private durationExpand;
    private durationContract;
    constructor(config: DropDownConfig);
    private buttonOver(e);
    private buttonOut(e);
    private itemClicked(e);
    itemOver(e: Event): void;
    itemOut(e: Event): void;
    private buttonClicked(e);
    private closeDrop(e);
    disable(): void;
    enable(): void;
}

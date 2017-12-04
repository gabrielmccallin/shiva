export interface Dimension {
    width: number;
    height: number;
}
export declare class Resize {
    static proportionalOutside(source: Dimension, target: Dimension): {
        height: number;
        width: number;
    };
    static proportionalInside(source: Dimension, target: Dimension): Object;
}

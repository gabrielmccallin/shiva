import { Container } from './Container';
import { ImageConfig } from './ImageConfig';
export declare class Image extends Container {
    static COMPLETE: string;
    static ERROR: string;
    constructor(config?: ImageConfig);
    load(src: string): void;
}

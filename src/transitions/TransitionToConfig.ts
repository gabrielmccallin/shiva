import { StyleDeclaration } from '../components/container/StyleDeclaration';
import { Ease } from './Ease';

export interface TransitionToConfig {
    duration: number;
    toVars: StyleDeclaration;
    ease?: Ease;
    delay?: number;
    immediateRender?: boolean;
    resolve?: Function;
}
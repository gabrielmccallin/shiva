import { TransitionToConfig } from './TransitionToConfig';
import { StyleDeclaration } from './StyleDeclaration';
export interface TransitionFromToConfig extends TransitionToConfig {
    fromVars: StyleDeclaration;
}

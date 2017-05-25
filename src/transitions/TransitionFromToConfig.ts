import { TransitionToConfig } from './TransitionToConfig';
import { StyleDeclaration } from '../components/container/StyleDeclaration';

export interface TransitionFromToConfig extends TransitionToConfig {
    fromVars: StyleDeclaration;
}
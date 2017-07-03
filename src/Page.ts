import { Container } from './Container';

export interface Page extends Container {
    wake();
    sleep();
}
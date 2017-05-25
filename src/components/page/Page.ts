import { Container } from '../container/Container';

export interface Page extends Container {
    wake();
    sleep();
}
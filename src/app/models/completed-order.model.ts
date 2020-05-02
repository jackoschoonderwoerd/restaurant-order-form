
import { Course } from './course.model';
import { OrderInfo } from './order-info.model';
import { Menu } from './menu.model';


export class CompletedOrder {
    constructor(
        public orderInfo: OrderInfo,
        public sortedMenu: Menu
    ) { }
}

import { Course } from './course.model';
import { OrderInfo } from './order-info.model';
import { Menu } from './menu.model';
import { Discounts } from './discounts.model';


export class CompletedOrder {
    constructor(
        public orderInfo: OrderInfo,
        public sortedMenu: Menu,
        public orderTotalPrice: number,
        public discounts: Discounts,
        public destination: string
        // public maaltijdDealTotalPrice?: number,
        // public maaltijdDealTotalAmount?: number,
        // public borrelDealTotalPrice?: number,
        // public borrelDealTotalAmount?: number
    ) { }
}
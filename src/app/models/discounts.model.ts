import { CourseItem } from './courseItem.model';
import { Discount } from './discount.model';

export class Discounts {
    constructor(
        public discount: Discount[],
    ) { }
}
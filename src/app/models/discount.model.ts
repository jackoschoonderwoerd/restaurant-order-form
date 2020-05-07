import { CourseItem } from './courseItem.model';

export class Discount {
    constructor(
        public courseItem: string,
        public totalAmount: number,
        public totalPrice: number
    ) { }
}
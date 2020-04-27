import { CourseItem } from './courseItem.model';

export class NewOrderedItem {
    constructor(
        public courseName: string,
        public courseItemName: string,
        public courseItemAmount: number
        // public courseItem: CourseItem,
    ) { }
}
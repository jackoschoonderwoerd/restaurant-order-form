import { Injectable } from '@angular/core';
import { CompletedOrder } from 'src/app/models/completed-order.model';
import { OrderInfo } from 'src/app/models/order-info.model';
import { Discounts } from 'src/app/models/discounts.model';
import { Menu } from 'src/app/models/menu.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { Course } from 'src/app/models/course.model';
import { Discount } from 'src/app/models/discount.model';

@Injectable({
  providedIn: 'root'
})
export class TestOrderService {

  testOrder = new CompletedOrder(
    new OrderInfo(
      'jacko',
      'afhalen',
      '123',
      '1234',
      '2@2',
      new Date(),
      '16:30',
      'comments'
    ),
    new Menu(
      [new Course(
        'soep',
        [new CourseItem(
          'tomaten',
          2.95,
          '',
          '',
          3
        )]
      )]
    ),
    150.95,
    new Discounts(
      [new Discount(
        'borrelHapjes',
        1,
        1.95
      )]
    ),
    'kitchen'
  );

  constructor() { }


}

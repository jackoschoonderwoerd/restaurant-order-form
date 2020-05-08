import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';
import { OrderService } from '../order/order.service';
import { CompletedOrder } from 'src/app/models/completed-order.model';
import { OrderInfo } from 'src/app/models/order-info.model';
import { Menu } from 'src/app/models/menu.model';
import { Course } from 'src/app/models/course.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { Discounts } from 'src/app/models/discounts.model';
import { Discount } from 'src/app/models/discount.model';


@Component({
  selector: 'app-test',
  template: ``,
  templateUrl: 'test.component.html' ,
})
export class TestComponent implements OnInit {

  numbers: [
    1, 2, 3, 4
  ]

  event = new CompletedOrder(
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
  constructor(
    private coursesService: CoursesService,
    private orderService: OrderService) { }

 

  ngOnInit(): void {
    console.log(this.event);
    this.orderService.completedOrderReady.subscribe(
      (completedOrder: CompletedOrder) => {
        this.event = completedOrder;
        console.log(completedOrder);
      }
    );
  }
  getCompletedOrder() {
    this.event = this.orderService.getCompletedOrder()
    console.log(this.event);
  }
  
}

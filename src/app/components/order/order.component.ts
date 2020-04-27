import { Component, OnInit } from '@angular/core';
import { SoepService } from '../soep/soep.service';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { CoursesService } from '../courses/courses.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  courses;
  orderedItems;
  soepOrders;
  itemOrders;
  itemType;
  totalItemPrice: number  = 0;
  soepTotal = 0;
  constructor(
    private soepService: SoepService,
    private orderService: OrderService,
    private coursesService: CoursesService,
    private router: Router) { }
  
  orderItems = [
    'soep',
    'borrelhapjes'
  ];

  finalPrice: number = 0;

  ngOnInit(): void {
    this.courses = this.coursesService.getMenu('companyName');
    console.log(this.courses);
    this.orderItems = this.coursesService.getOrderedItems();
    console.log(this.orderItems);

    // this.orderService.getItemOrders();
    // this.soepOrders = this.soepService.getCourseOrders().courseOrders;
    // this.itemType = this.soepService.getCourseOrders().itemType;
    // this.calculateTotalItemPrice();
  }
  editOrder(itemType) {
    // console.log(itemType);
    // this.router.navigate([itemType]);
  }
  calculateTotalItemPrice() {
    // this.soepOrders.forEach(soepOrder => {
    //   this.totalItemPrice = this.totalItemPrice + soepOrder.price * soepOrder.quantity;
    // })
  }
}

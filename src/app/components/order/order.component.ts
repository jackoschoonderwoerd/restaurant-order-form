import { Component, OnInit } from '@angular/core';
import { SoepService } from '../soep/soep.service';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { CoursesService } from '../courses/courses.service';
import { Course } from 'src/app/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { FinalizeOrderDialogComponent } from './finalize-order-dialog/finalize-order-dialog.component';
import { AddFinalizeComponent } from '../courses/add-finalize/add-finalize.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  courses: Course[] = [];
  orderedItems;
  soepOrders;
  itemOrders;
  itemType;
  totalItemPrice: number  = 0;
  soepTotal = 0;
  menu
  orderTotal;
  orderTotalAfterDiscount;
  maaltijdDeals;
  discount;
  constructor(
    private soepService: SoepService,
    private orderService: OrderService,
    private coursesService: CoursesService,
    private router: Router,
    private dialog: MatDialog) { }
  
  orderItems = [
    'soep',
    'borrelhapjes'
  ];
  

  finalPrice: number = 0;

  ngOnInit(): void {
    this.getOrderTotal();
    this.getMaaltijdDeals();
    this.menu = this.coursesService.getMenu('companyName');
    this.menu.courses.forEach(course => {
      this.courses.push(course);
    })
  }

  getOrderTotal() {
    this.orderTotal = this.coursesService.calculateOrderTotal();
  }

  onOrderMore() {
    this.dialog.open(AddFinalizeComponent)
  }
  getMaaltijdDeals() {  //calculate discount
    
    const discountSum = 2; //euro
    const orderedMeals = this.coursesService.orderedItemsCount('maaltijden');
    console.log('orderedMeals: ', orderedMeals);
    let orderedWine = this.coursesService.orderedItemsCount('wijn');
    console.log('orderedWine: ', orderedWine)
    
    this.discount = 0
    if (orderedMeals >= 2) {
      const maxWines = orderedMeals / 2;
      console.log('maxWines: ', maxWines)
      if(orderedWine > maxWines) {
        orderedWine = Math.floor(maxWines)
        console.log('orderedWine: ', orderedWine)
        this.discount = Math.floor(orderedWine) * discountSum;
      }
      // console.log('Math.floor(discount: ', Math.floor(discount))
    } 
    console.log('discount: ', this.discount)
    return this.discount
    // console.log(discountUnit);
  }
}

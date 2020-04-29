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
  maaltijdDealsTotalPrice;
  borrelDeals;
  borrelDealsTotalPrice;
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
    this.calculateMaaltijdDeals();
    this.calculateBorrelDeals();
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

  calculateMaaltijdDeals() {  //calculate maaltijdDeals  
    const maaltijdDealsSum = 2; //euro
    const orderedMeals = this.coursesService.orderedItemsCount('maaltijden');
    let orderedWine = this.coursesService.orderedItemsCount('wijn')
    this.maaltijdDealsTotalPrice = 0
    if (orderedMeals >= 2) {
      const maxWines = orderedMeals / 2;
      if(orderedWine >= maxWines) {
        // orderedWine = Math.floor(maxWines)
        this.maaltijdDeals = Math.floor(maxWines)
        this.maaltijdDealsTotalPrice = Math.floor(this.maaltijdDeals) * maaltijdDealsSum;
      }
    } 
    return this.maaltijdDealsTotalPrice
  }
  
  calculateBorrelDeals() {
    const borreldealsSum = 1; //euro
    const orderedBeers = this.coursesService.orderedItemsCount('bier');
    let orderedBorrelhapjes = this.coursesService.orderedItemsCount('borrelhapjes');
    console.log('orderedBeers: ', orderedBeers, 'orderedBorrelhapjes: ', orderedBorrelhapjes);
    this.borrelDealsTotalPrice = 0;
    if(orderedBeers >= 2) {
      const maxBorrelHapjes = orderedBeers / 2;
      if(orderedBorrelhapjes >= maxBorrelHapjes) {
        // orderedBorrelhapjes = Math.floor(maxBorrelHapjes);
        this.borrelDeals = Math.floor(maxBorrelHapjes);
        this.borrelDealsTotalPrice = Math.floor(this.borrelDeals) * borreldealsSum;
      }
    }
    console.log('this.borrelDeals: ', this.borrelDealsTotalPrice);
    return this.borrelDealsTotalPrice;
  }
}

import { Component, OnInit } from '@angular/core';
// import { SoepService } from '../soep/soep.service';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { CoursesService } from '../courses/courses.service';
import { Course } from 'src/app/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { FinalizeOrderDialogComponent } from './finalize-order-dialog/finalize-order-dialog.component';
import { AddFinalizeComponent } from '../courses/add-finalize/add-finalize.component';

import { MaaltijddealInfoDialogComponent } from './maaltijddeal-info-dialog/maaltijddeal-info-dialog.component';
import { BorreldealInfoDialogComponent } from './borreldeal-info-dialog/borreldeal-info-dialog.component';
import { DiscountService } from 'src/app/services/discount.service';


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
  orderTotal: number = 0;
  orderTotalAfterDiscount;
  maaltijdDeals;
  maaltijdDealsTotalPrice;
  maaltijdDealsTotalAmount;
  borrelDealsTotalAmount;
  borrelDealsTotalPrice: number = 0;
  discount;
  loadingStatus: boolean = false;
  constructor(
    // private soepService: SoepService,
    private orderService: OrderService,
    private coursesService: CoursesService,
    private router: Router,
    private dialog: MatDialog,
    private discountService: DiscountService) { }
  
  orderItems = [
    'soep',
    'borrelhapjes'
  ];
  
  discounts: [] = []

  finalPrice: number = 0;

  ngOnInit(): void {
    this.orderService.loadingStatusChanged.subscribe((loadingStatus: boolean) => {
      this.loadingStatus = loadingStatus;
    });
    console.log(this.discountService.getDiscount());
    this.orderService.orderStatusChanged.subscribe(
      () => {
        this.maaltijdDealsTotalAmount = 0;
        this.borrelDealsTotalAmount = 0;
      }
    );
    this.getOrderTotal();
    this.getMaaltijdDealsTotalPrice();
    this.getBorrelDealsTotalPrice();
    this.menu = this.coursesService.getMenu('companyName');
    this.menu.courses.forEach(course => {
      this.courses.push(course);
    });
    this.orderService.orderCancelledSubscription.subscribe(() => {
      this.orderTotal = 0;
      this.maaltijdDeals = 0;
      this.borrelDealsTotalAmount = 0;
      this.maaltijdDealsTotalPrice = 0;
      this.borrelDealsTotalPrice = 0;
    });
  }

  
 

  getOrderTotal() {
    this.orderTotal = this.coursesService.calculateOrderTotal();
  }

  onOrderMore() {
    this.dialog.open(AddFinalizeComponent)
  }

  getMaaltijdDealsTotalPrice() {
    const orderedMeals = this.coursesService.orderedItemsCount('maaltijden');
    const orderedWines = this.coursesService.orderedItemsCount('wijn');
    this.maaltijdDealsTotalPrice = this.orderService.returnMaaltijdDealsTotalPriceAndTotalAmount(orderedMeals, orderedWines).totalPrice;
    this.maaltijdDealsTotalAmount = this.orderService.returnMaaltijdDealsTotalPriceAndTotalAmount(orderedMeals, orderedWines).totalAmount;
  }

  getBorrelDealsTotalPrice() {
    const orderedBeers = this.coursesService.orderedItemsCount('bier');
    const orderedBorrelhapjes = this.coursesService.orderedItemsCount('borrelhapjes');
    this.borrelDealsTotalAmount = this.orderService.returnBorrelDealsTotalPriceAndTotalAmount(orderedBorrelhapjes, orderedBeers).totalAmount;
    this.borrelDealsTotalPrice = this.orderService.returnBorrelDealsTotalPriceAndTotalAmount(orderedBorrelhapjes, orderedBeers).totalPrice;
    console.log(this.borrelDealsTotalAmount, this.borrelDealsTotalPrice);
  }

  


  openBorrelDealInfo() {
    this.dialog.open(BorreldealInfoDialogComponent);
  }
  openMaatijdDealInfo() {
    this.dialog.open(MaaltijddealInfoDialogComponent);
  }
}

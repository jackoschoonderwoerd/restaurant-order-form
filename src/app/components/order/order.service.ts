import { Injectable, EventEmitter } from '@angular/core';

import { CoursesService } from '../courses/courses.service';
import { HttpClient } from '@angular/common/http';
import { CompletedOrder } from 'src/app/models/completed-order.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderSentDialogComponent } from './order-sent-dialog/order-sent-dialog.component';
import { Router } from '@angular/router';
import { Discount } from 'src/app/models/discount.model';
import { compileDirectiveFromRender2 } from '@angular/compiler/src/render3/view/compiler';
import { Discounts } from 'src/app/models/discounts.model';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderedItems;
  soepOrders;
  totalMaaltijdDiscountPrice: number;
  totalBorrelhapjesDiscountPrice: number;
  borrelDeals: number = 0;
  maaltijdDeals: number = 0;
  deals: number = 0;
  loadingStatusChanged = new EventEmitter<boolean>();
  orderStatusChanged = new EventEmitter<void>();
  orderCancelledSubscription = new EventEmitter<void>();
  completedOrderReady = new EventEmitter<CompletedOrder>();
  competedOrderToTest: CompletedOrder;

  constructor(
    private http: HttpClient,
    private coursesSevice: CoursesService,
    private dialog: MatDialog,
    private router: Router

  ) { }

  getMenu() {
    console.log(this.coursesSevice.getMenu());
    return this.coursesSevice.getMenu()
  }

  returnMaaltijdDealsTotalPriceAndTotalAmount(orderedMeals, orderedWines) {
    // console.log('orderedMeals:', orderedMeals, 'orderedWines: ', orderedWines);
    const discount = 2; // euro
    
    if(orderedMeals >= 2) {
      // console.log('orderedMeals:', orderedMeals)
      const maxDeals = Math.floor(orderedMeals / 2)
      // console.log('maxDeals:', maxDeals);
      if(orderedWines >= maxDeals) {
        // console.log('passed if')
        this.maaltijdDeals = maxDeals;
      } else {
        this.maaltijdDeals = orderedWines
      }
      // console.log(this.deals, this.deals * discount)
    }
    this.totalMaaltijdDiscountPrice = this.maaltijdDeals * discount;
    return new Discount('maaltijdDeals', this.maaltijdDeals, this.maaltijdDeals * discount);
  }


  returnBorrelDealsTotalPriceAndTotalAmount(orderedBorrelHapjes, orderedBeers) {
    // console.log('orderedBorrelHapjes: ', orderedBorrelHapjes, 'orderedBeers: ', orderedBeers);
    const discount = 1; // euro
    // let totalBorrelhapjesDiscountPrice = 0;
    const maxDeals = Math.floor(orderedBeers / 2)
    if(orderedBorrelHapjes >= maxDeals) {
      this.borrelDeals = maxDeals;
    } else {
      this.borrelDeals = orderedBorrelHapjes
    }
    // console.log(this.borrelDeals, this.borrelDeals * discount)
    this.totalBorrelhapjesDiscountPrice = this.borrelDeals * discount;
    console.log('borrelDeals', this.deals, this.borrelDeals * discount);
    return new Discount('borrelDeals', this.borrelDeals, this.borrelDeals * discount);

  }

  postFinalOrder(completedOrder: CompletedOrder) {
    this.competedOrderToTest = completedOrder;
    const discounts = new Discounts([
      new Discount('maaltijdDeals', this.maaltijdDeals, this.totalMaaltijdDiscountPrice),
      new Discount('borrelDeals', this.borrelDeals, this.totalBorrelhapjesDiscountPrice)
    ]);
    // console.log(discountInfo);
    // console.log(completedOrder);
    completedOrder.destination = 'kitchen';
    completedOrder.discounts = discounts;
    console.log(completedOrder);
    this.completedOrderReady.emit(completedOrder);
    this.loadingStatusChanged.emit(true);
    this.http.post('https://65qdu0ddyk.execute-api.eu-central-1.amazonaws.com/dev/captein-en-co', completedOrder).subscribe(
      (data => {
        console.log(data);
        completedOrder.orderInfo.email = data.toString();
        completedOrder.destination = 'customer'
        this.http.post('https://65qdu0ddyk.execute-api.eu-central-1.amazonaws.com/dev/captein-en-co', completedOrder).subscribe(
          (customerData => {
            console.log(customerData);
          })
        );
        this.loadingStatusChanged.emit(false);
        this.orderStatusChanged.emit();
        this.dialog.open(OrderSentDialogComponent);
        localStorage.clear();
        this.coursesSevice.resetMenu();
        this.router.navigate(['/home']);
      }),
      (err => {
        console.log(err);
      })
    );
    
  }

  getCompletedOrder(): CompletedOrder {
    return this.competedOrderToTest;
  }

  storeOrderInfoFormValue(orderFormValue) {
    console.log(orderFormValue);
    localStorage.setItem('order-info', JSON.stringify(orderFormValue));
  }

  checkLocalstorageForOrderInfo() {
    if(localStorage.getItem('order-info')) {
      return JSON.parse(localStorage.getItem('order-info'))
    }
  }

  cancelOrder() {
    this.coursesSevice.resetMenu();
    this.orderCancelledSubscription.emit();
  }
}

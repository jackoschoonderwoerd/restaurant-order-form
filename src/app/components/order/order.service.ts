import { Injectable, EventEmitter } from '@angular/core';

import { CoursesService } from '../courses/courses.service';
import { HttpClient } from '@angular/common/http';
import { CompletedOrder } from 'src/app/models/completed-order.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderSentDialogComponent } from './order-sent-dialog/order-sent-dialog.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderedItems;
  soepOrders;
  loadingStatusChanged = new EventEmitter<boolean>();
  orderStatusChanged = new EventEmitter<void>();
  orderCancelledSubscription = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private coursesSevice: CoursesService,
    private dialog: MatDialog,
    private router: Router

  ) { }

  getMenu() {
    console.log(this.coursesSevice.getMenu('cenc'));
    return this.coursesSevice.getMenu('cenc')
  }

  postFinalOrder(completedOrder: CompletedOrder) {
    this.loadingStatusChanged.emit(true);
    this.http.post('https://65qdu0ddyk.execute-api.eu-central-1.amazonaws.com/dev/captein-en-co', completedOrder).subscribe(
      (data => {
        console.log('data returned');
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

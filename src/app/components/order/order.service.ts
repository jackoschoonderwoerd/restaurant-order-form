import { Injectable, EventEmitter } from '@angular/core';

import { CoursesService } from '../courses/courses.service';
import { HttpClient } from '@angular/common/http';
import { CompletedOrder } from 'src/app/models/completed-order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderedItems;
  soepOrders;
  loadingStatusChanged = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private coursesSevice: CoursesService
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
}

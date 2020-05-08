import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../order.service'
import { FinalizeErrorDialogComponent } from '../finalize-error-dialog/finalize-error-dialog.component';
import { FinalizeOrderDialogComponent } from '../finalize-order-dialog/finalize-order-dialog.component';
import { CoursesService } from '../../courses/courses.service';
import { Menu } from 'src/app/models/menu.model';
import { CourseItem } from 'src/app/models/courseItem.model';
import { OrderInfo } from 'src/app/models/order-info.model';
import { CompletedOrder } from 'src/app/models/completed-order.model';
import { CancelOrderDialogComponent } from './cancel-order-dialog/cancel-order-dialog.component';
import { Discounts } from 'src/app/models/discounts.model';
import { BezorgenDialogComponent } from './bezorgen-dialog/bezorgen-dialog.component';
import { AfhalenDialogComponent } from './afhalen-dialog/afhalen-dialog.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {



  // orders: CoffeeOrder[] = [];
  totalPrice = 0
  customerInfoForm: FormGroup;
  orderInfoFormValue;
  minDate: Date;
  maxDate: Date;
  afhaalMomenten: string[] = [
    '16:00 - 16:30',
    '16:30 - 17:00',
    '17:00 - 17:30',
    '17:30 - 18:00', 
    '18:00 - 18:30', 
    '18:30 - 19:00', 
    '19:00 - 19:30',
    '19:30 - 20:00'
  ];
  // orderInfo: OrderInfo;
  // orderButtonDisabled: boolean = this.orders.length === 0;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    // private afhaalMomentenService: AfhaalMomentenService,
    private dialog: MatDialog,
    private router: Router,
    private coursesService: CoursesService) {

  }
  ngOnInit(): void {
    this.initForm();
    this.setUserCategoryValidators();
    if (this.orderService.checkLocalstorageForOrderInfo()) {
      const orderFormInfo = this.orderService.checkLocalstorageForOrderInfo();
      this.customerInfoForm.patchValue({
        name: orderFormInfo.name,
        delivery: orderFormInfo.delivery,
        address: orderFormInfo.address,
        email: orderFormInfo.email,
        phone: orderFormInfo.phone,
        pickupDate: orderFormInfo.pickupDate,
        pickupTime: orderFormInfo.pickupTime,
        comments: orderFormInfo.comments
      });
    }
    this.orderService.orderStatusChanged.subscribe(() => {
      localStorage.clear();
      this.customerInfoForm.reset();
    });



    const today = new Date()
    this.minDate = today;
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);

  }

  orderInfoFormChanged() {
    this.orderService.storeOrderInfoFormValue(this.customerInfoForm.value)
  }

  private initForm() {
    this.customerInfoForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      delivery: ['pickup'],
      address: [null, [Validators.required]],
      phone: [null, []],
      email: [null, [Validators.required, Validators.email]],
      pickupDate: [null, [Validators.required]],
      pickupTime: [null, [Validators.required]],
      comments: [null]

    });
    if (this.orderInfoFormValue) {
      console.log(this.orderInfoFormValue);
      this.customerInfoForm.patchValue({
        name: this.orderInfoFormValue.name,
        delivery: this.orderInfoFormValue.delivery,
        address: this.orderInfoFormValue.address,
        phone: this.orderInfoFormValue.phone,
        email: this.orderInfoFormValue.email,
        pickupDate: this.orderInfoFormValue.pickupDate,
        pickupTime: this.orderInfoFormValue.pickupTime,
        comments: this.orderInfoFormValue.comments
      });
    }
  }

  sendOrder() {
    const menu = this.coursesService.getMenu('cenc');
    const sortedMenu = this.sortMenu(menu);
    // const orderInfoFormValue = this.orderInfoForm.value;

    const orderInfo = new OrderInfo(
      this.customerInfoForm.value.name,
      this.customerInfoForm.value.delivery,
      this.customerInfoForm.value.address,
      this.customerInfoForm.value.phone,
      this.customerInfoForm.value.email,
      this.customerInfoForm.value.pickupDate,
      this.customerInfoForm.value.pickupTime,
      this.customerInfoForm.value.comments
    );
    const discounts = new Discounts([])
    const orderTotalPrice = this.coursesService.calculateOrderTotal()
    const destination = 'kitchen'
    const completedOrder = new CompletedOrder(orderInfo, sortedMenu, orderTotalPrice, discounts, destination);
    this.orderService.postFinalOrder(completedOrder); 
  }

  onCancel() {
    const dialogRef = this.dialog.open(CancelOrderDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result){
        localStorage.clear();
        this.customerInfoForm.reset();
        this.orderService.cancelOrder();
      }
    });
    
  }

  private sortMenu(menu: Menu) {
    let sortedMenu = new Menu(menu.courses.filter((course) =>
      course.courseItems.some((courseItem) => courseItem.amount !== 0))
      .map(element => {
        let newElt = Object.assign({}, element); // copies element
        newElt.courseItems = newElt.courseItems.filter(courseItem => courseItem.amount !== 0);
        return newElt;
      }));
    return sortedMenu
  }

  private ClearOrder() {
    this.customerInfoForm.reset();
  }

  public onCancelOrder() {
    this.ClearOrder();
    this.router.navigate(['home']);
  }


  myDayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0;
  }

  checkboxChange() {
    console.log('checkboxChange()');
  }
  onBezorgen() {
    this.dialog.open(BezorgenDialogComponent);
    // console.log('bezxorgen');
  }
  onAfhalen() {
    this.dialog.open(AfhalenDialogComponent);
  }
  setUserCategoryValidators() {
    console.log('setUserCategoryValidators() called')
    const addressControl = this.customerInfoForm.get('address');
    this.customerInfoForm.get('delivery').valueChanges.subscribe(
      (delivery => {
        console.log(delivery);
        if (delivery === 'pickup') {
          addressControl.setValidators(null);
        }
        if (delivery === 'dropoff') {
          addressControl.setValidators([Validators.required]);
        }
        addressControl.updateValueAndValidity();
      })
    );
  }
}

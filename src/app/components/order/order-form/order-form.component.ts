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

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {



  // orders: CoffeeOrder[] = [];
  totalPrice = 0
  orderInfoForm: FormGroup;
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
    if (this.orderService.checkLocalstorageForOrderInfo()) {
      const orderFormInfo = this.orderService.checkLocalstorageForOrderInfo();
      this.orderInfoForm.patchValue({
        name: orderFormInfo.name,
        phone: orderFormInfo.phone,
        pickupDate: orderFormInfo.pickupDate,
        pickupTime: orderFormInfo.pickupTime,
        comments: orderFormInfo.comments
      });
    }
    this.orderService.orderStatusChanged.subscribe(() => {
      localStorage.clear();
      this.orderInfoForm.reset();
    });



    const today = new Date()
    this.minDate = today;
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);

  }

  orderInfoFormChanged() {
    this.orderService.storeOrderInfoFormValue(this.orderInfoForm.value)
  }

  private initForm() {
    this.orderInfoForm = this.fb.group({
      // name: new FormControl(null, [Validators.required]),
      // phone: new FormControl(null),
      // pickupDate: new FormControl(undefined, [Validators.required]),
      // pickupTime: new FormControl(null, [Validators.required]),
      // comments: new FormControl(null)

      name: new FormControl('jacko'),
      phone: new FormControl(null),
      email: new FormControl('jackoboes@gmail.com'),
      pickupDate: new FormControl(undefined),
      pickupTime: new FormControl(null),
      comments: new FormControl(null)

    });
    if (this.orderInfoFormValue) {
      console.log(this.orderInfoFormValue);
      this.orderInfoForm.patchValue({
        name: this.orderInfoFormValue.name,
        phone: this.orderInfoFormValue.phone,
        pickupDate: this.orderInfoFormValue.pickupDate,
        pickupTime: this.orderInfoFormValue.pickupTime,
      });
    }
  }

  sendOrder() {
    const menu = this.coursesService.getMenu('cenc');
    const sortedMenu = this.sortMenu(menu);
    const orderInfoFormValue = this.orderInfoForm.value;

    const orderInfo = new OrderInfo(
      orderInfoFormValue.name,
      orderInfoFormValue.phone,
      orderInfoFormValue.email,
      orderInfoFormValue.pickupDate,
      orderInfoFormValue.pickupTime,
      orderInfoFormValue.comments
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
        this.orderInfoForm.reset();
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

    this.orderInfoForm.reset();
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
}

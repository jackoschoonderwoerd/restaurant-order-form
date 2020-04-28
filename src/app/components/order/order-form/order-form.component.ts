import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../order.service'
import { FinalizeErrorDialogComponent } from '../finalize-error-dialog/finalize-error-dialog.component';
import { FinalizeOrderDialogComponent } from '../finalize-order-dialog/finalize-order-dialog.component';

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
  afhaalMomenten: string[] = [];
  // orderInfo: OrderInfo;
  // orderButtonDisabled: boolean = this.orders.length === 0;
  waiting = false;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    // private afhaalMomentenService: AfhaalMomentenService,
    private dialog: MatDialog,
    private router: Router) {
      
    }
  ngOnInit(): void {
    // console.log(this.orders.length <= 0)
    // this.afhaalMomenten = this.afhaalMomentenService.getAfhaalMomenten();

    // this.orderInfoFormValue = this.orderService.getOrderFormInfoValue();
    // this.orderService.OrderInfoFormValueEmitter.subscribe(
    //   ((orderInfoFormValue: OrderInfo) => {
    //     this.orderInfoFormValue = orderInfoFormValue;
    //   })
    // );
    

    // this.totalPrice = this.orderService.calculateTotalPrice();
    // this.orderService.totalPriceChangedEmitter.subscribe(
    //   ((totalPrice: number) => {
    //     this.totalPrice = totalPrice;
    //   })
    // );

    // this.orders = this.orderService.getOrders();
    // this.orderService.ordersEmitter.subscribe((orders: CoffeeOrder[]) => {
    //   this.orders = orders;
    // })

    const today = new Date()
    this.minDate = today;
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6);

    this.initForm();
  }

  orderInfoFormChanged() {
    // this.orderService.storeOrderInfoFormValue(this.orderInfoForm.value)
  }

  private initForm() {
    this.orderInfoForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      pickupDate: new FormControl(undefined, [Validators.required]),
      pickupTime: new FormControl(null, [Validators.required]),
      stamps: new FormControl(null)
    });
    if(this.orderInfoFormValue){
      console.log(this.orderInfoFormValue);
      this.orderInfoForm.setValue({
        name: this.orderInfoFormValue.name,
        phone: this.orderInfoFormValue.phone,
        pickupDate: this.orderInfoFormValue.pickupDate, 
        pickupTime: this.orderInfoFormValue.pickupTime,
        
      });
        
    } else {
      // console.log('NO orderInfoFormValue found');
    }
  }

  // orderMore() {
  //   this.dialog.open(OrderMoreDialogComponent, {
  //     width: '350px'
  //   });
  // }

  sendOrder() {
    this.waiting = true;
    // this.orderService.postFinalOrder(this.orderInfoForm.value).subscribe(
    //   (res: any) => {
    //     if(res.errorMessage) {
    //       this.waiting = false;
    //       this.dialog.open(FinalizeErrorDialogComponent, {data: {errorMessage: res.errorMessage}});
    //     } else {
    //       console.log(res);
    //       this.waiting = false;
    //       this.dialog.open(FinalizeOrderDialogComponent);
    //       this.ClearOrder()
    //       this.router.navigate(['/home'])
    //     }
    //   }
    // ); 
  }

  private ClearOrder() {
    this.orderService.deleteOrder();
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


  // deleteOrderItem(orderItemIndexindex: number) {
  //   this.orderService.deleteOrderItem(orderItemIndexindex);
  // }
  checkboxChange() {
    console.log('checkboxChange()');
  }

}

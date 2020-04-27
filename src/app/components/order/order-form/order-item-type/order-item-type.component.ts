import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-item-type',
  templateUrl: './order-item-type.component.html',
  styleUrls: ['./order-item-type.component.css']
})
export class OrderItemTypeComponent implements OnInit {
  @Input() orderItem;

  constructor() { }

  ngOnInit(): void {
    console.log(this.orderItem)
  }

}
